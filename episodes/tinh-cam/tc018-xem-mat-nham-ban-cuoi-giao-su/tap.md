# tc018: Đi xem mắt nhầm bàn, tôi cưới chớp nhoáng một giáo sư lạnh lùng; cưới xong anh toàn ngủ sofa

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc018, stories/tinh-cam/tc018-xem-mat-nham-ban-cuoi-giao-su.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-26

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm: xem mắt nhầm bàn, cưới chớp nhoáng, giáo sư lạnh lùng thầm yêu sáu năm; hài ngọt, kết ấm |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 5 / 5 = 23/25 (twist 4 nhờ cuốn sổ và lời từ chối năm xưa; độ dài 4 sau khi viết dày) |
| Hook cả truyện (một câu) | Tôi ngồi nhầm bàn xem mắt, hỏi người đàn ông kính gọng vàng: anh đẹp trai, đi đăng ký kết hôn không? Anh đáp: được, đỡ phiền. Hơn một tháng sau tôi đòi ly hôn vì chồng ngủ sofa ba mươi đêm liền. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Đi xem mắt nhầm bàn, tôi hỏi người lạ đi đăng ký kết hôn không, anh ấy đáp được" 20; B "Cưới chớp nhoáng giáo sư lạnh lùng, một tháng sau tôi đòi ly hôn vì anh ngủ sofa" 19; C 17; D 17; E 15 (chi tiết ở `outline.md`). Chọn A; A/B với B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Chung Hạnh (tôi); Khâu Thừa Dự (nam chính, ngôi ba "anh", giáo sư Khâu); Ninh Vi (bạn thân, "Vi"); Bành Gia Trạch (người cũ, "anh ta"); Đinh Doanh (cháu và học trò, "Doanh Doanh", gọi tôi "mợ út"); mẹ chồng, bà nội, bố mẹ tôi, chó Tiểu Hoa không tên riêng. Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại: Thành Đô (căn hộ giáo viên trong trường đại học, nhà bố mẹ) và Trường Sa (công tác); tiền là tệ; đã làm sạch cảnh người lớn của bản gốc |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~8.260 chữ, ~46 phút. Viết dày từng cảnh; thêm cuốn sổ và lời từ chối năm xưa (twist), Bành Gia Trạch cố tình xen vào, cảnh bố mẹ ở ch.2; kết bằng chiếc gối làm đường biên thay cảnh đêm cuối |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~59% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, giọng d99082f8 (như tc001–tc008), tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | `anime`, footageOffset 3: vào ở clip anime-04, khác điểm vào của các tập khác cùng tag |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~8.260 chữ, ~46 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: chọn footage `anime` offset 3; gen giọng, build-audio, render YouTube và TikTok (chưa bìa) chạy qua đêm.
- 2026-11-24: thêm ảnh nhân vật bìa (`public/tc018/thumb-bg.jpg`), render thumb.png; bìa TikTok render tự động sau build-audio.
- 2026-11-24: render xong YouTube, 3 phần TikTok, bìa phần và thumb; đã xem khung đầu, cuối; chờ đăng.
- 2026-11-26: đã đăng YouTube; TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
