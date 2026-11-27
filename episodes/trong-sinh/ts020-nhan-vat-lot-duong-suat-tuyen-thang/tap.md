# ts020: Tôi là nhân vật lót đường trong truyện thanh xuân: vì suất tuyển thẳng mà bị nam chính thuê côn đồ đánh chết

- **Truyện nguồn**: ts020, stories/trong-sinh/ts020-nhan-vat-lot-duong-suat-tuyen-thang.md
- **Bước hiện tại**: xong 7, chưa đăng
- **Cập nhật**: 2026-11-27

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh, vả mặt, công lý, gia đình) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 4 = 21/25 |
| Hook cả truyện (một câu) | "Trước khi chết trong một con hẻm tối, tôi nghe qua điện thoại giọng nam chính lạnh tanh: Chắc chắn Chiêu Tâm không còn là mối đe dọa của Trúc Yên nữa chứ? Lần này tôi sống lại, còn sáu mươi hai ngày trước kỳ thi." |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md: A (khoảnh khắc cụ thể), B (kẻ xấu hành động tệ), C (đảo vai), D (tưởng yếu thế, lật kèo), E (khoảng trống thông tin); chọn phương án A (19/20); episode.json dùng bản A |
| Nhân vật: tên → cách gọi cố định | Chiêu Tâm (tôi), Kỷ Dịch Minh, Kim Trúc Yên, Tiết Hoài Viễn, Lâm Bích Dao; chi tiết outline.md |
| Bối cảnh | Trung Quốc hiện đại (trung học rồi đại học), tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 8 chương, ~5.890 chữ ≈ 33 phút; bỏ "thế giới trong sách", giảm bạo lực (xem outline.md) |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5 (~62% chữ, dừng ở cú treo); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `kitchen`, `footageOffset` 0 (mở từ clip 01, khác điểm vào các tập cùng tag); dim 0.05 |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` "Họ muốn tôi|*biến mất*|trước kỳ thi.|Tôi *đỗ đầu tỉnh*."; ảnh: do bạn gửi 2026-11-26 (nữ sinh, mặt 48% 25%), `raw/ts020-thumb.webp` → `public/ts020/thumb-bg.jpg`, thumbZoom 1.05, coverZoom 0.65; chưa có A/B |
| Teaser TikTok 60–90 giây | chưa chốt |

## Tiến độ

- [x] 1. Chọn truyện
- [x] 2. Dàn ý: `outline.md`
- [x] 3. Viết chương: `script/chNN.tts.txt`
- [x] 4. Soát TTS: báo cáo `normalize-vi.mjs` sạch
- [x] 5. Giọng: `audio/chNN.mp3`
- [x] 6. Footage: `public/footage/<tag>/`
- [x] 7. Render: `out/`

## Nhật ký

- 2026-11-23: mở tập.
- 2026-11-23: hoàn thiện kịch bản bước 1-4: 9 chương chuẩn 700-1.100 từ, normalize sạch không lỗi số hay ngoặc, sẵn sàng gen giọng bước 5.
- 2026-11-23: viết lại toàn bộ 8 chương (bỏ ch.9, mạch bằng chứng rõ, giảm bạo lực), normalize sạch, cập nhật outline, episode.json.
- 2026-11-27: gen giọng, footage `kitchen` từ clip 01, ảnh bìa; render xong YouTube (21:20), 3 phần TikTok + bìa, thumb; đã xem lướt khung đầu, giữa, cuối.
