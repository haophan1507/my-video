# tc016: Bạn trai giả nghèo thử lòng tôi ba năm; gặp lại, tôi là nha hoàn quỳ dưới đất chờ quay, anh ta là nhà đầu tư

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc016, stories/tinh-cam/tc016-ban-trai-gia-ngheo-thu-long.md
- **Bước hiện tại**: 5
- **Cập nhật**: 2026-11-21

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm: bạn trai giả nghèo thử lòng, showbiz, nữ chính tự vươn lên thành ảnh hậu; hả hê, buồn nhẹ (người cũ chết) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 4 = 21/25 (chấm lại sau khi đọc toàn văn; dễ nghe 4 vì đã gom về 5 tên riêng) |
| Hook cả truyện (một câu) | Bạn trai cũ giả nghèo thử lòng tôi suốt ba năm; gặp lại, tôi đang quỳ dưới đất chờ quay cảnh nha hoàn, anh ta đứng trên cao với tư cách nhà đầu tư: cô sẽ hối hận. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Bạn trai cũ giả nghèo thử lòng tôi ba năm, gặp lại tôi quỳ dưới đất, anh ta là nhà đầu tư" 20; B 18; C 18; D 17; E 14 (chi tiết ở `outline.md`). Chọn A; A/B với B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Lâm Tịch Dao (tôi); Tăng Hạo (người yêu cũ, kể "anh ta"); Phan Bằng (bạn của anh ta, "hắn"); Hứa Ngọc Trâm ("chị Ngọc Trâm"); Ngô Dịch (quản lý, "cậu ấy", gọi "chị Tịch Dao"); em gái Tăng Hạo và cô bạn thân (không tên). Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại: giới giải trí Bắc Kinh (phim trường ngoại ô, tập đoàn Hoành Đạt); tiền là tệ; không ghi năm bằng số |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~9.400 chữ, ~52 phút. Nguồn dài và nhiều nhân vật nên gom: bỏ Trần Hân, gộp phần phim, rút phần thành tích; mở bằng cảnh quỳ rồi kể ngược; thêm ván cược du thuyền làm sợi dọc cược và gieo sở thích mạo hiểm ở ch.2 và ch.9 để cái chết ở ch.10 không đột ngột |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~57% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, giọng d99082f8 (như tc001–tc008), tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | `acrylic`, footageOffset 16: vào ở clip acrylic-17, khác điểm vào của các tập khác cùng tag |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~9.400 chữ, ~52 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: chọn footage `acrylic` offset 16; gen giọng, build-audio, render YouTube và TikTok (chưa bìa) chạy qua đêm.
- 2026-11-24: thêm ảnh nhân vật bìa (`public/tc016/thumb-bg.jpg`), render thumb.png; bìa TikTok render tự động sau build-audio.
- 2026-11-24: render xong YouTube, 3 phần TikTok, bìa phần và thumb; đã xem khung đầu, cuối; chờ đăng.
