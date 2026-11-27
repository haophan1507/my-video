# ts018: Ly hôn xong bị nhà chồng bôi nhọ, tôi photo hai trăm bản biên bản của tòa phát cho cả khu

- **Truyện nguồn**: ts018, stories/trong-sinh/ts018-photo-quyet-dinh-ly-hon-phat-ca-khu.md
- **Bước hiện tại**: xong 7, đã đăng YouTube, TikTok chưa đăng
- **Cập nhật**: 2026-11-27

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | ts (trọng sinh góc nhìn người vợ, ly hôn tỉnh táo; chồng ngoại tình có con riêng, mẹ chồng tung tin đồn, nữ chính tự lập) |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 5 / 4 / 4 = 22/25 (giữ điểm khung sau khi đọc toàn văn; twist nâng từ 3 lên 4 vì thêm hai vòng đối đầu mới với mẹ chồng và nhân tình) |
| Hook cả truyện (một câu) | "Một ngày sau khi nhận biên bản hòa giải ly hôn, tôi photo hai trăm bản, gạch đỏ đúng một dòng rồi phát cho cả khu. Dòng đó ghi: chồng tôi có lỗi nghiêm trọng, ngoại tình và làm người thứ ba mang thai." |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | 5 phương án ở outline.md; gợi ý giữ A/B/D để A/B test, `title` trong episode.json lấy A (19/20); chốt khi đăng |
| Nhân vật: tên → cách gọi cố định | Thái Tử Lam (tôi; "Lam"), Từ Dự Châu (chồng; "Dự Châu"; ngôi ba "anh"), Âu Túy Nhi (nhân tình; "Túy Nhi"; "cô ta"), Từ Quỳnh (mẹ chồng; "mẹ chồng"), thím Mai (hàng xóm); chi tiết outline.md |
| Bối cảnh | Thành phố cấp tỉnh phía bắc rồi chuyển sang thành phố phương Nam Hải Vân, Trung Quốc hiện đại, tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 10 chương, ~48 phút (~8.721 chữ); nguồn ~65 phút nên cắt một phần ba, thêm vòng khổ nhục kế của mẹ chồng và tin nhắn xin lỗi của Túy Nhi (xem outline.md) |
| Chia phần TikTok | 3 phần: ch.1, ch.2–3, ch.4–5 (~51% chữ, dừng ở cú treo); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | GenMax, minimax speech-2.8-hd, voice d99082f8, Vietnamese, tốc độ 1,2 |
| Footage: chủ đề, nguồn, tag | tag `cake`, `footageOffset` 6 (mở từ clip 07, khác điểm vào các tập cùng tag); dim 0.15 |
| Ảnh bìa: chữ (3–4 dòng), ảnh nhân vật (link nguồn), phương án A/B | chữ: `thumbText` "Chồng ngoại tình,|tôi photo|*hai trăm bản*|phát cả khu phố"; ảnh: do bạn gửi 2026-11-26 (phụ nữ, mặt 43% 38%), `raw/ts018-thumb.webp` → `public/ts018/thumb-bg.jpg`, thumbZoom 0.66, coverZoom 0.73; chưa có A/B |
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
- 2026-11-23: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 10 chương, ~9.316 chữ, ~52 phút; dàn ý và chương chưa duyệt. Đổi toàn bộ tên so với nguồn (Hiểu Hiểu → Thái Tử Lam, Hứa Trường Minh → Từ Dự Châu, Lâm Vi → Túy Nhi, mẹ chồng → Từ Quỳnh, thầy Trần → Mai Dao). Thêm hai vòng đối đầu mới theo dòng "Cần làm ở bước 2" của nguồn: khổ nhục kế và đòi tiền của mẹ chồng (ch.5), tin đồn đến công ty (ch.6), và vòng đối đầu thứ hai với nhân tình ở quán cà phê (ch.7). Trọng sinh giữ nhẹ, không khoe biết trước mọi thứ.
- 2026-11-23: viết lại toàn bộ outline và 10 chương sau khi soát (bản đầu câu vô nghĩa, lời kể rời rạc). Đổi hook: photo ngay ngày sau khi nhận biên bản hòa giải. `normalize-vi` sạch; chưa nghe thử, chưa duyệt.
- 2026-11-27: gen giọng, footage `cake` từ clip 07, ảnh bìa; render xong YouTube (30:16), 3 phần TikTok + bìa, thumb; đã xem lướt khung đầu, giữa, cuối.
- 2026-11-27: đã đăng YouTube (lên lịch); TikTok chưa đăng. Xóa `out/youtube.mp4` khỏi máy (đã chuyển vào Thùng rác).
