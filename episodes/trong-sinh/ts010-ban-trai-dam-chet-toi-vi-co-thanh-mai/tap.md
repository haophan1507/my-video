# ts010: Kiếp trước tôi khuyên bạn trai đừng về lấy giấy báo danh cho cô thanh mai, mười năm sau anh ta đâm tôi chết vào ngày giỗ cô ấy

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts010, stories/trong-sinh/ts010-ban-trai-dam-chet-toi-vi-co-thanh-mai.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Trọng sinh: sống lại nửa tiếng trước giờ thi đại học, thả bạn trai có thanh mai đi để họ tự hủy; kết ngọt với người mới |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 5 / 5 = 23/25 |
| Hook cả truyện (một câu) | Ngày giỗ cô thanh mai của chồng, anh ta đâm tôi bảy nhát vì tôi đã cản anh về lấy giấy báo danh cho cô ấy; tôi mở mắt, đang đứng trước cổng trường thi, còn nửa tiếng nữa là vào phòng. Mốc trọng sinh: ch.1 |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Kiếp trước tôi khuyên bạn trai đừng đi lấy giấy báo danh cho thanh mai, mười năm sau anh ta đâm tôi" 20; B "Trọng sinh nửa tiếng trước giờ thi, tôi cười bảo bạn trai: đi đi, đừng quay lại" 19; C "Bị đâm chết vì cô thanh mai của chồng, sống lại tôi để họ tự hủy hoại nhau" 17; D 16; E 16 (chi tiết ở `outline.md`). Chọn A; A/B với B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Khấu Vọng Tinh (tôi; mọi người gọi "Tinh"); Lộ Nghị (bạn trai cũ, sau gọi "hắn"); Hoa Điềm Điềm (thanh mai, sau gọi "cô ta"); Chương Bội (bạn thân hóng hớt, "Bội"); Phó Sâm (nam chính người Hoa du học, ngôi ba "anh", tôi gọi "anh Sâm"). Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại: Hải Thành (cổng trường cũ, khách sạn tiệc tạ ơn thầy cô), Bắc Kinh (Thanh Hoa, công ty công nghệ); tiền là tệ; không ghi năm bằng số |
| Độ dài: số chương, phút; cách đủ độ dài | 8 chương, 7.450 chữ, ~41 phút. Viết dày từng cảnh (nguồn kể lướt cả năm trong vài dòng) và thêm: gợi ý ngầm nhà Điềm Điềm có tài xế (ch.1, 5) để twist cuối; nam chính Phó Sâm thay nam phụ ngoại quốc (ch.4 trở đi); vòng bài đăng đòi tuổi xuân bị video tiệc tạ ơn vả lại (ch.7); cảnh cuối: Điềm Điềm thú nhận cố tình quên giấy báo danh, Lộ Nghị cầm dao đúng ngày mưa dông và bị ngăn (ch.8) |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3, ch.4 (~51% chữ, dừng cuối ch.4); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `cook` (kho có sẵn trên máy, không tải thêm) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` trong episode.json; ảnh: do bạn gửi 2026-11-23 (ảnh nữ sinh áo trắng dưới tán cây, `raw/ts010-thumb.png` → `public/ts010/thumb-bg.jpg`, đã cắt watermark ở đáy), `thumbFace` 56% 45%; chưa có A/B |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 8 chương, ~7.450 chữ, ~41 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3, ch.4; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-23: chốt giọng d99082f8 tốc độ 1,2, footage tag `cook`; gen cả tập, audio 26:16; chờ ảnh nhân vật cho bìa.
- 2026-11-23: ảnh bìa từ ảnh gửi; render thumb.png và 3 bìa TikTok; chờ render video.
- 2026-11-23: render xong youtube.mp4 (26:17), tiktok-01..03, bìa YouTube và 3 bìa TikTok; đã xem khung đầu và cuối.
- 2026-11-25: đã đăng YouTube; TikTok chưa đăng.
