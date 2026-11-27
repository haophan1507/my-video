# ts017: Hôn phu mất tích ngay trước đám cưới để đón người cũ về nước; trọng sinh, tôi gõ cửa nhà đối thủ: Anh Cung, anh có hứng liên hôn không?

- **Truyện nguồn**: ts017, stories/trong-sinh/ts017-vi-hon-the-mat-tich-truoc-dam-cuoi.md
- **Bước hiện tại**: xong 7, chưa đăng
- **Cập nhật**: 2026-11-27

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh, vả mặt, công lý, gia đình) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 4 / 4 / 4 = 21/25 |
| Hook cả truyện (một câu) | "Vị hôn thê của tôi mất tích đúng ngày cưới. Trước khi tìm, tôi gõ cửa nhà người mà tôi tưởng là kẻ thù. Tôi hỏi một câu: Cô Lãnh, cô có hứng liên hôn không?" |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md: A (khoảnh khắc cụ thể + nghịch lý), B (đảo vai), C (kẻ xấu hành động, tôi phản ứng bất ngờ), D (tưởng yếu thế, lật kèo), E (người có quyền cưng chiều); chọn phương án A (19/20); episode.json dùng bản A |
| Nhân vật: tên → cách gọi cố định | Ôn Tuyết Nguyệt (tôi), Cung Sơn Hành (nam chính; "Sơn Hành"; ngôi ba "hắn"), Lãnh Thế Quân (hôn phu; "anh ta"), Ôn Dự Việt (em gái cùng cha khác mẹ, người tình cũ của Thế Quân; "cô ta"), Đoàn Cẩm (bạn đóng kịch), bác Lãnh (mẹ Thế Quân), bố tôi; chi tiết outline.md |
| Bối cảnh | Hiện đại, Hải Thành hiện đại, tiền tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~55 phút (~9.882 chữ); nguồn ~60 phút, chuyển ngôi nam sang nữ, bỏ cảnh thô, thêm hồi tưởng kiếp trước và cảnh nghĩa trang (xem outline.md) |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~61% chữ, dừng ở cú treo); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `cake`, `footageOffset` 3 (mở từ clip 04, khác điểm vào các tập cùng tag); dim 0.15 |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` "Hôn phu bỏ trốn|trước ngày cưới,|tôi *cưới luôn*|*kẻ thù* của anh ta"; ảnh: do bạn gửi 2026-11-26 (nam, mặt 60% 32%), `raw/ts017-thumb.webp` → `public/ts017/thumb-bg.jpg`, thumbZoom 0.7, coverZoom 0.78; chưa có A/B |
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
- 2026-11-23: hoàn thiện kịch bản bước 1-4: 10 chương chuẩn 700-1.100 từ, normalize sạch không lỗi số hay ngoặc, sẵn sàng gen giọng bước 5.
- 2026-11-23: viết lại xong toàn bộ outline và 10 chương (đổi ngôi nam sang nữ, sửa nhầm giới tính nhân vật, bỏ cảnh thô, không đẩy hai kẻ cũ sang Đông Nam Á mà để họ tự chọn). `normalize-vi` sạch; chưa nghe thử, chưa duyệt.
- 2026-11-27: gen giọng, footage `cake` từ clip 04, ảnh bìa; render xong YouTube (33:54), 3 phần TikTok + bìa, thumb; đã xem lướt khung đầu, giữa, cuối.
