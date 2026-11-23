# ts021: Kiếp trước tôi là mẹ chồng cay nghiệt, chết một mình trong bệnh viện; trọng sinh về ngày cưới của con trai, tôi quyết đối tốt với con dâu

- **Truyện nguồn**: ts021, stories/trong-sinh/ts021-me-chong-trong-sinh-doi-tot-voi-con-dau.md
- **Bước hiện tại**: 5 (giọng đọc)
- **Cập nhật**: 2026-11-23

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh; mẹ chồng trọng sinh về ngày cưới của con trai, quyết đối tốt với con dâu; kẻ xấu là chị gái và con gái xúi bẩy) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 3 / 4 / 4 / 5 = 21/25 (giữ khung sau khi đọc toàn văn; twist tăng nhờ khoá đảo ngôi kể và ba vòng đối đầu mới) |
| Hook cả truyện (một câu) | "Kiếp trước tôi là bà mẹ chồng cay nghiệt, chết một mình trong bệnh viện, ống truyền cắm khắp người, đến đứa con trai ruột cũng không vào thăm một lần. Mở mắt ra, hôm nay là ngày cưới của nó." |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md; gợi ý giữ A/B/D để A/B test, `title` trong episode.json lấy A (19/20); chốt khi đăng |
| Nhân vật: tên → cách gọi cố định | Tần Diệu Bích (tôi, mẹ chồng), Vi Hoài Vân (con dâu; "Hoài Vân", "Vân Vân"), Tưởng Thanh Nguyên (con trai), Tưởng Minh Uyên (con gái), Tần Chi Loan (chị gái); ông Tưởng, bà thông gia không đặt tên riêng; chi tiết outline.md |
| Bối cảnh | Trung Quốc hiện đại, thành phố Thanh Hoa, chợ Hoa Lũ, bệnh viện huyện; tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 8 chương, ~37 phút (~6.570 chữ); nguồn ~38 phút, ngôi một của mẹ chồng, ngắn hơn chuẩn 40 phút vì nguồn ngắn (xem outline.md) |
| Chia phần TikTok | 3 phần: ch.1, ch.2–3, ch.4 (~49% chữ, dừng ở cú treo); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | chưa chốt (gợi ý: GenMax, minimax speech-2.8-hd, voice d99082f8 như các tập trước, tốc độ 1,2; giọng nữ trung niên hợp người kể) |
| Footage: chủ đề, nguồn, tag | chưa chốt (tag có trên máy: anime, bento, cook, craft, night, paint, puzzle, scene; gợi ý `bento` cho cảnh gia đình bàn ăn, hoặc `cook` cho cảnh bếp, chợ) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` trong episode.json (chưa duyệt); ảnh: chưa có, gợi ý người phụ nữ trung niên quỳ xuống trước cô dâu trẻ trong váy cưới, hoặc cặp đôi; chưa có A/B |
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
- 2026-11-23: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 8 chương, ~7.467 chữ, ~41,5 phút; dàn ý và chương chưa duyệt. Đổi toàn bộ tên so với nguồn (Hồng Niệm Đệ → Tần Diệu Bích, Hạ Vân → Vi Hoài Vân, Triệu Dật Xuân → Tưởng Thanh Nguyên, Hồng Chiêu Đệ → Tần Chi Loan, Triệu Nghênh Xuân → Tưởng Minh Uyên). Chuyển ngôi ba của bản gốc thành ngôi một nữ của con dâu theo dòng lưu ý ở `stories/README.md`.
- 2026-11-23: viết lại toàn bộ outline và 8 chương; người kể trả về bà mẹ chồng trọng sinh (bản cũ đổi sang con dâu nên không kể nổi kiếp trước). `normalize-vi` sạch; chưa nghe thử, chưa duyệt.
