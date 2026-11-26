# ts007: Thủ tiết ba mươi năm, chăm bố mẹ chồng liệt giường cho người chồng bỏ đi làm ăn với mối tình đầu; trọng sinh về năm 1986, tôi không làm con dâu hiền nữa

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts007, stories/trong-sinh/ts007-trong-sinh-1986-khong-lam-con-dau-hien.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Trọng sinh niên đại (thập niên tám mươi), ly hôn, thi đại học, làm giàu |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 3 / 3 / 5 / 5 = 21/25 (độ dài hạ từ 4 vì bản gốc mỏng, ~39 phút) |
| Hook cả truyện (một câu) | Chết sau ba mươi năm thủ tiết, nghe chồng nói "không xứng", rồi mở mắt đúng đêm tân hôn năm 1986 |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | Xem `outline.md`; chọn "Sống lại đêm tân hôn, tôi đòi ly hôn ngay sáng hôm sau" (19/20), A/B với phương án 5 |
| Nhân vật: tên → cách gọi cố định | Hồng Quế Chi (tôi); Cốc Đạt (hắn); Kỳ Yên; Lỗ Tiểu Tuệ; Tất Hạo; ông Cốc, bà Cốc; anh Hoàng |
| Bối cảnh | Trung Quốc 1986 đến năm 2000: thành phố công nghiệp, rồi Thượng Hải; mốc trọng sinh nêu ở ch.1 |
| Độ dài: số chương, phút; cách đủ độ dài | 8 chương, ~7.000 chữ, ~39 phút; viết dày cảnh, khép vòng câu "xứng sao?", không kéo thêm |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5 (~62% chữ, dừng cuối ch.5); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8 (cùng giọng câu chào kênh), Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | Hoạt hình Ghibli đêm mưa, tiệm bánh, phố đèn; ấm tối (hợp không khí hoài cổ 1986); tag `night` (kho có sẵn trên máy, không tải thêm) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: thumbText trong episode.json (viết lại và duyệt 2026-11-22); ảnh: do bạn gửi 2026-11-22 (`raw/ts007-thumb.webp` → `public/ts007/thumb-bg.jpg`), neo mặt `thumbFace`; chưa có A/B |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 8 chương, ~7.000 chữ, ~39 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-22: chốt giọng (voice d99082f8, tốc độ 1,2, gen cả tập không chờ duyệt ch.1), footage tag `night`, không teaser; ảnh bìa chờ ảnh nhân vật (gợi ý ở mục Quyết định).
- 2026-11-22: ảnh bìa từ ảnh gửi; viết lại chữ bìa và 3 hook phần TikTok, ngắt dòng tay.
- 2026-11-22: render xong youtube.mp4 (24:03), tiktok-01..03, bìa YouTube và 3 bìa TikTok; footage `night` chạy liền.
- 2026-11-22: render lại youtube.mp4, tiktok-01..03 bằng ffmpeg, nền 0,15; bìa giữ nguyên.
- 2026-11-24: đã đăng YouTube; TikTok chưa đăng.
