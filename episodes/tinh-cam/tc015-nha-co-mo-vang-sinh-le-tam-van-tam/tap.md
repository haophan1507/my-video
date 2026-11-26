# tc015: Yêu tám năm, tôi chưa từng nói nhà mình có mỏ vàng; tôi đòi sính lễ tám vạn tám, bạn trai mắng tôi là đồ hám tiền

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc015, stories/tinh-cam/tc015-nha-co-mo-vang-sinh-le-tam-van-tam.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-26

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm: thân phận ẩn (nữ), phượng hoàng nam và mẹ chồng tương lai coi thường, bạn trai lén xem mắt cưới người khác, vả mặt bằng thân phận; kết ấm, nam phụ chờ |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 5 / 5 = 23/25 (twist 4 nhờ tiền cưới của hắn là tiền cô cho mượn; độ dài 4 nhờ vòng sổ nợ, sao kê, Lăng Xuyên vào sớm) |
| Hook cả truyện (một câu) | Yêu tám năm, đến ngày bàn chuyện cưới, bạn trai nhìn tôi như người đang mặc cả ngoài chợ rồi hỏi: cô dựa vào đâu mà nghĩ yêu tôi tám năm thì đáng giá tám vạn? Anh ta không biết nhà tôi có mỏ vàng. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Tôi đòi sính lễ tám vạn tám, bạn trai mắng tôi hám tiền, anh ta đâu biết nhà tôi có mỏ vàng" 19; B "Yêu tám năm, bạn trai hỏi tôi dựa vào đâu mà đáng giá tám vạn" 18; C "Mẹ bạn trai dọn đồ ăn thừa mời tôi, bà bảo nhà nghèo ăn không nổi đồ tươi" 18; D 17; E 16 (chi tiết ở `outline.md`). Chọn A; A/B với B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Khúc Ngọc Tịch (tôi; gọi "Tịch"); Ứng Gia Huy (bạn trai tám năm, sau gọi "hắn"); bà Ứng (mẹ hắn); Phó Chi (bạn thân hóng hớt, "Chi"); Lăng Xuyên (phó tổng Lăng thị, nam phụ, "Xuyên"); phụ: anh trai Khúc Tuấn, chú Mạnh, chị dâu họ, anh họ, cô vợ mới (không tên). Chưa duyệt |
| Bối cảnh | Trung Quốc hiện đại, Hải Thành; tập đoàn Lăng thị, khoáng nghiệp họ Khúc; tiền là tệ (tám vạn tám, mười tám vạn tám, hai mươi mốt vạn bốn); không ghi năm bằng số |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~8.335 chữ, ~46 phút. Nguồn ~8.870 chữ Hán; thêm vòng sổ nợ và sao kê (twist tiền cưới là tiền cô), Lăng Xuyên vào sớm, thư nhắc nợ giữ chờ hắn ra tù, kết bao lì xì tám mươi tám vạn tám; làm nhẹ cảnh bỏ thuốc, chị dâu họ giữ được con |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3, ch.4–5 (~50% chữ, dừng cuối ch.5); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, giọng d99082f8 (như tc001–tc008), tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | `bento`, footageOffset 2: vào ở clip bento-03, khác điểm vào của các tập khác cùng tag |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~8.335 chữ, ~46 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3, ch.4–5; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: chọn footage `bento` offset 2; gen giọng, build-audio, render YouTube và TikTok (chưa bìa) chạy qua đêm.
- 2026-11-24: thêm ảnh nhân vật bìa (`public/tc015/thumb-bg.jpg`), render thumb.png; bìa TikTok render tự động sau build-audio.
- 2026-11-24: render xong YouTube, 3 phần TikTok, bìa phần và thumb; đã xem khung đầu, cuối; chờ đăng.
- 2026-11-26: đã đăng YouTube; TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
