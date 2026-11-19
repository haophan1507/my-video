# Kho truyện và các tập

AI đọc file này để hiểu "truyện số N" (= `sNNN`) và "tập X" (= `epNNN`) là gì. Cách làm một tập: `SKILL.md`, mục "Làm một tập".

## Quy ước tên

| Thứ | Đường dẫn | Ví dụ |
|---|---|---|
| Truyện nguồn | `stories/sNNN-slug.md` (số tăng mãi, không chia thư mục theo lô) | `stories/s003-ban-than-cuop-nguoi-yeu-cha-nuoi.md` |
| Một tập | `episodes/epNNN-slug/` chứa mọi thứ của tập | `episodes/ep001-ban-than-cuop-nguoi-yeu/` |
| Lệnh | truyền mã ngắn `epNNN`, script tự tìm thư mục | `node scripts/build-audio.mjs ep001` |

Trong thư mục tập: `tap.md`, `outline.md`, `episode.json`, `footage-sources.txt`, `script/` (`chNN.txt`, `chNN.tts.txt`), `audio/` (`chNN.mp3`), `out/` (`youtube.mp4`, `tiktok-NN.mp4`, `thumb.png`, `chapters.txt`). File Remotion tự sinh nằm ở `public/epNNN/`. Tài sản dùng chung cả kênh (câu chào) ở `channel/`.

## Kho nguyên liệu

Tất cả là **bản dịch sát**, chưa viết theo văn phong kênh. Thêm truyện mới: thêm dòng với số tiếp theo, ghi lô. Điểm tự chấm theo `references/truyen.md` mục 2. Phút = số chữ / 180, đo 2026-11-19.

Lô L01 = 10 truyện Zhihu, đọc bằng Chrome của người dùng 2026-11-19, đều đã đọc toàn văn (có chữ kết "完").

| Số | Truyện (`stories/`) | Lô | Thể loại | Điểm | Phút | Tên | Cần làm ở bước 2 |
|---|---|---|---|---|---|---|---|
| s001 | `s001-tram-tinh-me-ba-menh-cach.md` | L01 | Cổ trang, trùng sinh trả thù | 21 | ~42 | Hán Việt | Gộp 22 chương ngắn thành ~9; thêm cliffhanger. Hả hê mạnh |
| s002 | `s002-ngoai-tinh-chong-it-noi.md` | L01 | Hôn nhân, ngoại tình | 20 | ~20 | Việt hóa | Đổi tên Hán Việt; viết dày lên ~35 phút. Kết buồn, hợp tập "ngẫm" |
| s003 | `s003-ban-than-cuop-nguoi-yeu-cha-nuoi.md` | L01 | Bạn thân phản bội | 21 | ~13 | Việt hóa | Đổi tên; ghép hoặc thêm vòng. Chú ý chi tiết "cha nuôi của bạn" |
| s004 | `s004-ba-ngay-dau-khong-duoc-mo-cua-so.md` | L01 | Tâm linh, hình sự | 21 | ~11 | Hán Việt | Ghép với s009 hoặc truyện linh dị khác. Hợp nghe đêm |
| s005 | `s005-thao-thiet-lam-the-than-bao-quan.md` | L01 | Hài cổ trang, nhân vật cực đoan | 23 | ~22 | Hán Việt | Viết dày, thêm vòng; gộp 17 chương. Tín hiệu hài mạnh |
| s006 | `s006-cuoi-vi-loi-ich-vo-chong-ngot.md` | L01 | Hào môn, cưới trước yêu sau | 19 | ~10 | Việt hóa | Đổi tên; ghép với s010 hoặc truyện ngọt khác |
| s007 | `s007-con-gai-sieu-hung-bao-ung-trong-nam-khinh-nu.md` | L01 | Trọng nam khinh nữ, báo thù | 21 | ~19 | Việt hóa | Đổi tên; viết dày; làm nhẹ cảnh nặng (cháy nhà, chết người); viết lại hook mở |
| s008 | `s008-cuoi-chop-nhoang-chong-la-thieu-gia-giau-nhat.md` | L01 | Thân phận ẩn, sủng, vả mặt | 23 | ~19 | Việt hóa | Đổi tên; viết lại hook mở; viết dày lên ~40 phút |
| s009 | `s009-me-goi-dien-trong-toa-nha-song.md` | L01 | Kinh dị đô thị | 18 | ~13 | Việt hóa | Đổi tên; ghép tập (phiên ngoại) |
| s010 | `s010-xuyen-ba-nam-bat-gap-nguoi-yeu-moi.md` | L01 | Xuyên thời gian, tình cảm | 20 | ~12 | Việt hóa | Đổi tên; ghép tập. Kết ấm, không trả thù |

- Lưu ý bước 3: s003, s006, s009, s010 có dòng "Lưu ý" nằm trong thân truyện; không đưa vào `chNN.txt`.
- Còn thiếu: thiên kim thật/giả (bản tìm được bị cắt phần sau hoặc quá dài); mẹ chồng nàng dâu (bản mồi, phần sau trả phí).

## Các tập

| Tập | Truyện | Bước | Giọng | Footage | Hồ sơ |
|---|---|---|---|---|---|

Mỗi tập mới thêm một dòng. "Bước" là bước hiện tại (1–8, hoặc "đã đăng"). Cột Giọng và Footage ghi ngắn lựa chọn của tập để tập sau tham khảo.
