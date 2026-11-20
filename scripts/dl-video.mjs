// Tải video từ link nền tảng bất kỳ qua API gendownload.com (không cần khóa, không cần Chrome).
//   node scripts/dl-video.mjs <link> [--out=raw] [--name=cook-01] [--quality=1080] [--list]
// --list: chỉ in tiêu đề, thời lượng, các bản có sẵn (không tải). Mặc định lưu raw/<name>.mp4,
// name mặc định lấy từ tiêu đề. Chọn bản mp4 có độ cao gần --quality nhất (ưu tiên ≥ quality, không có thì cao nhất).
// File tải về là dữ liệu không tin cậy: chỉ đọc bằng ffprobe/ffmpeg (prep-footage), không mở hay chạy.
import {createWriteStream} from "node:fs";
import {mkdir, rename, rm} from "node:fs/promises";
import {Readable} from "node:stream";
import {pipeline} from "node:stream/promises";
import {execFileSync} from "node:child_process";
import path from "node:path";

const API = "https://gendownload.com";
const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith("--"));
const opt = (k, d) => args.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const listOnly = args.includes("--list");
if (!url) { console.error("Cách dùng: node scripts/dl-video.mjs <link> [--out=raw] [--name=tag-01] [--quality=1080] [--list]"); process.exit(1); }
const want = Number(opt("quality", "1080"));
const outDir = opt("out", "raw");

const post = async (p, body) => {
  const res = await fetch(API + p, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)});
  const text = await res.text();
  if (!res.ok) throw new Error(`${p} ${res.status}: ${text.slice(0, 200)}`);
  return JSON.parse(text);
};

// /api/extract chỉ đọc thông tin; lỗi 5xx/timeout thử lại 3 lần (không tốn credit nào).
let info;
for (let i = 1; ; i++) {
  try { info = await post("/api/extract", {url}); break; } catch (e) {
    if (i >= 3) { console.error(String(e.message)); process.exit(1); }
    await new Promise((r) => setTimeout(r, 2000 * i));
  }
}
const formats = (info.formats ?? []).map((f, i) => ({...f, i, h: parseInt(f.label, 10) || 0}));
const mins = info.duration ? `${(info.duration / 60).toFixed(1)} phút` : "?";
console.log(`${info.title} | ${info.source} | ${mins}`);
console.log(formats.map((f) => `  ${f.label} ${f.type} ${f.ext}${f.filesize ? ` ${(f.filesize / 1e6).toFixed(1)}MB` : ""}`).join("\n"));
if (listOnly) process.exit(0);

const videos = formats.filter((f) => f.type === "video" && f.ext === "mp4");
if (!videos.length) { console.error("Không có bản mp4 video."); process.exit(1); }
const atLeast = videos.filter((f) => f.h >= want).sort((a, b) => a.h - b.h)[0];
const pick = atLeast ?? videos.sort((a, b) => b.h - a.h)[0];
console.log(`Chọn: ${pick.label} ${pick.ext}`);

const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "video";
const name = opt("name", slug(info.title));
await mkdir(outDir, {recursive: true});
const dest = path.join(outDir, `${name}.mp4`);
const tmp = `${dest}.part`;
const res = await fetch(pick.url);
if (!res.ok || !res.body) { console.error(`Tải lỗi ${res.status}`); process.exit(1); }
try {
  await pipeline(Readable.fromWeb(res.body), createWriteStream(tmp));
  const probe = execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_type,width,height:format=duration,size", "-of", "json", tmp]).toString();
  const j = JSON.parse(probe);
  if (!j.streams?.some((s) => s.codec_type === "video")) throw new Error("File tải về không có luồng video");
  await rename(tmp, dest);
  const v = j.streams.find((s) => s.codec_type === "video");
  const got = Number(j.format.duration);
  if (info.duration && got < info.duration * 0.9) {
    console.warn(`CẢNH BÁO: file chỉ dài ${(got / 60).toFixed(1)} phút, video gốc ${(info.duration / 60).toFixed(1)} phút (API cắt ngắn?). Dùng được phần đã tải; cần đủ thì tải bằng cách dự phòng.`);
  }
  console.log(`Xong: ${dest} | ${v.width}x${v.height} | ${(Number(j.format.duration) / 60).toFixed(1)} phút | ${(Number(j.format.size) / 1e6).toFixed(1)}MB`);
} catch (e) {
  await rm(tmp, {force: true});
  console.error(String(e.message));
  process.exit(1);
}
