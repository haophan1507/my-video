# ts015: Bố mẹ luôn cho tôi phần hơn em trai; đến lúc tôi thành đạt thì đóng cửa không gặp họ, vì kiếp trước tôi chết khi họ ngừng chữa bệnh cho tôi

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts015, stories/trong-sinh/ts015-bo-me-thuong-gia-de-con-gai-lam-ban-dap.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Trọng sinh (`ts`): gia đình thiên vị, nữ cường cắt đứt |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 3 / 5 / 5 = 22/25 (độ dài ~35 phút) |
| Hook cả truyện (một câu) | Ngày tôi thành bác sĩ giỏi nhất khoa, bố mẹ quỳ trước phòng khám, tôi khóa trái cửa, vì kiếp trước họ cắt thuốc để tôi chết lúc hai mươi bốn tuổi; sống lại từ năm hai mươi hai |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | Xem `outline.md`; chọn: Trọng Sinh: Họ Cắt Thuốc Khi Tôi Ung Thư Để Mua Xe Cho Em Trai, Kiếp Này Tôi Cắt Đứt Tất Cả (15/15) |
| Nhân vật: tên → cách gọi cố định | Đàm Chiêu Đệ (sau là Đàm Tịnh) → tôi; Đàm Tông Bảo → Bảo; Phạm Doanh → Phạm Doanh; giáo sư Hầu Kiên → thầy Hầu Kiên; bố, mẹ không tên |
| Bối cảnh | Hải Thành hiện đại, bệnh viện (khoa phụ sản), bãi biển Tam Á; tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 8 chương, ~6.200 chữ ≈ 35 phút; giữ mạch nguồn, thêm thầy Hầu Kiên và chi tiết lưu phiếu khám (xem `outline.md`) |
| Chia phần TikTok | 3 phần: ch.1, ch.2–3, ch.4–5 (~61% chữ, dừng cuối ch.5); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `acrylic`, `footageOffset` 22 (clip 23–24, đoạn chưa tập nào dùng; dừng trước nút Subscribe ở 24@586s) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` trong episode.json (chưa duyệt); ảnh: do bạn gửi 2026-11-25 (nữ bác sĩ đeo kính), `raw/ts015-thumb.webp` → `public/ts015/thumb-bg.jpg`; chưa có A/B |
| Teaser TikTok 60–90 giây | |

## Tiến độ

- [x] 1. Chọn truyện
- [x] 2. Dàn ý: `outline.md`
- [x] 3. Viết chương: `script/chNN.tts.txt`
- [x] 4. Soát TTS: báo cáo `normalize-vi.mjs` sạch
- [x] 5. Giọng: `audio/chNN.mp3`
- [x] 6. Footage: `public/footage/<tag>/`
- [x] 7. Render: `out/`

## Nhật ký

- 2026-11-21: mở tập.
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 8 chương, ~6.200 chữ, ~35 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1, ch.2–3, ch.4–5; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-25: gen giọng cả tập, 8 chương, 21:38 (d99082f8, tốc độ 1,2); chưa nghe thử chương 1.
- 2026-11-25: chọn footage `acrylic` offset 22, kho có sẵn, đã xem lưới khung.
- 2026-11-25: ảnh bìa từ ảnh gửi; render thumb.png và 3 bìa TikTok; chờ duyệt bìa, render video.
- 2026-11-26: render xong bản ngang (21:49) và 3 phần TikTok; đã xem khung đầu, giữa, cuối; chưa nghe thử, chưa đăng.
- 2026-11-26: đã đăng YouTube; TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
