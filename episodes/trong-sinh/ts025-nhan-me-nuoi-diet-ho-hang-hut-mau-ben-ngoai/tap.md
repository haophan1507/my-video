# ts025: Kiếp trước mẹ nuôi vì nghe cậu xúi mà xé giấy báo nhập học của tôi; trọng sinh về ngày trước kỳ thi đại học, tôi ôm mẹ: 'Mẹ, con không chạy nữa' rồi cùng mẹ trị nhà ngoại hút máu

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts025, stories/trong-sinh/ts025-nhan-me-nuoi-diet-ho-hang-hut-mau-ben-ngoai.md
- **Bước hiện tại**: 5
- **Cập nhật**: 2026-11-23

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh; trọng sinh kép mẹ nuôi cùng con; gia đình thiên vị con trai; mẹ nuôi cưng chiều quá mức; nhà ngoại hút máu) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 5 = 22/25 (đọc toàn văn nguyên văn tiếng Trung; hook rất mạnh vì "xé giấy báo nhập học"; twist lớn là mẹ nuôi cũng trọng sinh, không có trong bản nguồn; dễ nghe 4 vì 6 nhân vật có tên, ngôi một nữ) |
| Hook cả truyện (một câu) | "Kiếp trước tôi chết trong vòng tay của người đã xé giấy báo nhập học của tôi, chỉ vì nghe lời cậu ruột tôi. Lần này tôi mở mắt thấy ngày trước kỳ thi, và tôi ôm mẹ." |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md (A 19, B 18, C 18, D 16, E 15); gợi ý giữ A, B, C để A/B test, `title` trong episode.json lấy A (19/20); chốt khi đăng |
| Nhân vật: tên → cách gọi cố định | Lăng Vân Sương (tôi; mẹ gọi "Vân Sương", sau gọi "bảo bối"), Ô Lăng (mẹ nuôi; "mẹ"), Dương Diệu Thúy (bà ngoại), Dương Khiêm (cậu; "cậu Khiêm"), mợ (không đặt tên riêng); chi tiết outline.md |
| Bối cảnh | Thành phố Vân Châu và ngoại ông, Trung Quốc hiện đại (kỳ thi đại học, xe buýt, nhà máy dệt, xí nghiệp); tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 8 chương, ~36 phút (~6.441 chữ); nguồn ~55 phút nhưng nhiều đoạn kể tóm, ngắn hơn chuẩn 40 phút vì nguồn ngắn (xem outline.md) |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3, ch.4–5 (~63% chữ, dừng ở cú treo); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | chưa chốt (gợi ý: GenMax, minimax speech-2.8-hd, voice d99082f8 như các tập trước, tốc độ 1,2; giọng nữ trẻ trung niên hợp ngôi kể thứ nhất) |
| Footage: chủ đề, nguồn, tag | chưa chốt (gợi ý `scene` hoặc `night` cho cảnh chợ, xe buýt, ban công hội thoại; `cook` cho cảnh nấu mì) |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` trong episode.json (chưa duyệt); ảnh: chưa có, gợi ý nữ trẻ ôm mẹ trung niên hoặc nữ cầm tờ giấy bị xé dán lại; chưa có A/B |
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
- 2026-11-23: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~9.080 chữ, ~50 phút; dàn ý và chương chưa duyệt. Đổi toàn bộ tên so với nguồn (清歌 → Lăng Vân Sương, 刘阿姐 → Ô Lăng, 张翠兰 → Dương Diệu Thúy, 刘轩 → Dương Khiêm). Thêm twist riêng: mẹ nuôi cũng trọng sinh (ch.5), cậu Khiêm là nạn nhân của chính bà ngoại (ch.7–8), không lặp motif mẹ chồng hút máu.
- 2026-11-23: viết lại toàn bộ outline và 8 chương (xóa 2 chương cũ thừa); bỏ giả định mẹ nuôi cũng trọng sinh; cậu tự sa cờ bạc, nữ chính chỉ ngừng giúp. `normalize-vi` sạch; chưa nghe thử, chưa duyệt.
- 2026-11-27: viết lại mở đầu ch.1 theo chuẩn mới (văn án, câu tên kênh, cảnh hành động); chưa duyệt, chưa nghe thử.
- 2026-11-27: viết bù độ dài cho đủ 25 phút (thêm đoạn trong các chương ngắn); chưa duyệt, chưa nghe thử.
- 2026-11-27: soát phần viết bù (dời đoạn chèn sai chỗ, bỏ đoạn trùng, câu thừa); chưa nghe thử.
