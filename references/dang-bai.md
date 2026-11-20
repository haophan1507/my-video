# Đăng bài (bước 8)

Nơi giữ tiêu đề, ảnh bìa, mô tả, caption, lịch đăng. Điền kết quả vào mục Đăng của `tap.md`. Nguồn: trang trợ giúp chính thức của YouTube (đọc 2026-11-19) và kết quả tìm kiếm "truyện audio ngôn tình" cùng ngày; phần nào là ước đoán thì ghi rõ.

## 1. Tiêu đề YouTube

Công thức: `[Truyện Audio] <hook> | <Tên kênh>`. Các kênh lớn trong ngách đều dùng kiểu này, hook ~35–70 ký tự, ngôi **tôi**, một nghịch lý hoặc đảo vai ("Sếp mới lại chính là crush cũ của tôi", "Gả thay em gái, tôi được mẹ chồng cưng tận nóc").

Quy tắc:
- **Xung đột trong ~45 ký tự đầu**: điện thoại cắt tiêu đề, YouTube khuyên đặt chữ quan trọng ở đầu.
- Có **tôi** và **một khoảnh khắc hoặc con số cụ thể**; nêu xung đột, **không nêu kết**.
- **Đúng với truyện**: chữ trong tiêu đề phải có thật ở chương 1–2. YouTube đề xuất theo thời lượng xem, nên tiêu đề hứa quá lời thì CTR cao nhưng bị đề xuất ít.
- Cả tiêu đề dưới 100 ký tự; hạn chế chữ HOA và emoji.

Khuôn hook:
- `<Kẻ xấu> <hành động tệ> ngay trước mặt mọi người, tôi <phản ứng bất ngờ>`
- `Cưới <n> năm, tôi phát hiện <bí mật>, nhưng tôi không khóc`
- `<Kẻ xấu> tưởng tôi <yếu thế>, cho đến khi <lật kèo>`
- `Bị <ai> <bỏ rơi>, <thời gian> sau họ quỳ xuống xin tôi <điều gì>`
- `<Nhân vật quyền lực> <cưng chiều / ghen điên> vì tôi <hành động nhỏ>`
- `Gả thay / Thay <ai> <làm việc>, không ngờ <đối tượng bất ngờ>`

Cách chọn: viết **5 phương án** theo 5 khuôn khác nhau, chấm mỗi cái 1–5 theo (xung đột sớm, cụ thể, khoảng trống thông tin, khớp truyện), giữ 2–3 cái trên 16/20 để A/B test (mục 3). Ghi 5 phương án và điểm vào `tap.md`.

## 2. Ảnh bìa (1280×720)

Thông số YouTube: JPG/PNG, 16:9, dưới 2 MB nếu tải từ điện thoại, cần tài khoản đã xác minh. Bìa không được hứa thứ video không có. Bản YouTube là video ngang nên bìa 16:9 hiện ở mọi bề mặt (trang chủ, đề xuất, tìm kiếm).

**Mục tiêu**: ở cỡ thu nhỏ, trong khoảng 1 giây người xem thấy được quan hệ và cảm xúc nhân vật (qua ảnh) và đọc được xung đột (qua chữ).

**Mẫu tham khảo** (quan sát 2026-11-20, các kênh truyện audio ngôn tình có video đạt 40–220 nghìn lượt): nửa trái là ảnh người châu Á đẹp, hoặc cặp đôi trong khoảnh khắc thân mật, căng thẳng, hoặc nữ chính trang phục sang trọng nhìn vào ống kính; nửa phải là mảng giấy sáng màu có mép xé, chữ hook in hoa đậm màu tối 3–4 dòng, gần như trùng tiêu đề; có một chi tiết trang trí nhỏ (đinh ghim, chấm tròn) và nhãn kênh ở góc. Các kênh giữ một mẫu cho mọi video nên cả lưới video nhìn đồng bộ.

### Bố cục chuẩn (composition `Thumbnail`, `src/Thumbnail.tsx`)

| Vùng | Nội dung |
|---|---|
| Trái ~55% | Ảnh nhân vật (`thumbBg`), phủ kín; chỉnh khung bằng `thumbFocus` (object-position, ví dụ `"40% 25%"`) |
| Phải ~45% | Mảng giấy màu ngà, mép xé hơi nghiêng, đổ bóng sang ảnh |
| Hook | `thumbText`: in hoa, font Phudu 800, màu mực gần đen, căn giữa, tự co cỡ chữ cho vừa; `\|` ngắt dòng, `*cụm*` tô màu nhấn |
| Trang trí | Đinh ghim màu nhấn trên mảng giấy; nhãn tên kênh góc trên phải (lấy từ `channel/channel.json`) |
| Nhãn phụ | `thumbTag` dưới hook ("Trọn bộ", "Full"); bỏ trống thì ẩn |
| Góc dưới phải | Để trống: YouTube đặt nhãn thời lượng ở đây |

### Ảnh nhân vật

Tiêu chí, theo thứ tự ưu tiên:
1. **Kể đúng quan hệ chính của truyện**: truyện tình cảm dùng cặp đôi (ôm từ sau, kéo tay, áp sát, ánh mắt giằng co); truyện nữ cường, trọng sinh dùng một nữ chính khí chất (váy dạ hội, sườn xám, cổ phục khi bối cảnh cổ trang). Tình tiết bìa phải có trong truyện.
2. **Sinh động**: chụp giữa một hành động hoặc cảm xúc (quay đầu, chạm tay, tóc hoặc váy chuyển động, nhìn thẳng ống kính có thần). Không dùng ảnh đứng tạo dáng tĩnh, mặt vô cảm.
3. **Người châu Á, đẹp, chỉn chu**: ảnh chụp kiểu phim điện ảnh hoặc minh họa bán thực (semi-realistic), da sáng, trang phục và bối cảnh sang (nhà hàng, khách sạn, văn phòng, vườn hoa, đêm thành phố).
4. **Rõ ở cỡ nhỏ**: mặt nhân vật chiếm ≥ 1/3 chiều cao ảnh; nền mờ hoặc gọn; ánh sáng ấm, mềm; tông pastel hoặc tối sang trọng, không xám nhạt.
5. **Đặt được vào nửa trái**: ảnh dọc hoặc vuông; chủ thể nằm giữa hoặc lệch trái; mảng giấy không che mặt.
6. **Sạch**: không chữ, logo, watermark, khung viền trên ảnh.

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
3. Gửi danh sách để duyệt một lần: link pin, mô tả ngắn, khớp cảnh nào, đề xuất dùng cho bìa A/B/C.
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

- **Nội dung**: hook rút gọn, có thể trùng tiêu đề rút gọn. Cấu trúc gợi ý: [thân phận nhân vật] + [hành động bất ngờ] + [đối tượng hoặc hệ quả gây tò mò].
- **Độ dài**: 3–4 dòng, mỗi dòng 2–4 từ (≤ 16 ký tự), tổng 8–14 từ. Dòng dài nhất quyết định cỡ chữ: giữ các dòng gần bằng nhau.
- **Ngắt dòng** bằng `|` theo cụm nghĩa; không để từ nối, giới từ ở cuối dòng.
- **Nhấn** đúng một cụm bằng `*...*` (từ gây tò mò nhất: thân phận, hành động, con số). Có thể đặt cụm đặc biệt trong ngoặc kép.
- Ví dụ: `"Bạn thân hôn|người yêu tôi|ngay *sinh nhật*"`.

### Kiểm tra trước khi tải lên

- [ ] Thu nhỏ còn ~160 px ngang vẫn đọc được chữ và nhận ra mặt nhân vật.
- [ ] Ảnh và chữ cùng nói một xung đột; tình tiết có trong truyện.
- [ ] Mặt nhân vật không bị mảng giấy hay nhãn che; góc dưới phải trống.
- [ ] Không có chữ, logo, watermark sót trên ảnh.
- [ ] Đặt cạnh bìa các tập trước vẫn cùng một mẫu.

### Render và A/B test

```bash
node scripts/render-episode.mjs tc005 --only=thumb    # out/thumb.png, thêm thumb-2.png, thumb-3.png nếu có thumbAlt
```

Phương án A/B ghi ở `thumbAlt` trong `episode.json`, mỗi mục chỉ ghi trường khác với bản chính:
```json
"thumbAlt": [
  {"thumbBg": "tc005/thumb-bg-2.jpg", "thumbFocus": "35% 20%"},
  {"thumbText": "Người đứng sau cửa|là *cha nuôi*|của bạn thân"}
]
```
Nên đổi một biến mỗi phương án (ảnh hoặc chữ) để biết yếu tố nào thắng (mục 3).

## 3. A/B test trong YouTube Studio

"Test & Compare", chỉ trên Studio bản máy tính. Tối đa **3 phương án**, thử được tiêu đề, bìa hoặc cả hai; kéo dài đến ~2 tuần. Người thắng chọn theo **thời lượng xem**, không phải CTR; kết quả là Winner, Performed Same hoặc Inconclusive (giữ phương án đầu). Làm các phương án khác nhau rõ rệt, giữ bìa đúng 1280×720 (nhỏ hơn bị hạ xuống 480p), không sửa giữa chừng vì test sẽ dừng. Xem kết quả ở Analytics → Reach.

## 4. Mô tả YouTube

```
<1–2 câu hook, không nêu kết: ~150 ký tự đầu hiện trước "xem thêm">

<dán out/chapters.txt của tập>

#truyenaudio #truyenngan #<thể loại> #<motif>
<từ khóa tự nhiên: truyện audio, truyện ngắn, ngôn tình, vả mặt, hài hước...>
```

- Mô tả **riêng cho từng video**; chọn 1–2 từ khóa chính, đặt cả ở tiêu đề lẫn mô tả. Tối đa 5.000 ký tự; 3–5 hashtag; tag video gần như vô dụng.
- Chapters: dòng đầu `00:00`, ít nhất 3 mốc, mỗi chương ≥ 10 giây; đặt tên chương có từ khóa (nhân vật, sự kiện), đừng chỉ "Chương 3".
- Bản YouTube là video ngang dài, đăng như video thường. (Video dọc hoặc vuông từ 3 phút trở xuống mới được xếp vào Shorts.)

## 5. TikTok

**Bìa từng phần** (`tiktok-NN-cover.png`, 1080×1920, composition `TikTokCover`): cùng ảnh nhân vật và mẫu giấy xé với bìa YouTube (mục 2); ảnh nửa trên, mảng giấy nửa dưới mang "PHẦN n/N" màu nhấn và hook của phần (`parts[].hook`, dùng được `|` và `*cụm*`). Mọi phần cùng ảnh, chỉ đổi số phần và hook, để lưới hồ sơ thành một bộ.
- Chữ nằm trong dải giữa y ~240–1.680: lưới hồ sơ cắt bìa còn khoảng 3:4 (ước đoán, kiểm lại sau tập đầu). Khung ảnh dọc chỉnh bằng `coverFocus` (mặc định theo `thumbFocus`).
- Render cùng các phần TikTok, hoặc riêng: `node scripts/render-episode.mjs <mã> --only=cover [--parts=1,3]`.
- Khi đăng: tải ảnh lên làm bìa tùy chỉnh. Nếu nơi đăng chỉ cho chọn khung từ video, chọn khung đầu (thẻ hook) (chưa kiểm chứng tùy chọn tải ảnh trên từng phiên bản app).

```
<hook của phần> (Phần n/N)
#truyenaudio #truyenngan #<thể loại> #<motif>
Nghe trọn truyện trên YouTube: <Tên kênh>
```

- Câu đầu caption là hook; **3–5 hashtag cụ thể**, không dồn #fyp #viral.
- Dòng dẫn về YouTube nêu lý do cụ thể; mỗi phần **một** lời kêu gọi. Link YouTube để ở bio.
- Dùng audio gốc (giọng kể), không gắn nhạc trend.
- Đăng theo thứ tự, mỗi ngày một phần hoặc cách vài giờ; ghim bình luận dẫn tới phần tiếp; gom playlist nếu có.
- Phần dài hơn 1 phút mới đủ điều kiện Creator Rewards (kiểm tra điều kiện hiện hành). Phần dưới 3 phút đăng lại được làm YouTube Shorts.
- Khai báo AI của TikTok: kiểm tra mục khai báo trước khi đăng (chưa kiểm chứng).

## 6. Lịch

Kênh nhỏ cùng thể loại đăng gần mỗi ngày, kênh lớn 2–5 ngày một tập (2026-11-19). Khởi đầu: YouTube 2–3 tập/tuần, TikTok mỗi ngày một phần; chọn nhịp giữ được ≥ 12 tuần. Giờ đăng: hướng dẫn nước ngoài đều theo giờ Mỹ, nên lấy giờ người xem hoạt động nhiều nhất (giờ Việt Nam) từ analytics sau vài tập, trước đó thử buổi tối.

## 7. Khai báo AI và nội dung hàng loạt (YouTube)

- **Phải khai báo** ("AI use" trong Studio) khi cảnh trông thật mà chưa từng xảy ra, làm người thật nói hoặc làm điều họ không làm, sửa cảnh quay sự kiện hoặc địa điểm thật. **Không cần** khi dùng AI viết kịch bản, tiêu đề, bìa, phụ đề, hoặc nhân bản giọng của chính mình để lồng tiếng. Khai báo không làm giảm phạm vi hiển thị hay quyền kiếm tiền.
- Quy tắc kiếm tiền yêu cầu nội dung không sản xuất hàng loạt, giống nhau, theo khuôn mẫu; người duyệt xem cả tiêu đề, bìa, mô tả. Việc thực tế: mô tả riêng mỗi video, đổi footage và cách mở giữa các tập, kịch bản viết lại bằng lời kể riêng (`van-phong.md`). Giọng AI không bị cấm riêng. Chính sách đổi thường xuyên: kiểm tra lại trước khi đăng tập đầu (support.google.com/youtube/answer/1311392, /14328491).

## 8. Trước khi bấm đăng

- [ ] Tiêu đề chọn từ 5 phương án, xung đột trong ~45 ký tự đầu, khớp chương 1–2.
- [ ] Bìa qua checklist mục 2; đã thiết lập A/B test nếu có 2–3 mẫu.
- [ ] Mô tả riêng cho tập, `chapters.txt` dán sau hook, 3–5 hashtag cuối.
- [ ] Mục "AI use" trong Studio đúng với nội dung.
- [ ] Lịch đăng TikTok các phần và ghim bình luận dẫn về YouTube.

## 9. Đo và sửa

- **CTR hiển thị**: một nửa số kênh nằm trong 2–10% (YouTube); nguồn Home thấp tự nhiên; video dưới 100 lượt xem thì số nhảy rộng. Đừng sửa vì dao động nhỏ; chỉ sửa tiêu đề/bìa khi CTR dưới ~2% kéo dài.
- **Chẩn đoán**: hiển thị nhiều mà CTR thấp → sửa bìa và tiêu đề; CTR cao mà giữ chân thấp → tiêu đề hứa quá lời hoặc hook truyện yếu; hiển thị thấp mà CTR cao → chủ đề quá hẹp. Xem 24 giờ đầu: CTR ở Home/Suggested (khán giả mới) và ở Subscriptions (người đã đăng ký).
- **Đường giữ chân** (hướng dẫn tác giả, ước đoán): **vách** (tụt mạnh trong 30 giây đầu) = hook hỏng; **thung lũng** (lõm tại một điểm) = chương đó chậm; **cầu treo** (đầu cuối tốt, giữa lõm) = thiếu điểm ngoặt giữa truyện (`truyen.md` mục 4); **gò** (đoạn được xem lại) = kiểu cảnh nên nhân bản. Giữ chân dưới ~50% ở giây 10–15 nghĩa là hook yếu.
- TikTok: so tỷ lệ xem hết giữa các phần; phần tụt mạnh thường do hook chương yếu hoặc chương kết phẳng.
- Ghim bình luận hỏi ý kiến; câu hỏi được hỏi lại từ 3 bình luận trở lên là ý tưởng cho tập sau. Gom truyện cùng thể loại vào một playlist, tập tốt nhất ở đầu.
- Mỗi tập ghi vào `tap.md`: tiêu đề và mẫu bìa thắng, lượt xem sau 7 ngày, tỷ lệ giữ chân. Sau 10 tập, giữ thể loại và mẫu thắng (`truyen.md` mục 1).
