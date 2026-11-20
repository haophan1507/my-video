# Sản xuất: soát TTS, giọng, footage, render (bước 4–7)

Đường dẫn: `episodes/<thể-loại>/<mã>-slug/` (gọi tắt "thư mục tập") chứa `script/`, `audio/`, `out/`, `episode.json`. Mọi lệnh nhận mã ngắn `tc005`; script tự tìm thư mục. Chi tiết quy ước: `stories/README.md`.

Thiết lập đang dùng (tốc độ giọng, nhịp đổi cảnh, kiểu chữ, phụ đề) nằm ở `edit-yeu-cau.md` và thắng mọi số ở đây. Code trong `src/` và `scripts/` là chuẩn; file này chỉ ghi cách dùng.

## 1. Soát văn bản TTS (bước 4)

```bash
node scripts/normalize-vi.mjs tc005          # chỉ báo cáo
node scripts/normalize-vi.mjs tc005 --fix    # báo cáo + ghi đè tại chỗ
```

Mỗi chương chỉ có một file `chNN.tts.txt`, viết sẵn dạng máy đọc được. Script làm việc trực tiếp trên file đó. `--fix` đổi số, tiền, giờ, ngày, phần trăm thành chữ; mở viết tắt trong bảng `ABBR` đầu script (bổ sung khi gặp); bỏ emoji, markdown, gạch thoại. Chạy lại nhiều lần vẫn an toàn.

Xử lý tay mọi mục trong báo cáo, sửa thẳng ở `chNN.tts.txt` rồi chạy lại:
- Từ có `f j w z` hoặc viết hoa toàn bộ (pinyin, tên ngoại, viết tắt) → âm Hán Việt hoặc viết theo cách đọc.
- Câu trên 35 chữ → tách.
- Ngoặc `()` `[]` → bỏ hoặc viết thành câu.
- Chữ số còn sót.

Báo cáo cũng in số ký tự (tính giá TTS) và phút ước tính.

## 2. Giọng đọc (bước 5)

```bash
node scripts/gen-voice.mjs tc005 [--only 1,3] [--force] [--dry-run]
```

- Đọc `script/chNN.tts.txt`, ghi `audio/chNN.mp3` trong thư mục tập (ghi ra file tạm rồi đổi tên, nên file hỏng không bao giờ mang tên `.mp3`).
- Dịch vụ GenMax (`GENMAX_API_KEY` trong `.env`), mặc định provider `minimax`, model `speech-2.8-hd`, giọng `VOICE_ID` trong `.env`. Đổi bằng `--provider`, `--model`, `--voice`.
- **Cài đặt giọng nằm ở `voice` trong `episode.json`** (`provider`, `model`, `voiceId`, `language`, `speed`; mẫu ở `references/episode-mau.json`). Thứ tự ưu tiên: tham số dòng lệnh > `episode.json` > `VOICE_ID` trong `.env` > mặc định. Chưa đặt tốc độ thì script cảnh báo và dùng 1.0, nên chốt `voice.speed` trước khi gen.
- Mọi chương trong một tập dùng đúng một bộ cài đặt; tóm tắt vào `tap.md` cho người đọc. Script ghi chữ + cài đặt từng chương vào `audio/voice-meta.json`: chạy lại chỉ gen chương đã đổi chữ hoặc cài đặt (đỡ tốn credit); `--dry-run` liệt kê việc sẽ làm và số ký tự mà không gọi API; `--force` gen lại hết. Audio đã có mà chưa có meta (gen từ bản cũ) được giữ nguyên.
- Lỗi mạng, 429, 5xx được thử lại có chờ; riêng lệnh tạo tác vụ (tốn credit) chỉ thử lại khi chắc chưa tạo. Một chương quá 15 phút chưa xong thì dừng và báo, kiểm tra lịch sử trên GenMax trước khi gen lại.
- Gen chương 1, nghe duyệt, rồi mới gen cả tập.

**Chọn giọng mới**: gen cùng một đoạn 60 giây (có thoại, cảm xúc, số, vài tên Hán Việt như Phó Cảnh Thâm, Hoắc Đình) trên 2–3 lựa chọn, nghe ở tốc độ thật, chọn theo: tự nhiên → thanh điệu và tên đúng → giá. Kiểu giọng của thể loại: nữ, ấm, ngắt nghỉ có cảm xúc, đổi sắc thái khi vào vai. Lựa chọn khác GenMax: ElevenLabs (biểu cảm, có mốc thời gian từng chữ), FPT.AI / Viettel AI / Vbee (giọng Việt bản địa, rẻ), CapCut TTS (miễn phí). Giá và phiên bản đổi nhanh, kiểm tra lại trước khi chốt.

## 3. Câu chào kênh

`channel/intro.mp3` dùng chung mọi tập; `build-audio.mjs` tự đặt trước chương 1 (tắt bằng `"intro": false` trong `episode.json`). Đổi tên kênh hoặc giọng thì gen lại:

```bash
# sửa name hoặc introText trong channel/channel.json rồi (tự viết intro.tts.txt, ra channel/intro.mp3; tốc độ lấy từ voice.speed trong channel.json):
node scripts/gen-voice.mjs channel
```

Mọi chữ và màu cố định của kênh nằm ở `channel/channel.json`, không sửa trong code: `name`; `introText` (câu chào, dùng `{name}`); `introLabel` (dòng nhỏ trên thẻ chào, `""` = ẩn); `partLabel` (nhãn góc bản TikTok, dùng `{n}` `{total}`); `chapterLabel` (tên chương mặc định, `{n}`); `accent` (màu nhấn); `voice.speed`. Đổi nhãn hoặc màu thì Studio và render theo ngay. Đổi `name` hoặc `introText` thì gen lại câu chào rồi `build-audio` lại từng tập. Font vẫn cố định (Be Vietnam Pro, `src/ui.tsx`).

## 4. Footage (bước 6)

**Chọn chủ đề** theo `edit-yeu-cau.md` (kiểu hình dùng và không dùng). Chọn một chủ đề cho cả tập:

1. Nấu ăn cận cảnh
2. Làm bánh
3. Trang trí đồ ngọt
4. Pha chế đồ uống màu
5. Đồ thủ công pastel
6. Làm gốm
7. Vẽ tranh, tô màu, tô số hóa
8. Ambience đêm
9. Làm nail
10. Ghép hình cận cảnh, dán sticker DIY cận cảnh

**Một tập, một chủ đề, một tag**: mỗi tập chỉ dùng footage của đúng một chủ đề ở danh sách trên. Mỗi chủ đề có một tag, dùng làm tên thư mục, tiền tố tên file và `footageTag` trong `episode.json`; clip khác chủ đề không đưa vào tag đó.

**Cấu trúc thư mục** (dùng chung mọi tập, không nằm trong thư mục tập):

```
public/footage/
  manifest.json        # do script sinh: {tag, src, sec, width, height} từng clip
  cook/
    cook-01.mp4        # clip đã chuẩn hóa
    cook-02.mp4
    sources.txt        # nguồn, giấy phép, ngày tải, cách crop từng clip (có trong git)
  pottery/
    ...
```

Kiểm kho: `node scripts/footage-manifest.mjs` quét lại mọi thư mục tag, ghi manifest và in bảng số clip, tổng phút, số clip dọc/ngang/vuông theo từng tag. File `.mp4` và `manifest.json` không vào git (tải lại theo `sources.txt`).

| Chủ đề | Tag |
|---|---|
| Nấu ăn cận cảnh | `cook` |
| Làm bánh | `bake` |
| Trang trí đồ ngọt | `dessert` |
| Pha chế đồ uống màu | `drink` |
| Đồ thủ công pastel | `craft` |
| Làm gốm | `pottery` |
| Vẽ tranh, tô màu, tô số hóa | `paint` |
| Ambience đêm | `night` |
| Làm nail | `nail` |
| Ghép hình, dán sticker DIY | `puzzle` |

Quan sát 2026-11-19: nhiều kênh hiệu suất cao ghi kiểu footage ngay trong tiêu đề, phổ biến nhất là **tô màu, vẽ tranh, nấu ăn**: cận cảnh tay làm việc chậm, đều, không lộ mặt, quay được hàng giờ. Giữ một chủ đề cho nhiều tập liền để kênh có nhận diện.

**Độ dài và lượng**: mỗi clip nguồn **từ 5 phút trở lên** (ưu tiên 30 phút–1 giờ), vì Pexels, Pixabay và các kho clip ngắn tương tự gần như toàn video vài giây đến vài chục giây, không đủ nền cho tập 35–60 phút mà ít lặp. Clip dài thì cần ít clip hơn: tối thiểu 4 clip, tập 45–60 phút nên 6–10 clip (ước đoán). `FootageTrack` bắt đầu mỗi cảnh ở một điểm ngẫu nhiên trong clip nên clip càng dài càng ít lặp. **Hướng clip**: `prep-footage` giữ tỉ lệ gốc; Remotion khớp clip vào từng khung (phủ kín nếu cắt ≤ 20% diện tích, ngược lại hiện trọn với viền đen). Clip ngang 16:9 phủ kín bản YouTube; ở bản TikTok dọc nó hiện thành dải ngang giữa khung. Clip dọc phủ kín bản TikTok; ở bản YouTube có viền đen hai bên. Tag dùng cho cả hai bản nên có cả hai hướng; chọn cảnh có tay hoặc vật chính nằm giữa khung.

**Tìm clip dài, đa dạng nguồn**: không dựa vào một hai kho. Tiêu chí chung: giấy phép cho phép dùng thương mại và đăng lại mà không cần xin phép từng clip, không dán logo hay chữ lên hình, không có người nổi tiếng hay tác phẩm của người khác lồng trong hình. Ghi nguồn và giấy phép từng clip vào `public/footage/<tag>/sources.txt`.

| Nhóm nguồn | Ví dụ (ứng viên, chưa kiểm giấy phép hiện hành: đọc lại điều khoản trước khi tải) | Ghi chú |
|---|---|---|
| Kho clip miễn phí | Pexels, Pixabay, Mixkit, Coverr, Videvo, Vecteezy, Videezy | Phần lớn clip ngắn; chỉ lấy những clip đủ 5 phút. Mỗi kho có điều khoản riêng (một số cần ghi nguồn hoặc đăng nhập, một số chặn tải tự động) |
| Kho lưu trữ công khai | Internet Archive, Wikimedia Commons | Có video dài; giấy phép khác nhau theo từng mục (công cộng, CC0, CC-BY...), đọc kỹ từng mục |
| Kho trả phí (theo gói) | Storyblocks, Envato Elements, Artgrid và tương tự | Có clip dài, chất lượng cao; giấy phép theo gói đăng ký |
| Tự quay | Quay tay làm gốm, tô màu, làm nail, ghép hình... bằng điện thoại, giá đỡ | Bản quyền của chính mình, chủ đề và độ dài tùy ý |
| Do AI tạo | Clip tạo bằng công cụ video AI, nối lại thành đoạn dài | Kiểm điều khoản thương mại của công cụ; thường ngắn nên phải ghép |
| Đặt làm | Thuê người làm thủ công quay theo kịch bản | Thỏa thuận quyền sử dụng bằng văn bản |

**Từ khóa tìm clip dài**: ghép chủ đề với `asmr`, `long`, `1 hour` (ví dụ: `pottery asmr 1 hour`, `cake decorating long`, `nail art asmr long`, `paint by number asmr long`, `night ambience 1 hour`), và biến thể `relaxing`, `no talking`, `no music`, `satisfying`, `full process`, `timelapse`. Danh sách từ khóa theo chủ đề ở `edit-yeu-cau.md`.

**Tải clip tự động bằng Claude in Chrome** (cập nhật 2026-11-19): clip dài thường nằm trên YouTube, TikTok hoặc nền tảng khác, không có nút tải. Claude thao tác trong Chrome qua Claude in Chrome (công cụ `mcp__claude-in-chrome__*`, đọc skill `chrome-browser` trước, nạp công cụ một lần bằng ToolSearch), mở tab mới để làm, không đụng tab đang có.

| Nguồn clip | Trang tải | Cách làm |
|---|---|---|
| YouTube | https://ytsave.to/en2/ | Dán link video vào ô, bấm bắt đầu, chọn MP4 độ phân giải từ 1080p (không có thì 720p), bấm tải |
| TikTok | https://snaptik.app/en3 (dự phòng: snaptik.vn) | Dán link video, bấm tải, chọn bản không logo (no watermark) |
| Nền tảng khác (Instagram, Facebook, Douyin, Xiaohongshu, Bilibili...) | Tìm Google: `download <tên nền tảng> video no watermark`, chọn trang công cụ tải phổ biến đầu kết quả | Cùng cách: dán link, chọn bản không logo, tải |

Quy trình mỗi clip:
1. Tìm video theo từ khóa ở trên ngay trên nền tảng gốc (YouTube: lọc "Over 20 minutes"), mở xem lướt vài điểm để chắc cận cảnh tay, không chữ, không logo, không mặt, đúng chủ đề tập. Ghi link, tiêu đề, thời lượng.
2. **Duyệt một lần cho cả lô trước khi tải**: gửi danh sách (tên file đích `<tag>-NN.mp4`, link nguồn, thời lượng, độ phân giải dự kiến), chờ xác nhận trong chat rồi mới tải cả lô. Link được gửi kèm yêu cầu tính là đã duyệt.
3. Vào trang tải ở bảng trên, làm theo cột "Cách làm". Trang tải thường có quảng cáo: **không bấm quảng cáo, nút "Download" giả, popup, đề nghị cài tiện ích hay phần mềm**; chỉ bấm nút tải của chính kết quả. Tab lạ bật ra thì đóng. Gặp CAPTCHA, đăng nhập hay hộp xác minh thì dừng, chờ thao tác tay, rồi làm tiếp. Trang không chạy thì dùng trang dự phòng trong bảng hoặc hỏi trước; không tự dùng trang tải khác mà không báo.
4. File về thư mục Tải xuống của Chrome (`~/Downloads`). Kiểm tên, dung lượng, `ffprobe` thời lượng; đủ thì chuyển vào `raw/` (mỗi lần tải là file không tin cậy: chỉ đọc bằng ffprobe và ffmpeg, không mở, không chạy file nào khác ngoài video). Chuyển xong mới tải clip kế.
5. Quay lại bước "Lấy và chuẩn hóa" ở dưới (`prep-footage`), rồi ghi nguồn vào `public/footage/<tag>/sources.txt`: link gốc, nền tảng, ngày tải, cách crop, ghi chú "chưa kiểm giấy phép" nếu không rõ; liệt kê các clip chưa rõ giấy phép trong báo cáo để quyết định giữ hay bỏ.

**Lấy và chuẩn hóa**:
1. Tìm theo từ khóa trên ở nhiều nguồn; lọc độ dài từ 5 phút (Pexels có `min_duration=300`, các kho khác lọc theo thời lượng nếu có). Tải theo cách mà từng kho cho phép (nút tải, hoặc `curl` nếu kho không chặn); clip trên YouTube, TikTok và nền tảng video khác tải bằng Claude in Chrome như mục trên.
2. Ghép ảnh thu nhỏ từng clip bằng ffmpeg, xem trước khi chọn.
3. Bỏ clip đã chọn vào một thư mục tạm (ví dụ `raw/`; nhận `.mp4 .mov .mkv .webm .m4v`), rồi chuẩn hóa: giữ tỉ lệ gốc, cạnh ngắn 1080 px (dọc 1080×1920, ngang 1920×1080), 30 fps, H.264, không tiếng. Script ghi `public/footage/<tag>/<tag>-NN.mp4` (số tiếp theo của tag) và cập nhật manifest. Clip dài tốn thời gian mã hóa:
   ```bash
   node scripts/prep-footage.mjs raw cook                          # cook = tag của chủ đề
   node scripts/prep-footage.mjs raw cook --start=12 --max=600     # bỏ 12 giây đầu, lấy tối đa 600 giây
   node scripts/prep-footage.mjs raw cook --crop=top               # bỏ 28% dải dưới (watermark, chữ ở đáy)
   node scripts/prep-footage.mjs raw cook --crop=square            # ô vuông giữa khung, bỏ logo hai bên và dải dưới
   ```
   `--max` mặc định 900 giây (15 phút) để file không quá nặng. Mọi clip trong thư mục dùng chung `--start` và `--crop`; clip cần mốc hoặc crop khác nhau thì chạy từng clip một.
4. Ghi nguồn và giấy phép từng clip vào `public/footage/<tag>/sources.txt` (`cook-01.mp4 <- internet-archive <id> | CC0 | crop top`), ghi tag vào `tap.md`.
5. Xóa clip ứng viên không dùng và file tạm; mỗi thư mục tag chỉ giữ clip đang dùng. Xóa hoặc đổi tên clip thì chạy lại `node scripts/footage-manifest.mjs`.

## 5. Dựng và render (bước 7)

**Dữ liệu tập**: chép `references/episode-mau.json` (hoặc `episode.json` của tập gần nhất) vào thư mục tập mới rồi sửa. Thiếu hoặc sai trường thì Studio và `render-episode` báo lỗi tiếng Việt từng dòng (`src/validate.ts`).

| Trường | Ý nghĩa |
|---|---|
| `title` | Chữ thẻ hook 3 giây đầu bản YouTube |
| `voice` | Cài đặt giọng của tập cho `gen-voice` (mục 2); Remotion không dùng |
| `episodeLabel` | Nhãn góc trên trái và thẻ chào; `build-audio` tự điền từ `channel/channel.json`, không sửa tay |
| `audioSrc` | `<mã>/audio.mp3` (do `build-audio` điền) |
| `captionsSrc` | `""` = tắt phụ đề; `<mã>/captions.json` khi bật |
| `footageTag`, `cutEverySec`, `dim` | Tag footage, giây mỗi cảnh, độ tối nền (giá trị trong `edit-yeu-cau.md`) |
| `chapters[].title` | Tên chương (thành timestamp YouTube). `startSec` do script điền |
| `parts[]` | `{"chapters": [đầu, cuối], "hook": "chữ hook phần"}` theo bảng chia phần trong `outline.md` |
| `thumbText`, `thumbBg`, `thumbFocus`, `thumbTag`, `thumbAlt` | Ảnh bìa: chữ hook (`|` ngắt dòng, `*cụm*` tô màu nhấn), ảnh nhân vật `<mã>/thumb-bg.jpg` (tạo bằng `prep-thumb`), khung ảnh, nhãn phụ, các phương án A/B. Quy tắc ở `dang-bai.md` mục 2 |
| `introSec` | Do `build-audio` điền |

**Chạy**:
```bash
node scripts/build-audio.mjs tc005       # ghép intro + chương, điền startSec, ghi out/chapters.txt
node scripts/prep-thumb.mjs tc005 raw/anh.jpg   # ảnh nhân vật cho bìa -> public/tc005/thumb-bg.jpg (dang-bai.md mục 2)
npx remotion studio src/index.ts         # xem trước Episode (ngang) / Clip (dọc) / Thumbnail
node scripts/render-episode.mjs tc005     # youtube.mp4, tiktok-NN.mp4, thumb.png (thêm --only=, --parts=1,3)
```

| Đầu ra | Composition | Khung |
|---|---|---|
| `out/youtube.mp4` | `Episode` | Ngang 1920×1080; câu chào, thẻ hook, nhãn tên kênh |
| `out/tiktok-NN.mp4` | `Clip` | Dọc 1080×1920; thẻ hook phần, nhãn "Phần n/N"; không câu chào |
| `out/tiktok-NN-cover.png` | `TikTokCover` | 1080×1920; bìa phần (`--only=cover` để render riêng) |
| `out/thumb.png` (+ `thumb-2.png`... từ `thumbAlt`) | `Thumbnail` | 1280×720 |

Thử nhanh một đoạn: `npx remotion render src/index.ts Episode .tmp/test.mp4 --props=episodes/<thể-loại>/<mã>-<slug>/episode.json --frames=0-300 --scale=0.5`.

**Kiểm tra trước khi báo xong**: xem lướt đầu (câu chào, thẻ hook), một chỗ chuyển chương, đoạn cuối; thời lượng khớp tổng audio; mỗi `tiktok-NN.mp4` bắt đầu đúng đầu chương. Xem một khung bất kỳ không cần mở video: `ffmpeg -ss 00:00:05 -i out/youtube.mp4 -frames:v 1 .tmp/khung.png` (hoặc `npx remotion still src/index.ts Episode .tmp/khung.png --frame=150 --props=...`). Ghi `--overwrite` nếu file đã có, để không xem nhầm ảnh cũ.

**Thời gian render**: bản YouTube và các phần TikTok khác khung nên render riêng; tổng thời gian cỡ gấp đôi một bản (ước tính, chưa đo với tập 45 phút). Render lại vài phần: `--parts=1,3`. Không cắt phần TikTok từ `youtube.mp4` (khác hướng khung; tùy chọn `--cut` cũ đã bỏ).

**Bật lại phụ đề**: repo không còn công cụ phiên âm (đã gỡ whisper 2026-11-19). Chỉ còn bản tạm, mốc chia theo số ký tự nên sẽ lệch so với giọng thật:
```bash
node scripts/rough-captions.mjs tc005     # chữ lấy từ chNN.tts.txt -> public/tc005/captions.json
```
Rồi đặt `captionsSrc` thành `<mã>/captions.json`. Khớp từng chữ cần một nguồn mốc thời gian khác (ví dụ dịch vụ giọng trả mốc từng chữ); thêm công cụ mới cần duyệt trước.

**Vùng an toàn** (`PORTRAIT`, `LANDSCAPE` trong `src/ui.tsx`, chọn tự động theo hướng khung):

| Khung | Trên | Dưới | Trái | Phải |
|---|---|---|---|---|
| Dọc 1080×1920 (TikTok) | 220 | 520 | 80 | 160 |
| Ngang 1920×1080 (YouTube) | 70 | 120 | 100 | 100 |

| Lỗi | Cách xử lý |
|---|---|
| "Không có footage cho tag" | Kiểm `public/footage/<footageTag>/` có clip; chạy `node scripts/footage-manifest.mjs` |
| Clip nằm thẳng trong `public/footage/` bị bỏ qua | Chuyển vào thư mục tag rồi chạy lại `footage-manifest.mjs` |
| Viền đen ở bản YouTube | Đúng thiết kế khi clip dọc hoặc vuông; muốn phủ kín thì thêm clip ngang vào tag |
| Phần TikTok lệch chương | Chạy lại `build-audio.mjs` (startSec còn 0) |
| Video dài/ngắn sai | Kiểm tra `public/<mã>/audio.mp3`, xem lỗi `calculateMetadata` trong Studio |
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
