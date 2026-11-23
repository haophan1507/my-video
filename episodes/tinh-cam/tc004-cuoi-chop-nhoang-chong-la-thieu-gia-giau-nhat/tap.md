# tc004: Cưới chớp nhoáng với anh thợ sửa xe, hóa ra anh là thái tử tập đoàn giàu nhất Hải Thành

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc004, stories/tinh-cam/tc004-cuoi-chop-nhoang-chong-la-thieu-gia-giau-nhat.md
- **Bước hiện tại**: 7 (xong)
- **Cập nhật**: 2026-11-24

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Tình cảm hào môn: thân phận ẩn, cưới chớp nhoáng, vả mặt bạn trai cũ và bạn thân; nữ chính cũng có thân phận ẩn |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 5 = 22/25 (độ dài 4: nguồn chỉ ~19 phút, phải viết dày; dễ nghe 4: 5 tên riêng + mẹ chồng, bố chồng gọi theo chức danh) |
| Hook cả truyện (một câu) | Buổi trưa, bạn trai đá tôi ngay cửa quán cà phê để cưới bạn thân tôi; buổi tối, một người đàn ông lạ hỏi tôi trước cửa Cục dân chính: kết hôn không? Anh nói anh là thợ sửa xe; ba ngày sau, cả sảnh tiệc gọi anh là Nghiêm tổng. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A. Bị bạn trai đá ngay cửa quán cà phê, tối đó tôi cưới luôn anh thợ sửa xe lạ mặt (19); B. Cưới chớp nhoáng anh thợ sửa xe, ba ngày sau cả sảnh tiệc gọi anh là Nghiêm tổng (18); C. Bạn thân cười tôi lấy thợ sửa xe, cho đến khi anh bước vào buổi họp lớp (17); D. Bạn trai bỏ tôi để cưới bạn thân, tôi cưới người lạ trước cửa Cục dân chính (17); E. Mẹ chồng ném tờ séc bắt tôi ly hôn, chồng tôi về nhà với một chiếc nhẫn (13). Chọn A; A/B: A, B, C (chưa duyệt) |
| Nhân vật: tên → cách gọi cố định | Thẩm Chi → Diệp Khê (tôi; "Khê", Doanh Doanh gọi "Khê Khê"); Phó Yến Châu → Nghiêm Cảnh Xuyên ("anh", nhân viên gọi "Nghiêm tổng"); Dư Tử Hiên → Mạc Tử Hàn; Bạch Nhã Lam → Liễu Doanh Doanh ("Doanh Doanh"); bạn cùng phòng → Đường Tiểu Đào ("Tiểu Đào"); Phó phu nhân → Nghiêm phu nhân (xưng ta, gọi cô); bố chồng → chủ tịch Nghiêm; mẹ ruột không tên |
| Bối cảnh | Hải Thành hiện đại; tập đoàn Nghiêm thị, Diệp thị đã phá sản; tôi bán xe ở đại lý ô tô; tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 9 chương, ~8.290 chữ ≈ 46 phút. Viết dày, vá logic (vì sao anh ở Cục dân chính, vì sao giấu thân phận, vì sao Doanh Doanh biết thân thế tôi); thêm vòng ch.3 (cửa hàng xe), ch.8 (tôi giăng bẫy vụ lừa cổ phần), ch.9 (lá thư của mẹ); "đơn ly hôn" thành giấy chuyển trả cổ phần |
| Chia phần TikTok | 3 phần: ch.1, ch.2–3, ch.4–5 (~56% chữ, dừng cuối ch.5); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | minimax, speech-2.8-hd, tốc độ 1,2 (chi tiết ở `voice` trong `episode.json`) |
| Footage: chủ đề, nguồn, tag | tag `sticker-b` (một nguồn, chạy liền), `dim` 0,15, `footageOffset` 0 |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 9 chương, ~8.290 chữ, ~46 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: đổi tên để không trùng tập khác: Giang Ninh → Diệp Khê, Hoắc Cảnh Xuyên → Nghiêm Cảnh Xuyên (Hoắc thị → Nghiêm thị), Giang thị → Diệp thị, Chu Tiểu Đào → Đường Tiểu Đào.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1, ch.2–3, ch.4–5; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: render lại YouTube và 3 phần TikTok với tag `sticker-b`, `dim` 0,15; sửa lỗi tràn RAM ffmpeg ở nền footage dọc; thời lượng khớp audio, độ sáng đã kiểm.
