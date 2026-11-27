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

## Kênh và quyền

Script đọc kênh `CFG.channelHandle` (`@quytnho_audio`). Quyền cấp cho kênh đó thì thấy cả video lên lịch và riêng tư. Quyền cấp cho kênh khác của cùng tài khoản Google thì chỉ đọc được video công khai, và ô "Đồng bộ YouTube lúc" ở tab Tổng quan ghi rõ điều này. Quan sát 2026-11-27: lần cấp quyền đầu gắn với kênh cá nhân của tài khoản, không phải `@quytnho_audio`.

Màn cấp quyền của Apps Script không cho chọn kênh: luôn lấy kênh chính của tài khoản Google đang chạy (kiểm chứng 2026-11-27). Cách đang dùng: sheet chia sẻ quyền Editor cho tài khoản Google gốc của kênh, tài khoản đó mở Apps Script, cấp quyền, chạy `enableHourlySync`. Trigger mỗi giờ thuộc tài khoản đó, nên chạy với đúng quyền chủ kênh. Lần chạy đầu với quyền này: 40 video, ghép 40.

Dán code vào trình soạn thảo bằng clipboard trên macOS: dùng `LANG=en_US.UTF-8 pbcopy < youtube-sync.gs`, thiếu `LANG` thì chữ tiếng Việt bị vỡ và script báo thiếu cột.

## Cách ghép video với tập

Không cần thêm gì vào video khi tải lên. Theo thứ tự ưu tiên:
1. ID video đã có trong cột Link YouTube.
2. Số trong tiêu đề YouTube (`... | Quýt Nhỏ Audio 0010`, hoặc dạng cũ `Quýt Nhỏ Audio 0001 | ...`) khớp cột Số tập trên kênh, hoặc khớp số trong cột **Tiêu đề dự kiến (dang-bai)** khi ô Số tập còn trống.
3. Tiêu đề YouTube gần giống cột Tiêu đề dự kiến (dang-bai) hoặc Tiêu đề truyện (repo). Chỉ ghép khi một dòng giống rõ rệt hơn các dòng khác. Dùng khi `dang-bai.md` còn để `XXXX`.

Cột Tiêu đề dự kiến (dang-bai) chép nguyên tiêu đề ở mục "Tiêu đề YouTube" của `dang-bai.md` (`<hook> | Quýt Nhỏ Audio 0010`). Điền số vào `dang-bai.md` thì sửa luôn ô này. Thử ngày 2026-11-27 với 36 video (9 tiêu đề dạng cũ, 26 dạng mới có số, 1 dạng mới mà `dang-bai.md` còn `XXXX`), coi như sheet chưa có link và số: ghép đúng 36/36.

Video không khớp số và tiêu đề khác hẳn thì vào tab Chưa ghép.

Video không ghép được nằm ở tab **Chưa ghép**. Dán link của nó vào cột Link YouTube ở dòng đúng của tab Video, rồi bấm Đồng bộ YouTube ngay.

## Trạng thái

| Trên YouTube | Cột YouTube | Giờ đăng ghi |
|---|---|---|
| Công khai | Đã công khai | giờ công khai |
| Riêng tư có hẹn giờ | Đã lên lịch | giờ hẹn |
| Riêng tư hoặc không công khai, không hẹn giờ | Đã tải lên | trống |

Lượt xem chỉ ghi cho video công khai. Ô ở tab `Tổng quan` dòng "Đồng bộ YouTube lúc" ghi lần chạy gần nhất.

Sửa code: sửa file này trong repo trước, rồi dán lại vào Apps Script.
