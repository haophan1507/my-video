# ts002: Ngày rước dâu, bố mẹ bắt tôi lấy cái thai ra dọa nhà chồng đòi thêm năm mươi vạn trả nợ cờ bạc cho em trai; trọng sinh, tôi không để họ hút máu nữa

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts002, stories/trong-sinh/ts002-bo-me-ep-doi-sinh-le-tra-no-cho-em-trai.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh, gia đình hút máu) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 5 / 5 = 23/25 (chấm lại sau khi đọc toàn văn; twist thêm: giọng em dâu ở ngày chết, giấy báo thi) |
| Hook cả truyện (một câu) | Tôi chết ở ba mươi bảy tuổi, rồi mở mắt đúng sáng rước dâu, em trai chặn cửa đòi thêm năm mươi vạn; kiếp trước tôi gật, kiếp này tôi đá |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | Xem `outline.md`; chọn A (19/20): Ngày rước dâu, mẹ bắt tôi lấy cái thai đòi thêm năm mươi vạn, tôi đá thẳng em trai; giữ B, C để A/B |
| Nhân vật: tên → cách gọi cố định | Mâu Ngọc Tịnh (tôi); Úc Dật Hiên (Hiên/anh); Mâu Bảo Khôi (Khôi); Nhậm Sương Nhi (Sương Nhi); Cừu Phi (anh Phi); bố, mẹ; An An; Nhị Lại |
| Bối cảnh | Hải Thành, huyện Bình Tây, hiện đại, tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~8.960 chữ ≈ 50 phút; mỗi bước nguồn thành một vòng, thêm anh Phi, em dâu lộ giọng ngày chết, giấy báo thi ở kết |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~58% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8 (cùng giọng câu chào kênh), Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | Dán sticker vào tranh cảnh có sẵn (nhà, phòng) bằng nhíp, cận cảnh; tag `scene` (một nguồn, chạy liền từng clip) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: thumbText trong episode.json (sửa và duyệt 2026-11-22); ảnh: do bạn gửi 2026-11-22 (`raw/ts002-thumb.webp` → `public/ts002/thumb-bg.jpg`), neo mặt `thumbFace`; chưa có A/B |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~8.960 chữ, ~50 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-22: chốt giọng (voice d99082f8, tốc độ 1,2, gen cả tập không chờ duyệt ch.1), footage tag `craft`, không teaser; ảnh bìa chờ ảnh nhân vật (gợi ý ở mục Quyết định).
- 2026-11-22: bản render đầu không đạt (footage trộn hai nguồn, đổi cảnh 28 giây); đổi tag sang `scene`, footage chạy liền; render lại.
- 2026-11-22: ảnh bìa từ ảnh gửi; viết lại chữ bìa và 3 hook phần TikTok cho rõ nghĩa, ngắt dòng tay.
- 2026-11-22: render xong youtube.mp4 (31:31), tiktok-01..03 (5:42, 6:06, 6:14), bìa YouTube và 3 bìa TikTok; footage `scene` chạy liền.
- 2026-11-22: render lại youtube.mp4, tiktok-01..03 bằng ffmpeg, nền 0,15; bìa giữ nguyên.
- 2026-11-24: đã đăng YouTube; TikTok chưa đăng.
