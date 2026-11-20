# Kênh audio truyện tiếng Việt

Dự án làm **video audio truyện**: giọng đọc AI kể truyện trên nền footage dễ xem, dựng tự động bằng [Remotion](https://www.remotion.dev). Mỗi truyện thành một video YouTube dài 35–60 phút **khung ngang 1920×1080**, và nhiều phần TikTok **khung dọc 1080×1920** (mỗi phần 1–2 chương, render riêng từ cùng audio).

Quy trình làm việc cùng Claude Code: bạn nói truyện nào, Claude đọc hướng dẫn trong repo, báo tiến độ và làm từng bước.

## Cần cài

| Công cụ | Ghi chú |
|---|---|
| Node.js 22.18 trở lên | Script dùng `loadEnvFile` và nạp thẳng file `.ts` (đã kiểm trên Node 24) |
| ffmpeg (kèm ffprobe) | Ghép audio, chuẩn hóa footage |
| Git | |
| [Claude Code](https://claude.com/claude-code) | Để làm việc theo quy trình |
| Tài khoản [GenMax](https://genmax.io) | Gen giọng đọc, cần API key |

**macOS** (Homebrew):
```bash
brew install node ffmpeg git
```

**Windows** (PowerShell, `winget` có sẵn trên Windows 10/11):
```powershell
winget install OpenJS.NodeJS.LTS
winget install Gyan.FFmpeg
winget install Git.Git
```
Đóng và mở lại PowerShell sau khi cài, rồi kiểm tra: `node -v`, `ffmpeg -version`, `ffprobe -version`.

## Cài dự án

```bash
git clone <địa chỉ repo> my-video
cd my-video
npm install
```

Tạo file khóa (không bao giờ đưa `.env` lên git):

```bash
# macOS
cp .env.example .env
```
```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

Mở `.env` và điền:
- `GENMAX_API_KEY`: key của GenMax (bắt buộc để gen giọng).
- `VOICE_ID`: ID giọng đọc trên GenMax. Giá trị trong `.env.example` chỉ là giọng mẫu; thay bằng giọng bạn chọn.

Tùy chọn: cài skill Remotion chính thức để Claude viết code `src/` đúng chuẩn hơn: `npx skills add remotion-dev/skills` (chọn `remotion-best-practices`).

Kiểm tra cài đặt: `npm run typecheck` (không báo lỗi là ổn), `npm run studio` (mở được Remotion Studio).

Tên kênh, câu chào, nhãn và màu nhấn nằm ở `channel/channel.json`; sửa file đó để đổi thương hiệu.

## Bắt đầu làm video

1. Mở thư mục dự án bằng Claude Code (`claude` trong terminal, hoặc app desktop).
2. Nói với Claude một trong các câu:
   - **"Làm truyện số 3"**: mở tập mới từ truyện nguồn `tc005` trong kho.
   - **"Tiếp tục tập tc005"**: làm tiếp tập đang dở.
   - **"Tập này còn thiếu gì?"**: báo tiến độ.
3. Claude đọc hồ sơ, báo cáo ngắn (đang ở bước mấy, cần bạn quyết gì), rồi làm từng bước. Bạn chỉ cần duyệt các điểm được hỏi: dàn ý, chương 1, giọng đọc, footage, tiêu đề.

Kho truyện nguồn có sẵn ở `stories/` (xem bảng trong [stories/README.md](stories/README.md)). Muốn thêm truyện: bỏ file `<mã>-ten-truyen.md` vào thư mục thể loại trong đó và thêm một dòng vào bảng.

## 8 bước của một tập

| # | Bước | Kết quả |
|---|---|---|
| 1 | Chọn truyện | Quyết định trong `tap.md` |
| 2 | Dàn ý 8–12 chương | `outline.md` |
| 3 | Viết chương | `script/chNN.tts.txt` |
| 4 | Soát văn bản cho TTS | báo cáo `normalize-vi.mjs` |
| 5 | Gen giọng | `audio/chNN.mp3` |
| 6 | Footage | `public/footage/` |
| 7 | Dựng, render | `out/youtube.mp4`, `tiktok-NN.mp4`, `thumb.png` |
| 8 | Đóng gói, đăng | Tiêu đề, mô tả, caption |

Chi tiết từng bước: [SKILL.md](SKILL.md) và thư mục `references/`.

## Lệnh chính

Chạy ở thư mục gốc, `tc005` là mã tập. Cú pháp giống nhau trên macOS và Windows.

```bash
node scripts/normalize-vi.mjs tc005        # 4: soát văn bản (--fix: tự sửa tại chỗ)
node scripts/gen-voice.mjs tc005           # 5: gen giọng (cài đặt ở voice trong episode.json; --dry-run để xem trước)
node scripts/prep-footage.mjs raw cook     # 6: chuẩn hóa clip trong raw/ vào public/footage/cook/ (--start=, --max=, --crop=top|square)
node scripts/footage-manifest.mjs          # 6: quét lại kho footage, in bảng theo tag
node scripts/build-audio.mjs tc005         # 7: ghép audio, ghi mốc chương
node scripts/prep-thumb.mjs tc005 raw/anh.jpg   # 7: ảnh nhân vật cho bìa
npm run studio                             # 7: xem trước
node scripts/render-episode.mjs tc005      # 7: render youtube.mp4 (ngang), tiktok-NN.mp4 (dọc) + bìa phần, thumb.png (--only=, --parts=1,3)
node scripts/status.mjs tc005              # bước hiện tại của tập, tính từ file thật
```

## Cấu trúc thư mục

```
SKILL.md, CLAUDE.md     hướng dẫn quy trình cho Claude
references/             hướng dẫn chi tiết theo bước
stories/                kho truyện nguồn theo thể loại + README.md (danh mục kho và các tập)
episodes/<thể-loại>/<mã>-slug/    mọi thứ của một tập: tap.md, outline.md, episode.json, script/, audio/, out/
channel/                tài sản dùng chung cả kênh: channel.json (tên, câu chào, nhãn, màu nhấn), câu chào
scripts/                script dùng chung
src/                    code Remotion
public/footage/<tag>/   clip nền dùng chung, mỗi chủ đề một thư mục (kèm sources.txt)
public/<mã>/           file Remotion tự sinh
```

## Có gì không nằm trong git

Các thư mục sau nặng hoặc dựng lại được nên bị bỏ qua (xem `.gitignore`): `node_modules/`, `.env`, `public/footage/**/*.mp4`, `public/footage/manifest.json`, `public/<mã>/`, `episodes/*/*/audio/`, `episodes/*/*/out/`, `channel/*.mp3`, `.tmp/`, `raw/`. Nói gọn: không có file audio hay video nào trong git, chỉ có chữ và code.

Máy mới clone về cần:
- **Footage:** tải lại clip theo nguồn ghi ở `public/footage/<tag>/sources.txt`, rồi chạy `prep-footage`.
- **Audio giọng đọc:** gen lại bằng `gen-voice tc005` (tốn credit GenMax). Nếu cần giữ bản đã gen, sao lưu riêng thư mục `audio/`.
- **Câu chào kênh:** chạy `node scripts/gen-voice.mjs channel` để tạo `channel/intro.mp3`. Chưa có file này thì `build-audio` bỏ qua câu chào.

## Gặp lỗi

| Lỗi | Cách xử lý |
|---|---|
| `ffmpeg` hoặc `ffprobe` không nhận | Cài lại, đóng mở terminal; Windows kiểm tra ffmpeg nằm trong PATH |
| `Thiếu GENMAX_API_KEY` | Chưa tạo hoặc chưa điền `.env` |
| `Cần mã tập dạng tc005` | Truyền mã tập: 2 chữ thể loại + số, ví dụ `tc005` |
| `loadEnvFile is not a function`, hoặc `Unknown file extension ".ts"` | Node quá cũ, cài Node 22.18+ |
| `episode.json chưa hợp lệ` | Làm theo từng dòng báo lỗi (thường là chưa chạy `build-audio`) |
| Lỗi phiên bản `@remotion/*` | `npx remotion versions`, cài lại cùng phiên bản |
