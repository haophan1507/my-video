# ts008: Đêm tân hôn chồng 'chết' rơi xuống vực, tôi gánh trăm triệu nợ cho nhà chồng; trọng sinh, tôi xé váy cưới, rút của hồi môn

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts008, stories/trong-sinh/ts008-chong-gia-chet-de-lai-no.md
- **Bước hiện tại**: 7 (xong)
- **Cập nhật**: 2026-11-21

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Trọng sinh: chồng giả chết, mẹ chồng cũng trọng sinh, em sinh đôi bị lấy thế thân; hả hê, twist kép, kết lạnh |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 5 / 4 / 4 / 5 = 23/25 |
| Hook cả truyện (một câu) | Đêm tân hôn chồng tôi lao xe xuống vực; mười năm sau tôi trả xong ba trăm triệu tệ nợ, cầm giấy ung thư, thấy anh ta còn sống cạnh người cũ; tôi chết rồi mở mắt giữa tiệc đính hôn. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Đêm tân hôn chồng rơi xuống vực, mười năm sau tôi thấy anh ta còn sống, trọng sinh tôi xé váy cưới" 20; B "Trọng sinh giữa tiệc đính hôn, tôi rút hết của hồi môn, để nhà chồng tự gánh nợ" 18; C "Bạch nguyệt quang mặc váy cưới y hệt tôi trèo lan can, lần này tôi không nhường" 18; D 15; E 17. Chọn A, giữ B, C để A/B test (chi tiết ở `outline.md`). |
| Nhân vật: tên → cách gọi cố định | Chân Ngâm (tôi); Nông Khải (chồng sắp cưới, anh sinh đôi, "Khải"); Nông Việt (em sinh đôi thật, bị nhốt viện; kẻ giả gọi "Việt" ở ch.5–6, từ ch.7 gọi "Khải"); Giáp Tĩnh (bạch nguyệt quang, "Tĩnh", "cô ta"); bà Nông (mẹ chồng, không tên riêng); luật sư không tên. 4 tên riêng. |
| Bối cảnh | Trung Quốc hiện đại, tập đoàn Nông thị, khách sạn tổ chức tiệc, sơn trang chân núi Trường Bạch (kiếp trước), viện điều dưỡng ở nước ngoài; tiền là tệ; không ghi năm bằng số. Mốc trọng sinh: ch.1, mười năm trước đêm tân hôn kiếp trước. |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, 8.718 chữ, ~48 phút. Dựng lại từ nguồn ~10.150 chữ Hán: thêm tin nhắn lạ (Tĩnh), chiếc đồng hồ của bà Nông, phép thử tay trái/tay phải, ghi âm trốn tìm hai mươi năm; đổi kết thành thế kẹt hai thân phận; bỏ cảnh phụ sơn trang và nhân vật luật sư. |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~59% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `anime` (kho có sẵn trên máy, không tải thêm) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` trong episode.json; ảnh: do bạn gửi 2026-11-23 (ảnh minh họa cô dâu voan trắng, `raw/ts008-thumb.png` → `public/ts008/thumb-bg.jpg`, đã cắt watermark ở đáy), `thumbFace` 55% 39%; chưa có A/B |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~8.700 chữ, ~48 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-23: chốt giọng d99082f8 tốc độ 1,2, footage tag `anime`; gen cả tập, audio 30:01; chờ ảnh nhân vật cho bìa.
- 2026-11-23: ảnh bìa từ ảnh gửi; render thumb.png và 3 bìa TikTok; chờ render video.
- 2026-11-23: render xong youtube.mp4 (30:02), tiktok-01..03, bìa YouTube và 3 bìa TikTok; đã xem khung đầu và cuối.
