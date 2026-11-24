# tc014: Đòi ly hôn xong, tôi và chồng cùng rơi xuống hồ bơi và tráo đổi linh hồn: tôi lên làm tổng tài, anh ở nhà chịu mẹ chồng và cô em họ 'bạch liên hoa'

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc014, stories/tinh-cam/tc014-hoan-doi-linh-hon-voi-chong.md
- **Bước hiện tại**: 5
- **Cập nhật**: 2026-11-21

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm hài: hoán đổi linh hồn vợ chồng, mẹ chồng khó, em họ trà xanh, chồng thấu hiểu vợ; kết ấm |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 3 / 4 / 5 = 21/25 (độ dài 3: ~42 phút, nửa sau chỉ là hậu quả của nửa đầu) |
| Hook cả truyện (một câu) | Tôi vừa đòi ly hôn xong thì cùng chồng rơi xuống hồ bơi; mở mắt ra, tôi nằm trong thân xác anh, còn anh trong thân xác tôi bị mẹ chồng lôi dậy nấu bữa sáng. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Đòi ly hôn xong cùng chồng rơi xuống hồ bơi, tôi tỉnh dậy trong thân xác anh ấy" 20; B (tráo xác, sa thải họ hàng trà xanh) 18; C (trả lại câu "người một nhà") 17; D 16; E 16 (chi tiết ở `outline.md`). Chọn A; A/B với B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Dương Nhược Hi (tôi; Hoài Châu gọi "Hi Hi"); Giản Hoài Châu (chồng, ngôi ba "anh"); Vân Thanh Thanh (em họ trà xanh, hơn tôi một tuổi); Phùng Đại Hải (cậu của Thanh Thanh, "ông Phùng"); Mục Đồng (bạn thân, chỉ ch.1); mẹ chồng và bé Gạo (không tên). Quy ước "thân tôi/thân anh". Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại: biệt thự nhà họ Giản, tập đoàn Giản thị ở Hải Thành; tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 9 chương, ~7.600 chữ, ~42 phút. Tách bữa sáng và cái tát qua camera; thêm tờ sao kê "học phí" (ch.5) và lời điện thoại của Thanh Thanh (ch.6); twist mẹ chồng nhận ra con trai trong thân con dâu (ch.8); cảnh cửa phòng sinh và tờ đơn ly hôn đóng khung (ch.9) |
| Chia phần TikTok | 3 phần: ch.1, ch.2–3, ch.4–5 (~53% chữ, dừng cuối ch.5); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, giọng d99082f8 (như tc001–tc008), tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | `acrylic`, footageOffset 14: vào ở clip acrylic-15, khác điểm vào của các tập khác cùng tag |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 9 chương, ~7.600 chữ, ~42 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1, ch.2–3, ch.4–5; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: chọn footage `acrylic` offset 14; gen giọng, build-audio, render YouTube và TikTok (chưa bìa) chạy qua đêm.
- 2026-11-24: thêm ảnh nhân vật bìa (`public/tc014/thumb-bg.jpg`), render thumb.png; bìa TikTok render tự động sau build-audio.
- 2026-11-24: render xong YouTube, 3 phần TikTok, bìa phần và thumb; đã xem khung đầu, cuối; chờ đăng.
