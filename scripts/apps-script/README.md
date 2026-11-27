# Đồng bộ YouTube vào sheet quản lý video

`youtube-sync.gs` chạy trong Google Apps Script của sheet [Quýt nhỏ Audio](https://docs.google.com/spreadsheets/d/13-6eR8dr08mhFfsXRM4NQF05568dqof7rylYLMdVmVY/edit). Script đọc mọi video của kênh, kể cả video đã lên lịch và video riêng tư, rồi ghi vào tab `Video` các cột: YouTube (trạng thái), Số tập trên kênh, Giờ đăng YouTube, Link YouTube, Lượt xem, Thời lượng, Tiêu đề YouTube. Các cột Sản xuất, TikTok, Ghi chú không bị đụng.

## Cài một lần

1. Mở sheet, vào **Tiện ích mở rộng > Apps Script**.
2. Xóa nội dung `Code.gs`, dán toàn bộ `youtube-sync.gs`, bấm Lưu.
3. Ở cột trái, bấm **+** cạnh **Dịch vụ**, chọn **YouTube Data API v3**, giữ mã nhận dạng `YouTube`, bấm Thêm.
4. Chọn hàm `syncYouTube` trên thanh công cụ, bấm **Chạy**. Google hỏi quyền: chọn tài khoản quản lý kênh, bấm Cho phép. Nếu gặp màn "Google chưa xác minh ứng dụng này", bấm Nâng cao rồi chọn đi tới dự án (đây là script của chính bạn).
5. Quay lại sheet, tải lại trang. Thanh menu có thêm **Quýt Nhỏ Audio**:
   - **Đồng bộ YouTube ngay**: chạy một lần.
   - **Bật tự đồng bộ mỗi giờ**: tạo trigger chạy mỗi giờ.
   - **Tắt tự đồng bộ**: xóa trigger.

## Cách ghép video với tập

Không cần thêm gì vào video khi tải lên. Theo thứ tự ưu tiên:
1. ID video đã có trong cột Link YouTube.
2. Số trong tiêu đề (`Quýt Nhỏ Audio 0009`) khớp cột Số tập trên kênh.
3. Tiêu đề YouTube gần giống một trong các tiêu đề ở cột **Tiêu đề dự kiến (dang-bai)** (chính + 2 A/B lấy từ mục "Tiêu đề YouTube" trong `dang-bai.md` của tập, mỗi dòng một tiêu đề, bỏ phần `Quýt Nhỏ Audio XXXX |`) hoặc cột Tiêu đề truyện (repo). Chỉ ghép khi một dòng giống rõ rệt hơn các dòng khác. Thử với 9 video công khai ngày 2026-11-27, coi như sheet chưa có link: ghép đúng 9/9.

Tiêu đề trên YouTube khác hẳn cả 3 tiêu đề dự kiến thì video vào tab Chưa ghép. Đổi tiêu đề trong `dang-bai.md` thì sửa cả ô Tiêu đề dự kiến của tập đó trong sheet.

Video không ghép được nằm ở tab **Chưa ghép**. Dán link của nó vào cột Link YouTube ở dòng đúng của tab Video, rồi bấm Đồng bộ YouTube ngay.

## Trạng thái

| Trên YouTube | Cột YouTube | Giờ đăng ghi |
|---|---|---|
| Công khai | Đã công khai | giờ công khai |
| Riêng tư có hẹn giờ | Đã lên lịch | giờ hẹn |
| Riêng tư hoặc không công khai, không hẹn giờ | Đã tải lên | trống |

Lượt xem chỉ ghi cho video công khai. Ô ở tab `Tổng quan` dòng "Đồng bộ YouTube lúc" ghi lần chạy gần nhất.

Sửa code: sửa file này trong repo trước, rồi dán lại vào Apps Script.
