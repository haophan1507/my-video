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
- **Truyện gộp từ nhiều nguồn** (ví dụ `tc002`, gộp hai truyện L01): chỉ gộp khi thành một mạch liền (cùng nhân vật, nửa sau nối tiếp nửa trước); một mã, một file, các nguồn ghi ở dòng Nguồn. Không ghép hai truyện khác nhân vật vào một tập.
- **Trạng thái chưa / đang / đã làm** không ghi tay: chạy `node scripts/stories.mjs` (lọc: `--todo`, `--doing`, `--done`, `--genre=tc`). Chưa làm = chưa có thư mục tập; đang làm = có tập, chưa xong 7 bước; đã làm = xong cả 7 bước.

Trong thư mục tập: `tap.md`, `outline.md`, `episode.json`, `script/` (`chNN.tts.txt`), `audio/` (`chNN.mp3`), `out/` (`youtube.mp4`, `tiktok-NN.mp4`, `thumb.png`, `chapters.txt`). File Remotion tự sinh nằm ở `public/<mã>/`. Tài sản dùng chung cả kênh (câu chào) ở `channel/`; footage dùng chung ở `public/footage/<tag>/` (nguồn clip trong `sources.txt` cùng thư mục).

## Kho nguyên liệu

Mọi file truyện cùng một cấu trúc: tiêu đề `# <mã>. <tên>`, các dòng Thể loại, Nguồn, Dạng lưu, Độ dài, Nhân vật, Điểm chấm, Hook gợi ý, Cần làm ở bước 2; mục `## Khung truyện` (5 bước + Kết); dưới đường `---` là văn bản truyện (`## Bản dịch sát (tiếng Việt)` với chương là `###`, hoặc `## Nguyên văn (tiếng Trung)`). Chưa truyện nào viết theo văn phong kênh. Hai dạng lưu: **bản dịch sát** (lô L01) và **khung tiếng Việt + nguyên văn tiếng Trung** (từ lô L02: phần đầu file có motif, nguồn, bảng tên, điểm, hook, khung 5 bước; dưới là bản gốc chưa dịch). Bước 2 lập dàn ý từ khung và bản gốc; không cần dịch sát trước. Thêm truyện mới: chọn thể loại, lấy số tiếp theo của thể loại đó, thêm dòng ở đây, ghi lô. Điểm tự chấm theo `references/truyen.md` mục 2. Phút: L01 = số chữ bản dịch / 180; L02 = ước tính nếu dịch sát. Đo 2026-11-20.

Lô L01 = 10 truyện Zhihu, đọc qua Chrome 2026-11-19, đều đã đọc toàn văn (có chữ kết "完"). Ngày 2026-11-20 loại 3 truyện ngoài phạm vi thể loại (một cổ trang, hai linh dị) khỏi kho; vẫn còn trong lịch sử git (commit `f91c048`, tên cũ s004, s005, s009).

- Lưu ý bước 3: tc002, tc003, tc005 có dòng "Lưu ý" nằm trong thân truyện; không đưa vào `chNN.tts.txt`.

Lô L02 = 43 truyện Zhihu (câu trả lời và chuyên mục miễn phí, đã hoàn), lấy qua Chrome 2026-11-20. 42 tác giả (một tác giả có 2 truyện), 42 câu hỏi và chuyên mục khác nhau. Lọc: còn đủ phần kết (bỏ bài có đuôi "后续/盐选/点击阅读"), ngoài cổ trang, linh dị, mạt thế; 7.000–25.000 chữ Hán; đọc lướt đầu, cuối và các đoạn rải đều để viết khung. Đã loại 7 bài khi đọc: một bài cắt phần kết sang trang trả phí, một bài là bài luận chứ không phải truyện, một bài dừng giữa chừng, hai bài bạo lực gia đình quá nặng, hai bài trùng motif với truyện đã chọn. Mã xếp theo điểm giảm dần trong từng thể loại. Phút = ước tính nếu dịch sát (1 chữ Hán ≈ 1,1 chữ Việt); đa số dài hơn 35–60 phút nên bước 2 phải cắt, không phải viết dày.

| Mã | Truyện (`stories/`) | Lô | Motif | Điểm | Phút | Lưu ý bước 2 |
|---|---|---|---|---|---|---|
| ts001 | `trong-sinh/ts001-tram-tinh-me-ba-menh-cach.md` | L01 | Trọng sinh trả thù, bối cảnh cổ trang | 21 | ~31 | Gộp 12 chương ngắn thành ~9; thêm cliffhanger |
| ts002 | `trong-sinh/ts002-bo-me-ep-doi-sinh-le-tra-no-cho-em-trai.md` | L02 | Gia đình hút máu, em trai nghiện cờ bạc, sính lễ | 23 | ~80 | Rất đúng gu (sính lễ, gia đình thiên vị con trai) |
| ts003 | `trong-sinh/ts003-me-chong-mo-van-ga-trong-sinh-tu-choi-cau-hon.md` | L02 | Phượng hoàng nam ăn bám nhà vợ, mẹ chồng độc, 'em gái' hóa ra là mối tình đầu và con riêng | 22 | ~62 | Hook rất mạnh |
| ts004 | `trong-sinh/ts004-con-nuoi-bac-bao-me-trong-sinh.md` | L02 | Con nuôi bạc bẽo, khởi nghiệp nuôi con, tái hôn ấm áp | 22 | ~111 | Đủ độ dài cho một tập đứng riêng (~18.000 chữ Hán) |
| ts005 | `trong-sinh/ts005-chi-gai-trong-sinh-gianh-chon-bo.md` | L02 | Hai chị em cùng trọng sinh, chọn cha hay mẹ khi ly hôn, chị gái ganh tị | 22 | ~90 | Đủ độ dài đứng riêng |
| ts006 | `trong-sinh/ts006-ban-than-vu-trom-vong-vang-cuoi.md` | L02 | Bạn thân vu oan, em trai nghiện cờ bạc, mẹ chồng nhà giàu | 22 | ~59 | Hook mở cực rõ, hợp TikTok |
| ts007 | `trong-sinh/ts007-trong-sinh-1986-khong-lam-con-dau-hien.md` | L02 | Chồng bỏ đi với mối tình đầu, ly hôn, thi đại học | 22 | ~69 | Bối cảnh thập niên 80 Trung Quốc, cần vài câu giải thích (xuống biển làm ăn, tem phiếu) |
| ts008 | `trong-sinh/ts008-chong-gia-chet-de-lai-no.md` | L02 | Chồng giả chết sống với bạch nguyệt quang, mẹ chồng diễn kịch rút tiền, em chồng sinh đôi đóng thế | 22 | ~62 | Twist nhiều tầng, dễ rối khi nghe: ghi rõ ai là anh, ai là em mỗi lần xuất hiện |
| ts009 | `trong-sinh/ts009-ca-nha-trong-sinh-cuop-ve-so.md` | L02 | Gia đình thiên vị, bạn trai phản bội, vận may 'cá chép'; hóa ra không phải con ruột | 21 | ~59 | Yếu tố 'vận may siêu nhiên' cần giữ nhẹ nhàng |
| ts010 | `trong-sinh/ts010-ban-trai-dam-chet-toi-vi-co-thanh-mai.md` | L02 | Bạn trai có thanh mai, thả cho đi rồi để họ tự hủy | 21 | ~55 | Nam phụ người nước ngoài có thể đổi thành người Hoa du học về |
| ts011 | `trong-sinh/ts011-ly-hon-ve-lop-muoi-mot-chong-cu-cung-trong-sinh.md` | L02 | Hai vợ chồng cùng trọng sinh, hôn nhân sắp đặt hiểu lầm, cưới trước yêu sau (ngược chiều) | 21 | ~105 | Không có kẻ phản diện rõ; cần thêm một nhân vật gây sóng gió (cô gái ở bệnh viện) để có vòng vả mặt |
| ts012 | `trong-sinh/ts012-me-ban-con-gai-lay-sinh-le-cho-em-trai.md` | L02 | Trọng nam khinh nữ, mẹ bán con gái, được hàng xóm nhận nuôi | 21 | ~51 | Gần motif tc006 (trọng nam khinh nữ) nhưng đi theo hướng trọng sinh, không bạo lực; cảnh 'chết sau ba đêm' phải kể thật nhẹ |
| ts013 | `trong-sinh/ts013-nha-chong-day-toi-xuong-cau-thang.md` | L02 | Mẹ chồng và em chồng hút máu, chồng bênh mẹ, giữ tiền | 21 | ~60 | Motif mẹ chồng phổ biến, hợp khán giả Việt |
| ts014 | `trong-sinh/ts014-bo-me-ruot-danh-trao-giay-bao-danh-song-sinh.md` | L02 | Thiên kim thật bị đánh tráo, chị em song sinh, ông nuôi câm thương cháu | 21 | ~47 | Nhiều nhân vật, tên dễ lẫn (Vãn/Loan, Anh); đặt tên Hán Việt mới phân biệt rõ |
| ts015 | `trong-sinh/ts015-bo-me-thuong-gia-de-con-gai-lam-ban-dap.md` | L02 | Trọng nam khinh nữ ngụy trang thành 'thương con gái', con gái là bàn đạp cho em trai, cắt đứt gia đình | 21 | ~51 | Motif 'thương giả' lạ và gây tranh luận, tốt cho bình luận |
| ts016 | `trong-sinh/ts016-chong-ngoai-tinh-mang-con-ra-nuoc-ngoai.md` | L02 | Chồng ngoại tình, cha cũng ngoại tình (hai thế hệ), ly hôn tỉnh táo | 20 | ~126 | Truyện dài nhất lô (~20.600 chữ Hán), nhịp chậm, nặng nội tâm; cần cắt cảnh nằm viện, thêm vòng đối đầu với nhân tình và với cha |
| ts017 | `trong-sinh/ts017-vi-hon-the-mat-tich-truoc-dam-cuoi.md` | L02 | Vị hôn thê ngoại tình với mối tình đầu, liên hôn với đối thủ, vả mặt trên mạng | 20 | ~60 | Ngôi một là nam: cân nhắc giọng đọc nam hoặc chuyển sang ngôi ba |
| ts018 | `trong-sinh/ts018-photo-quyet-dinh-ly-hon-phat-ca-khu.md` | L02 | Chồng ngoại tình có con riêng, mẹ chồng tung tin đồn, ly hôn tỉnh táo | 20 | ~65 | Văn đẹp nhưng ít xung đột ở nửa sau; cần thêm vòng đối đầu với mẹ chồng và Lâm Vi |
| ts019 | `trong-sinh/ts019-cuu-con-ban-than-tren-tau-bi-vu-giet.md` | L02 | Bạn thân và chồng mình ngoại tình gài bẫy, vu oan bác sĩ, phá án trên tàu | 20 | ~51 | Chết trẻ sơ sinh rất nặng; cân nhắc sửa để đứa bé được cứu, kẻ ác bị bắt khi đang ra tay |
| ts020 | `trong-sinh/ts020-nhan-vat-lot-duong-suat-tuyen-thang.md` | L02 | Học bá mồ côi, cậu ấm và tiểu thư bắt nạt, vả mặt bằng thành tích | 19 | ~56 | Bỏ yếu tố 'thế giới trong sách' hoặc giữ một câu; đủ đứng riêng |
| ts021 | `trong-sinh/ts021-me-chong-trong-sinh-doi-tot-voi-con-dau.md` | L02 | Sửa sai, hóa giải mâu thuẫn mẹ chồng nàng dâu, chị gái và con gái xúi bẩy | 18 | ~38 | Ít xung đột: thêm vòng đối đầu với chị gái và con gái |
| ts022 | `trong-sinh/ts022-song-khong-con-chong-nhan-nuoi-con-rieng.md` | L03 | Chồng ép sống không con rồi đưa con riêng về nhờ vợ nuôi, tranh tài sản | 22 | ~58 | Làm nhẹ phần kết; làm rõ mốc trọng sinh |
| ts023 | `trong-sinh/ts023-me-chong-doi-than-vo-doi-phoi-thai-dong-lanh.md` | L04 | Trọng sinh, mẹ chồng và em chồng ăn sạch tài sản, hiến thận | 22 | ~39 | Chương cuối bỏ lửng đúng lúc cao trào |
| ts024 | `trong-sinh/ts024-huy-hon-truoc-dam-cuoi-hai-thang-sau-giac-mong.md` | L04 | Trọng sinh, hôn ước giữa hai nhà, chồng sắp cưới yêu thầm người khác | 22 | ~69 | Điểm quyết định |
| ts025 | `trong-sinh/ts025-nhan-me-nuoi-diet-ho-hang-hut-mau-ben-ngoai.md` | L04 | Trọng sinh, mẹ nuôi cưng chiều quá mức bị nhà ngoại thao túng, báo hiếu | 21 | ~55 | Truyện ấm, ít xung đột bạo lực |
| ts026 | `trong-sinh/ts026-me-chong-gia-bao-cao-hien-than-vo-tu-hai-trong-sinh-dua-vao-tu.md` | L04 | Trọng sinh, mẹ chồng thiên vị con gái, hiến thận | 21 | ~65 | Truyện cùng motif hiến thận với ts? |
| ts027 | `trong-sinh/ts027-o-cu-me-chong-bat-an-gung-chong-lua-hon-bi-dat-len-duong-ray.md` | L04 | Trọng sinh, chồng lừa hôn, mẹ chồng hành hạ ở cữ | 21 | ~66 | Có cảnh giết người dựng thành tự tử |
| ts028 | `trong-sinh/ts028-chong-dua-so-luyen-bau-ve-nha-toi-xin-ly-hon.md` | L04 | Trọng sinh, ngoại tình, mối tình đầu giả vờ khổ nạn | 21 | ~71 | Có cảnh ngã cầu thang, tự sát |
| ts029 | `trong-sinh/ts029-me-chong-cham-o-cu-hai-me-con-trong-sinh-phan-kich.md` | L04 | Trọng sinh, mẹ chồng chăm ở cữ hại mẹ con, mê tín | 21 | ~75 | Bỏ yếu tố 'khí vận' mê tín, thay bằng động cơ đời thường; kể tiết chế cảnh trẻ sơ sinh |
| ts030 | `trong-sinh/ts030-me-chong-huy-trung-tam-o-cu-tong-tien-toi.md` | L04 | Trọng sinh, mẹ chồng keo kiệt thiên vị em chồng, sinh nở | 20 | ~24 | Truyện ngắn, cao trào chính là ván cược 'mẹ có tham tiền không' |
| ts031 | `trong-sinh/ts031-cuoi-ngay-me-chong-va-toi-deu-trong-sinh.md` | L04 | Trọng sinh kép, ngoại tình ngay ngày cưới, mẹ chồng độc | 20 | ~26 | Nhiều nhân vật trọng sinh nên cần giữ một tuyến rõ (tôi vs mẹ chồng) |
| ts032 | `trong-sinh/ts032-bo-chong-danh-me-chong-con-tra-lai-ca-goc-lan-lai.md` | L04 | Trọng sinh, bạo hành gia đình ba đời, chồng nhu nhược vâng lời bố | 20 | ~49 | Chủ đề bạo lực gia đình nặng |
| ts033 | `trong-sinh/ts033-sinh-nhat-15-tuoi-em-trai-doi-cat-banh-truoc.md` | L04 | Trọng sinh, gia đình trọng nam khinh nữ, nữ chính tự lập | 20 | ~67 | Truyện đời thường, ít lật |
| ts034 | `trong-sinh/ts034-chi-gai-doi-het-toi-nhuong-het-trong-sinh-thoi-khong-tranh.md` | L04 | Trọng sinh, bố mẹ thiên vị chị gái ốm yếu, tuyển thẳng đại học | 20 | ~74 | Truyện tự lập tuần tự, không trả thù dữ dội |
| ts035 | `trong-sinh/ts035-ban-trai-tien-si-bao-sieu-cho-tieu-su-muoi.md` | L04 | Trọng sinh, môi trường nghiên cứu, bạn trai hèn | 19 | ~54 | Truyện học đường nghiên cứu, ít xung đột nặng nhưng dài (~8 |
| ts036 | `trong-sinh/ts036-tro-ve-lop-12-du-bao-dau-tu-lang-lau-ho.md` | L04 | Trọng sinh, thanh mai học đường rồi doanh nhân, bạch nguyệt quang | 19 | ~64 | Truyện ngọt nhạt, chỉ cần sửa tên và ít cảnh học đường |
| ts037 | `trong-sinh/ts037-chon-bo-khi-bo-me-ly-hon-troi-tay-voi-con-ghe.md` | L04 | Trọng sinh, mẹ thiên vị con riêng của chồng mới, bạo lực học đường | 19 | ~70 | Có cảnh bắt nạt học đường và đánh nhau (nặng) |
| ts038 | `trong-sinh/ts038-khong-ky-the-chap-nha-cuoi-chong-ngoi-tu.md` | L04 | Trọng sinh, nhà chồng lừa thế chấp nhà hồi môn, em chồng vỡ nợ | 19 | ~106 | Hơi dài (~17 |
| ts039 | `trong-sinh/ts039-bo-chong-vo-hoc-bo-bao-con-trai-sinh-mo-roi-bi-dan.md` | L04 | Trọng sinh, mẹ con, bố chồng vô học 'cha bảo con' | 18 | ~54 | Có cảnh bạo hành thai phụ, trẻ sơ sinh (rất nặng) |
| ts040 | `trong-sinh/ts040-quay-ve-ngay-me-ban-gai-doi-sinh-le-880-nghin.md` | L04 | Trọng sinh (ngôi một nam), sính lễ cao, bạn gái trà xanh giả 'thanh cao' | 18 | ~63 | Ngôi kể nam (cần chuyển sang giọng phù hợp kênh |
| tc001 | `tinh-cam/tc001-ngoai-tinh-chong-it-noi.md` | L01 | Ngoại tình, người có lỗi tự kể, kết buồn | 20 | ~18 | Viết dày lên ~30–35 phút ngay trong truyện; hợp tập "ngẫm" |
| tc002 | `tinh-cam/tc002-xuyen-ba-nam-bat-gap-nguoi-yeu-moi.md` | L01 | Mất ký ức ba năm, thoát quan hệ độc hại, cưới vì thực tế rồi yêu lại (gộp liền mạch với bản cũ tc003) | 22 | ~23 | Viết cầu nối; đảo người nói "ai sống phần nấy"; mục tiêu 30–40 phút |
| tc004 | `tinh-cam/tc004-cuoi-chop-nhoang-chong-la-thieu-gia-giau-nhat.md` | L01 | Thân phận ẩn, cưới chớp nhoáng, vả mặt | 23 | ~19 | Viết lại hook mở; viết dày lên ~40 phút |
| tc005 | `tinh-cam/tc005-ban-than-cuop-nguoi-yeu-cha-nuoi.md` | L01 | Bạn thân cướp người yêu | 21 | ~13 | Base ~13 phút (dưới chuẩn); ngoại lệ vì đang làm tập, dàn ý đã mở lên 39 phút |
| tc006 | `tinh-cam/tc006-con-gai-sieu-hung-bao-ung-trong-nam-khinh-nu.md` | L01 | Trọng nam khinh nữ, báo thù đen tối | 21 | ~18 | Viết dày; làm nhẹ cảnh nặng; lệch thể loại nhất |
| tc007 | `tinh-cam/tc007-nu-luat-su-cuoi-tho-lam-banh.md` | L02 | Cưới hợp đồng, thân phận ẩn (chồng là thiếu gia thế gia), nữ cường | 23 | ~94 | Cấu trúc gần tc004 (chồng nghèo hóa giàu) nhưng đảo vai: nữ chính mạnh, chồng giả nghèo |
| tc008 | `tinh-cam/tc008-chong-nho-lai-tinh-cu-doi-ly-hon.md` | L02 | Liên hôn hào môn, chồng mất trí nhớ rồi nhớ lại mối tình đầu, 'lọ lem' giả tạo | 22 | ~78 | Rất đúng gu truy thê hỏa táng tràng |
| tc009 | `tinh-cam/tc009-me-chong-mac-vay-cuoi-giong-toi.md` | L02 | Mẹ chồng phong kiến, chồng mẹ bảo, xuyên vào mẹ của mẹ chồng để nuôi dạy lại; hài | 22 | ~67 | Cấu trúc 'nhập vai mẹ chồng của mẹ chồng' dễ rối: nói rõ ai là ai ngay chương 2 |
| tc010 | `tinh-cam/tc010-chong-ngoai-tinh-thuc-tap-sinh-do-toi-sap-dat.md` | L02 | Ngoại tình, đồng nghiệp che giấu, vợ âm thầm giăng bẫy | 22 | ~62 | Văn gốc dồn đoạn rất dài, nhiều câu thoại sến; cần cắt |
| tc011 | `tinh-cam/tc011-binh-luan-hien-ra-toi-la-nu-phu.md` | L02 | Liên hôn hào môn, thấy bình luận (đạn mạc) biết trước cốt truyện, đi tìm cách giữ con | 21 | ~109 | Motif 'đạn mạc' mới với khán giả audio: nói rõ từ đầu là 'những dòng chữ bay ngang mắt' |
| tc012 | `tinh-cam/tc012-dong-nghiep-tra-xanh-ngoi-ghe-phu.md` | L02 | Trà xanh đồng nghiệp, bạn trai bám váy, chia tay dứt khoát | 21 | ~45 | Lời thoại gốc rất tục, phải làm sạch nhưng giữ độ 'đanh' |
| tc013 | `tinh-cam/tc013-bach-nguyet-quang-ve-nuoc-toi-co-thai.md` | L02 | Hôn nhân do ơn nghĩa, bạch nguyệt quang về nước, mang thai | 21 | ~58 | Ngược nhẹ, ít vả mặt; cần thêm đối đầu trực tiếp với Lâm Hi |
| tc014 | `tinh-cam/tc014-hoan-doi-linh-hon-voi-chong.md` | L02 | Hoán đổi linh hồn vợ chồng, mẹ chồng khó, em họ trà xanh | 21 | ~55 | Khi nghe, phải nói rõ 'tôi trong thân anh' mỗi cảnh |
| tc015 | `tinh-cam/tc015-nha-co-mo-vang-sinh-le-tam-van-tam.md` | L02 | Thân phận ẩn (nữ), phượng hoàng nam và mẹ chồng tương lai coi thường, bạn trai lén xem mắt cưới người khác | 21 | ~54 | Rất đúng gu (sính lễ, mẹ chồng, phượng hoàng nam) |
| tc016 | `tinh-cam/tc016-ban-trai-gia-ngheo-thu-long.md` | L02 | Bạn trai giả nghèo thử lòng, nữ chính diễn viên vô danh tự vươn lên thành ảnh hậu, showbiz | 21 | ~77 | Nhiều nhân vật showbiz; gom bớt |
| tc017 | `tinh-cam/tc017-chong-dua-don-ly-hon-kem-ho-so-vay.md` | L02 | Hôn nhân doanh nghiệp gia đình, chồng và giám đốc tài chính gài nợ cho vợ, bố mẹ chồng cầm cố nhà | 21 | ~94 | Văn hiện thực, nhiều thuật ngữ tài chính: đơn giản hóa khi viết |
| tc018 | `tinh-cam/tc018-xem-mat-nham-ban-cuoi-giao-su.md` | L02 | Cưới chớp nhoáng, cưới trước yêu sau, giáo sư 'hoa trên núi cao' | 20 | ~45 | Làm sạch câu đùa người lớn; thêm nhân vật gây sóng gió |
| tc019 | `tinh-cam/tc019-chong-bo-vo-theo-nhan-tinh-ung-thu-phoi.md` | L02 | Ngoại tình, chồng bỏ vợ theo nhân tình lớn tuổi, chia tài sản khôn ngoan | 20 | ~60 | Cảnh bắt quả tang trong bản gốc quá lộ liễu, phải kể gián tiếp |
| tc020 | `tinh-cam/tc020-thien-kim-gia-lam-thu-ky-tong-giam-doc.md` | L02 | Thiên kim giả, tổng tài 'thô' bị bắt cóc lên núi từ nhỏ, hài | 20 | ~63 | Giọng hài, nhiều chữ lóng mạng |
| tc021 | `tinh-cam/tc021-nhan-tinh-doi-cuoi-vo-giang-bay.md` | L02 | Ngoại tình, vợ tính kế ngược, giả làm vợ ghen tuông để chồng mất mặt | 20 | ~54 | Nữ chính có người tình trẻ, đạo đức xám: tốt cho bình luận chia phe nhưng cần giữ thiện cảm (cho thấy cô bị lạnh nhạt nhiều năm) |
| tc022 | `tinh-cam/tc022-vo-binh-hoa-duoi-nhan-tinh-streamer.md` | L02 | Vợ trẻ chồng giàu, thỏa thuận tiền hôn nhân, ngoại tình với streamer | 20 | ~45 | Cái chết của chồng mơ hồ (bản gốc không nói rõ nguyên nhân); giữ mơ hồ hoặc nói rõ là bệnh |
| tc023 | `tinh-cam/tc023-ban-than-bat-chuoc-gianh-ban-trai.md` | L02 | Thiên kim giả nhà giàu, trà xanh bắt chước, giành bạn trai | 19 | ~71 | Không có trọng sinh, xếp ts vì motif thiên kim thật/giả; có thể chuyển sang tc |
| tc024 | `tinh-cam/tc024-lay-chong-nhu-lam-thu-ky.md` | L02 | Hôn nhân sắp đặt lạnh nhạt, chồng cuồng việc, thanh mai xen vào | 19 | ~52 | Ít kịch tính; thêm vòng đối đầu với Lâm Tiểu Giác |
| tc025 | `tinh-cam/tc025-chong-hoan-hao-nhu-nguoi-gia.md` | L02 | Hôn nhân nhạt, chồng tự ti thầm yêu, hiểu lầm 'thế thân' | 19 | ~42 | Kể ngôi hai ('bạn'); chuyển về ngôi một khi viết |
| tc026 | `tinh-cam/tc026-kien-chong-cu-tien-nuoi-con.md` | L02 | Đời thường hậu ly hôn, chồng cũ nhu nhược sĩ diện, đòi tiền nuôi con | 18 | ~52 | Ít kịch tính; lấy mạch đòi tiền nuôi con ra tòa làm trục |
| tc027 | `tinh-cam/tc027-co-dau-bi-ban-ve-lang-tra-thu.md` | L02 | Phụ nữ bị lừa bán về làng, giả ngoan, trả thù cả nhà chồng | 18 | ~49 | Nữ chính tự tay giết người: cân nhắc kỹ trước khi làm; nếu làm, đổi thành chồng chết do tai nạn, nữ chính chỉ gom chứng cứ và tự cứu |
| tc028 | `tinh-cam/tc028-bac-si-cap-cuu-cuoi-canh-sat.md` | L02 | Cưới chớp nhoáng, cưới trước yêu sau, nghề nghiệp (bác sĩ | 17 | ~45 | Không có phản diện; thêm xung đột từ nghề |
| tc029 | `tinh-cam/tc029-bo-thua-ke-tam-tram-trieu-hang-xom-hot-boy.md` | L02 | Đổi đời bất ngờ, học đường, hiểu lầm | 17 | ~69 | Lệch phạm vi (học đường); ưu tiên thấp |
| tc030 | `tinh-cam/tc030-ban-than-cuop-ban-trai-chuyen-mot-nghin-trieu.md` | L04 | Trà xanh cướp bạn trai, nữ chính biết trước, bí mật nhà giàu | 24 | ~27 | Hài, nhanh, đủ 25 phút nếu thêm 2 vòng |
| tc031 | `tinh-cam/tc031-hoi-nan-nhan-cua-nhung-nguoi-vo-ban-than-bach-nguyet-quang.md` | L04 | Hôn nhân ẩn, tổng tài giả nghèo, bạch nguyệt quang chung của cả hội | 23 | ~60 | Hài, hơi phim nhiều tuyến (nhiều bà vợ) |
| tc032 | `tinh-cam/tc032-chong-dong-y-ly-hon-de-yeu-bach-nguyet-quang-30-ngay.md` | L04 | Hôn nhân, chồng cho là mình nắm chắc, ly hôn tạm thời để theo đuổi bạch nguyệt quang | 22 | ~65 | Truyện đời thường, nữ chính vừa tỉnh táo vừa được yêu |
| tc033 | `tinh-cam/tc033-mat-that-ban-trai-xu-tra-xanh-hoc-muoi-ban-trai-sach-se.md` | L04 | Tình cảm yêu đương, trà xanh học muội, bạn trai biết bảo vệ bạn gái | 22 | ~74 | Truyện hài, nhẹ, không hôn nhân (hôn ước chưa có) |
| tc034 | `tinh-cam/tc034-vo-nghien-yeu-doi-so-sach-ba-nam-nha-chong.md` | L04 | Hôn nhân, vợ cuồng yêu tỉnh ngộ, mẹ chồng và em chồng hút máu | 21 | ~36 | Truyện hiện thực, không lật nhiều |
| tc035 | `tinh-cam/tc035-an-hon-nam-nam-vo-anh-de-cong-khai-giay-say-thai.md` | L04 | Hôn nhân ẩn, nam chính giả độc thân đi show hẹn hò, sảy thai | 21 | ~77 | Truyện dài (~12 |
| tc036 | `tinh-cam/tc036-bach-nguyet-quang-ve-nuoc-toi-xe-nhat-ky-an-yeu-muoi-nam.md` | L04 | Liên hôn, yêu thầm, bạch nguyệt quang | 20 | ~46 | Có thai bị mất (con 'không kịp gặp') |
| tc037 | `tinh-cam/tc037-say-thai-xong-chong-om-bach-nguyet-quang-len-hot-search.md` | L04 | Hôn nhân sắp đặt, sảy thai, chồng vô tâm | 20 | ~48 | Truyện ngắn, thiên ngược |
| tc038 | `tinh-cam/tc038-nuoc-thanh-thuy-me-chong-me-tin-con-gai-tan-gan.md` | L04 | Hôn nhân, mẹ chồng mê tín, thầy bói giả | 20 | ~52 | Chủ đề trẻ em bị hại nặng |
| tc039 | `tinh-cam/tc039-ung-thu-giai-doan-cuoi-bach-nguyet-quang-doi-chuoi-ngoc.md` | L04 | Hôn nhân, bệnh nặng, bạch nguyệt quang | 20 | ~66 | Kết buồn |
| tc040 | `tinh-cam/tc040-sinh-ra-de-cuu-chi-gai-tim-co-tat-bat-hien-tuy.md` | L04 | Gia đình thiên vị chị bệnh, hiến tủy, nữ chính phát hiện bệnh tim | 20 | ~68 | Nặng về đạo đức gia đình, có chi tiết y học cần kiểm |
| tc041 | `tinh-cam/tc041-hut-mau-hao-mon-la-thien-kim-that-ly-hon-roi-nhan-to.md` | L04 | Thiên kim thật/giả, hôn nhân, chồng ngoại tình | 20 | ~76 | Motif thiên kim thật/giả đã nhiều |
| tc042 | `tinh-cam/tc042-ly-hon-sau-bay-nam-may-tinh-cu-ten-that.md` | L04 | Hôn nhân bảy năm, vợ là kỹ sư cốt lõi bị bỏ lại, chồng ngoại tình với tiểu thư nhà đầu tư | 20 | ~76 | Nhiều thuật ngữ công nghệ |
| tc043 | `tinh-cam/tc043-lien-hon-tuong-kinh-nhu-tan-tu-thay-mong-chong-hon-minh.md` | L04 | Liên hôn, bạch nguyệt quang giả, hiểu lầm | 20 | ~78 | Có cảnh thân mật, lược bỏ |
| tc044 | `tinh-cam/tc044-cha-me-ruot-tang-the-kham-benh-tim-chu-ghep-tuy.md` | L04 | Gia đình, nhận thân, bố mẹ ruột dùng con gái làm kho tủy cho con trai | 20 | ~79 | Motif cận thiên kim thật |
| tc045 | `tinh-cam/tc045-sinh-vien-duoc-tai-tro-cuoi-con-gai-ong-chu-roi-phan-boi.md` | L04 | Hôn nhân sắp đặt, báo ơn thành vô ơn, bạch nguyệt quang | 20 | ~86 | Hơi dài (~14 |
| tc046 | `tinh-cam/tc046-nhan-tinh-chong-tu-nga-cau-thang-vu-oan-toi.md` | L04 | Hôn nhân, chồng ngoại tình với bạch nguyệt quang, giá họa | 20 | ~88 | Hơi dài (~14 |
| tc047 | `tinh-cam/tc047-ba-muoi-ngay-ba-muoi-viec-bao-an-roi-ly-hon-chong.md` | L04 | Hôn nhân, báo ân, vợ vốn là ông chủ ẩn danh | 20 | ~100 | Dài (~16 |
| tc048 | `tinh-cam/tc048-lien-hon-trong-tuyet-anh-yeu-tham-302-lan.md` | L04 | Cưới trước yêu sau, liên hôn hào môn, thầm yêu nhiều năm | 19 | ~20 | Rất ngắn (~3 |
| tc049 | `tinh-cam/tc049-hop-dong-de-thue-trong-ket-sat-chong.md` | L04 | Hôn nhân hợp đồng, đẻ thuê, mối tình đầu | 19 | ~32 | Chủ đề 'đẻ thuê' nhạy cảm |
| tc050 | `tinh-cam/tc050-doc-duoc-tam-tri-chong-khi-xin-ly-hon.md` | L04 | Liên hôn, chồng ít nói thâm tình, đọc tâm | 19 | ~55 | Truyện ngọt, hài, ít xung đột |
| tc051 | `tinh-cam/tc051-xin-chuc-anh-cuoi-vo-moi-sinh-con-nhu-cam-cung.md` | L04 | Ly hôn, nữ chính ung thư giấu bệnh, chồng cũ hối hận | 19 | ~63 | Bi kịch hài đen |
| tc052 | `tinh-cam/tc052-thien-kim-that-tra-thu-nha-ho-ky-doi-than.md` | L04 | Thiên kim thật/giả, gia đình hút máu, nữ chính ẩn mình báo thù | 19 | ~66 | Motif trùng với tc023 và tập thiên kim khác, cần góc riêng |
| tc053 | `tinh-cam/tc053-tham-dinh-nghin-qua-dua-long-nguoi-kho-nhat.md` | L04 | Hôn nhân, nghề 'giám định dưa' (điều tra tình cảm), ngoại tình | 19 | ~66 | Truyện chuyên nghề 'phụ nữ kiểm tra đàn ông', giọng chiêm nghiệm |
| tc054 | `tinh-cam/tc054-sinh-nhat-32-tuoi-chong-ngoai-tinh-ban-than-chia-tai-san.md` | L04 | Hôn nhân năm năm, chồng ngoại tình với bạn thân, vợ tĩnh lặng thu bằng chứng | 18 | ~38 | Truyện ngắn (~6 |
| tc055 | `tinh-cam/tc055-chong-khong-nhac-binh-dau-nau-sup-cho-so-luyen.md` | L04 | Hôn nhân lạnh nhạt, sơ luyến quay về, vợ tỉnh ngộ ly hôn | 18 | ~68 | Ít xung đột, nhẹ nhàng, ngược nam |
| tc056 | `tinh-cam/tc056-chu-cua-ban-than-gia-nghiem-khong-nhan-ra-nguoi-bao-ve.md` | L04 | Tình cảm, hiểu lầm, bạn thân gây chuyện | 18 | ~68 | Lệch phạm vi (không hôn nhân), xếp tập xen kẽ |
| tc057 | `tinh-cam/tc057-chong-gia-mat-tri-nho-thu-long-vo-roi-hoi-han-ca-doi.md` | L04 | Hôn nhân, mất trí nhớ giả, chồng cố chấp | 18 | ~69 | Có cảnh bắt cóc, khống chế (làm nhẹ) |
| tc058 | `tinh-cam/tc058-lien-hon-hai-ben-yeu-tham-chin-nam-khong-biet.md` | L04 | Liên hôn hào môn, hai chiều yêu thầm, hiểu lầm | 18 | ~83 | Truyện chậm, ít xung đột, văn tả nhiều |
| tc059 | `tinh-cam/tc059-nam-nam-chong-ben-bach-nguyet-quang-ba-nam-sau-lam-ben-a.md` | L04 | Hôn nhân, chồng tự tin, bạch nguyệt quang | 18 | ~91 | Dài (~14 |
| tc060 | `tinh-cam/tc060-me-nuoi-doi-doi-doi-gia-san-chuyen-nguyen-vong-nguoi-thang-giai.md` | L04 | Gia đình, mẹ nuôi chiếm đoạt, học bá | 17 | ~51 | Truyện 'cày' thiên về khoa học, ít tình cảm |
| tc061 | `tinh-cam/tc061-gap-lai-so-luyen-khi-dang-bi-chinh-thuc-danh-ghen.md` | L04 | Tình cảm, tái ngộ mối tình đầu, hiểu lầm bị coi là tiểu tam | 17 | ~74 | Chưa đọc kỹ giữa truyện |

- Truyện nặng, cân nhắc kỹ trước khi làm: ts019 (trẻ sơ sinh chết), tc027 (phụ nữ bị bán, nữ chính đầu độc), ts013 (nhà chồng đẩy ngã khi mang thai).
- Ngôi kể lạ: ts017 ngôi một là nam; ts021 ngôi ba (mẹ chồng); tc025 ngôi hai ("bạn"). Chuyển về ngôi một nữ khi viết, hoặc chọn giọng phù hợp.
- Base tối thiểu 15 phút (bản dịch hoặc ước tính dịch sát), đo 2026-11-20: mọi truyện trong kho đạt, trừ tc005 (~13 phút, ngoại lệ vì đang làm tập). Truyện ít kịch tính thì thêm vòng ngay trong truyện, không ghép truyện khác vào.
- Tỷ lệ kho sau L04: `tc` 60, `ts` 40 (100 truyện).

Lô L03 (2026-11-20): gộp liền mạch tc002 với bản cũ tc003 (hai truyện dưới 15 phút; mã tc003 bỏ, nội dung nằm trong file tc002, bản cũ còn trong lịch sử git); thêm ts022 từ Zhihu cho đủ 50.

Lô L04 (2026-11-20) = 50 truyện Zhihu (18 `ts`, 32 `tc`), mở kho lên 100. Nguồn: câu trả lời cho các câu hỏi đề xuất truyện (mỗi câu hỏi và mỗi tác giả khác nhau, không trùng link với L01–L03); lấy qua Chrome từ ~930 câu trả lời ứng viên, chỉ giữ bài có phần kết trọn (loại bài cắt ngang 'điểm tán/ theo dõi để xem tiếp', bài cổ trang, linh dị, hệ thống, thanh mai hai nam đối đầu). Độ dài gốc 3.300–21.800 chữ Hán (≈ 20–140 phút nếu dịch sát), đa số 8.000–14.000 chữ; bài ngắn đủ trọn gần như không có (bài dưới 3.000 chữ trên Zhihu hầu hết là phần đầu, phần sau trả phí), nên ở bước 2 thường phải cắt. Khung tóm từ bản đọc lướt (đầu, cuối, vài đoạn giữa); ts023 và ts026 cùng motif hiến thận (làm một trước); tc033, tc056, tc057, tc060, tc061 lệch phạm vi hoặc ưu tiên thấp (học đường/quan hệ chưa hôn nhân, kết rất bi, motif lạ). Phân bố motif: mẹ chồng và nhà chồng, bạch nguyệt quang/ngoại tình, liên hôn thầm yêu, trà xanh, gia đình thiên vị, thiên kim thật/giả, trọng sinh sửa sai.

## Các tập

Trạng thái và bước hiện tại: `node scripts/stories.mjs` (tính từ file thật). Bảng này chỉ ghi lựa chọn của từng tập để tập sau tham khảo.

| Tập | Giọng | Footage | Hồ sơ |
|---|---|---|---|
| tc005 | minimax speech-2.8-hd, tốc độ 1,2 | `cook` | Base ~13 phút (dưới chuẩn); ngoại lệ vì đang làm tập, dàn ý đã mở lên 39 phút |
| tc001 | chưa chốt | chưa chốt | Base ~18 phút (dưới chuẩn 25–60); sẽ viết dày lên ~30–35 phút |
| tc004 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc007 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts003 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc002 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc006 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc008 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc009 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc010 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc011 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc012 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc013 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc014 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc015 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc016 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc017 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc018 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc019 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc020 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc021 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc022 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc023 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc024 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc025 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc026 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc027 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc028 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc029 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc030 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc031 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc032 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc033 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc034 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts002 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts005 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts006 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts007 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts008 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts009 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts010 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts012 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts013 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts014 | chưa chốt | chưa chốt | mở 2026-11-21 |
| ts015 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc035 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc036 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc037 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc038 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc039 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc040 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc041 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc042 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc043 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc044 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc045 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc046 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc047 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc048 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc049 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc050 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc051 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc052 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc053 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc054 | chưa chốt | chưa chốt | mở 2026-11-21 |
| tc055 | chưa chốt | chưa chốt | mở 2026-11-21 |

Mỗi tập mới thêm một dòng.
