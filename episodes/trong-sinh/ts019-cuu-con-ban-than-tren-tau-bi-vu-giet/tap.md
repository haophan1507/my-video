# ts019: Tôi cứu con của bạn thân trên tàu hỏa, rồi bị vu là ấn gãy xương sườn giết đứa bé, bị ném ra khỏi cửa sổ toa

- **Truyện nguồn**: ts019, stories/trong-sinh/ts019-cuu-con-ban-than-tren-tau-bi-vu-giet.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-27

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh, vả mặt, công lý, gia đình) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 4 = 21/25 |
| Hook cả truyện (một câu) | "Nửa tiếng sau khi tôi cứu sống đứa bé, người bạn thân nhất đời tôi gào lên rằng tôi vừa giết con cô ta. Chồng tôi mở một đoạn video tôi chưa từng quay. Rồi một người đàn ông ném tôi ra ngoài cửa sổ toa tàu." |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md: A (khoảnh khắc cụ thể), B (nghịch lý, khoảng trống thông tin), C (đảo vai), D (lật kèo), E (nghịch lý nhẹ); chọn phương án A (19/20); episode.json dùng bản A |
| Nhân vật: tên → cách gọi cố định | Thang Tố Vân (tôi), Sử Chiêm Hoài (chồng), Khương Diễm Uyển (bạn thân), Mạnh Triệt Vĩ (chồng Diễm Uyển), bé Việt Nhi, bác sĩ Địch Hương; chi tiết outline.md |
| Bối cảnh | Trung Quốc hiện đại, bối cảnh chính là một chuyến tàu xanh (tàu chậm) đi Thiên Tân về Vân Châu; tiền là tệ, tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 9 chương, ~6.748 chữ ≈ 37 phút; giữ nhịp phá án trên tàu, đứa bé được cứu (xem outline.md) |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5 (~55% chữ, dừng ở cú treo); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `cake`, `footageOffset` 1 (mở từ clip 02, khác điểm vào các tập cùng tag); dim 0.15 |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` "Cứu con bạn thân,|tôi bị cô ta|*vu giết người*|ngay trên tàu"; ảnh: do bạn gửi 2026-11-26 (phụ nữ, mặt 41% 39%), `raw/ts019-thumb.webp` → `public/ts019/thumb-bg.jpg`, thumbZoom 0.66, coverZoom 0.76; chưa có A/B |
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
- 2026-11-23: viết lại toàn bộ 9 chương (đơn giản hóa văn, logic xương sườn và hộp sữa, Triệt Vĩ lỡ miệng, bé được cứu), normalize sạch, cập nhật outline, episode.json.
- 2026-11-27: gen giọng, footage `cake` từ clip 02, ảnh bìa; render xong YouTube (23:06), 3 phần TikTok + bìa, thumb; đã xem lướt khung đầu, giữa, cuối.
- 2026-11-27: đã đăng YouTube (lên lịch); TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
