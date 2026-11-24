# tc010: Chồng nói tăng ca, tôi thấy anh ta ôm cô thực tập sinh đi vào căn hộ đứng tên tôi; nhưng anh ta không biết cô thực tập sinh là do tôi tìm đến

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc010, stories/tinh-cam/tc010-chong-ngoai-tinh-thuc-tap-sinh-do-toi-sap-dat.md
- **Bước hiện tại**: 5
- **Cập nhật**: 2026-11-21

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm: ngoại tình, vợ giăng bẫy, tố cáo tham ô, twist người thứ ba là quân cờ của vợ; hả hê, kết mở nhẹ |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 5 / 4 / 4 / 5 = 23/25 (độ dài 4 nhờ bốn vòng thêm: dòng tiền, quỳ lần hai, vé một chiều, Khiêm nộp đơn song song) |
| Hook cả truyện (một câu) | Chồng nói tối nay tăng ca; tôi đang ngồi dưới công ty anh ta, nhìn anh ta che ô cho một cô gái rồi đưa về căn hộ đứng tên tôi; cô gái đó chính tôi là người đặt vào đời anh ta. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Chồng tăng ca, tôi thấy anh ôm thực tập sinh vào căn hộ đứng tên tôi" 19; B "Chồng nhân tình là người tôi tự tay chọn..." 18; C 17; D 16; E 14 (chi tiết ở `outline.md`). Chọn A; A/B với B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Hàn Vi (tôi; "Vi Vi"); Triệu Duật (chồng, "Duật", ngôi ba "anh ta"); Đàm Yên Yên (thực tập sinh, "Yên Yên", "cô ta"); Quan Khiêm (chú họ, chủ Vân Khê; kể gọi "Khiêm", ngôi ba "anh"); Khổng Ngân (bạn thân, "Ngân"); đồng nghiệp tóc rẽ ngôi (không tên). Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại: Bắc Kinh (quận Triều Dương, khách sạn lưng chừng núi), Hải Thành (chuyến đi giả), Singapore (vé của Duật); tiền là tệ; không ghi năm bằng số |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~9.060 chữ, ~50 phút. Cắt thoại sến của bản nguồn; thêm vòng hóa đơn bảo trì ma và dòng tiền qua thẻ Yên Yên (ch.2, 5), vòng quỳ lần hai và vé một chiều (ch.7), Khiêm là chủ Vân Khê nộp đơn song song (ch.3, 8–10), hồ sơ bảo vệ Yên Yên (ch.6, 10); gộp Lý Huy thành đồng nghiệp không tên |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~57% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, giọng d99082f8 (như tc001–tc008), tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | `acrylic`, footageOffset 3: vào ở clip acrylic-04, khác điểm vào của các tập khác cùng tag |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~9.060 chữ, ~50 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: chọn footage `acrylic` offset 3; gen giọng, build-audio, render YouTube và TikTok (chưa bìa) chạy qua đêm.
- 2026-11-24: thêm ảnh nhân vật bìa (`public/tc010/thumb-bg.jpg`), render thumb.png; bìa TikTok render tự động sau build-audio.
- 2026-11-24: render xong YouTube, 3 phần TikTok, bìa phần và thumb; đã xem khung đầu, cuối; chờ đăng.
