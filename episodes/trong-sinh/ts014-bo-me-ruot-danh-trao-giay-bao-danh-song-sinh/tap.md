# ts014: Bố mẹ ruột nhận tôi về một tháng trước kỳ thi, rồi đánh tráo giấy báo danh cho em gái song sinh

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts014, stories/trong-sinh/ts014-bo-me-ruot-danh-trao-giay-bao-danh-song-sinh.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh, thiên kim thật bị đánh tráo) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 5 = 22/25 (đọc toàn văn; độ dài chấm 4 vì nguồn ~47 phút; dễ nghe 4 vì hai chị em song sinh dễ lẫn, đã đặt Khuê/Lệ Châu khác âm đầu) |
| Hook cả truyện (một câu) | Tôi chết trên bàn mổ nghe em gái song sinh dặn chờ chết, rồi mở mắt trên xe về nhà ruột, còn một tháng nữa là thi đại học |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | Xem `outline.md`; chọn A (19/20): Bố mẹ ruột nhận tôi về một tháng trước kỳ thi rồi tráo giấy báo danh cho em gái song sinh; giữ B, C để A/B |
| Nhân vật: tên → cách gọi cố định | Cát Khuê (tôi; Khuê Khuê); Cát Lệ Châu (Lệ Châu); ông Tịch (bố nuôi, câm); Bùi Hành (anh); gã Sẹo; bố, mẹ, bà nội không tên |
| Bối cảnh | Ngọc Thành, đại học Sơn Thành, quê ông Tịch, Nhĩ Hải; hiện đại, tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~8.500 chữ ≈ 47 phút; kiếp trước tôi thi hộ dưới tên em, em nhận thủ khoa qua đơn đính chính, bài mẫu thủ khoa nhận ra nét chữ, bố cầm thẻ mười vạn tệ |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~59% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `acrylic`, `footageOffset` 28 (clip 29–31, đoạn chưa tập nào dùng) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` trong episode.json (chưa duyệt); ảnh: do bạn gửi 2026-11-25 (tranh hai cô gái trắng/đỏ (cắt 11% đáy bỏ watermark)), `raw/ts014-thumb.webp` → `public/ts014/thumb-bg.jpg`; chưa có A/B |
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
- 2026-11-25: gen giọng cả tập, 10 chương, 29:40 (d99082f8, tốc độ 1,2); chưa nghe thử chương 1.
- 2026-11-25: chọn footage `acrylic` offset 28, kho có sẵn, đã xem lưới khung.
- 2026-11-25: ảnh bìa từ ảnh gửi; render thumb.png và 3 bìa TikTok; chờ duyệt bìa, render video.
- 2026-11-26: render xong bản ngang (29:53) và 3 phần TikTok; đã xem khung đầu, giữa, cuối; chưa nghe thử, chưa đăng.
- 2026-11-26: đã đăng YouTube; TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
