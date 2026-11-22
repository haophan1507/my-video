# ts003: Mẹ chồng mở van ga giết tôi và con gái mới sinh; trọng sinh về ngày được cầu hôn, tôi hét 'Không cưới!'

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts003, stories/trong-sinh/ts003-me-chong-mo-van-ga-trong-sinh-tu-choi-cau-hon.md
- **Bước hiện tại**: xong (chờ đăng)
- **Cập nhật**: 2026-11-22

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh báo thù; phượng hoàng nam, mẹ chồng độc, "em gái" là tình đầu và con riêng; hả hê, kẻ ác tự hủy) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 5 / 4 / 5 = 23/25 (chấm lại sau khi đọc toàn văn; độ dài 5 vì nguồn ~62 phút, đủ điểm ngoặt; dễ nghe 4 vì có 6 tên riêng) |
| Hook cả truyện (một câu) | gợi ý: "Mẹ chồng tôi đóng kín mọi cửa sổ, rồi mở van ga. Tôi và con gái mới sinh chết ngạt trong phòng ở cữ. Mở mắt ra lần nữa, người chồng ấy đang quỳ một gối trước mặt tôi: Tiểu Vy, lấy anh nhé?" |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md; gợi ý giữ A/C/B để A/B test, `title` trong episode.json lấy A (19/20); chốt khi đăng |
| Nhân vật: tên → cách gọi cố định | Hạ Vy (tôi), Tạ Hoài (hắn; gọi tôi "Tiểu Vy"), Đào Yên, mẹ Tạ Hoài (bà ta), Mộ Châu, chú Lưu (tài xế, gọi "tiểu thư"), bố Hạ Viễn Sơn ("bố"); chi tiết trong outline.md |
| Bối cảnh | Giang Thành, hiện đại, tập đoàn Hạ thị; tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~50 phút (~8.980 chữ); cắt đoạn bình luận, chuyện nghề, làm nhẹ chi tiết bị liệt; thêm vòng bán thảm trên mạng bị Đào Yên đăng ảnh lật kèo (ch.5–6), câu "lần này tôi không ký" (ch.8), ngày giỗ kiếp trước của bố trôi qua bình an |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~59% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8 (cùng giọng câu chào kênh), Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | Tô màu marker tranh khu rừng, cận cảnh tay; tag `paint` (2026-11-22, thay `bake` vì crop quá sâu, không rõ chủ thể) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: thumbText trong episode.json (sửa và duyệt 2026-11-22); ảnh: do bạn gửi 2026-11-22 (`raw/ts003-thumb.webp` → `public/ts003/thumb-bg.jpg`), neo mặt `thumbFace`; chưa có A/B |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~8.980 chữ, ~50 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: đổi tên để không trùng tập khác: Giang Ninh → Hạ Vy, Giang thị → Hạ thị, Giang Viễn Sơn → Hạ Viễn Sơn, Liễu Yên → Đào Yên, Bạch Châu → Mộ Châu, chú Chu → chú Lưu (giữ thành phố Giang Thành).
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-22: chốt giọng (voice d99082f8, tốc độ 1,2, gen cả tập không chờ duyệt ch.1), footage tag `bake`, không teaser; ảnh bìa chờ ảnh nhân vật (gợi ý ở mục Quyết định).
- 2026-11-22: ảnh bìa từ ảnh gửi; viết lại chữ bìa và 3 hook phần TikTok cho rõ nghĩa, ngắt dòng tay.
- 2026-11-22: render xong youtube.mp4 (30:51), tiktok-01..03, bìa YouTube và 3 bìa TikTok; footage `bake` chạy liền.
- 2026-11-22: đổi footage `bake` → `paint` (bake crop còn 38% diện tích, không rõ chủ thể; đã loại khỏi kho); `paint` bỏ 9 giây đầu có chữ kênh gốc; render lại youtube.mp4, tiktok-01..03 bằng ffmpeg, nền 0,15; bìa giữ nguyên.
