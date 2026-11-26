# ts013: Kiếp trước nhà chồng phá thai tôi rồi đẩy tôi xuống cầu thang; trọng sinh về ngày mẹ chồng đòi giữ hộ sính lễ

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts013, stories/trong-sinh/ts013-nha-chong-day-toi-xuong-cau-thang.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Trọng sinh (mẹ chồng, nhà chồng hút máu) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 3 / 5 / 5 = 22/25 (twist 4 nhờ lý do thật của vụ cầu thang là tiền giải tỏa; độ dài 3 vì ~41 phút từ nguồn thô) |
| Hook cả truyện (một câu) | Mẹ chồng nắm tay tôi đòi giữ hộ sính lễ, nhưng kiếp trước chính đôi tay ấy đã đẩy tôi xuống cầu thang. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | Xem `outline.md`. Chọn A (20/20); giữ A, B, C để A/B test |
| Nhân vật: tên → cách gọi cố định | Bành Tuyết Dao (tôi); Phạm Đình Vỹ (Vỹ); Phạm Tiểu Sa (Tiểu Sa); Mễ Tráng (hắn); Chúc Nhàn (Nhàn); bố mẹ chồng không tên |
| Bối cảnh | Tế Nam hiện đại, nhà tập thể cũ sắp giải tỏa, chi nhánh Tân Gia Ba |
| Độ dài: số chương, phút; cách đủ độ dài | 8 chương, ~7.360 chữ, ~41 phút; bỏ chuỗi lây bệnh, thêm cảnh ngân hàng, cú lật giải tỏa, tờ cam kết, kết quyên tiền (chi tiết trong `outline.md`) |
| Chia phần TikTok | 3 phần: ch.1, ch.2, ch.3–4 (~52% chữ, dừng cuối ch.4); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `craft`, `footageOffset` 2 (phát từ clip 03, 2x; ts001 phát từ clip 01) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` trong episode.json (chưa duyệt); ảnh: do bạn gửi 2026-11-25 (tranh cô gái áo đỏ che khăn (cắt 6% đáy bỏ watermark)), `raw/ts013-thumb.webp` → `public/ts013/thumb-bg.jpg`; chưa có A/B |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 8 chương, ~7.360 chữ, ~41 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1, ch.2, ch.3–4; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-25: gen giọng cả tập, 8 chương, 25:36 (d99082f8, tốc độ 1,2); chưa nghe thử chương 1.
- 2026-11-25: chọn footage `craft` offset 2, kho có sẵn, đã xem lưới khung.
- 2026-11-25: ảnh bìa từ ảnh gửi; render thumb.png và 3 bìa TikTok; chờ duyệt bìa, render video.
- 2026-11-26: render xong bản ngang (25:48) và 3 phần TikTok; đã xem khung đầu, giữa, cuối; chưa nghe thử, chưa đăng.
- 2026-11-26: đã đăng YouTube; TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
