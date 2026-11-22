# ts006: Bạn thân để quên trang sức cưới trong phòng trang điểm; kiếp trước tôi cất giúp rồi bị vu trộm, kiếp này tôi gọi mẹ chồng cô ta tới kiểm vàng

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts006, stories/trong-sinh/ts006-ban-than-vu-trom-vong-vang-cuoi.md
- **Bước hiện tại**: xong (chờ đăng)
- **Cập nhật**: 2026-11-22

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Trọng sinh: bạn thân vu trộm vàng cưới, em trai cờ bạc, mẹ chồng nhà giàu; vả mặt ngay ngày cưới, kết lặng, ấm nhẹ. Mốc trọng sinh: chiều ngày cưới của bạn thân, bảy tháng trước ngày chết (nêu ở ch.1) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 5 / 5 = 23/25 |
| Hook cả truyện (một câu) | Kiếp trước tôi cất giúp hộp trang sức cưới của bạn thân, bị vu trộm đôi vòng vàng, chết dưới bánh xe tải; kiếp này tôi gọi mẹ chồng cô ta đến kiểm từng món trước mặt mọi người. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Bạn thân để quên vàng cưới, kiếp này tôi gọi mẹ chồng cô ta đến kiểm trước mặt mọi người" 19; B 19; C 17; D 17; E 15 (chi tiết ở `outline.md`). Chọn A; A/B với B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Kha Dao (tôi); Phù Tố Nhi (bạn thân, cô dâu, "Tố Nhi"/"cô ta"); Nhậm Quế Lan (mẹ chồng, "bà Nhậm"); Nhậm Bình (chú rể, "Bình"); Phù Hào (em trai, "Hào"); Quan Cẩn (bạn từ nhỏ, ngôi ba "anh"). Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại, Hải Thành: khách sạn Duyệt Lai, tiệm vàng Hằng Phúc, công ty Ngân Hà; tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 9 chương, ~8.300 chữ, ~46 phút. Bỏ cảnh hack ngân hàng; thêm vòng giả có thai bị lật bằng ảnh tiệc độc thân (ch.6), vòng thư nặc danh ở công ty (ch.7), cảnh kết ngày xe tải đi qua (ch.9) |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5 (~55% chữ, dừng cuối ch.5); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8 (cùng giọng câu chào kênh), Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | Tuyển tập bento, nấu ăn nhìn từ trên xuống; tag `bento` (một nguồn, chạy liền từng clip) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: thumbText trong episode.json (viết lại và duyệt 2026-11-22); ảnh: do bạn gửi 2026-11-22 (`raw/ts006-thumb.webp` → `public/ts006/thumb-bg.jpg`), neo mặt `thumbFace`; chưa có A/B |
| Teaser TikTok 60–90 giây | không |

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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 9 chương, ~8.300 chữ, ~46 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-22: chốt giọng (voice d99082f8, tốc độ 1,2, gen cả tập không chờ duyệt ch.1), footage tag `cook`, không teaser; ảnh bìa chờ ảnh nhân vật (gợi ý ở mục Quyết định).
- 2026-11-22: đổi tag sang `bento` (tag `cook` cũ trộn hai nguồn).
- 2026-11-22: ảnh bìa từ ảnh gửi; viết lại chữ bìa và 3 hook phần TikTok, ngắt dòng tay.
- 2026-11-22: render xong youtube.mp4 (29:22), tiktok-01..03, bìa YouTube và 3 bìa TikTok; footage `bento` chạy liền.
- 2026-11-22: render lại youtube.mp4, tiktok-01..03 bằng ffmpeg, nền 0,15; footage `bento` bỏ 40 giây đầu có phụ đề tiếng Hàn; bìa giữ nguyên.
