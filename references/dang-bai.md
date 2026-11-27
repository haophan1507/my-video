# Tiêu đề, ảnh bìa, mô tả (tham khảo)

Không còn là bước của quy trình: việc đăng do người làm tay. File giữ chuẩn tiêu đề và ảnh bìa dùng ở bước 2 và 7, cùng mô tả, caption, lịch để tham khảo khi đăng. Nguồn: trang trợ giúp chính thức của YouTube (đọc 2026-11-19) và kết quả tìm kiếm "truyện audio ngôn tình" cùng ngày; phần nào là ước đoán thì ghi rõ.

## 1. Tiêu đề YouTube

Công thức (từ 2026-11-27): `<hook> | Quýt Nhỏ Audio <số>`, `<số>` 4 chữ số điền lúc đăng (`0001`). Hook đứng đầu để hiện trọn trên điện thoại. Phần đuôi ` | Quýt Nhỏ Audio 0001` dài 22 ký tự, nên hook **tối đa 78 ký tự**. Viết thường kiểu câu, không in hoa cả câu. Ngôi **tôi**, một nghịch lý hoặc đảo vai. Ví dụ: `Chồng đòi ly hôn sau tai nạn để về với tình đầu, tôi đang mang thai 2 tháng | Quýt Nhỏ Audio 0001`.

**Mỗi tập một tiêu đề**, không A/B test. Ghi vào `dang-bai.md` của tập, mục "Tiêu đề YouTube" (đầu file), số để `XXXX`.

Khuôn ưu tiên (quan sát 2026-11-27, video nhiều lượt xem nhất của 5 kênh cùng loại): hai vế "<kẻ làm tổn thương> <hành động>, tôi <rời đi / đáp trả>"; trọng sinh nói thẳng lựa chọn mới ("Kiếp này tôi không cứu, để xem các người ra sao").

Quy tắc:
- **Xung đột trong ~45 ký tự đầu**: điện thoại cắt tiêu đề, YouTube khuyên đặt chữ quan trọng ở đầu.
- **Từ khóa tìm kiếm** của thể loại/motif nằm trong hook, càng sớm càng tốt (ngoại tình, ly hôn, mẹ chồng, trọng sinh, bạch nguyệt quang, thiên kim thật giả, tra nam...); không dùng tên nhân vật (không ai tìm), gọi theo vai (chồng, mẹ chồng, bạn thân).
- Có **tôi** và **một khoảnh khắc hoặc con số cụ thể**; nêu xung đột, **không nêu kết**.
- **Đúng với truyện**: chữ trong tiêu đề phải có thật ở chương 1–2. YouTube đề xuất theo thời lượng xem, nên tiêu đề hứa quá lời thì CTR cao nhưng bị đề xuất ít.
- Cả tiêu đề tối đa 100 ký tự (đếm theo ký tự Unicode dựng sẵn NFC); hạn chế chữ HOA và emoji.

Khuôn hook:
- `<Kẻ xấu> <hành động tệ> ngay trước mặt mọi người, tôi <phản ứng bất ngờ>`
- `Cưới <n> năm, tôi phát hiện <bí mật>, nhưng tôi không khóc`
- `<Kẻ xấu> tưởng tôi <yếu thế>, cho đến khi <lật kèo>`
- `Bị <ai> <bỏ rơi>, <thời gian> sau họ quỳ xuống xin tôi <điều gì>`
- `<Nhân vật quyền lực> <cưng chiều / ghen điên> vì tôi <hành động nhỏ>`
- `Gả thay / Thay <ai> <làm việc>, không ngờ <đối tượng bất ngờ>`

Cách chọn: cân nhắc vài khuôn, chốt thẳng một câu tốt nhất (xung đột sớm, cụ thể, có khoảng trống thông tin, khớp truyện).

## 2. Ảnh bìa (1280×720)

Thông số YouTube: JPG/PNG, 16:9, dưới 2 MB nếu tải từ điện thoại, cần tài khoản đã xác minh. Bìa không được hứa thứ video không có. Bản YouTube là video ngang nên bìa 16:9 hiện ở mọi bề mặt (trang chủ, đề xuất, tìm kiếm).

**Mục tiêu**: ở cỡ thu nhỏ, trong khoảng 1 giây người xem thấy được quan hệ và cảm xúc nhân vật (qua ảnh) và đọc được xung đột (qua chữ).

**Mẫu tham khảo** (quan sát 2026-11-20, các kênh truyện audio ngôn tình có video đạt 40–220 nghìn lượt): ảnh người châu Á đẹp chiếm ~35–40% bề ngang (khung bo hoặc cắt gọn), hoặc cặp đôi trong khoảnh khắc thân mật, căng thẳng, hoặc nữ chính trang phục sang trọng nhìn vào ống kính; phần còn lại (~60–65%) là mảng giấy sáng màu có mép xé, chữ hook in hoa rất to 3–5 dòng, một màu nâu, từ khóa gây sốc đổi màu, gần như trùng tiêu đề; có một chi tiết trang trí nhỏ (đinh ghim, chấm tròn) và nhãn kênh ở góc. Các kênh giữ một mẫu cho mọi video nên cả lưới video nhìn đồng bộ.

### Bố cục chuẩn (composition `Thumbnail`, `src/Thumbnail.tsx`)

Theo bìa mẫu (quan sát 2026-11-20, kênh audio truyện nền ẩm thực, video ~31 phút): nền kem, chữ to bên trái, ảnh khung tròn tràn mép phải, logo kênh trên chữ, nút Subscribe dưới chữ.

| Vùng | Nội dung |
|---|---|
| Nền | Kem ấm (`#FFF6E3` → `#FFE9C2`) toàn khung; hình vẽ mờ màu cam nhạt (vòng tròn, chấm, nốt nhạc, tai nghe) chỉ ở viền cột chữ, không đè chữ và ảnh; hai dải cọ khô cam nhạt nằm ngang: mép trên (trên logo) và mép dưới (sát khung tròn) |
| Phải ~43% | Ảnh nhân vật (`thumbBg`) trong khung tròn đường kính 1.040 px, tâm (1250, 360): mép trái x = 730, phủ kín mép phải, trên, dưới (không hở góc); vai phụ, chữ là trọng tâm; viền cọ khô cam ôm phía trái khung (nét chính 34 px + một nét mảnh khô lệch ra ngoài); chỉ thấy nửa trái khung (x 730–1.280) nên đặt mặt bằng `thumbFace` (mục Neo mặt dưới); `thumbFocus` chỉ dùng khi không có `thumbFace` |
| Trái: logo | Logo kênh (`watermark` trong `channel/channel.json`) cao 150 px, căn giữa cột chữ, trên cùng |
| Trái: hook | `thumbText`: in hoa, font Paytone One, một màu nâu đậm `#3B1F10`, căn giữa cột (x 30–700, y 196–516), cỡ tối đa 110 px; không có `\|` thì tự thử mọi độ rộng dòng và chọn cách ngắt cho cỡ chữ lớn nhất, có `\|` thì giữ cách ngắt tay; `*cụm*` tô đỏ quýt `#E2452E`, 0–2 cụm mỗi bìa |
| Trái: nhãn phụ | `thumbTag` dưới hook, mặc định "Audio Full" (2026-11-27), màu nhấn |
| Trái: nút | Nút đỏ viền trắng "SUBSCRIBE" + ngón tay trỏ bấm vào, dưới cùng cột chữ |
| Góc dưới phải | Thuộc ảnh: YouTube đặt nhãn thời lượng ở đây, không đặt chi tiết quan trọng của ảnh vào góc này |

### Neo mặt (`thumbFace`, 2026-11-22)

Khung tròn bìa YouTube chỉ lộ nửa trái; với ảnh dọc, `thumbFocus` (object-position) không dời ngang được nên mặt ở giữa ảnh bị cắt (quan sát ts002, ts003, ts005). Ghi vị trí mặt trong ảnh `"thumbFace": "x% y%"` (tâm mặt, đo trên ảnh gốc): bìa đặt điểm đó vào giữa phần khung nhìn thấy, bìa YouTube tại (1.000, 330), bìa TikTok tại (540, 1.350). Cỡ ảnh: `thumbZoom` (bề rộng ảnh / đường kính khung, mặc định 1) và `coverZoom` (mặc định 0,72); `coverFace` để khác vị trí ở bìa TikTok. Luôn xem trước bìa và cả 3 bìa phần (`npx remotion still ... --scale=0.3`): mặt trọn, không hở nền trong phần khung nhìn thấy.

**Zoom và căn mặt** (2026-11-26): đo tâm mặt (hoặc tâm cụm mặt khi có hai người, mẹ con) bằng lưới 10% trên ảnh gốc, ghi `thumbFace`; mặt nằm giữa phần khung nhìn thấy. Zoom ra tối đa để thấy rộng bối cảnh: chọn `thumbZoom`, `coverZoom` nhỏ nhất mà ảnh vẫn phủ kín phần khung nhìn thấy, cộng 4% dư. Với ảnh rộng w, cao h, a = h/w, mặt ở (fx, fy) tính theo tỉ lệ:
- YouTube: `thumbZoom` = max(270/fx, 280/(1−fx), 330/(fy·a), 390/((1−fy)·a)) / 1040 × 1,04.
- TikTok: `coverZoom` = max(540/fx, 540/(1−fx), 260/(fy·a), 570/((1−fy)·a)) / 1800 × 1,04.
Ảnh có mặt quá sát mép trên thì zoom buộc phải lớn (ts020: 1,05); muốn rộng hơn thì chọn ảnh có khoảng trống trên đầu.

Hook phần: viết thành câu có dấu phẩy, dấu chấm cho rõ ai làm gì; ngắt dòng tay bằng `|` theo cụm nghĩa, dòng dài nhất ≤ ~18 ký tự để chữ đủ to (cỡ chữ theo dòng dài nhất).

### Ảnh nhân vật

Tiêu chí, theo thứ tự ưu tiên:
1. **Kể đúng quan hệ chính của truyện**: truyện tình cảm dùng cặp đôi (ôm từ sau, kéo tay, áp sát, ánh mắt giằng co); truyện nữ cường, trọng sinh dùng một nữ chính khí chất (váy dạ hội, sườn xám, cổ phục khi bối cảnh cổ trang). Tình tiết bìa phải có trong truyện.
2. **Sinh động**: chụp giữa một hành động hoặc cảm xúc (quay đầu, chạm tay, tóc hoặc váy chuyển động, nhìn thẳng ống kính có thần). Không dùng ảnh đứng tạo dáng tĩnh, mặt vô cảm.
3. **Người châu Á, đẹp, chỉn chu**: ảnh chụp kiểu phim điện ảnh hoặc minh họa bán thực (semi-realistic), da sáng, trang phục và bối cảnh sang (nhà hàng, khách sạn, văn phòng, vườn hoa, đêm thành phố).
4. **Rõ ở cỡ nhỏ**: mặt nhân vật chiếm ≥ 1/3 chiều cao ảnh; nền mờ hoặc gọn; ánh sáng ấm, mềm; tông pastel hoặc tối sang trọng, không xám nhạt.
5. **Đặt được vào khung tròn bên phải**: ảnh dọc hoặc vuông, từ 1000 px; mặt nằm giữa hoặc hơi lệch trái của ảnh (khung tròn tràn mép phải nên chỉ thấy phần bên trái của ảnh); mặt không bị cắt. Bìa TikTok chỉ thấy phần trên của ảnh trong vòm: mặt nằm nửa trên.
6. **Gần sạch**: không logo lớn, khung viền. Một chút chữ nhỏ (chữ ký tác giả, watermark mờ ở góc) chấp nhận được, không cần bỏ ảnh đẹp vì nó (2026-11-26).

Không dùng khung cắt từ footage làm ảnh chính: cận cảnh tay và đồ vật không kể được quan hệ nhân vật.

### Nguồn ảnh

| Nguồn | Cách làm |
|---|---|
| Pinterest (qua Claude in Chrome) | Tìm theo từ khóa dưới, mở pin, lấy ảnh gốc độ phân giải cao (`i.pinimg.com/originals/...`) |
| Ảnh tạo bằng AI | Theo prompt mẫu dưới; hợp khi cần đúng cảnh hoặc trang phục của truyện; giữ cùng phong cách cho cả series |
| Kho ảnh stock | Tìm cùng từ khóa |

Từ khóa Pinterest (ghép một chủ thể với một cảm xúc hoặc bối cảnh):
- Chủ thể: `asian couple aesthetic`, `korean couple photoshoot`, `chinese couple photography`, `cdrama couple`, `douyin couple`, `ulzzang couple`, `asian woman elegant dress`, `qipao photoshoot`, `hanfu girl` (cổ trang).
- Cảm xúc, bối cảnh: `back hug`, `forehead kiss`, `jealous`, `cold ceo`, `office romance`, `birthday party`, `wedding`, `rain night`, `luxury hotel`, `dinner date`.

Quy trình mỗi tập (cùng nguyên tắc với tải footage, `san-xuat.md` mục 4):
1. Đọc hook và cảnh đắt nhất trong `outline.md`; chọn kiểu ảnh (cặp đôi hay nữ chính) và 2–3 cụm từ khóa.
2. Tìm 6–10 ứng viên qua Claude in Chrome (mở tab mới). Lọc theo tiêu chí ở trên.
3. Gửi danh sách để duyệt một lần: link pin, mô tả ngắn, khớp cảnh nào, ảnh đề xuất dùng.
4. Tải ảnh đã duyệt vào `raw/`, chuẩn hóa:
   ```bash
   node scripts/prep-thumb.mjs tc005 raw/anh.jpg                 # -> public/tc005/thumb-bg.jpg
   node scripts/prep-thumb.mjs tc005 raw/anh2.webp --name=thumb-bg-2
   ```
5. Ghi nguồn từng ảnh (link, ngày tải) vào mục Quyết định của `tap.md`.

Prompt mẫu cho ảnh AI (thay phần trong ngoặc theo truyện):
```
Cinematic photo, [a young Chinese couple / an elegant young Chinese woman], [hành động: he hugs her from behind, she turns her head away],
[bối cảnh: luxury restaurant at night], warm soft lighting, shallow depth of field, pastel tones, emotional tension,
faces clearly visible, subject on the left half of a vertical frame, no text, no watermark, photorealistic, 4:5
```

### Chữ bìa

Chữ bìa **trùng nguyên văn hook của tiêu đề** (2026-11-27; các kênh tham khảo đều làm vậy). Thay cho quy tắc câu bìa riêng và giới hạn 3–4 dòng trước đó.

- `thumbText` = hook, thêm `*...*` quanh đúng một cụm gây tò mò nhất.
- Không đặt `|` thì bìa tự ngắt dòng cho chữ to nhất (câu 78 ký tự ra 4 dòng). Chỉ đặt `|` (tối đa 4 dòng) khi tự ngắt làm tách cụm nghĩa.

### Kiểm tra trước khi tải lên

- [ ] Thu nhỏ còn ~160 px ngang vẫn đọc được chữ và nhận ra mặt nhân vật.
- [ ] Ảnh và chữ cùng nói một xung đột; tình tiết có trong truyện.
- [ ] Mặt nhân vật không bị cắt bởi khung tròn; góc dưới phải (nhãn thời lượng) không che mặt.
- [ ] Không có chữ, logo, watermark sót trên ảnh.
- [ ] Đặt cạnh bìa các tập trước vẫn cùng một mẫu.

### Render

```bash
node scripts/render-episode.mjs tc005 --only=thumb    # out/thumb.png
```

Một bìa cho mỗi tập, không A/B test (2026-11-27).

## 3. Mô tả YouTube

Công thức cho mọi tập (chuẩn từ 2026-11-24). Ghi vào `dang-bai.md` trong thư mục tập, hai mục "Mô tả YouTube" và "Câu hỏi ghim bình luận", để đọc và copy trực tiếp; không nhét chuỗi dài vào `episode.json`.

```
🎧 Truyện ngắn audio <thể loại>: <1–2 câu hook, tổng ~130–165 ký tự, có từ khóa chính, không nêu kết>

<Tóm tắt 3–5 câu, tổng ~250–350 ký tự, câu ngắn: bối cảnh, nhân vật, biến cố mở đầu và 1–2 nút thắt; dừng trước cao trào, không tiết lộ kết>

🔔 Đăng ký Quýt Nhỏ Audio để nghe truyện mới lúc 20 giờ 30 mỗi thứ Ba, Năm, Bảy hằng tuần và bật chuông thông báo để không bỏ lỡ tập nào nhé.

🚫 Truyện do Quýt Nhỏ Audio tổng hợp và sáng tác, vui lòng không sao chép dưới mọi hình thức.

🍊 #truyenaudio #truyennganaudio #quytnhoaudio #truyenngantrongsinh
```

- Mô tả **riêng cho từng video**, viết sau khi đọc hết truyện; chọn 1–2 từ khóa chính, đặt cả ở tiêu đề lẫn mô tả. Tối đa 5.000 ký tự.
- Hashtag: 3 bắt buộc `#truyenaudio #truyennganaudio #quytnhoaudio`, thêm 1 theo thể loại (`#truyenngantrongsinh` / `#truyenngantinhcam`) và tối đa 1 theo motif (`#truyennganmechong`, `#baothu`...). Tag video gần như vô dụng.
- 150 ký tự đầu hiện trước "xem thêm": hook phải tự đứng một mình, đủ tò mò.
- Không đưa mốc thời gian/chương vào mô tả.
- Câu hỏi ghim bình luận ghi ở mục thứ hai của `dang-bai.md`: bám đúng tình huống/lựa chọn đạo đức, gọi tên nhân vật, hỏi "nếu là bạn..." để kéo tranh luận; không để lộ kết.
- Bản YouTube là video ngang dài, đăng như video thường. (Video dọc hoặc vuông từ 3 phút trở xuống mới được xếp vào Shorts.)

## 4. TikTok

**Bìa từng phần** (`tiktok-NN-cover.png`, 1080×1920, composition `TikTokCover`): cùng mẫu với bìa YouTube (mục 2) ở khung dọc: nền kem có hình vẽ mờ; từ trên xuống: dải cọ cam, logo kênh cao 210 px, nút đỏ "PHẦN n/N" (thay nút Subscribe), hook của phần (y 575–1.045, cỡ tối đa 130 px); ảnh trong vòm tròn (đường kính 1.800 px, tâm (540, 1.990)) đỉnh ở y = 1.090, phủ kín phần dưới tới mép trái, phải, dưới; viền cọ khô dọc đỉnh vòm (`parts[].hook`, dùng được `|` và `*cụm*`). Mọi phần cùng ảnh, chỉ đổi số phần và hook, để lưới hồ sơ thành một bộ.
- Chữ nằm trong dải giữa y ~240–1.680: lưới hồ sơ cắt bìa còn khoảng 3:4 (ước đoán, kiểm lại sau tập đầu). Khung ảnh dọc chỉnh bằng `coverFocus` (mặc định theo `thumbFocus`).
- Render cùng các phần TikTok, hoặc riêng: `node scripts/render-episode.mjs <mã> --only=cover [--parts=1,3]`.
- Khi đăng: tải ảnh lên làm bìa tùy chỉnh. Nếu nơi đăng chỉ cho chọn khung từ video, chọn khung đầu (chưa kiểm chứng tùy chọn tải ảnh trên từng phiên bản app).

```
<hook của phần> (Phần n/N)
#truyenaudio #truyenngan #<thể loại> #<motif>
Nghe trọn truyện trên YouTube: <Tên kênh>
```

- Câu đầu caption là hook; **3–5 hashtag cụ thể**, không dồn #fyp #viral.
- Dòng dẫn về YouTube nêu lý do cụ thể; mỗi phần **một** lời kêu gọi. Link YouTube để ở bio.
- Dùng audio gốc (giọng kể), không gắn nhạc trend.
- TikTok chỉ có 3 phần (~50–60% truyện, dừng ở cú treo gây tò mò; chuẩn ở `edit-yeu-cau.md` mục Khung hình). Phần 3 là lời mời sang YouTube: caption và bình luận ghim nêu đúng điều người xem đang tò mò (ví dụ "Đoạn camera quay được gì?").
- Đăng theo thứ tự, mỗi ngày một phần hoặc cách vài giờ; ghim bình luận dẫn tới phần tiếp; gom playlist nếu có.
- Phần dài hơn 1 phút mới đủ điều kiện Creator Rewards (kiểm tra điều kiện hiện hành). Phần dưới 3 phút đăng lại được làm YouTube Shorts.
- Khai báo AI của TikTok: kiểm tra mục khai báo trước khi đăng (chưa kiểm chứng).

## 5. Lịch

Kênh nhỏ cùng thể loại đăng gần mỗi ngày, kênh lớn 2–5 ngày một tập (2026-11-19). Khởi đầu: YouTube 2–3 tập/tuần, TikTok mỗi ngày một phần; chọn nhịp giữ được ≥ 12 tuần. Giờ đăng: hướng dẫn nước ngoài đều theo giờ Mỹ, nên lấy giờ người xem hoạt động nhiều nhất (giờ Việt Nam) từ analytics sau vài tập, trước đó thử buổi tối.

## 6. Khai báo AI và nội dung hàng loạt (YouTube)

- **Phải khai báo** ("AI use" trong Studio) khi cảnh trông thật mà chưa từng xảy ra, làm người thật nói hoặc làm điều họ không làm, sửa cảnh quay sự kiện hoặc địa điểm thật. **Không cần** khi dùng AI viết kịch bản, tiêu đề, bìa, phụ đề, hoặc nhân bản giọng của chính mình để lồng tiếng. Khai báo không làm giảm phạm vi hiển thị hay quyền kiếm tiền.
- Quy tắc kiếm tiền yêu cầu nội dung không sản xuất hàng loạt, giống nhau, theo khuôn mẫu; người duyệt xem cả tiêu đề, bìa, mô tả. Việc thực tế: mô tả riêng mỗi video, đổi footage và cách mở giữa các tập, kịch bản viết lại bằng lời kể riêng (`van-phong.md`). Giọng AI không bị cấm riêng. Chính sách đổi thường xuyên: kiểm tra lại trước khi đăng tập đầu (support.google.com/youtube/answer/1311392, /14328491).

## 7. Trước khi bấm đăng

- [ ] Tiêu đề dạng `<hook> | Quýt Nhỏ Audio <số>`, xung đột trong ~45 ký tự đầu, khớp chương 1–2.
- [ ] Bìa qua checklist mục 2, chữ trùng hook tiêu đề, nhãn "Audio Full".
- [ ] Mô tả riêng cho tập, không kèm mốc chương, 3–5 hashtag cuối.
- [ ] Mục "AI use" trong Studio đúng với nội dung.
- [ ] Lịch đăng TikTok các phần và ghim bình luận dẫn về YouTube.

## 8. Đo và sửa

- **CTR hiển thị**: một nửa số kênh nằm trong 2–10% (YouTube); nguồn Home thấp tự nhiên; video dưới 100 lượt xem thì số nhảy rộng. Đừng sửa vì dao động nhỏ; chỉ sửa tiêu đề/bìa khi CTR dưới ~2% kéo dài.
- **Chẩn đoán**: hiển thị nhiều mà CTR thấp → sửa bìa và tiêu đề; CTR cao mà giữ chân thấp → tiêu đề hứa quá lời hoặc hook truyện yếu; hiển thị thấp mà CTR cao → chủ đề quá hẹp. Xem 24 giờ đầu: CTR ở Home/Suggested (khán giả mới) và ở Subscriptions (người đã đăng ký).
- **Đường giữ chân** (hướng dẫn tác giả, ước đoán): **vách** (tụt mạnh trong 30 giây đầu) = hook hỏng; **thung lũng** (lõm tại một điểm) = chương đó chậm; **cầu treo** (đầu cuối tốt, giữa lõm) = thiếu điểm ngoặt giữa truyện (`truyen.md` mục 4); **gò** (đoạn được xem lại) = kiểu cảnh nên nhân bản. Giữ chân dưới ~50% ở giây 10–15 nghĩa là hook yếu.
- TikTok: so tỷ lệ xem hết giữa các phần; phần tụt mạnh thường do hook chương yếu hoặc chương kết phẳng.
- Ghim bình luận hỏi ý kiến; câu hỏi được hỏi lại từ 3 bình luận trở lên là ý tưởng cho tập sau. Gom truyện cùng thể loại vào một playlist, tập tốt nhất ở đầu.
- Mỗi tập ghi vào `tap.md`: tiêu đề, lượt xem sau 7 ngày, tỷ lệ giữ chân. Sau 10 tập, giữ thể loại thắng (`truyen.md` mục 1).
