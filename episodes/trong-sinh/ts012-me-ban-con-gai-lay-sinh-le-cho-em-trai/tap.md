# ts012: Mẹ bán tôi cho lão già ế lấy hai trăm nghìn sính lễ cưới vợ cho em trai; trọng sinh, tôi xin làm con nuôi nhà hàng xóm

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts012, stories/trong-sinh/ts012-me-ban-con-gai-lay-sinh-le-cho-em-trai.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Trọng sinh (trọng nam khinh nữ, mẹ bán con, đỗ Thanh Hoa vả mặt) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 3 / 5 / 5 = 22/25 (twist 4 nhờ thêm cuốn sổ của bố) |
| Hook cả truyện (một câu) | Kiếp trước tôi chết sau ba đêm làm vợ lão ế, còn mẹ đếm tiền sính lễ trên đường về; lần này mở mắt, mẹ đang quỳ ép tôi bỏ học |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A 19, B 19, C 18, E 17, D 16 (xem `outline.md`); chọn A, giữ A/B/E để A/B test |
| Nhân vật: tên → cách gọi cố định | Cố Tịch (tôi); mẹ ruột (không tên: "mẹ" ch.1–2, sau đó "bà ta"); Cố Bảo (em trai); Chương Vĩ Khang và vợ (chú dì Chương, từ ch.3 gọi bố mẹ); Lỗ Doanh (cô ta); Ân Hạo (anh) |
| Bối cảnh | Thôn Hòe Thụ và huyện thành, Trung Quốc hiện đại, tiền là tệ; trọng sinh ở đầu ch.1 lúc mười lăm tuổi |
| Độ dài: số chương, phút; cách đủ độ dài | 9 chương, ~7.250 chữ ≈ 40 phút; thêm cảnh nhà họ Chương, lý lịch Lỗ Doanh, cuốn sổ tiết kiệm của bố (twist riêng), đổi kết mẹ ruột từ thực vật thành gãy chân |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3, ch.4–5 (~55% chữ, dừng cuối ch.5); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `puzzle`, `footageOffset` 0 (tag chưa tập nào dùng; 25:03, chỉ vừa đủ) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` trong episode.json (chưa duyệt); ảnh: do bạn gửi 2026-11-25 (tranh cô gái ôm sách (thay ảnh cô gái tết tóc)), `raw/ts012-thumb.webp` → `public/ts012/thumb-bg.jpg`; chưa có A/B |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 9 chương, ~7.250 chữ, ~40 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3, ch.4–5; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-25: gen giọng cả tập, 9 chương, 24:41 (d99082f8, tốc độ 1,2); chưa nghe thử chương 1.
- 2026-11-25: chọn footage `puzzle` offset 0, kho có sẵn, đã xem lưới khung.
- 2026-11-25: ảnh bìa từ ảnh gửi; render thumb.png và 3 bìa TikTok; chờ duyệt bìa, render video.
- 2026-11-26: render xong bản ngang (24:53) và 3 phần TikTok; đã xem khung đầu, giữa, cuối; chưa nghe thử, chưa đăng.
- 2026-11-26: đã đăng YouTube; TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
