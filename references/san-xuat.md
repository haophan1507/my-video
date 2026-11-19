# Sản xuất: chuẩn hóa, giọng, footage, render (bước 4–7)

Đường dẫn: `episodes/epNNN-slug/` (gọi tắt "thư mục tập") chứa `script/`, `audio/`, `out/`, `episode.json`. Mọi lệnh nhận mã ngắn `ep001`; script tự tìm thư mục. Chi tiết quy ước: `stories/README.md`.

Thiết lập đang dùng (tốc độ giọng, nhịp đổi cảnh, kiểu chữ, phụ đề) nằm ở `edit-yeu-cau.md` và thắng mọi số ở đây. Code trong `src/` và `scripts/` là chuẩn; file này chỉ ghi cách dùng.

## 1. Chuẩn hóa văn bản (bước 4)

```bash
node scripts/normalize-vi.mjs ep001
```

Script ghi `chNN.tts.txt`: đổi số, tiền, giờ, ngày, phần trăm thành chữ; mở viết tắt trong bảng `ABBR` đầu script (bổ sung khi gặp); bỏ emoji, markdown, gạch thoại.

Xử lý tay mọi mục trong báo cáo, sửa ở `chNN.txt` rồi chạy lại:
- Từ có `f j w z` hoặc viết hoa toàn bộ (pinyin, tên ngoại, viết tắt) → âm Hán Việt hoặc viết theo cách đọc.
- Câu trên 35 chữ → tách.
- Ngoặc `()` `[]` → bỏ hoặc viết thành câu.
- Chữ số còn sót.

Báo cáo cũng in số ký tự (tính giá TTS) và phút ước tính.

## 2. Giọng đọc (bước 5)

```bash
node scripts/gen-voice.mjs ep001 [--only 1,3] [--force] [--dry-run]
```

- Đọc `script/chNN.tts.txt`, ghi `audio/chNN.mp3` trong thư mục tập (ghi ra file tạm rồi đổi tên, nên file hỏng không bao giờ mang tên `.mp3`).
- Dịch vụ GenMax (`GENMAX_API_KEY` trong `.env`), mặc định provider `minimax`, model `speech-2.8-hd`, giọng `VOICE_ID` trong `.env`. Đổi bằng `--provider`, `--model`, `--voice`.
- **Cài đặt giọng nằm ở `voice` trong `episode.json`** (`provider`, `model`, `voiceId`, `language`, `speed`; mẫu ở `references/episode-mau.json`). Thứ tự ưu tiên: tham số dòng lệnh > `episode.json` > `VOICE_ID` trong `.env` > mặc định. Chưa đặt tốc độ thì script cảnh báo và dùng 1.0, nên chốt `voice.speed` trước khi gen.
- Mọi chương trong một tập dùng đúng một bộ cài đặt; tóm tắt vào `tap.md` cho người đọc. Script ghi chữ + cài đặt từng chương vào `audio/voice-meta.json`: chạy lại chỉ gen chương đã đổi chữ hoặc cài đặt (đỡ tốn credit); `--dry-run` liệt kê việc sẽ làm và số ký tự mà không gọi API; `--force` gen lại hết. Audio đã có mà chưa có meta (gen từ bản cũ) được giữ nguyên.
- Lỗi mạng, 429, 5xx được thử lại có chờ; riêng lệnh tạo tác vụ (tốn credit) chỉ thử lại khi chắc chưa tạo. Một chương quá 15 phút chưa xong thì dừng và báo, kiểm tra lịch sử trên GenMax trước khi gen lại.
- Gen chương 1, cho người dùng nghe, rồi mới gen cả tập.

**Chọn giọng mới**: gen cùng một đoạn 60 giây (có thoại, cảm xúc, số, vài tên Hán Việt như Phó Cảnh Thâm, Hoắc Đình) trên 2–3 lựa chọn, nghe ở tốc độ thật, chọn theo: tự nhiên → thanh điệu và tên đúng → giá. Kiểu giọng của thể loại: nữ, ấm, ngắt nghỉ có cảm xúc, đổi sắc thái khi vào vai. Lựa chọn khác GenMax: ElevenLabs (biểu cảm, có mốc thời gian từng chữ), FPT.AI / Viettel AI / Vbee (giọng Việt bản địa, rẻ), CapCut TTS (miễn phí). Giá và phiên bản đổi nhanh, kiểm tra lại trước khi chốt.

## 3. Câu chào kênh

`channel/intro.mp3` dùng chung mọi tập; `build-audio.mjs` tự đặt trước chương 1 (tắt bằng `"intro": false` trong `episode.json`). Đổi tên kênh hoặc giọng thì gen lại:

```bash
# sửa name hoặc introText trong channel/channel.json rồi (tự viết intro.tts.txt, ra channel/intro.mp3; tốc độ lấy từ voice.speed trong channel.json):
node scripts/gen-voice.mjs channel
```

Mọi chữ và màu cố định của kênh nằm ở `channel/channel.json`, không sửa trong code: `name`; `introText` (câu chào, dùng `{name}`); `introLabel` (dòng nhỏ trên thẻ chào, `""` = ẩn); `partLabel` (nhãn góc bản TikTok, dùng `{n}` `{total}`); `chapterLabel` (tên chương mặc định, `{n}`); `accent` (màu nhấn); `voice.speed`. Đổi nhãn hoặc màu thì Studio và render theo ngay. Đổi `name` hoặc `introText` thì gen lại câu chào rồi `build-audio` lại từng tập. Font vẫn cố định (Be Vietnam Pro, `src/ui.tsx`).

## 4. Footage (bước 6)

**Chọn chủ đề** theo `edit-yeu-cau.md` (kiểu đang dùng, kiểu bị chê) và thể loại:

| Thể loại | Footage gợi ý |
|---|---|
| Hôn nhân, gia đình | Nấu ăn cận cảnh, làm bánh, trang trí đồ ngọt |
| Bạn thân phản bội, hào môn | Skincare, pha chế đồ uống màu, đồ thủ công pastel |
| Trả thù, vả mặt, hài | Satisfying màu sặc sỡ: cắt xà phòng, slime, kinetic sand |
| Linh dị, kinh dị | Vẽ tranh tông tối, ambience đêm |

Quan sát 2026-11-19: nhiều kênh hiệu suất cao ghi kiểu footage ngay trong tiêu đề, phổ biến nhất là **tô màu, vẽ tranh, nấu ăn**: cận cảnh tay làm việc chậm, đều, không lộ mặt, quay được hàng giờ. Giữ một chủ đề cho nhiều tập liền để kênh có nhận diện.

**Lượng**: clip từ 30 giây trở lên, khung dọc. Tối thiểu 8 clip (lần thử đầu dùng 8); tập 45–60 phút nên 15–20 clip để ít lặp (ước đoán).

**Lấy và chuẩn hóa**:
1. Tìm trên Pexels với `orientation=portrait&min_duration=30` (từ khóa ở `edit-yeu-cau.md`); tải bằng `curl` từ `pexels.com/download/video/<id>/`. Pixabay dọc phần lớn chỉ 5–20 giây.
2. Ghép ảnh thu nhỏ từng clip bằng ffmpeg, xem trước khi chọn.
3. Bỏ clip đã chọn vào một thư mục tạm (ví dụ `raw/`), rồi chuẩn hóa về 1080×1920, 30 fps, H.264, không tiếng, tên `<tag>-NN.mp4`; script cũng cập nhật manifest:
   ```bash
   node scripts/prep-footage.mjs raw craft
   ```
4. Ghi nguồn từng clip vào `footage-sources.txt` trong thư mục tập (`craft-01.mp4 <- pexels 6109052`), ghi tag vào `tap.md`.
5. Xóa clip ứng viên không dùng và file tạm; `public/footage/` chỉ giữ clip đang dùng.

## 5. Dựng và render (bước 7)

**Dữ liệu tập**: chép `references/episode-mau.json` (hoặc `episode.json` của tập gần nhất) vào thư mục tập mới rồi sửa. Thiếu hoặc sai trường thì Studio và `render-episode` báo lỗi tiếng Việt từng dòng (`src/validate.ts`).

| Trường | Ý nghĩa |
|---|---|
| `title` | Chữ thẻ hook 3 giây đầu bản YouTube |
| `voice` | Cài đặt giọng của tập cho `gen-voice` (mục 2); Remotion không dùng |
| `episodeLabel` | Nhãn góc trên trái và thẻ chào; `build-audio` tự điền từ `channel/channel.json`, không sửa tay |
| `audioSrc` | `epNNN/audio.mp3` (do `build-audio` điền) |
| `captionsSrc` | `""` = tắt phụ đề; `epNNN/captions.json` khi bật |
| `footageTag`, `cutEverySec`, `dim` | Tag footage, giây mỗi cảnh, độ tối nền (giá trị trong `edit-yeu-cau.md`) |
| `chapters[].title` | Tên chương (thành timestamp YouTube). `startSec` do script điền |
| `parts[]` | `{"chapters": [đầu, cuối], "hook": "chữ hook phần"}` theo bảng chia phần trong `outline.md` |
| `thumbText`, `thumbBg` | Chữ ảnh bìa (4–8 từ, `dang-bai.md` mục 2) và ảnh nền `epNNN/thumb-bg.jpg` (`build-audio` điền sẵn đường dẫn) |
| `introSec` | Do `build-audio` điền |

**Chạy**:
```bash
node scripts/build-audio.mjs ep001       # ghép intro + chương, điền startSec, ghi out/chapters.txt
ffmpeg -ss 12 -i public/footage/<tag>-03.mp4 -frames:v 1 public/ep001/thumb-bg.jpg   # nền ảnh bìa
npx remotion studio src/index.ts         # xem trước Episode / Clip / Thumbnail
node scripts/render-episode.mjs ep001     # youtube.mp4, tiktok-NN.mp4, thumb.png (thêm --only=, --parts=1,3, --cut: xem "Render chậm")
```

Thử nhanh một đoạn: `npx remotion render src/index.ts Episode .tmp/test.mp4 --props=episodes/ep001-<slug>/episode.json --frames=0-300 --scale=0.5`.

**Kiểm tra trước khi báo xong**: xem lướt đầu (câu chào, thẻ hook), một chỗ chuyển chương, đoạn cuối; thời lượng khớp tổng audio; mỗi `tiktok-NN.mp4` bắt đầu đúng đầu chương. Xem một khung bất kỳ không cần mở video: `ffmpeg -ss 00:00:05 -i out/youtube.mp4 -frames:v 1 .tmp/khung.png` (hoặc `npx remotion still src/index.ts Episode .tmp/khung.png --frame=150 --props=...`). Ghi `--overwrite` nếu file đã có, để không xem nhầm ảnh cũ.

**Render chậm**: mặc định mọi phần TikTok đều render bằng `Clip` (đủ thẻ hook và nhãn "Phần n/N"), nên tổng thời gian cỡ gấp đôi bản YouTube (ước tính từ tập thử, chưa đo với footage thật 45 phút). Muốn nhanh: `--parts=1,3` chỉ render vài phần; `--cut` giữ Phần 1 render bằng `Clip`, còn phần 2 trở đi cắt thẳng từ `out/youtube.mp4` bằng ffmpeg (cần render YouTube trước), nhanh hơn nhiều nhưng **không có thẻ hook và nhãn phần**. Cắt tay một phần (mốc trong `out/chapters.txt`; `--cut` làm đúng việc này):
```bash
ffmpeg -ss 00:09:41 -to 00:19:05 -i out/youtube.mp4 -c:v libx264 -crf 20 -c:a aac out/tiktok-02.mp4
```

**Bật lại phụ đề**: repo không còn công cụ phiên âm (đã gỡ whisper 2026-11-19). Chỉ còn bản tạm, mốc chia theo số ký tự nên sẽ lệch so với giọng thật:
```bash
node scripts/rough-captions.mjs ep001     # chữ lấy từ chNN.tts.txt -> public/ep001/captions.json
```
Rồi đặt `captionsSrc` thành `epNNN/captions.json`. Muốn khớp từng chữ cần một nguồn mốc thời gian khác (ví dụ dịch vụ giọng trả mốc từng chữ); hỏi người dùng trước khi thêm công cụ.

**Vùng an toàn** (khung 1080×1920, dùng chung TikTok và YouTube): chừa trên ~220 px, dưới ~520 px, phải ~160 px, trái ~80 px. Hằng số `SAFE` ở `src/ui.tsx`.

| Lỗi | Cách xử lý |
|---|---|
| "Không có footage cho tag" | Sửa `footageTag` cho khớp tiền tố file, chạy `footage-manifest.mjs` |
| Phần TikTok lệch chương | Chạy lại `build-audio.mjs` (startSec còn 0) |
| Video dài/ngắn sai | Kiểm tra `public/epNNN/audio.mp3`, xem lỗi `calculateMetadata` trong Studio |
| Hình giật | Footage chưa chuẩn hóa `fps=30` |
| Mất dấu tiếng Việt | Font thiếu subset `vietnamese` |
| Lỗi phiên bản gói | `npx remotion versions`, cài mọi `@remotion/*` cùng phiên bản |
| Tràn RAM | Giảm `concurrency` trong `render-episode.mjs` |
| "episode.json chưa hợp lệ" | Làm theo từng dòng báo lỗi; thiếu `startSec` hoặc `audioSrc` thì chạy `build-audio.mjs` |
| `channel.json thiếu hoặc sai kiểu` | Điền đủ khóa theo mục 3 (`name`, `introText`, `introLabel`, `partLabel`, `chapterLabel`, `accent`) |

## 6. Quy tắc code và chuyển động Remotion

Dùng khi sửa `src/` (nguồn: skill Remotion chính thức `remotion-dev/skills`, đối chiếu 2026-11-19, Remotion 4.0.545; và vài quy tắc thẩm mỹ từ skill `claude-motion`, là ý kiến của tác giả skill):

- Mọi thứ là hàm của `frame`. **Không** CSS transition, CSS animation, `Math.random()`, `Date`: Remotion render từng khung nên chúng đứng hình hoặc lệch. Cần ngẫu nhiên thì `random(seed)` của Remotion.
- Media dùng `<Video>`, `<Audio>` của `@remotion/media`; cắt bằng prop `trimBefore`, `durationInFrames`, `from`. Font dùng `loadFont` của `@remotion/google-fonts` ở đầu module. Đo thời lượng bằng mediabunny. Hiện `src/` đã đúng các điểm này.
- Chuyển cảnh footage đang tự viết bằng `opacity`. Bản chính thức là `TransitionSeries` + `fade()` (`@remotion/transitions`): chuyển cảnh chồng lên nhau nên tổng thời lượng = tổng cảnh trừ tổng thời gian chuyển. Chỉ đổi khi cần thêm kiểu chuyển cảnh khác; cách hiện tại chạy tốt.
- Easing: chữ **vào** dùng ease-out (`Easing.bezier(0.16, 1, 0.3, 1)`), **ra** dùng ease-in (`Easing.bezier(0.6, 0, 0.9, 0.35)`), ra nhanh bằng ~một nửa lúc vào (vào ~0,7 giây, ra ~0,4 giây). Không dùng linear cho chuyển động chữ.
- Thời gian giữ chữ: cụm ngắn ≥ 1 giây, cộng ~0,25 giây cho mỗi từ từ thứ tư; thẻ hook ≥ 2 giây (đang 3 giây).
- Không di chuyển chữ khi người xem đang đọc; một điểm nhấn mỗi khung; tối đa 3 họ font; chữ cách mép khung ≥ 60 px (vùng an toàn của dự án ở mục 5 chặt hơn, giữ theo mục 5).
- Skill chính thức cho Claude Code: có thể cài thêm `npx skills add remotion-dev/skills` (chọn `remotion-best-practices`; tên skill có thể đổi theo phiên bản). Không bắt buộc.

## 7. Chi phí

Mỗi tập = giá TTS theo số ký tự (45 phút ≈ 35.000–40.000 ký tự; lần thử đầu tốn ~3.200 credit GenMax cho 700 chữ) + footage (Pexels miễn phí) + thời gian render (45 phút ≈ 81.000 frame). Giữ kịch bản, audio từng chương và `episode.json` của tập để dựng lại hoặc đổi footage nhanh.
