# Tiêu chuẩn hình, chữ, footage, giọng

Thiết lập đang áp dụng cho mọi tập. Đọc trước khi sửa `src/`, chọn footage hoặc render. Thắng mọi mặc định ở file khác. Khi đổi tiêu chuẩn: sửa mục tương ứng, ghi ngày, thêm một dòng nhật ký, rồi sửa code cho khớp.

## Thiết lập hiện tại

| Mục | Giá trị | Ở đâu |
|---|---|---|
| Khung YouTube | Ngang 1920×1080, 30 fps | composition `Episode`, `src/Root.tsx` |
| Khung TikTok | Dọc 1080×1920, 30 fps | composition `Clip`, `src/Root.tsx` |
| Khớp footage vào khung | Phủ kín nếu cắt ≤ 20% diện tích; ngược lại hiện trọn clip, viền đen | `MAX_CROP`, `src/FootageTrack.tsx` |
| Phụ đề | Tắt | `captionsSrc: ""` |
| Đổi cảnh footage | Mỗi 28 giây, mờ chéo 1 giây | `cutEverySec`, `src/FootageTrack.tsx` |
| Độ tối nền | 0,4 | `dim` |
| Thẻ hook | 3 giây, ngay sau câu chào | `hookSec` |
| Nghỉ sau câu chào | 0,8 giây | `scripts/build-audio.mjs` |
| Tốc độ giọng | 1,2 | `voice.speed` trong `episode.json` và `channel/channel.json` |
| Thứ tự render | Bản YouTube trước, TikTok sau | |

## Khung hình

- **YouTube: khung ngang 16:9** (2026-11-20). Clip ngang phủ kín khung. Clip dọc hoặc vuông hiện trọn ở giữa, hai bên là viền đen; không phóng to cắt mất tay hay vật chính.
- **TikTok: khung dọc 9:16**. Mỗi phần render riêng từ cùng audio và mốc chương, không cắt từ bản YouTube.
- Quy tắc khớp chung cho cả hai khung (`src/FootageTrack.tsx`): clip lệch tỉ lệ ít (phần bị cắt ≤ 20% diện tích) thì phủ kín; lệch nhiều thì hiện trọn, thêm viền đen. Ví dụ khung dọc: clip 9:16 phủ kín, clip vuông có viền đen trên dưới.
- Bố cục chữ tự đổi theo hướng khung (`useLayout` trong `src/ui.tsx`): vùng an toàn, cỡ chữ, vị trí thẻ hook và phụ đề.

## Phụ đề

- Tắt từ 2026-11-19; đã gỡ whisper.cpp. Bật lại theo `san-xuat.md` mục 5. Quy tắc dưới áp dụng khi bật lại.
- Chữ hiển thị lấy từ kịch bản (`chNN.tts.txt`); nguồn phiên âm chỉ dùng để lấy mốc thời gian, vì phiên âm tự động sai chữ và mất dấu. Hiện chỉ có mốc tạm của `rough-captions.mjs`.
- Không chạy chữ từng từ: mỗi trang hiện rồi ẩn.
- Ngắt trang (`src/captionPages.ts`): theo câu trước, rồi dấu phẩy, từ nối, chỗ ngưng hơi; không tách tên riêng; không để từ nối hay giới từ cuối trang; tối đa 2 dòng (~44 ký tự); câu 1–2 từ ("Bộp.") ghép với câu sau.
- Không hiện phụ đề trong đoạn chào kênh. Vị trí: ~60% chiều cao ở khung dọc, ~70% ở khung ngang, trong vùng an toàn.

## Chữ trên màn

- Font Be Vietnam Pro đậm; nền tối mờ bo góc sau chữ, không viền đen dày; chữ vào ra mờ dần và phóng nhẹ.
- Màu nhấn `#FF5D73`, đặt ở `accent` trong `channel/channel.json` (thanh nhấn thẻ hook, chấm nhãn góc, gạch dưới tên kênh).
- Thẻ hook có thanh nhấn bên trái, nằm phía trên vùng phụ đề. Khung ngang giới hạn bề rộng ~1.250 px.
- Nhãn góc trên trái dạng viên thuốc: tên kênh (YouTube) hoặc "Phần n/N" (TikTok).

## Đoạn mở

- Bản YouTube mở bằng câu chào ngắn cùng giọng của tập ("Chào mừng bạn đến với <Tên kênh>.") kèm thẻ tên kênh, nghỉ ~0,8 giây rồi vào truyện. Không nghỉ dài hơn: làm chậm nhịp vào truyện.
- Bản TikTok bỏ câu chào, vào thẳng hook.
- Câu kêu gọi đăng ký giữa chương 1 nằm trong lời kể.

## Footage

- **Kiểu hình**: cận cảnh tay làm thủ công, pha chế, trang trí; màu bão hòa hoặc pastel; gần như không thấy mặt; mỗi cảnh một thao tác liền mạch khá dài; không có chữ chồng lên hình. Kiểu này phổ biến ở các kênh truyện audio hiệu suất cao (quan sát 2026-11-19).
- **Không dùng làm nền chính**: cảnh đời thường ít chuyển động (cà phê, mưa trên kính, nấu ăn quay xa).
- **Người trong hình là người châu Á** khi lộ mặt hoặc dáng rõ. Clip chỉ có tay, đồ vật thì không ràng buộc. Từ khóa: asian, korean, japanese, chinese.
- **Một tập, một chủ đề, một tag**: mỗi tập chỉ dùng footage của một chủ đề; mỗi chủ đề một tag và một thư mục `public/footage/<tag>/` (bảng tag ở `san-xuat.md` mục 4); không trộn clip khác chủ đề vào cùng tag.
- **Ít xao nhãng**: clip nguồn từ 5 phút (ưu tiên 30 phút–1 giờ); dùng hết clip rồi mới lặp; không để hai cảnh giống nhau liền nhau; đổi cảnh theo nhịp truyện thì chỉ đổi ở đầu chương.
- **Hướng clip**: ưu tiên clip ngang 16:9 cho bản YouTube (phủ kín khung). Clip dọc dùng được cho cả hai bản; ở bản YouTube sẽ có viền đen hai bên.
- **Chủ đề**: nấu ăn cận cảnh; làm bánh; trang trí đồ ngọt; pha chế đồ uống màu; đồ thủ công pastel; làm gốm; vẽ tranh, tô màu, tô số hóa; ambience đêm; làm nail; ghép hình, dán sticker DIY cận cảnh.
- **Từ khóa tìm**: ghép chủ đề với `asmr`, `long`, `1 hour` (ví dụ `pottery asmr 1 hour`, `cake decorating long`). Chủ đề: satisfying, handmade craft diy, palette knife paint, pink cream piping, knitting yarn, miniature, pastel, decorating, resin, clay, watercolor, pottery, ceramic, nail art, paint by number, coloring, jigsaw puzzle, sticker diy, night ambience.
- **Độ dài và nguồn**: mỗi video nền từ 5 phút trở lên; các kho clip miễn phí như Pexels, Pixabay chủ yếu là clip ngắn nên chỉ là hai trong nhiều nguồn. Chỉ lấy clip có giấy phép dùng thương mại; danh sách nhóm nguồn ở `san-xuat.md` mục 4.
- **Tải tự động bằng Claude in Chrome**: YouTube qua https://ytsave.to/en2/, TikTok qua https://snaptik.app/en3 (bản không logo; dự phòng snaptik.vn), nền tảng khác tìm `download <tên nền tảng> video no watermark`. Trước mỗi lô tải, gửi danh sách clip để duyệt một lần. Quy trình ở `san-xuat.md` mục 4.
- **Chỉ giữ phần sạch** (cận cảnh tay, không chữ, không logo, không mặt): bỏ intro, outro bằng `--start` và `--max` của `prep-footage`. Clip có logo hoặc chữ ở đáy dùng `--crop=top`; ở góc và đáy dùng `--crop=square`. Kiểm một khung sau khi chuẩn hóa.
- **Thử nhanh một chương**: 1–2 clip, bản 720p, cắt 3–5 phút.

## Ảnh bìa

- Mẫu cố định cho mọi tập (2026-11-20): ảnh nhân vật người châu Á nửa trái, mảng giấy xé mép nửa phải, hook in hoa font Phudu màu mực tối, một cụm màu nhấn, đinh ghim và nhãn kênh màu nhấn. Chi tiết và quy trình chọn ảnh: `dang-bai.md` mục 2.
- Bìa TikTok dùng cùng mẫu ở khung dọc: ảnh nửa trên, giấy nửa dưới, "PHẦN n/N" + hook phần, chữ trong dải 3:4 giữa khung (`dang-bai.md` mục 5).
- Ảnh bìa là ảnh nhân vật (cặp đôi hoặc nữ chính) chụp giữa hành động hoặc cảm xúc; không dùng khung cắt từ footage.

## Giọng

- Tốc độ 1,2 (đã thử 0,95, 1,1, 1,2; 0,95 chậm so với nhịp kể). Tập mới bắt đầu từ 1,2.

## Nhật ký

- 2026-11-19: tắt phụ đề, gỡ whisper; footage tay làm thủ công màu sắc, đổi cảnh mỗi 28 giây, mờ chéo 1 giây; người trong hình là người châu Á; tốc độ giọng 1,2; thêm câu chào kênh, nghỉ sau câu chào 0,8 giây; chữ không chạy từng từ; render YouTube trước, TikTok sau.
- 2026-11-19: gỡ `@remotion/install-whisper-cpp`, `transcribe.mjs`, `align-captions.mjs`; phụ đề chỉ còn `rough-captions.mjs`. Màu nhấn, câu chào, nhãn "Phần n/N", tên chương mặc định chuyển vào `channel/channel.json`.
- 2026-11-19: 10 chủ đề footage; nền từ 5 phút trở lên, nhiều nguồn; từ khóa `asmr`, `long`, `1 hour`; tải footage bằng Claude in Chrome; mỗi tập một chủ đề, mỗi chủ đề một tag.
- 2026-11-20: thêm bỏ intro (`--start`), crop `top` và `square` khi chuẩn hóa footage.
- 2026-11-20: thêm bìa TikTok từng phần (`TikTokCover`, `tiktok-NN-cover.png`, `--only=cover`, `coverFocus`).
- 2026-11-20: ảnh bìa chuyển sang mẫu ảnh nhân vật + mảng giấy chữ hook; thêm `prep-thumb.mjs`, `thumbFocus`, `thumbTag`, `thumbAlt` (A/B).
- 2026-11-20: bản YouTube chuyển sang khung ngang 1920×1080, viền đen khi footage lệch tỉ lệ; TikTok giữ khung dọc, render riêng (bỏ `--cut`). Footage chia thư mục theo tag `public/footage/<tag>/`, giữ tỉ lệ gốc khi chuẩn hóa (cạnh ngắn 1080 px), nguồn clip ghi ở `public/footage/<tag>/sources.txt`.
