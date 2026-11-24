# tc017: Chồng đưa đơn ly hôn kèm hồ sơ vay vốn bảo tôi ký như mọi năm; lần này tên tôi đứng sau dòng 'bảo lãnh liên đới hai nghìn tám trăm vạn'

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc017, stories/tinh-cam/tc017-chong-dua-don-ly-hon-kem-ho-so-vay.md
- **Bước hiện tại**: 5
- **Cập nhật**: 2026-11-21

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | `tc`: hôn nhân doanh nghiệp gia đình, chồng ngoại tình gài vợ bảo lãnh nợ, nữ chính tỉnh táo gỡ bẫy, ly hôn |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 4 = 21/25 (dễ nghe 4: nhiều thuật ngữ tài chính, đã đơn giản hóa; ≤ 5 tên riêng) |
| Hook cả truyện (một câu) | Chồng tôi đặt đơn ly hôn lên bàn ăn, ngay cạnh hồ sơ vay vốn: "Như mọi năm thôi, em ký vào chỗ vợ biết là được." Trang cuối, sau tên tôi là dòng chữ: bảo lãnh liên đới hai nghìn tám trăm ba mươi bốn vạn tệ. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Chồng bảo tôi ký như mọi năm, nhưng trang cuối ghi tôi bảo lãnh hai nghìn tám trăm vạn" 20; B nhân tình tự bấm mật mã, mang dép riêng 17; C mười hai năm gánh nợ, tên trên giấy bảo lãnh 17; D chụp lại từng trang, hẹn thứ Sáu gặp ngân hàng 16; E nêu kết 14 (chi tiết ở `outline.md`). Chọn A; A/B: A, B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Sở Tử Hân (tôi; chồng gọi "Tử Hân", mẹ chồng "Hân Hân"); Cao Thiên Dật (chồng; "Thiên Dật", ngôi ba "anh ta"); Phan Nghi (giám đốc tài chính, nhân tình; "Phan Nghi", "cô ta"); Quý Lam (bạn thân, luật sư; "Lam"); chú Trương (bảo vệ kho). Bố mẹ chồng, bác thợ cả, quản lý ngân hàng gọi theo chức danh. Bản nguồn: Giang Vãn, Chu Thừa An, Lâm Mạn, Trình Lam, Tưởng thúc |
| Bối cảnh | Thê Xuyên hiện đại: nhà ở Thê Hồ, xưởng đèn Triều Sinh, ngân hàng Hoa Thành, khách sạn Thanh Hòa, công ty Minh Tự; tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 11 chương, ~11.150 chữ ≈ 62 phút (180 chữ/phút; hơi vượt khung, ở tốc độ giọng 1,2 ngắn hơn). Cắt thuật ngữ tài chính, dồn nhân vật phụ; thêm mốc thời gian của mưu "bảo lãnh trước, ly hôn sau", thư mục hồ sơ "mọi năm" của nữ chính, mẹ chồng lỡ gửi ảnh, bố chồng đứng về phía nữ chính (chi tiết ở `outline.md`) |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~53% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax minimax speech-2.8-hd, giọng d99082f8 (như tc001–tc008), tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | `acrylic`, footageOffset 19: vào ở clip acrylic-20, khác điểm vào của các tập khác cùng tag |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 11 chương, ~11.150 chữ, ~62 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: họ theo giao: nữ chính Sở, nam chính Cao; đổi tên so với nguồn (Giang Vãn, Chu Thừa An, Lâm Mạn thành Sở Tử Hân, Cao Thiên Dật, Phan Nghi).
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: chọn footage `acrylic` offset 19; gen giọng, build-audio, render YouTube và TikTok (chưa bìa) chạy qua đêm.
- 2026-11-24: thêm ảnh nhân vật bìa (`public/tc017/thumb-bg.jpg`), render thumb.png; bìa TikTok render tự động sau build-audio.
- 2026-11-24: render xong YouTube, 3 phần TikTok, bìa phần và thumb; đã xem khung đầu, cuối; chờ đăng.
