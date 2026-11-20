#!/usr/bin/env node
// Gen giọng hàng loạt qua API GenMax (https://genmax.io/docs).
// Dùng: node scripts/gen-voice.mjs tc005|channel [--only 1,3] [--force] [--dry-run]
//        [--speed 1.2] [--voice <voice_id>] [--provider minimax|elevenlabs|capcut] [--model <model_id>] [--lang Vietnamese]
// Cài đặt giọng lấy theo thứ tự: tham số dòng lệnh > "voice" trong episode.json (với "channel": trong channel/channel.json)
//   > VOICE_ID trong .env và mặc định (minimax, speech-2.8-hd, tốc độ 1.0).
// Tập (tc005): đọc episodes/<tập>/script/chNN.tts.txt, ghi episodes/<tập>/audio/chNN.mp3.
// channel: tự viết intro.tts.txt từ tên trong channel/channel.json, rồi đọc channel/*.tts.txt, ghi channel/*.mp3.
// Ghi nhớ chữ + cài đặt của từng file trong voice-meta.json: chạy lại chỉ gen chương đã đổi (--force: gen lại hết,
// --dry-run: chỉ liệt kê việc sẽ làm). File đã có mà chưa có meta (gen từ bản cũ) thì giữ nguyên.
// Lỗi mạng/429/5xx được thử lại có chờ; file ghi dở không bị coi là đã xong.
import {readdir, readFile, writeFile, mkdir, access, rename} from "node:fs/promises";
import path from "node:path";
import {epPaths, ROOT, CHANNEL, introText} from "./lib/paths.mjs";
import {voiceHash, readVoiceMeta, writeVoiceMeta} from "./lib/voice.mjs";

const API = "https://api.genmax.io";
const POLL_EVERY_MS = 4000;
const POLL_TIMEOUT_MS = 15 * 60 * 1000; // một chương quá lâu thì dừng, tránh treo vô hạn

try { process.loadEnvFile(path.join(ROOT, ".env")); } catch {} // không có .env thì dùng biến môi trường

const args = process.argv.slice(2);
const tap = args[0]?.startsWith("--") ? undefined : args[0];
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");
const only = opt("only")?.split(",").map(Number);
if (!tap) { console.error("Dùng: node scripts/gen-voice.mjs <tc005|channel> [--speed 1.2] [--only 1,3] [--force] [--dry-run]"); process.exit(1); }

const isChannel = tap === "channel";
const E = isChannel ? null : epPaths(tap);
const saved = JSON.parse(await readFile(isChannel ? path.join(CHANNEL, "channel.json") : E.json, "utf8").catch(() => "{}")).voice ?? {};

const provider = opt("provider") ?? saved.provider ?? "minimax";
const model = opt("model") ?? saved.model ?? (provider === "minimax" ? "speech-2.8-hd" : undefined);
const lang = opt("lang") ?? saved.language ?? (provider === "minimax" ? "Vietnamese" : "vi");
const voice = opt("voice") || saved.voiceId || process.env.VOICE_ID;
const speedGiven = opt("speed") ?? saved.speed;
const speed = Number(speedGiven ?? 1.0);
if (!Number.isFinite(speed) || speed <= 0) { console.error(`Tốc độ không hợp lệ: ${speedGiven}`); process.exit(1); }
if (!voice) { console.error("Thiếu giọng: đặt VOICE_ID trong .env, hoặc voice.voiceId trong episode.json, hoặc --voice <id>"); process.exit(1); }
const key = process.env.GENMAX_API_KEY;
if (!key && !dryRun) { console.error("Thiếu GENMAX_API_KEY (đặt trong .env hoặc biến môi trường)"); process.exit(1); }
if (speedGiven === undefined) console.warn("Chưa đặt tốc độ (voice.speed trong episode.json hoặc --speed): dùng 1.0");
console.log(`Giọng: ${provider}${model ? ` / ${model}` : ""} / ${voice} / ${lang} / tốc độ ${speed}`);

const settings = {provider, model, voice, speed, lang};
const headers = {"xi-api-key": key, "Content-Type": "application/json"};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => access(p).then(() => true, () => false);

class HttpError extends Error {
  constructor(what, status, body) { super(`${what} ${status}: ${body}`); this.status = status; }
}
const okJson = async (res, what) => {
  if (!res.ok) throw new HttpError(what, res.status, await res.text());
  return res.json();
};
// Thử lại có chờ gấp đôi (2s, 4s, 8s). retryable quyết định lỗi nào đáng thử lại.
async function retry(what, fn, retryable, tries = 4) {
  for (let i = 1; ; i++) {
    try { return await fn(); } catch (e) {
      if (i >= tries || !retryable(e)) throw e;
      const wait = Math.min(2000 * 2 ** (i - 1), 30000);
      console.log(`\n  ${what} lỗi (${String(e.message).slice(0, 120)}), thử lại sau ${wait / 1000}s (${i}/${tries - 1})`);
      await sleep(wait);
    }
  }
}
// Đọc/tải: lỗi mạng, 429, 5xx thì thử lại. Lỗi 4xx khác là lỗi thật.
const transient = (e) => !(e instanceof HttpError) || e.status === 429 || e.status >= 500;
// Tạo tác vụ gen (tốn credit): chỉ thử lại khi chắc chưa tạo (429, 503, hoặc không kết nối được), tránh gen trùng và bị tính hai lần.
const safeToRepost = (e) => (e instanceof HttpError ? e.status === 429 || e.status === 503 : e instanceof TypeError);

async function genOne(text) {
  const body = {text, provider, language_code: lang, voice_settings: {speed}};
  if (model) body.model_id = model;
  const {id} = await retry("POST", async () => okJson(
    await fetch(`${API}/v1/text-to-speech/${encodeURIComponent(voice)}`, {method: "POST", headers, body: JSON.stringify(body)}), "POST"), safeToRepost);
  const t0 = Date.now();
  for (;;) {
    if (Date.now() - t0 > POLL_TIMEOUT_MS) throw new Error(`Task ${id} chưa xong sau ${POLL_TIMEOUT_MS / 60000} phút. Kiểm tra lịch sử trên GenMax trước khi gen lại (tránh bị tính hai lần).`);
    await sleep(POLL_EVERY_MS);
    const d = await retry("GET history", async () => okJson(await fetch(`${API}/v1/history/${id}`, {headers}), "GET history"), transient);
    process.stdout.write(`  ${d.status} ${d.progress ?? ""}\r`);
    if (d.status === "failed") throw new Error(`Task ${id} lỗi: ${d.error}`);
    if (d.status === "completed") return {url: d.result.audio_url, credits: d.credits_deducted};
  }
}

async function download(url) {
  return retry("Tải audio", async () => {
    const res = await fetch(url);
    if (!res.ok) throw new HttpError("Tải audio", res.status, "");
    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.length) throw new Error("Tải audio: file rỗng");
    return buf;
  }, transient);
}

const dir = isChannel ? CHANNEL : E.script;
const outDir = isChannel ? CHANNEL : E.audio;
await mkdir(outDir, {recursive: true});
if (isChannel) await writeFile(path.join(CHANNEL, "intro.tts.txt"), `${introText()}\n`); // câu chào sinh từ channel.json (introText, name)
const files = (await readdir(dir)).filter((f) => (isChannel ? /\.tts\.txt$/ : /^ch\d+\.tts\.txt$/).test(f)).sort();
if (!files.length) { console.error(`Không có file .tts.txt trong ${dir}`); process.exit(1); }

const meta = readVoiceMeta(outDir);
let todoChars = 0, todoFiles = 0;
for (const f of files) {
  const n = Number(f.match(/\d+/)?.[0]);
  if (only && !only.includes(n)) continue;
  const name = f.replace(".tts.txt", ".mp3");
  const out = path.join(outDir, name);
  const text = (await readFile(path.join(dir, f), "utf8")).trim();
  const hash = voiceHash(text, settings);

  let why;
  if (force) why = "--force";
  else if (!(await exists(out))) why = "chưa có file";
  else if (!meta[name]) { console.log(`${name}: đã có, chưa có meta (gen từ bản cũ), giữ nguyên; --force để gen lại`); continue; }
  else if (meta[name].hash !== hash) why = "chữ hoặc cài đặt đã đổi";
  else { console.log(`${name}: không đổi, bỏ qua`); continue; }

  console.log(`${name}: ${text.length} ký tự, gen vì ${why}`);
  todoChars += text.length; todoFiles++;
  if (dryRun) continue;

  const {url, credits} = await genOne(text);
  const audio = await download(url);
  await writeFile(`${out}.part`, audio); // ghi ra file tạm rồi đổi tên: file hỏng không bao giờ mang tên .mp3
  await rename(`${out}.part`, out);
  meta[name] = {hash, chars: text.length, ...settings, credits, at: new Date().toISOString()};
  writeVoiceMeta(outDir, meta); // lưu sau từng chương: lỗi giữa chừng không mất tiến độ
  console.log(`  -> ${out} (${credits} credit)`);
}
if (dryRun) console.log(`\n[dry-run] sẽ gen ${todoFiles} file, ${todoChars} ký tự. Không gọi API.`);
