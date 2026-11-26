# tc003: Chồng bắt ký "ba điều ước" trước cưới, bạch nguyệt quang vừa về nước tôi chủ động xin ly hôn thì anh xé đơn

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc003, stories/tinh-cam/tc003-chong-xe-don-ly-hon-khi-bach-nguyet-quang-ve-nuoc.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm (liên hôn thương mại, bạch nguyệt quang về nước, thầm yêu, ngọt hài) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 3 / 3 / 5 / 4 = 20/25 (chấm lại sau khi thêm vòng Hạ Vi hẹn gặp) |
| Hook cả truyện (một câu) | Trước cưới anh bắt tôi ký ba điều, ngày bạch nguyệt quang về nước tôi ngoan ngoãn xin ly hôn thì anh sa sầm mặt xé đơn: Em thích thằng nào? Cả đời này đừng hòng. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | Xem `outline.md`; chọn A (19/20), giữ B và C để A/B; `episode.json` dùng bản rút gọn A |
| Nhân vật: tên → cách gọi cố định | Sư Tình (tôi, "Tình Tình"); Đoan Khải (chồng, "anh"); Sơn Hạ Vi (bạch nguyệt quang, "Hạ Vi"); Khanh Thiến (bạn thân, "Thiến Thiến"); bác Phúc (giúp việc) |
| Bối cảnh | Hải Thành hiện đại, tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 9 chương, 6.731 chữ, ~37 phút; bỏ cảnh thân mật, thêm 2 vòng mới (Hạ Vi hẹn gặp với tin nhắn cũ, chồng đối mặt Hạ Vi trước vợ) |
| Chia phần TikTok | 3 phần: ch.1–2 (~8,7 phút), ch.3–4 (~8,2 phút), ch.5 (~4,5 phút); ~57% số chữ; dừng ở lúc anh nghe tin nhắn thoại về "anh đẹp trai" |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, voiceId d99082f8-…, tốc độ 1,2 (cùng giọng tc001–tc008) |
| Footage: chủ đề, nguồn, tag | Vẽ acrylic lên đĩa tròn, tag `painting` (75 phút, ngang); dim 0,15 |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | Chữ theo `thumbText`; ảnh cặp đôi dưới hoa anh đào (ảnh gửi trực tiếp, 2026-11-24) → `public/tc003/thumb-bg.jpg`, thumbFace 52% 46%; chưa có phương án B |
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

- 2026-11-22: mở tập.
- 2026-11-22: viết kịch bản bước 1–4 (đã đọc toàn văn nguồn); 9 chương, ~6.731 chữ, ~37 phút; dàn ý và chương chưa duyệt.
- 2026-11-24: chốt giọng (voiceId), footage `painting`, ảnh bìa; gen giọng 9 chương.
- 2026-11-24: build-audio 23:32 (dưới 25 phút một chút); render YouTube, 3 phần TikTok, bìa phần, thumb; đã xem lướt đầu, giữa, cuối, độ sáng ổn.
- 2026-11-24: đã đăng YouTube; TikTok chưa đăng.
