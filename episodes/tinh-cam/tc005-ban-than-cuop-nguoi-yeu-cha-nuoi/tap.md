# tc005: Bạn thân cướp người yêu ngày sinh nhật, người đứng sau cánh cửa là cha nuôi của cô ta

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc005, stories/tinh-cam/tc005-ban-than-cuop-nguoi-yeu-cha-nuoi.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-25

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | tc (bạn thân/trà xanh cướp người yêu; sủng nhẹ, hả hê êm) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 3 / 3 / 5 / 5 = 21/25 (tự chấm; độ dài thấp vì nguồn chỉ ~13 phút) |
| Hook cả truyện (một câu) | gợi ý: "Sinh nhật hai mươi hai tuổi, tôi mở cửa kho và thấy bạn thân đang hôn người yêu tôi. Nhưng người làm tôi gục ngã hôm ấy không phải họ, mà là người đứng sau lưng tôi ở hành lang." |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md; giữ B/A/C để A/B test, chốt khi đăng (người tự làm) |
| Nhân vật: tên → cách gọi cố định | Tô Nhiên (tôi), Cố Dịch, Bạch Uyển Uyển, chú Lục (Lục Thâm), Chu Hân; chi tiết trong outline.md |
| Bối cảnh | Hải Thành, hiện đại, tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 9 chương, ~39 phút (~7.090 chữ); viết dày + 4 vòng mới (đã duyệt 2026-11-20) |
| Chia phần TikTok | 3 phần, ch.1–6 (~63% truyện, 2026-11-21): P1 ch.1–2 (treo: dòng tin cũ bỏ qua bảy năm), P2 ch.3–4 (treo: cả nhóm bàn chuyện chú Lục), P3 ch.5–6 (treo: "camera hành lang đã quay lại tất cả"). Ch.7–9 chỉ ở YouTube. |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | minimax, speech-2.8-hd, tốc độ 1,2 (chi tiết ở `voice` trong `episode.json`) |
| Footage: chủ đề, nguồn, tag | Vẽ acrylic lên đĩa tròn, cận cảnh tay; tag `paint-d` (`public/footage/paint-d/`), cắt từ video painting 2 giờ, đoạn 61:40–98:20; `dim` 0,15, `footageOffset` 0 |
| Teaser TikTok 60–90 giây | |

## Tiến độ

- [x] 1. Chọn truyện
- [x] 2. Dàn ý: `outline.md`
- [x] 3. Viết chương: `script/chNN.tts.txt` (đủ 9 chương, ~7.430 chữ)
- [x] 4. Soát TTS (9 chương): báo cáo sạch
- [x] 5. Giọng: `audio/chNN.mp3`
- [x] 6. Footage: `public/footage/paint-d/`
- [x] 7. Render: `out/`

## Nhật ký

- 2026-11-20: mở tập, chốt truyện nguồn tc005 (21/25); duyệt gợi ý mặc định; viết outline.md (9 chương, 6 phần TikTok, 5 tiêu đề). Chờ duyệt dàn ý rồi viết ch.1.
- 2026-11-20: viết ch01 (735 chữ), chờ duyệt trước khi viết tiếp.
- 2026-11-20: phạm vi demo: chỉ ch.1; chuẩn hóa ch01.tts.txt (750 chữ, ~4,2 phút, không có cảnh báo). Chờ chốt giọng để gen.
- 2026-11-20: gen ch01.mp3 (3.385 credit, minimax speech-2.8-hd, tốc độ 1,2). Chờ nghe duyệt.
- 2026-11-20: footage demo: 3 link TikTok nấu ăn được cung cấp; snaptik.app không mở được nên dùng snaptik.vn; chuẩn hóa 2 clip thành cook-01, cook-02; clip @meromeroko_ có chữ phụ đề nên chưa dùng.
- 2026-11-20: footage chuyển vào `public/footage/cook/` (cook-01, cook-02 bỏ dải đen crop top, còn 844×1080; cook-03 giữ 1080×1920); nguồn chuyển sang `public/footage/cook/sources.txt`. Bản YouTube đổi sang khung ngang 1920×1080: cần render lại `out/youtube.mp4` (bản hiện có là khung dọc cũ).
- 2026-11-20: mẫu bìa mới (ảnh nhân vật + mảng giấy chữ hook); đặt thumbText 3 dòng, thumbTag "Trọn bộ". Còn thiếu ảnh nhân vật.
- 2026-11-20: bỏ chNN.txt, mỗi chương chỉ còn chNN.tts.txt (viết sẵn dạng đọc được); bước 4 thành soát bằng normalize-vi.mjs [--fix].
- 2026-11-21: viết ch02–ch09 (tổng 9 chương, 7.428 chữ ≈ 41 phút); normalize-vi sạch cảnh báo; episode.json: 9 phần TikTok mỗi chương một phần. Chờ chốt giọng để gen.
- 2026-11-21: đổi footage sang chủ đề Sticker (19 clip dọc 576×1024 / 720×1280, 4–13 phút, nguồn `D:\Video Footage\Sticker`), `footageTag` = `sticker`; chuẩn hóa vào `public/footage/sticker/`. Chuẩn bị ảnh bìa từ ảnh người dùng gửi (`prep-thumb`). Còn chờ chốt giọng để gen ch01–ch09.
- 2026-11-21: chốt TikTok 3 phần (ch.1–6, dừng ở cú treo camera hành lang); `episode.json` `parts` còn 3 phần.
- 2026-11-24: render lại YouTube và 3 phần TikTok với tag `paint-d`, `dim` 0,15; sửa lỗi tràn RAM ffmpeg ở nền footage dọc; thời lượng khớp audio, độ sáng đã kiểm.
- 2026-11-24: đã đăng YouTube; TikTok chưa đăng.
