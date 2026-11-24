# tc013: Chồng chờ ba năm, cuối cùng bạch nguyệt quang ly hôn về nước; đúng ngày anh lén đón cô ta về nhà, tôi cầm tờ giấy báo có thai ba tuần

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc013, stories/tinh-cam/tc013-bach-nguyet-quang-ve-nuoc-toi-co-thai.md
- **Bước hiện tại**: 5
- **Cập nhật**: 2026-11-21

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm: hôn nhân do ơn nghĩa, bạch nguyệt quang về nước, mang thai, ly hôn, nuôi con một mình; ngược nhẹ, kết buồn tự lập |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 5 / 5 = 23/25 (twist 4 nhờ hồ sơ lật mặt Nhạc Ý; độ dài 4 nhờ cảnh đối đầu và cảnh nấu canh thêm mới) |
| Hook cả truyện (một câu) | Ngày chồng tôi lén đón bạch nguyệt quang về nước, anh tháo nhẫn cưới ra khỏi tay; cũng ngày đó, tôi ngồi một mình trước cổng bệnh viện, dưới mưa, tay cầm tờ giấy báo có thai ba tuần. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Ngày chồng tháo nhẫn đi đón bạch nguyệt quang, tôi cầm tờ giấy báo có thai ba tuần" 19; B 17; C 17; D 16; E 13 (chi tiết ở `outline.md`). Chọn A; A/B với B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Viên Sơ (tôi; Dự gọi "Tiểu Sơ"); Thường Dự (chồng, kể gọi "Dự"/"anh"); Nhạc Ý (bạch nguyệt quang, "cô ta"); dì Lệ (mẹ chồng); Cung Kỳ (bạn thân, "Kỳ Kỳ"); Nặc Nặc (con gái). Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại: Hải Thành; chuyến đi nói dối là Thành Đô, thật ra Thanh Đảo; kết ở Đại Liên (ven biển); tiền là tệ; không ghi năm bằng số |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~8.500 chữ, ~47 phút. Bỏ lặp nội tâm của bản nguồn; thêm đối đầu trực tiếp với Nhạc Ý (ch.7), twist hồ sơ Nhạc Ý chưa ly hôn và Dự biết mà giấu (ch.8–9), cảnh Dự nấu canh (ch.8); giữ kết buồn tự lập |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~59% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, giọng d99082f8 (như tc001–tc008), tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | `acrylic`, footageOffset 11: vào ở clip acrylic-12, khác điểm vào của các tập khác cùng tag |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~8.500 chữ, ~47 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: chọn footage `acrylic` offset 11; gen giọng, build-audio, render YouTube và TikTok (chưa bìa) chạy qua đêm.
- 2026-11-24: thêm ảnh nhân vật bìa (`public/tc013/thumb-bg.jpg`), render thumb.png; bìa TikTok render tự động sau build-audio.
- 2026-11-24: render xong YouTube, 3 phần TikTok, bìa phần và thumb; đã xem khung đầu, cuối; chờ đăng.
