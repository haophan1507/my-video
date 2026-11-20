# Kho truyện và các tập

AI đọc file này để hiểu "truyện số N" và "tập X" là gì. Cách làm một tập: `SKILL.md`, mục "Làm một tập".

## Quy ước tên

**Một truyện = một tập, dùng chung một mã và một slug.** Mã = **2 chữ thể loại + số thứ tự trong thể loại** (`tc005`). Truyện và tập đều nằm trong thư mục thể loại.

| Thứ | Đường dẫn | Ví dụ |
|---|---|---|
| Truyện nguồn | `stories/<thể-loại>/<mã>-slug.md` | `stories/tinh-cam/tc005-ban-than-cuop-nguoi-yeu-cha-nuoi.md` |
| Tập | `episodes/<thể-loại>/<mã>-slug/` (cùng tên file truyện, bỏ `.md`) | `episodes/tinh-cam/tc005-ban-than-cuop-nguoi-yeu-cha-nuoi/` |
| Lệnh | truyền mã ngắn, script tự tìm thư mục | `node scripts/build-audio.mjs tc005` |

**Chỉ làm hai thể loại** (nguồn duy nhất: `stories/genres.json`; thêm thể loại thì thêm một dòng ở đó và tạo thư mục cùng tên trong `stories/`):

| Mã | Thư mục | Thể loại | Gồm các motif |
|---|---|---|---|
| `ts` | `trong-sinh` | Trọng sinh, trùng sinh (gộp một) | sống lại trả thù, sửa sai, vả mặt gia đình thiên vị, thiên kim thật/giả |
| `tc` | `tinh-cam` | Hôn nhân, tình cảm, trà xanh, ngoại tình | cưới trước yêu sau, hào môn, thân phận ẩn, bạn thân/trà xanh cướp người, ngoại tình, gia đình, báo thù đời thường |

Hào môn và đời thường không phải thể loại riêng; chúng là motif nằm trong `tc`. Ngoài phạm vi: cổ trang, linh dị.

- **Số đếm riêng từng thể loại**, tối thiểu 3 chữ số (`tc001` … `tc999`, quá thì `tc1000`; script nhận từ 3 chữ số trở lên). Truyện mới = số lớn nhất của thể loại đó + 1; không tái dùng số.
- **Mã không đổi sau khi đặt.** Ghép truyện hay đổi ý về motif thì giữ mã cũ, chỉ ghi chú; chỉ chuyển thể loại khi thật sự nhầm (khi đó đổi cả mã và thư mục, sửa `tap.md`).
- **Tập ghép nhiều truyện** (ví dụ `tc002` + `tc003`): lấy mã và slug của truyện chính; truyện còn lại ghi trong `tap.md` ở "Truyện nguồn".
- **Trạng thái chưa / đang / đã làm** không ghi tay: chạy `node scripts/stories.mjs` (lọc: `--todo`, `--doing`, `--done`, `--genre=tc`). Chưa làm = chưa có thư mục tập; đang làm = có tập, chưa xong 8 bước; đã làm = xong cả 8 bước.

Trong thư mục tập: `tap.md`, `outline.md`, `episode.json`, `script/` (`chNN.tts.txt`), `audio/` (`chNN.mp3`), `out/` (`youtube.mp4`, `tiktok-NN.mp4`, `thumb.png`, `chapters.txt`). File Remotion tự sinh nằm ở `public/<mã>/`. Tài sản dùng chung cả kênh (câu chào) ở `channel/`; footage dùng chung ở `public/footage/<tag>/` (nguồn clip trong `sources.txt` cùng thư mục).

## Kho nguyên liệu

Tất cả là **bản dịch sát**, chưa viết theo văn phong kênh. Thêm truyện mới: chọn thể loại, lấy số tiếp theo của thể loại đó, thêm dòng ở đây, ghi lô. Điểm tự chấm theo `references/truyen.md` mục 2. Phút = số chữ / 180, đo 2026-11-19.

Lô L01 = 10 truyện Zhihu, đọc qua Chrome 2026-11-19, đều đã đọc toàn văn (có chữ kết "完"). Ngày 2026-11-20 loại 3 truyện ngoài phạm vi thể loại (một cổ trang, hai linh dị) khỏi kho; vẫn còn trong lịch sử git (commit `f91c048`, tên cũ s004, s005, s009).

| Mã | Truyện (`stories/`) | Lô | Motif | Điểm | Phút | Tên | Cần làm ở bước 2 |
|---|---|---|---|---|---|---|---|
| ts001 | `trong-sinh/ts001-tram-tinh-me-ba-menh-cach.md` | L01 | Trùng sinh trả thù (bối cảnh cổ trang) | 21 | ~42 | Hán Việt | Gộp 22 chương ngắn thành ~9; thêm cliffhanger. Hả hê mạnh |
| tc001 | `tinh-cam/tc001-ngoai-tinh-chong-it-noi.md` | L01 | Hôn nhân, ngoại tình | 20 | ~20 | Việt hóa | Đổi tên Hán Việt; viết dày lên ~35 phút. Kết buồn, hợp tập "ngẫm" |
| tc002 | `tinh-cam/tc002-xuyen-ba-nam-bat-gap-nguoi-yeu-moi.md` | L01 | Xuyên thời gian, tình cảm | 20 | ~12 | Việt hóa | Đổi tên; ghép tập. Kết ấm, không trả thù |
| tc003 | `tinh-cam/tc003-cuoi-vi-loi-ich-vo-chong-ngot.md` | L01 | Hào môn, cưới trước yêu sau | 19 | ~10 | Việt hóa | Đổi tên; ghép với tc002 hoặc truyện ngọt khác |
| tc004 | `tinh-cam/tc004-cuoi-chop-nhoang-chong-la-thieu-gia-giau-nhat.md` | L01 | Thân phận ẩn, sủng, vả mặt | 23 | ~19 | Việt hóa | Đổi tên; viết lại hook mở; viết dày lên ~40 phút |
| tc005 | `tinh-cam/tc005-ban-than-cuop-nguoi-yeu-cha-nuoi.md` | L01 | Bạn thân/trà xanh cướp người yêu | 21 | ~13 | Việt hóa | Đổi tên; ghép hoặc thêm vòng. Chú ý chi tiết "cha nuôi của bạn" |
| tc006 | `tinh-cam/tc006-con-gai-sieu-hung-bao-ung-trong-nam-khinh-nu.md` | L01 | Trọng nam khinh nữ, báo thù (gia đình) | 21 | ~19 | Việt hóa | Đổi tên; viết dày; làm nhẹ cảnh nặng (cháy nhà, chết người); viết lại hook mở. Lệch nhất so với tên thể loại; cân nhắc khi chọn |

- Lưu ý bước 3: tc002, tc003, tc005 có dòng "Lưu ý" nằm trong thân truyện; không đưa vào `chNN.tts.txt`.
- Còn thiếu: thiên kim thật/giả (bản tìm được bị cắt phần sau hoặc quá dài); mẹ chồng nàng dâu (bản mồi, phần sau trả phí). Kho đang nghiêng `tc` (6/7); cần thêm truyện `ts` cho đủ tỷ lệ ở `references/truyen.md` mục 1.

## Các tập

Trạng thái và bước hiện tại: `node scripts/stories.mjs` (tính từ file thật). Bảng này chỉ ghi lựa chọn của từng tập để tập sau tham khảo.

| Tập | Giọng | Footage | Hồ sơ |
|---|---|---|---|
| tc005 | minimax speech-2.8-hd, tốc độ 1,2 | `cook` | `episodes/tinh-cam/tc005-ban-than-cuop-nguoi-yeu-cha-nuoi/tap.md` |

Mỗi tập mới thêm một dòng.
