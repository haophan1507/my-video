# ts001: Ba mệnh cách bị đánh cắp

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: ts001, stories/trong-sinh/ts001-tram-tinh-me-ba-menh-cach.md
- **Bước hiện tại**: 7
- **Cập nhật**: 2026-11-22

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | Trọng sinh (cổ đại, ba mệnh cách bị trộm, vả mặt, nữ cường đi lên bằng tài thật) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 3 / 4 / 4 = 20/25 (trừ 1 hợp gu vì cổ trang, ngoài phạm vi chuẩn) |
| Hook cả truyện (một câu) | Câu cuối cùng ta nghe trước khi chết là của muội muội ruột thịt: Hoài An ca ca, tỷ ấy còn chưa tắt thở, có cần bổ thêm một nhát nữa không? |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | Xem `outline.md`; chọn A (19/20), giữ B và C để A/B; `episode.json` dùng bản A |
| Nhân vật: tên → cách gọi cố định | Doanh Vãn Ninh (ta); Doanh Lan Nhu (thứ muội, "Lan Nhu"); Đồ Hoài An (vị hôn phu, "Hoài An"); Phục Mộ Yên (bạn khuê phòng, "Mộ Yên"); Huyền Chân (đạo trưởng); Nhạn di nương; lão phu nhân Quốc công phủ; Tiểu Thảo |
| Bối cảnh | Cổ đại, kinh thành, Quốc công phủ, Tề vương phủ, Lễ bộ; tiền là lượng bạc |
| Độ dài: số chương, phút; cách đủ độ dài | 9 chương, ~6.790 chữ, ~38 phút; gộp 12 chương nguồn còn 9, thêm vòng khổ nhục kế trước cổng, bỏ đoạn nữ đế chém đầu thay bằng kết "không giết không cứu" |
| Chia phần TikTok | 3 phần: ch.1–2 (~7,9 phút), ch.3–4 (~8,1 phút), ch.5 (~3,9 phút); ~59% số chữ; dừng ở lúc ta tự gõ cổng Quốc công phủ |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | MiniMax speech-2.8-hd, voice d99082f8, tốc độ 1,2 (cùng các tập ts khác); audio 23:54 |
| Footage: chủ đề, nguồn, tag | `craft`: sổ journal, sticker, washi tape trên bàn kem; một nguồn 62 phút; đã xem contact sheet 4 clip |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: phương án A "Muội muội hỏi: có cần bổ thêm một nhát không? Ta sống lại." (B, C ở nhật ký 2026-11-22, chưa dùng); ảnh: do bạn gửi 2026-11-22 (`raw/ts001-thumb.webp` → `public/ts001/thumb-bg.jpg`), cổ phục hồng dưới hoa anh đào, neo mặt `thumbFace` 46% 36%; chưa có A/B |
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

- 2026-11-22: mở tập.
- 2026-11-22: viết kịch bản bước 1–4 (đã đọc toàn bản dịch nguồn); 9 chương, ~6.790 chữ, ~38 phút; dàn ý và chương chưa duyệt. Đổi hết tên so với bản dịch cũ (họ Doanh, Đồ, Phục).
- 2026-11-22: gen giọng 9 chương (30.715 ký tự), build-audio 23:54 (~286 chữ/phút ở tốc độ 1,2); chọn footage `craft`; render YouTube và 3 phần TikTok (chưa bìa, chưa có ảnh nhân vật).
- 2026-11-22: bìa YouTube và 3 bìa TikTok render xong với chữ A. Chữ dự phòng: B "Ba mệnh cách | bị muội muội trộm. | Sống lại, ta để | *trận pháp phản đòn*"; C "Vị hôn phu, muội muội | *chia nhau mệnh ta*. | Sống lại, ta | *ngoan ngoãn* nhập trận".
- 2026-11-22: render xong youtube.mp4 (23:56, 1920×1080), tiktok-01..03 (4:57, 5:12, 2:29); đã xem khung đầu, giữa, chỗ chuyển clip phút 15 và cuối.
- 2026-11-22: sửa dấu chồng dòng ở chữ bìa (giãn dòng 1,15 → 1,5 trong `src/Thumbnail.tsx`; 1,3 vẫn chạm khi xem bản gốc), render lại thumb và 3 bìa phần.
- 2026-11-22: render lại youtube.mp4, tiktok-01..03 bằng ffmpeg: nền 0,15; footage `craft` tốc độ 2, bỏ 86 giây đầu (mở sổ, lục hộp), vào thẳng cảnh dán; bìa giữ nguyên.
