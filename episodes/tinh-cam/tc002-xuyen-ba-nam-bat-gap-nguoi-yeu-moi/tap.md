# tc002: Mở mắt ra là ba năm sau, tôi không nhớ người bạn trai bên giường; cưới anh với lời "ai sống phần nấy", đến ngày kỷ niệm tôi tìm thấy ba năm mình đã quên

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc002, stories/tinh-cam/tc002-xuyen-ba-nam-bat-gap-nguoi-yeu-moi.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm: mất ký ức ba năm, thoát người yêu cũ độc hại, cưới trước yêu sau; ngọt, kết ấm |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 5 / 5 = 23/25 (độ dài 4 nhờ ba vòng thêm và cầu nối) |
| Hook cả truyện (một câu) | Tôi mở mắt trong bệnh viện, tin chắc mình hai mươi lăm tuổi và người yêu tên Uông Khải; người đàn ông lạ nói anh là bạn trai tôi; một năm sau tôi cưới anh với điều kiện ai sống phần nấy. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Mở mắt ra đã là ba năm sau, tôi không nhận ra người bạn trai bên giường" 20; B "Mất trí nhớ ba năm, tôi cưới anh với điều kiện ai sống phần nấy" 18; E "Bị người yêu đẩy ngã, tỉnh dậy ba năm sau tôi đã có bạn trai mới" 18; C 16; D 15 (chi tiết ở `outline.md`). Chọn A; A/B với B, E. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Trình Hoan (tôi; Sầm Viễn gọi "Hoan", mẹ anh gọi "Hoan Hoan"); Sầm Viễn (nam chính, ngôi ba "anh"); Uông Khải (người yêu cũ, sau gọi "hắn"); Thôi Linh (bạn hóng hớt, "Linh"); Đổng Đại Hải (chủ quán nướng, "anh Đổng"); mẹ anh (không tên). Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại: Thâm Quyến (quán nướng Phúc Điền) và Hàng Châu (căn hộ ven hồ); kết ở châu Phi; tiền là tệ; không ghi năm bằng số |
| Độ dài: số chương, phút; cách đủ độ dài | 9 chương, ~8.000 chữ, ~44 phút. Gộp hai nguồn (~4.070 chữ), thêm vòng camera cầu thang (ch.3), Uông Khải lợi dụng mất trí nhớ (ch.5), cầu nối cưới do tôi đề nghị và cặp vé châu Phi hết hạn (ch.6–7); dời cảnh núi tuyết và tin nhắn người yêu cũ xuống kết; twist lá thư viết tay của chính tôi trong bó hoa |
| Chia phần TikTok | 3 phần: ch.1, ch.2–3, ch.4–5 (~54% chữ, dừng cuối ch.5); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | minimax, speech-2.8-hd, tốc độ 1,2 (chi tiết ở `voice` trong `episode.json`) |
| Footage: chủ đề, nguồn, tag | tag `sticker-a` (một nguồn, chạy liền), `dim` 0,15, `footageOffset` 0 |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 9 chương, ~8.000 chữ, ~44 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1, ch.2–3, ch.4–5; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: render lại YouTube và 3 phần TikTok với tag `sticker-a`, `dim` 0,15; sửa lỗi tràn RAM ffmpeg ở nền footage dọc; thời lượng khớp audio, độ sáng đã kiểm.
- 2026-11-24: đã đăng YouTube; TikTok chưa đăng.
