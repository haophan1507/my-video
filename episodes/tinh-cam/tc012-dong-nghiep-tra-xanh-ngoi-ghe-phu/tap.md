# tc012: Bạn trai cho cô đồng nghiệp ngồi ghế phụ trên chiếc xe tôi mua, cô ta 'trà xanh' với tôi; tôi tát một cái: 'Nói bao lần rồi, gà phải bỏ vào cốp!'

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc012, stories/tinh-cam/tc012-dong-nghiep-tra-xanh-ngoi-ghe-phu.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-26

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm: bạn trai bám váy, trà xanh đồng nghiệp, chia tay dứt khoát, quả báo (anh ta vô sinh, đứa bé không phải con), mẹ anh ta quay lại cầu cạnh; hài đanh, hả hê |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 5 / 5 = 23/25 (độ dài 4 nhờ thêm vòng khổ nhục kế và đòn kết ở trại tạm giam) |
| Hook cả truyện (một câu) | Ngày bạn trai đưa nhân tình ngồi lên ghế phụ chiếc xe tôi mua, tôi tát cô ta rồi bảo: bao nhiêu lần rồi, gà phải bỏ vào cốp! Ba tháng sau tôi ngồi ở đám cưới của họ, trong túi xách là một tờ giấy khám bệnh anh ta chưa từng biết. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Bạn trai cho đồng nghiệp ngồi ghế phụ xe tôi mua, tôi tát cô ta rồi bảo: gà phải bỏ vào cốp!" 19; B "Bị bạn trai bảy năm chê đanh đá rồi bỏ, tôi giấu tờ kết quả khám của anh ta suốt ba tháng" 18; C "Nhân tình bảo tôi là gà mái không biết đẻ, tôi chỉ nhận thiệp cưới của họ và đến dự" 17; E 16; D 14 (chi tiết ở `outline.md`). Chọn A; A/B với B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Yến Nghi (tôi; mẹ anh ta gọi "tiểu Nghi", Sở Sở gọi "chị Nghi"); Vương Phong (bạn trai bảy năm, "Vương Phong", sau chia tay "anh ta"); Doãn Sở Sở (trà xanh, "Sở Sở", "cô ta"); Tống Miên (bạn thân hóng hớt, "Miên"); phu nhân Thạch (vợ đại gia, "phu nhân Thạch"/"bà Thạch"); mẹ Vương Phong (không tên, "bà Vương"). Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại: Thành Đô (công ty, khách sạn Cẩm Thành, tòa nhà Thiên Phủ, quán trà khu Cẩm Giang); tiền là tệ; không ghi năm bằng số |
| Độ dài: số chương, phút; cách đủ độ dài | 8 chương, ~7.370 chữ, ~41 phút. Gần sát bản nguồn; thêm vòng khổ nhục kế ở sảnh công ty (ch.5), đòn kết ở trại tạm giam (ch.8), nhân vật Tống Miên; câu "gà phải bỏ vào cốp" gieo từ hai con gà quê của mẹ anh ta; làm sạch lời thoại tục, thay bạo lực nặng bằng cảnh xô ngã và bản án |
| Chia phần TikTok | 3 phần: ch.1, ch.2–3, ch.4 (~50% chữ, dừng cuối ch.4); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, giọng d99082f8 (như tc001–tc008), tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | `acrylic`, footageOffset 9: vào ở clip acrylic-10, khác điểm vào của các tập khác cùng tag |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 8 chương, ~7.370 chữ, ~41 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1, ch.2–3, ch.4; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: chọn footage `acrylic` offset 9; gen giọng, build-audio, render YouTube và TikTok (chưa bìa) chạy qua đêm.
- 2026-11-24: thêm ảnh nhân vật bìa (`public/tc012/thumb-bg.jpg`), render thumb.png; bìa TikTok render tự động sau build-audio.
- 2026-11-24: render xong YouTube, 3 phần TikTok, bìa phần và thumb; đã xem khung đầu, cuối; chờ đăng.
- 2026-11-26: đã đăng YouTube; TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
