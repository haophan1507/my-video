# ts005: Bố mẹ ly hôn, chị gái trọng sinh giành theo bố để cướp 'kịch bản vạn người mê' của tôi; tôi vui vẻ theo mẹ đi học

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts005, stories/trong-sinh/ts005-chi-gai-trong-sinh-gianh-chon-bo.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh; hai chị em cùng sống lại, chị ganh tị, nữ chính đi học và làm chip, nam chính hy sinh; ấm và cảm động, twist cuối mạnh) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 5 / 4 / 3 / 4 = 21/25 (dễ nghe 3 vì sáu tên riêng; chủ đề chip nhẹ hơn motif quen) |
| Hook cả truyện (một câu) | "Ngày đính hôn, chị gái tôi cầm dao đâm thẳng vào ngực tôi... Tôi mở mắt, đứng trong phòng hòa giải, đúng ngày bố mẹ ly hôn. Và lần này, chị tôi lao vào lòng bố." (mốc trọng sinh ở ngay hook ch.1) |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md; gợi ý giữ A/B/D; `title` trong episode.json lấy A (19/20); chốt khi đăng |
| Nhân vật: tên → cách gọi cố định | Sài Thư Ý (tôi; mẹ gọi "Ý", Phù Kỳ gọi "Ý Ý"), Sài Ánh (chị), Phù Kỳ (anh), Đặng Lệ Chi, đạo diễn Thương Bân, giáo sư Trì Hạnh, mẹ, bố; chi tiết outline.md |
| Bối cảnh | Bắc Kinh, hiện đại, trường nữ sinh Thục Đức, công ty chip Hằng Tâm, tập đoàn Phù thị; tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 11 chương, ~56 phút (~10.130 chữ); cắt đoạn chuyên môn phòng thí nghiệm; thêm cảnh mẹ và cây đèn, chứng cứ xoài, chìa khóa két của chị, đèn dán sơn vàng |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~52% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8 (cùng giọng câu chào kênh), Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | Hoạt hình Ghibli nấu ăn, bếp nhà, rừng; ấm sáng; tag `anime` (kho có sẵn trên máy, không tải thêm) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: thumbText trong episode.json (sửa và duyệt 2026-11-22); ảnh: do bạn gửi 2026-11-22 (`raw/ts005-thumb.webp` → `public/ts005/thumb-bg.jpg`), neo mặt `thumbFace`; chưa có A/B |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 11 chương, ~10.130 chữ, ~56 phút; dàn ý và chương chưa duyệt. Lưu ý: chương bám khá sát mạch bản gốc, nên xem lại độ khác biệt câu chữ.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-22: chốt giọng (voice d99082f8, tốc độ 1,2, gen cả tập không chờ duyệt ch.1), footage tag `anime`, không teaser; ảnh bìa chờ ảnh nhân vật (gợi ý ở mục Quyết định).
- 2026-11-22: ảnh bìa từ ảnh gửi; viết lại chữ bìa và 3 hook phần TikTok cho rõ nghĩa, ngắt dòng tay.
- 2026-11-22: render xong youtube.mp4 (34:16), tiktok-01..03, bìa YouTube và 3 bìa TikTok; footage `anime` chạy liền.
- 2026-11-22: render lại youtube.mp4, tiktok-01..03 bằng ffmpeg, nền 0,15; bìa giữ nguyên.
- 2026-11-24: đã đăng YouTube; TikTok chưa đăng.
