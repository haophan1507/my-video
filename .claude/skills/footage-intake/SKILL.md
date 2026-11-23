---
name: footage-intake
description: Nạp footage người dùng tự tải về máy này (thư mục Downloads hoặc thư mục khác): quét video mới, xem trước, phân loại theo chủ đề, crop bỏ logo/chữ, cắt thành clip tái sử dụng, ghi vào public/footage/<tag>/. Dùng khi người dùng nói "tôi vừa tải footage", "xử lý video trong Downloads", "thêm footage", hoặc khi bước 6 của một tập thiếu footage.
---

# Nạp footage (mỗi máy một kho)

Kho `public/footage/` **nằm ngoài git, khác nhau theo máy**: mỗi người tự tải video về rồi nhờ Claude xử lý. Vì vậy không giả định sẵn tag, số clip hay tên file nào. Mọi thứ đọc từ kho của máy này:

| File (trong `public/footage/`) | Vai trò |
|---|---|
| `<tag>/<tag>-NN.mp4` | clip đã chuẩn hóa |
| `manifest.json` | do `footage-manifest.mjs` sinh, Remotion đọc |
| `tags.json` | mô tả từng tag (chủ đề, kiểu hình) để chọn tag cho truyện |
| `ingested.json` | sổ file nguồn đã nạp (tên + dung lượng) để lần sau bỏ qua |
| `choices.json` | tag mỗi tập dùng **trên máy này** (thắng `footageTag` trong `episode.json`) |

## Quy trình

1. **Quét**: `node scripts/footage-scan.mjs [thư-mục]` (mặc định `~/Downloads`). In bảng video chưa nạp và tạo `.tmp/footage-scan/<n>-sheet.jpg` (lưới 20 khung) và `<n>-pair.jpg` (2 khung nguyên cỡ). Đọc từng ảnh bằng Read. Kiểm đĩa trống (`df -h .`) trước khi nạp lô lớn.
2. **Phân loại từng video** (một tag cho mỗi video):
   - Tag đã có ở `node scripts/footage-pick.mjs` mà hợp chủ đề và kiểu hình thì **dùng lại tag đó** (clip mới nối số tiếp theo).
   - Chưa hợp tag nào thì **đặt tag mới**: một từ thường ngắn, tả chủ đề (`pottery`, `nail`, `rain`), `[a-z0-9-]`. Không bị giới hạn ở danh sách 10 chủ đề gợi ý trong `san-xuat.md`.
   - Một tag một kiểu hình: không trộn đời thực với hoạt hình, không trộn dọc với ngang.
3. **Loại** video nếu: chữ hoặc phụ đề cứng nằm giữa khung (crop không bỏ được), có mặt người rõ không phải người châu Á, cảnh đời thường ít chuyển động, quá ngắn (< 5 phút), kiểu hình trái chuẩn `edit-yeu-cau.md`. Nói rõ lý do trong báo cáo; không xóa file của người dùng.
4. **Crop**: nhìn `-pair.jpg` tìm logo, watermark, tiêu đề, phụ đề (thường ở góc và đáy). Chọn vùng chữ nhật sạch lớn nhất, ưu tiên gần 16:9, bằng tỉ lệ `x:y:w:h` (0–1). Nguồn là clip dọc đặt giữa khung ngang với nền mờ thì crop đúng dải dọc. Nguồn sạch thì bỏ `--crop`. Vùng giữ lại phải ≥ 60% diện tích và cạnh ngắn ≥ 576 px (`edit-yeu-cau.md`, Footage); không đạt thì loại video, không crop sâu.
5. **Báo cáo và xin duyệt một lần** (bảng: file, tag dùng lại hay mới, crop, số clip dự kiến, dung lượng ước tính ~50 MB mỗi 15 phút ở 720p, video bị loại kèm lý do). Chờ xác nhận.
6. **Nạp**, mỗi video một lệnh; chạy `--dry-run` trước nếu chưa chắc:
   ```bash
   node scripts/split-footage.mjs ~/Downloads/x.mp4 <tag> --start=5 --end=15 --crop=0:0:0.8:0.8 --desc="chủ đề, kiểu hình"
   ```
   `--desc` bắt buộc khi tạo tag mới. `--start/--end` bỏ intro và outro (mặc định thử 5 giây đầu, 10–20 giây cuối). Chạy lô dài thì cho chạy nền (`run_in_background`), mỗi đoạn 15 phút mất ~30 giây.
7. **Kiểm**: lấy một khung giữa clip của mỗi lệnh (`ffmpeg -ss 300 -i clip -frames:v 1`), ghép lưới và xem: hết logo, chữ, mép viền; thấy trọn tay và vật chính. Rồi `node scripts/footage-preview.mjs <tag>`: xem lưới 4 tốc độ, báo tốc độ đề xuất, ghi `speed` của tag trong `tags.json` khi người dùng chốt. Xem lưới khung 2 phút đầu clip 01: còn đoạn chuẩn bị hay chữ kênh gốc (SUBSCRIBE, tiêu đề) thì ghi `start` (giây bỏ) của tag. Sai thì xóa clip của lệnh đó, xóa mục tương ứng trong `ingested.json`, chạy lại với crop khác.
8. **Ghi nguồn**: thêm vào `public/footage/<tag>/sources.txt` tên file nguồn, nền tảng, ngày, crop, "giấy phép: chưa kiểm tra". Chạy `node scripts/footage-manifest.mjs`.
9. **Gắn vào tập** nếu người dùng đang làm tập nào: `node scripts/footage-pick.mjs <mã> <tag>` (bảng tag và mô tả giúp chọn tag hợp tông truyện). Không sửa `footageTag` trong `episode.json` chỉ vì máy này khác máy khác.

## Chọn tag cho một tập (bước 6, kho đã có sẵn)

`node scripts/footage-pick.mjs <mã>`: đọc `tags.json`, chọn tag hợp tông truyện và đủ clip (≥ 4, tập 45–60 phút nên 6–10). **Cố gắng không trùng tag với tập khác**: đối chiếu `choices.json`, ưu tiên tag chưa tập nào dùng. Kho ít tag, buộc dùng lại thì **đảo điểm vào** để tập mới không mở đầu bằng cảnh đã có ở tập trước: chọn điểm vào khác (cách ≥ 5 phút trong nguồn, hoặc bắt đầu từ clip khác) trên đoạn sạch, xem lưới khung để chọn, ghi vào `tap.md` mục Footage. Khi nạp footage mới, ưu tiên tag mới hơn là thêm vào tag cũ (quy tắc: `edit-yeu-cau.md`, Footage). Trước render chạy `node scripts/footage-preview.mjs <tag>` nếu tag chưa có `speed` trong `tags.json`, chốt tốc độ với người dùng. Không tag nào hợp thì nói rõ và đề nghị nạp thêm footage (quy trình trên), không dùng tag lệch tông. Tag đặt trong `episode.json` mà máy này không có: `status.mjs` và Remotion báo lỗi kèm danh sách tag hiện có.
