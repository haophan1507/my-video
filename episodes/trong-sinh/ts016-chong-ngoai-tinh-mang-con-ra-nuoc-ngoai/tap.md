# ts016: Trọng sinh về ngày mẹ mất, tôi để chồng ngoại tình tự do rồi một mình mang con đi thật xa

- **Truyện nguồn**: ts016, stories/trong-sinh/ts016-chong-ngoai-tinh-mang-con-ra-nuoc-ngoai.md
- **Bước hiện tại**: xong 7, chưa đăng
- **Cập nhật**: 2026-11-27

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh, vả mặt, công lý, gia đình) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 4 = 21/25 |
| Hook cả truyện (một câu) | "Nhân tình của chồng quỳ trước mặt tôi xin thành toàn. Tôi cười nhạt nói được, rồi một mình dẫn con đi thật xa." |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md: A (khoảnh khắc cụ thể, đảo vai), B (trọng sinh, khoảnh khắc cụ thể), C (nghịch lý, bí mật), D (quyết định tỉnh táo), E (khoảnh khắc cụ thể); chọn phương án A (19/20); episode.json dùng bản A |
| Nhân vật: tên → cách gọi cố định | Hàn Vân Chi (tôi; mẹ gọi "Vân Chi"; con gọi "mẹ"), Quách Tần Vũ (chồng; "Tần Vũ"; ngôi ba "anh"), Đường Mộng Nhi (nhân tình; "Mộng Nhi"; "cô ta"), Hàn Uyên Hành (cha; "bố"; ngôi ba "ông"), Quách Phong (con trai mười tuổi; "Phong"); mẹ tôi, dì giúp việc, luật sư không đặt tên riêng; chi tiết outline.md |
| Bối cảnh | Trung Quốc hiện đại, tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~56 phút (~9.993 chữ); nguồn ~126 phút nên cắt khoảng một nửa, bỏ cảnh nằm viện, nhân tình chỉ bị hất cà phê (xem outline.md) |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~59% chữ, dừng ở cú treo); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `cake`, `footageOffset` 0 (mở từ clip 01, khác điểm vào các tập cùng tag); dim 0.15 |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` "Nhân tình quỳ xin|tôi *nhường chồng*.|Tôi gật đầu,|rồi *mang con đi*."; ảnh: do bạn gửi 2026-11-26 (phụ nữ, mặt 46% 36%), `raw/ts016-thumb.webp` → `public/ts016/thumb-bg.jpg`, thumbZoom 0.75, coverZoom 0.68; chưa có A/B |
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
- 2026-11-23: hoàn thiện kịch bản bước 1-4: 11 chương chuẩn 700-1.100 từ, normalize sạch không lỗi số hay ngoặc, sẵn sàng gen giọng bước 5.
- 2026-11-23: viết lại toàn bộ outline và 10 chương sau khi soát (bản đầu nhầm vai, cốt truyện rối, lời kể gián tiếp, 11 chương). Đổi họ con thành Quách (theo cha). `normalize-vi` sạch; chưa nghe thử, chưa duyệt.
- 2026-11-27: gen giọng, footage `cake` từ clip 01, ảnh bìa; render xong YouTube (34:33), 3 phần TikTok + bìa, thumb; đã xem lướt khung đầu, giữa, cuối.
