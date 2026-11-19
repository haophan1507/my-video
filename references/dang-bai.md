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

Thông số: JPG/PNG, 16:9, dưới 2 MB nếu tải từ điện thoại, cần tài khoản đã xác minh. Bìa không được hứa thứ video không có.

**Video dọc**: YouTube thay bìa 16:9 của video dọc bằng bìa 4:5 tự tạo ở trang chủ, khám phá, đăng ký trên điện thoại; bìa riêng vẫn hiện ở tìm kiếm máy tính và lịch sử xem. Nên **tiêu đề phải tự đủ sức** và thẻ hook 3 giây đầu cũng nên đọc được như một bìa. Chưa rõ khung nào được chọn: sau tập đầu, xem tập hiện ở Home trên điện thoại và ghi lại vào `tap.md`.

**Bố cục** (quan sát ngách, ước đoán): chia hai nửa, một nửa ảnh nền, một nửa khối chữ sáng hoặc đặc màu (~50% chiều ngang). Chữ là **hook rút gọn 4–8 từ**, in hoa, đậm, ≤ 4 dòng, **1–2 từ đổi màu nhấn** `#FF5D73`. Nhãn nhỏ ở góc ("Full", "Truyện chọn lọc"), tên kênh nhỏ ở đáy. Ngách này lặp gần nguyên tiêu đề trên bìa và vẫn đạt hàng trăm nghìn lượt, nên chữ bìa không cần khác tiêu đề.

**Ảnh nền** (ghi lựa chọn vào `tap.md`): A. một khung đẹp từ footage (`ffmpeg -ss 12 -i public/footage/<tag>-03.mp4 -frames:v 1 public/epNNN/thumb-bg.jpg`), đồng bộ với video; B. ảnh người châu Á (minh họa hoặc stock có điều khoản thương mại), kiểu bìa người xem ngách này quen mắt. Kênh không lộ mặt: dùng minh họa nhân vật, không dùng mặt bạn.

**Kiểm tra trước khi tải lên**:
- [ ] Thu nhỏ còn ~120 px ngang vẫn đọc được chữ chính.
- [ ] Chữ không nằm góc dưới phải (đè nhãn thời lượng) và không đè mặt nhân vật.
- [ ] Một điểm nhấn, 2–3 màu, tương phản tốt ở cả chế độ sáng và tối.

Render: `node scripts/render-episode.mjs epNNN --only=thumb` ra `out/thumb.png` (`thumbText`, `thumbBg` trong `episode.json`). Muốn 2–3 mẫu, đổi `thumbText` hoặc `thumbBg` rồi render lại.

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
- Video dọc dài hơn 3 phút là video thường, không phải Shorts.

## 5. TikTok

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
