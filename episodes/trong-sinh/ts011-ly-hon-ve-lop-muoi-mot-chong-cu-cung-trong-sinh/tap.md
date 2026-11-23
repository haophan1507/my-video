# ts011: Ly hôn sau bảy năm cưới, cả hai chết trong tai nạn; mở mắt ra tôi về năm lớp mười một, và chồng cũ cũng trọng sinh

- **Truyện nguồn**: ts011, stories/trong-sinh/ts011-ly-hon-ve-lop-muoi-mot-chong-cu-cung-trong-sinh.md
- **Bước hiện tại**: 5 (giọng đọc)
- **Cập nhật**: 2026-11-23

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh kép, cả hai vợ chồng cùng về lớp mười một; hôn nhân sắp đặt, hiểu lầm bệnh viện; ngọt, không có kẻ phản diện rõ) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 4 / 4 / 5 / 4 / 4 = 21/25 (giữ điểm khung sau khi đọc toàn văn; dễ nghe 4 vì có 5 tên riêng, còn Chi Linh và Ngạn An dễ nhầm nên luôn nói rõ tên) |
| Hook cả truyện (một câu) | "Ly hôn xong, tai nạn giết cả hai chúng tôi. Mở mắt tôi đang gục trên bàn giữa giờ thi toán, và người vừa bước vào lớp chính là chồng cũ của tôi." |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md; gợi ý giữ A/B/D để A/B test, `title` trong episode.json lấy A (19/20); chốt khi đăng |
| Nhân vật: tên → cách gọi cố định | Giang Niệm Chi (tôi / "Niệm Chi"), Kiều Ngạn An ("Ngạn An"; ngôi ba "anh"), Tiêu Uyển Uyển ("Uyển Uyển"), Mạc Chi Linh ("Chi Linh"), Thạch Vĩ Hào ("Vĩ Hào"), Kiều Vân Ninh (em gái Ngạn An), Lý Mục (anh họ); bố tôi không đặt tên riêng; chi tiết outline.md |
| Bối cảnh | Trung Quốc hiện đại, thành phố Bình Châu, trường nội trú quốc tế, tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~58 phút (~10.363 chữ); nguồn ~105 phút nên cắt gần một nửa, thêm vòng Chi Linh gây sóng gió, vòng Vĩ Hào và cảnh Lý Mục gặp Chi Linh (xem outline.md) |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5 (~50% chữ, dừng ở cú treo); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | chưa chốt (gợi ý: GenMax, minimax speech-2.8-hd, voice d99082f8 như các tập trước, tốc độ 1,2; giọng nữ trẻ vừa đủ lạnh cho ngôi kể) |
| Footage: chủ đề, nguồn, tag | chưa chốt (tag có trên máy: anime, bento, cook, craft, night, paint, puzzle, scene; gợi ý `night` hợp cảnh bệnh viện và sân thượng, hoặc `craft` cho album ảnh) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` trong episode.json (chưa duyệt); ảnh: chưa có, gợi ý nữ trẻ tóc dài trong váy dạ hội hồng nhìn ống kính, hoặc cặp đôi anh quỳ tay cầm nhẫn; chưa có A/B |
| Teaser TikTok 60–90 giây | chưa chốt |

## Tiến độ

- [x] 1. Chọn truyện
- [x] 2. Dàn ý: `outline.md`
- [x] 3. Viết chương: `script/chNN.tts.txt`
- [x] 4. Soát TTS: báo cáo `normalize-vi.mjs` sạch
- [ ] 5. Giọng: `audio/chNN.mp3`
- [ ] 6. Footage: `public/footage/<tag>/`
- [ ] 7. Render: `out/`

## Nhật ký

- 2026-11-23: mở tập.
- 2026-11-23: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~10.032 chữ, ~56 phút; dàn ý và chương chưa duyệt. Đổi toàn bộ tên so với nguồn (Tô Niệm Sơ → Giang Niệm Chi, Chu Ngạn An → Kiều Ngạn An, Lục Dao → Tiêu Uyển Uyển, Trần Giai Nghi → Mạc Chi Linh, Hứa Từ → Thạch Vĩ Hào, Tô phụ → Giang Kiến Quốc, Chu Vũ Tân → không đặt tên, Lý Mục giữ nguyên vì là anh họ nói miệng nhiều). Bổ sung Mạc Chi Linh thành kẻ gây sóng gió (chiêu đồn đoán trường, chìa ảnh sân thượng bệnh viện, trả lại kẹp tóc bướm) và Thạch Vĩ Hào làm cậu học bá để có mặt đông trong vòng vả mặt; ngoại truyện góc nhìn chồng đặt ở ch.9, kể lại qua lời hắn nói, giữ ngôi thứ nhất.
- 2026-11-23: viết lại toàn bộ outline và 10 chương sau khi soát (bản đầu lủng củng về tuổi, cảnh bệnh viện, lời văn). Chốt lại logic: trọng sinh về mười sáu tuổi; người ở khoa phụ sản kiếp trước là Lý Mục (anh họ Ngạn An) và vợ anh ấy là Chi Linh; Lý Mục và Chi Linh gặp nhau ở sinh nhật. Mỗi chương 955–1.093 chữ, `normalize-vi` sạch, chưa nghe thử, chưa duyệt.
