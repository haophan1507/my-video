# tc020: Thiên kim giả bị đuổi khỏi hào môn đi làm thư ký, ngày đầu đã ngồi ghế tổng giám đốc xoay vòng; ông tổng thì cười hề hề: 'Cô giỏi hưởng thụ thật!'

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc020, stories/tinh-cam/tc020-thien-kim-gia-lam-thu-ky-tong-giam-doc.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-26

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm hài: thiên kim giả, tổng tài thô bị bắt cóc từ nhỏ, thiên kim thật trà xanh; hài, ngọt, kết ấm |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 5 = 22/25 (twist 4 nhờ thêm sợi dây "ngẩng đầu lên" năm mười sáu tuổi) |
| Hook cả truyện (một câu) | Ngày đầu đi làm thư ký, tôi ngồi lên ghế tổng giám đốc, xoay ba vòng, bảo ông tổng nhường ghế da vì tôi ngồi ghế lưới không quen; ông tổng cười hề hề: Cô giỏi hưởng thụ thật. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Thiên kim giả bị đuổi khỏi hào môn, ngày đầu đi làm tôi đã ngồi lên ghế tổng giám đốc xoay vòng" 19; B "Tôi bắt ông tổng nhường ghế da..." 19; D 18; C 16; E 14 (chi tiết ở `outline.md`). Chọn A; A/B với B, D. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Đoàn Hi Vi (tôi); Lương A Phúc (nam chính, kể "A Phúc", thoại "Lương tổng", ngôi ba "anh"); Đoàn Nhu Mạn (thiên kim thật, "Nhu Mạn"); Sài Dao (đối thủ từ nhỏ, "Dao"); Tưởng Dục (người yêu cũ, "Tưởng Dục"); ba mẹ ruột, ba mẹ nuôi, bà chủ tịch, bác tài, ba ông tổng biệt danh không tên riêng. Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại: Hải Thành, tập đoàn Lương thị, viện làm đẹp, tiệc sinh nhật, công trường; kết ở xưởng sửa xe; tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 8 chương, ~7.900 chữ, ~44 phút. Nguồn ~10.200 chữ Hán nhưng thoại ngắn; viết dày cảnh dạy ông tổng, cảnh clip công trường; cắt cảnh người lớn cuối truyện; thêm twist "ngẩng đầu lên" năm mười sáu tuổi; ngày bị đuổi kể hồi tưởng ở ch.4 |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3, ch.4–5 (~59% chữ, dừng cuối ch.5); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, giọng d99082f8 (như tc001–tc008), tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | `scene`, footageOffset 2: vào ở clip scene-03, khác điểm vào của các tập khác cùng tag |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 8 chương, ~7.900 chữ, ~44 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia TikTok đổi thành 8 phần (mỗi chương một phần) vì ghép hai chương vượt 8 phút.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3, ch.4–5; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: chọn footage `scene` offset 2; gen giọng, build-audio, render YouTube và TikTok (chưa bìa) chạy qua đêm.
- 2026-11-24: thêm ảnh nhân vật bìa (`public/tc020/thumb-bg.jpg`), render thumb.png; bìa TikTok render tự động sau build-audio.
- 2026-11-24: render xong YouTube, 3 phần TikTok, bìa phần và thumb; đã xem khung đầu, cuối; chờ đăng.
- 2026-11-26: đã đăng YouTube; TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
