# tc008: Tai nạn xong chồng nhớ lại mối tình đại học và đòi ly hôn; đến khi tôi sảy thai xuất viện, anh ta mới hối hận

<!-- Mẫu hồ sơ tập. Chép thành episodes/<thể-loại>/<mã>-slug/tap.md khi mở tập mới.
     Ô trống = chưa quyết. Ghi "gợi ý: ..." khi đã đề xuất nhưng chưa chốt. -->

- **Truyện nguồn**: tc008, stories/tinh-cam/tc008-chong-nho-lai-tinh-cu-doi-ly-hon.md
- **Bước hiện tại**: 7 (xong)
- **Cập nhật**: 2026-11-24

## Quyết định

| Mục | Giá trị |
|---|---|
| Thể loại | `tc`: liên hôn hào môn, chồng nhớ lại tình đầu, trà xanh showbiz, truy thê hỏa táng tràng, nam phụ thượng vị |
| Điểm: hook / twist / độ dài / dễ nghe / hợp gu (≥ 15/25) | 5 / 4 / 5 / 4 / 5 = 23/25 (độ dài 5: ≥ 8 điểm ngoặt, nguồn ~78 phút; twist 4: khoản chuyển tiền của quỹ từ thiện nằm ở ngoại truyện, đã đưa lên mạch chính ch.10; dễ nghe 4: quan hệ chú cháu kết nghĩa cần giải thích một câu) |
| Hook cả truyện (một câu) | Tỉnh dậy sau tai nạn, việc đầu tiên chồng tôi làm là đòi ly hôn vì vừa nhớ lại mối tình đại học; còn trong túi áo tôi là tờ giấy báo mang thai hai tháng. |
| Tiêu đề YouTube: 5 phương án + điểm, phương án chọn | A "Chồng đòi ly hôn để về với tình đầu, tôi chưa kịp nói mình mang thai hai tháng" 20; B "Tỉnh dậy sau tai nạn, chồng nhớ lại tình đầu và nói tôi làm anh ta ghê tởm" 19; C "Bị chồng bỏ vì tình đầu, người che chở tôi lại là chú của anh ta" 18; D 14; E 16 (chi tiết ở `outline.md`). Chọn A; A/B: A, B, C. Chưa duyệt |
| Nhân vật: tên → cách gọi cố định | Hùng Thanh Dao (tôi; Từ Mặc gọi "Dao Dao"); Tiết Khải (chồng cũ, "anh ta"); Từ Mặc (nam chính, chú kết nghĩa của Tiết Khải, "anh"); Kiều Lộ Lộ (tình đầu, diễn viên, "cô ta"); Kha Bối Bối (bạn thân hóng hớt, "Bối Bối"). Bản nguồn: Quý Thính Nhiên, Tiêu Thuật, Tiêu Thừa Kỷ, Đoạn Khả, Mạnh Xảo Xảo |
| Bối cảnh | Giang Thành hiện đại; biệt thự, tiệc từ thiện quỹ Tinh Hỏa, bệnh viện tư, khách sạn; một đoạn ở vũ hội mặt nạ tại Pa-ri; tiền là tệ |
| Độ dài: số chương, phút; cách đủ độ dài | 11 chương, ~10.900 chữ ≈ 60 phút (180 chữ/phút; ở tốc độ giọng 1,2 thực tế ngắn hơn). Cắt từ ~78 phút: tuần du lịch, cảnh nấu ăn lặp, phần lớn ngoại truyện chồng cũ. Thêm: gieo câu "tiền mua được mọi thứ" ở ch.1 và manh mối logo quỹ ở ch.4, twist khoản chuyển tiền lên ch.10; Từ Mặc xuất hiện từ cuối ch.2; nữ chính quyết định giữ con ba ngày trước khi mất con (kể nhẹ); chú cháu đổi thành kết nghĩa, khác họ |
| Chia phần TikTok | 3 phần: ch.1–2, ch.3–4, ch.5–6 (~55% chữ, dừng cuối ch.6); chi tiết outline.md |
| Giọng: dịch vụ, model, giọng, tốc độ (nguồn chính: `voice` trong `episode.json`) | minimax, speech-2.8-hd, tốc độ 1,2 (chi tiết ở `voice` trong `episode.json`) |
| Footage: chủ đề, nguồn, tag | tag `sticker-c` (một nguồn, chạy liền), `dim` 0,15, `footageOffset` 0 |
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
- 2026-11-21: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; 11 chương, ~10.900 chữ, ~60 phút; dàn ý và chương chưa duyệt.
- 2026-11-21: chia lại TikTok theo chuẩn 3 phần (50–60% truyện): ch.1–2, ch.3–4, ch.5–6; điểm dừng chọn theo tỉ lệ chữ, cần duyệt theo độ tò mò.
- 2026-11-24: render lại YouTube và 3 phần TikTok với tag `sticker-c`, `dim` 0,15; sửa lỗi tràn RAM ffmpeg ở nền footage dọc; thời lượng khớp audio, độ sáng đã kiểm.
