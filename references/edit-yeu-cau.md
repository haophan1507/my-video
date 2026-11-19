# Yêu cầu edit video của người dùng

File sống. Đọc trước khi sửa `src/`, chọn footage hay render. Thắng mọi mặc định ở file khác. Khi người dùng góp ý về hình, chữ, footage, nhịp hay giọng: **thêm vào mục tương ứng kèm ngày và một dòng nhật ký**, rồi sửa code cho khớp.

## Thiết lập hiện tại

| Mục | Giá trị | Ở đâu |
|---|---|---|
| Phụ đề | **Tắt** | `captionsSrc: ""` |
| Đổi cảnh footage | Mỗi 28 giây, mờ chéo 1 giây | `cutEverySec`, `src/FootageTrack.tsx` |
| Độ tối nền | 0,4 | `dim` |
| Thẻ hook | 3 giây, sau câu chào | `hookSec` |
| Nghỉ sau câu chào | 0,8 giây | `scripts/build-audio.mjs` |
| Tốc độ giọng | 1,2 | `voice.speed` trong `episode.json` và `channel/channel.json` |
| Thứ tự làm | Bản YouTube trước, TikTok sau | |

## Phụ đề

- **Đang tắt** (2026-11-19). Đã gỡ whisper.cpp; bật lại theo `san-xuat.md` mục 5. Các quy tắc dưới giữ cho lúc bật lại.
- Chữ hiển thị lấy từ kịch bản (`chNN.tts.txt`); nguồn phiên âm chỉ được cấp mốc thời gian, vì lần thử whisper nghe sai chữ và vỡ dấu (đã gỡ). Hiện chỉ có mốc tạm của `rough-captions.mjs`.
- Không chạy chữ từng từ: mỗi trang chỉ hiện rồi ẩn.
- Ngắt gọn, không dở dang (`src/captionPages.ts`): theo câu trước, rồi dấu phẩy, từ nối, chỗ ngưng hơi; không tách tên riêng; không để từ nối hay giới từ cuối trang; tối đa 2 dòng (~44 ký tự); câu 1–2 từ ("Bộp.") ghép với câu sau.
- Không hiện phụ đề trong đoạn chào kênh. Vị trí ~60% chiều cao, trong vùng an toàn.

## Chữ trên màn

- Font Be Vietnam Pro đậm; nền tối mờ bo góc sau chữ, không viền đen dày; chữ vào ra mờ dần và phóng nhẹ.
- Màu nhấn hồng dưa hấu `#FF5D73`, đặt ở `accent` trong `channel/channel.json` (thanh nhấn thẻ hook, chấm nhãn góc, gạch dưới tên kênh).
- Thẻ hook nằm trên vùng phụ đề (cách đỉnh ~440 px), có thanh nhấn bên trái.
- Nhãn góc trên trái dạng viên thuốc: tên kênh (YouTube) hoặc "Phần n/N" (TikTok).

## Đoạn mở

- Bản YouTube mở bằng câu chào ngắn cùng giọng của tập: "Chào mừng bạn đến với <Tên kênh>." kèm thẻ tên kênh, nghỉ ~0,8 giây rồi vào truyện. Nghỉ dài hơn bị chê sốt ruột.
- Bản TikTok bỏ câu chào, vào thẳng hook.
- Câu kêu gọi đăng ký giữa chương 1 vẫn giữ trong lời kể.

## Footage

- **Kiểu dùng**: cận cảnh tay làm thủ công, pha chế, trang trí; màu bão hòa hoặc pastel; gần như không thấy mặt; mỗi cảnh một thao tác liền mạch khá dài; không có chữ chồng lên hình. Học từ các kênh người dùng thấy cuốn: cận cảnh tay nấu ăn và pha đồ uống màu, tay làm đồ thủ công mini.
- **Bị chê, không dùng làm nền chính**: cảnh đời thường nhạt (cà phê, mưa trên kính, nấu ăn bình thường).
- **Người trong hình là người châu Á** khi lộ mặt hoặc dáng rõ. Clip chỉ có tay, đồ vật thì không ràng buộc. Từ khóa: asian, korean, japanese, chinese.
- **Ít xao nhãng**: clip nguồn từ 30 giây; dùng hết clip rồi mới lặp; không để hai cảnh giống nhau liền nhau; muốn đổi cảnh theo nhịp truyện thì chỉ đổi ở đầu chương.
- Từ khóa tìm: satisfying, asmr, handmade craft diy, palette knife paint, pink cream piping, knitting yarn, miniature, pastel, decorating, resin, clay, watercolor.
- Nguồn: Pexels (chính). Pixabay cần đăng nhập, clip dọc thường ngắn. Videvo chặn tải tự động.

## Giọng

- Tốc độ: 0,95 bị chê chậm, 1,1 vừa, chốt **1,2** (lần thử đầu). Tập sau bắt đầu từ 1,2.

## Nhật ký

- 2026-11-19: tắt phụ đề, gỡ whisper; footage tay làm thủ công màu sắc từ Pexels, clip từ 30 giây, đổi cảnh mỗi 28 giây, mờ chéo 1 giây; người trong hình là người châu Á; tốc độ giọng 1,2; thêm câu chào kênh, nghỉ sau câu chào còn 0,8 giây; chữ đẹp hơn; không chạy chữ; làm YouTube trước, TikTok sau.
- 2026-11-19 (sau): gỡ gói `@remotion/install-whisper-cpp` cùng hai script `transcribe.mjs`, `align-captions.mjs`; phụ đề bật lại chỉ còn `rough-captions.mjs`. Màu nhấn, câu chào, nhãn "Phần n/N", tên chương mặc định chuyển vào `channel/channel.json`; thẻ chào không còn khóa cứng chữ "Chào mừng đến với".
