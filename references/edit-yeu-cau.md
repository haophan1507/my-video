# Tiêu chuẩn hình, chữ, footage, giọng

Thiết lập đang áp dụng cho mọi tập. Đọc trước khi sửa `src/`, chọn footage hoặc render. Thắng mọi mặc định ở file khác. Khi đổi tiêu chuẩn: sửa mục tương ứng, ghi ngày, thêm một dòng nhật ký, rồi sửa code cho khớp.

## Thiết lập hiện tại

| Mục | Giá trị | Ở đâu |
|---|---|---|
| Khung YouTube | Ngang 1920×1080, 30 fps | composition `Episode`, `src/Root.tsx` |
| Mã hóa YouTube | H.264 High profile level 4.2, 8 Mbps, GOP 2 giây (60 khung); AAC 192 kbps, 48 kHz (2026-11-27) | `pickEncoder` trong `scripts/lib/ffmpeg-render.mjs`, `render-episode.mjs` |
| Khung TikTok | Dọc 1080×1920, 30 fps | composition `Clip`, `src/Root.tsx` |
| Khớp footage vào khung | Phủ kín nếu cắt ≤ 20% diện tích; ngược lại hiện trọn clip trên nền kem | `MAX_CROP`, `src/footagePlan.ts` |
| Phụ đề | Tắt | `captionsSrc: ""` |
| Đổi cảnh footage | Không cắt giữa clip: mỗi clip (~15 phút) phát liền từ đầu đến hết theo thứ tự tên file, hết clip mới chuyển clip sau, mờ chéo 1 giây | `src/footagePlan.ts` |
| Tốc độ, điểm bắt đầu footage | Theo tag: `speed` (mặc định 1) và `start` (giây bỏ ở đầu clip 01, mặc định 0) trong `public/footage/tags.json`, chốt bằng `footage-preview.mjs` | `src/footagePlan.ts`, `scripts/lib/ffmpeg-render.mjs` |
| Độ tối nền | 0,15 (2026-11-22); 0 cho footage vốn tối; 0,3–0,4 khi có phụ đề hoặc chữ đè lên footage | `dim` |
| Nền sau footage không phủ kín khung | Nền kem + hình vẽ mờ cùng mẫu ảnh bìa (2026-11-22), thay viền đen: clip dọc trên khung ngang YouTube, clip vuông/ngang trên khung dọc TikTok. Độ tối `dim` chỉ phủ footage, không phủ nền kem | `Backdrop` trong `src/Thumbnail.tsx`, `scripts/lib/ffmpeg-render.mjs` |
| Thẻ chữ trên hình (thẻ chào, thẻ hook) | Không có: video vào thẳng cảnh footage từ khung đầu; hook nằm ở lời kể và ảnh bìa | `src/Story.tsx`, `src/Clip.tsx` |
| Nghỉ sau câu chào | 0,8 giây | `scripts/build-audio.mjs` |
| Độ dài tập | Mục tiêu 25–60 phút, có dung sai: viết mới nhắm ≥ 7.300 chữ (giọng 1,2 ~290 chữ/phút), từ 6.900 chữ (~24 phút) là đạt | `MIN_TOTAL` trong `scripts/status.mjs` |
| Tốc độ giọng | 1,2: gen ở 1,0 rồi tăng tốc 1,2 lúc ghép audio (câu chào kênh gen thẳng 1,2) | `voice.speed`, `voice.tempo` trong `episode.json`; `scripts/build-audio.mjs`; `voice.speed` trong `channel/channel.json` |
| Độ to và file audio | -14 LUFS, đỉnh -1,5 dBTP (`loudnorm` hai lượt); `audio.mp3` 48 kHz mono, 160 kbps (2026-11-27) | `scripts/build-audio.mjs` |
| Thứ tự render | Bản YouTube trước, TikTok sau | |

## Khung hình

- **YouTube: khung ngang 16:9** (2026-11-20). Clip ngang phủ kín khung. Clip dọc hoặc vuông hiện trọn ở giữa trên nền kem họa tiết (2026-11-22); không phóng to cắt mất tay hay vật chính.
- **TikTok: khung dọc 9:16**. Mỗi phần render riêng từ cùng audio và mốc chương, không cắt từ bản YouTube.
- **TikTok: phạm vi và số phần** (2026-11-21). Chỉ đăng khoảng 50–60% truyện tính theo chữ, theo thứ tự từ đầu; phần còn lại chỉ có ở YouTube. **Điểm dừng quyết định bằng độ tò mò, không bằng con số**: dừng ở cảnh người xem muốn biết ngay diễn biến tiếp (lời hứa lật kèo, bí mật sắp lộ, cánh cửa vừa mở), trước cao trào và lời giải; được lệch tới ~65% nếu cần để kết đúng ở cú treo mạnh nhất. Cuối mỗi phần cũng kết ở một cú treo như vậy, không kết ở lời đe dọa chung chung hay đoạn cảm xúc đã khép. Mặc định **3 phần**, mỗi phần 1–2 chương, ~5–9 phút; không thêm phần thứ 4. Chương ngắn thì chọn 1–2 chương mỗi phần cho khớp 50–60%; truyện dài thì vẫn 3 phần, mỗi phần dài hơn. Phần cuối kết bằng cú treo mạnh nhất trong khoảng 50–60%, caption và bình luận ghim dẫn về YouTube. Khai báo bằng `parts` trong `episode.json` (chỉ liệt kê 3 phần; render và nhãn "Phần n/N" lấy N = số phần đã khai báo).
- Quy tắc khớp chung cho cả hai khung (`src/footagePlan.ts`): clip lệch tỉ lệ ít (phần bị cắt ≤ 20% diện tích) thì phủ kín; lệch nhiều thì hiện trọn trên nền kem họa tiết. Ví dụ khung dọc: clip 9:16 phủ kín, clip vuông có nền kem trên dưới.
- Bố cục chữ tự đổi theo hướng khung (`useLayout` trong `src/ui.tsx`): vùng an toàn, cỡ watermark, nhãn góc và vị trí phụ đề.

## Phụ đề

- Tắt từ 2026-11-19; đã gỡ whisper.cpp. Bật lại theo `san-xuat.md` mục 5. Quy tắc dưới áp dụng khi bật lại.
- Chữ hiển thị lấy từ kịch bản (`chNN.tts.txt`); nguồn phiên âm chỉ dùng để lấy mốc thời gian, vì phiên âm tự động sai chữ và mất dấu. Hiện chỉ có mốc tạm của `rough-captions.mjs`.
- Không chạy chữ từng từ: mỗi trang hiện rồi ẩn.
- Ngắt trang (`src/captionPages.ts`): theo câu trước, rồi dấu phẩy, từ nối, chỗ ngưng hơi; không tách tên riêng; không để từ nối hay giới từ cuối trang; tối đa 2 dòng (~44 ký tự); câu 1–2 từ ("Bộp.") ghép với câu sau.
- Không hiện phụ đề trong đoạn chào kênh. Vị trí: ~60% chiều cao ở khung dọc, ~70% ở khung ngang, trong vùng an toàn.

## Chữ trên màn

- Font Be Vietnam Pro đậm; nền tối mờ bo góc sau chữ, không viền đen dày; chữ vào ra mờ dần và phóng nhẹ.
- Màu nhấn `#FF8A1F` (cam quýt), đặt ở `accent` trong `channel/channel.json` (chấm nhãn góc, chữ nhấn ảnh bìa).
- Watermark góc trên trái là ảnh logo kênh (`public/brand/watermark.png`, đường dẫn ở `watermark` trong `channel/channel.json`), độ mờ 0,92, bóng nhẹ. YouTube: cao 150 px, cách lề 100/70 px, một mình; góc phải dưới để trống cho watermark của YouTube. TikTok: cao 170 px, cách lề trái 80, trên 160 (dưới thanh Following/For You), kèm viên thuốc "Phần n/N" bên phải logo, nằm trong vùng an toàn (phải 160, đáy 520).
- Ảnh gốc ở `channel/brand/`: `avatar.png` (800×800, nền trắng, mascot thu về ~74% để cắt tròn không mất tai nghe) dùng làm avatar YouTube, TikTok; `watermark-full.png` (nền trong, viền trắng kiểu sticker) là bản gốc của watermark.

## Đoạn mở

- Video vào thẳng footage từ khung đầu, không thẻ chào, không thẻ hook trên hình; chỉ có watermark logo.
- **Không chào ở giây 0** (2026-11-27): bản YouTube mở thẳng bằng văn án của truyện. `build-audio` chỉ chèn `channel/intro.mp3` khi `episode.json` có `"intro": true`.
- **Cấu trúc mở chương 1** (2026-11-27): (1) văn án 80–150 chữ (~20–30 giây): câu đầu là xung đột trong tiêu đề, nêu cái giá, quyết định của tôi và lời hứa về kết cục (kẻ làm hại sẽ hối hận hoặc trả giá), không lộ cách làm; (2) một câu "Các bạn đang nghe truyện tại <Tên kênh>, đừng quên đăng ký kênh nha."; (3) vào ngay một cảnh có hành động, lời thoại. Không đọc lý lịch (tuổi, nghề, gia cảnh) trong phút đầu: rải dần theo cảnh.
- Bản TikTok bỏ câu chào, vào thẳng truyện.
- Câu tên kênh và kêu gọi đăng ký nằm trong lời kể, ngay sau văn án.

## Footage

- **Kiểu hình**: cận cảnh tay làm thủ công, pha chế, trang trí; màu bão hòa hoặc pastel; gần như không thấy mặt; mỗi cảnh một thao tác liền mạch khá dài; không có chữ chồng lên hình. Kiểu này phổ biến ở các kênh truyện audio hiệu suất cao (quan sát 2026-11-19).
- **Không dùng làm nền chính**: cảnh đời thường ít chuyển động (cà phê, mưa trên kính, nấu ăn quay xa).
- **Người trong hình là người châu Á** khi lộ mặt hoặc dáng rõ. Clip chỉ có tay, đồ vật thì không ràng buộc. Từ khóa: asian, korean, japanese, chinese.
- **Một tập, một tag; một tag, một video nguồn** (2026-11-22): mỗi tập chỉ dùng footage của một tag; mỗi tag là các đoạn cắt liên tiếp của **một** video nguồn (cùng bàn, cùng kiểu thao tác, cùng tông màu), một thư mục `public/footage/<tag>/`. Hai nguồn cùng chủ đề nhưng khác kiểu (ví dụ dán sticker vào tranh cảnh có sẵn và dán sổ journal) là hai tag. Lý do: trộn hai nguồn trong một video làm hình đổi kiểu đột ngột, nhìn không liền (quan sát ts002, 2026-11-22). Tag nguồn ngắn hơn tập thì chọn tag khác dài hơn, không ghép nguồn.
- **Chạy liền, không cắt vụn** (2026-11-22): footage phát liền như video gốc: clip 01 từ đầu đến hết, rồi 02, 03... (các clip là đoạn liên tiếp của cùng nguồn nên chuyển clip gần như không thấy). Không đổi cảnh theo nhịp vài chục giây. Tập dài hơn tổng tag thì quay lại clip 01. Bản TikTok lấy đúng đoạn footage cùng mốc thời gian với bản YouTube. Nguồn nên dài ≥ độ dài tập (ưu tiên 30 phút–1 giờ+).
- **Độ sáng** (2026-11-22): xem độ sáng thực của footage sau `dim` ở mỗi lần render, không giữ mặc định máy móc. Đo độ sáng trung bình Y của tag (`ffmpeg -i clip -vf signalstats`, Y trung bình ~130–145 ở `sticker`, `painting`); sau `dim` hình phải còn sáng, màu rõ, không xám tối (mặc định `dim` 0,15; 0,4 làm tối rõ, quan sát tc002, tc004). Xem một khung của mỗi bản render trước khi giao.
- **Mỗi tập một thứ tự footage** (2026-11-22): tập dùng chung tag với tập khác phải bắt đầu ở clip khác. `footageOffset` trong `episode.json` (số nguyên, mặc định 0) xoay vòng danh sách clip: offset 2 thì phát clip 03, 04, ..., hết tag quay về 01, 02. Mỗi tập của cùng một tag dùng offset khác nhau, chọn sao cho clip mở đầu không trùng nhau. Đặt ở `footageOffset`, đọc trong `src/footagePlan.ts` (dùng chung cho Remotion và ffmpeg).
- **Hướng clip**: ưu tiên clip ngang 16:9 cho bản YouTube (phủ kín khung). Clip dọc dùng được cho cả hai bản; ở bản YouTube hiện trọn trên nền kem họa tiết.
- **Chủ động nạp footage và phân bổ cho tập** (2026-11-27): khi một tập cần footage, tự chọn video phù hợp từ các nguồn đã gom, gửi danh sách để duyệt một lần rồi tải, cắt (bỏ intro, outro, logo; ghép các đoạn sạch của cùng một video), ghi tag vào `choices.json` và mục Footage trong `tap.md` (tag, video nguồn, điểm vào). Phân bổ để các tập đa dạng, không phải tự dò footage trùng: ưu tiên video nguồn và chủ đề chưa tập nào dùng, các tập đăng liền nhau không cùng chủ đề. Quy tắc một tập một tag, một tag một video nguồn giữ nguyên.
- **Chủ đề**: nấu ăn cận cảnh; làm bánh; trang trí đồ ngọt; pha chế đồ uống màu; đồ thủ công pastel; làm gốm; vẽ tranh, tô màu, tô số hóa; ambience đêm; làm nail; ghép hình, dán sticker DIY cận cảnh.
- **Từ khóa tìm**: ghép chủ đề với `asmr`, `long`, `1 hour` (ví dụ `pottery asmr 1 hour`, `cake decorating long`). Chủ đề: satisfying, handmade craft diy, palette knife paint, pink cream piping, knitting yarn, miniature, pastel, decorating, resin, clay, watercolor, pottery, ceramic, nail art, paint by number, coloring, jigsaw puzzle, sticker diy, night ambience.
- **Độ dài và nguồn**: mỗi video nền từ 5 phút trở lên; các kho clip miễn phí như Pexels, Pixabay chủ yếu là clip ngắn nên chỉ là hai trong nhiều nguồn. Chỉ lấy clip có giấy phép dùng thương mại; danh sách nhóm nguồn ở `san-xuat.md` mục 4.
- **Tải bằng `yt-dlp`** (2026-11-27): YouTube, TikTok và nền tảng video khác tải bằng `yt-dlp` vào `raw/`. Trước mỗi lô tải, gửi danh sách clip để duyệt một lần. Lệnh và quy trình ở `san-xuat.md` mục 4.
- **Chỉ giữ phần sạch** (cận cảnh tay, không logo, không mặt; chữ của nguồn giữ được, xem mục dưới): bỏ intro, outro bằng `--start` và `--max` của `prep-footage`. Clip có logo hoặc chữ ở đáy dùng `--crop=top`; ở góc và đáy dùng `--crop=square`. Kiểm một khung sau khi chuẩn hóa.
- **Chữ trên hình và logo** (2026-11-26): tên món, chữ hướng dẫn, phụ đề nguyên liệu của nguồn được giữ, không cần crop. Chỉ bắt buộc bỏ **logo, watermark kênh gốc** (crop góc chứa logo) và **thẻ logo toàn khung** xen giữa video (cắt bỏ đoạn đó). Luôn bỏ intro, outro (thông báo, ảnh ghép cuối, cảnh ăn thử dài). Nguồn là một đoạn lặp nhiều vòng thì chỉ lấy một vòng. Tốc độ mặc định khi nạp tag mới: 1,25–1,5 (đã chốt `cake` 1,5, `kitchen` 1,25).
- **Thử nhanh một chương**: 1–2 clip, bản 720p, cắt 3–5 phút.
- **Crop không quá sâu** (2026-11-22): sau crop phải giữ ≥ 60% diện tích khung nguồn và cạnh ngắn ≥ 576 px; thấy trọn tay và vật chính trong khung. Nguồn có logo, chữ chiếm nhiều chỗ đến mức phải crop sâu hơn thì bỏ nguồn, không dùng. Đã loại 2026-11-22: `bake` (giữ 38% diện tích, 792×446, chỉ thấy cận lòng tô, ts003) và `satisfying` (giữ 29%, 416×648); file chuyển sang `.tmp/footage-loai/`.
- **Nhịp footage** (2026-11-22): footage phải có chuyển động rõ ngay từ đầu để giữ người xem; thao tác chậm thì tăng tốc phát bằng `speed` của tag trong `public/footage/tags.json` (chỉ tăng hình, không đổi giọng; mặc định 1; áp cho cả hai đường render). Khi nạp tag mới hoặc chọn tag cho tập: chạy `node scripts/footage-preview.mjs <tag>`, xem lưới 4 tốc độ (1 | 1,25 | 1,5 | 2) và ảnh lưới khung (soát crop), chốt `speed` trước khi render. Tốc độ cao làm clip hết nhanh hơn: tổng phút của tag chia `speed` vẫn phải ≥ độ dài tập. Quan sát 2026-11-22: `craft` ở tốc độ 1 chậm, người xem dễ bỏ ngay đầu (ts001); chốt `craft` 2x.
- **Vào thẳng thao tác chính** (2026-11-22): giây đầu của video phải là thao tác chính (dán, tô, nặn...), không phải đoạn chuẩn bị (mở sổ, bày đồ, lục hộp) hay chữ của kênh gốc (tiêu đề, SUBSCRIBE, LIKE & COMMENT). Bỏ bằng `start` của tag trong `tags.json` (giây bỏ ở đầu clip 01; khi tag quay vòng cũng bỏ lại). Đã đặt: `craft` 86 (bỏ mở sổ, lục hộp sticker), `paint` 9 (bỏ chữ ASMR color with me, SUBSCRIBE, LIKE & COMMENT), `bento` 40 (bỏ phụ đề tiếng Hàn đoạn giới thiệu), `kitchen` 12 (bỏ bày nguyên liệu, vào thao tác rót/trộn). Tìm điểm cắt: lưới khung 2 phút đầu clip 01, mỗi 2–5 giây một khung.
- **Không trùng footage giữa các tập, đảo điểm vào khi buộc dùng lại** (2026-11-23): mỗi tập ưu tiên tag chưa tập nào dùng (xem `public/footage/choices.json` hoặc `node scripts/footage-pick.mjs`). Kho còn ít tag nên buộc dùng lại một tag thì tập sau phải **vào ở điểm khác** với các tập đã dùng tag đó: không mở đầu bằng cùng một cảnh, để người xem kênh không thấy hình lặp từ giây đầu. Cách làm: chọn điểm vào khác nhau cho từng tập (cách nhau ≥ 5 phút trong cùng nguồn, hoặc bắt đầu từ clip khác), ghi vào hồ sơ tập (`tap.md`, mục Footage). Điểm vào chỉ được rơi vào đoạn sạch (không chữ kênh gốc, không đoạn chuẩn bị). Nguồn nạp thêm thì ưu tiên tag mới hơn là kéo dài tag cũ.

## Ảnh bìa

- Chữ bìa trùng nguyên văn hook của tiêu đề; nhãn dưới chữ là "Audio Full"; một bìa mỗi tập, không A/B test (2026-11-27).
- Mẫu cố định cho mọi tập (2026-11-20): nền kem có hình vẽ mờ (vòng, chấm, nốt nhạc, tai nghe); cột chữ bên trái (~50%) gồm logo kênh trên cùng, hook in hoa font Paytone One một màu nâu đậm (chỉ từ khóa `*...*` đổi đỏ quýt), nhãn phụ, nút đỏ "SUBSCRIBE" có ngón tay bấm; ảnh nhân vật người châu Á trong khung tròn lớn phủ kín mép phải, trên, dưới (~43% bề ngang, nhỏ hơn cột chữ), viền cọ khô cam phía trái khung; hai dải cọ cam nhạt nằm ngang ở mép trên và dưới. Dải cọ ngang là mảng thon dần khoét sọc lông cọ bằng nhiễu kéo dài ngang, hai đầu khô xơ; viền khung tròn vẽ kiểu sợi lông cọ; không dùng hình đặc mép đều hay sợi nét đứt đều. Chi tiết và quy trình chọn ảnh: `dang-bai.md` mục 2.
- Bìa TikTok cùng mẫu ở khung dọc: logo, nút đỏ "PHẦN n/N", hook phần ở nửa trên; ảnh trong vòm tròn phủ kín phần dưới (đỉnh y ~1.090), viền cọ dọc đỉnh vòm; chữ trong dải 3:4 giữa khung (`dang-bai.md` mục 5).
- Ảnh bìa là ảnh nhân vật (cặp đôi hoặc nữ chính) chụp giữa hành động hoặc cảm xúc; không dùng khung cắt từ footage.

## Giọng

- Tốc độ 1,2 (đã thử 0,95, 1,1, 1,2; 0,95 chậm so với nhịp kể). Tập mới bắt đầu từ 1,2.
- Cách đạt 1,2 (2026-11-27): gen `voice.speed` 1,0, `build-audio` tăng tốc từng chương bằng `atempo` theo `voice.tempo` 1,2 (không đổi cao độ; thêm ~1 giây cho audio 40 phút). Chọn sau khi nghe so với gen thẳng 1,2 trên 2 đoạn. Tập đã gen ở 1,2 giữ `speed` 1,2, không đặt `tempo`.

## Nhật ký

- 2026-11-19: tắt phụ đề, gỡ whisper; footage tay làm thủ công màu sắc, đổi cảnh mỗi 28 giây, mờ chéo 1 giây; người trong hình là người châu Á; tốc độ giọng 1,2; thêm câu chào kênh, nghỉ sau câu chào 0,8 giây; chữ không chạy từng từ; render YouTube trước, TikTok sau.
- 2026-11-19: gỡ `@remotion/install-whisper-cpp`, `transcribe.mjs`, `align-captions.mjs`; phụ đề chỉ còn `rough-captions.mjs`. Màu nhấn, câu chào, nhãn "Phần n/N", tên chương mặc định chuyển vào `channel/channel.json`.
- 2026-11-19: 10 chủ đề footage; nền từ 5 phút trở lên, nhiều nguồn; từ khóa `asmr`, `long`, `1 hour`; tải footage bằng Claude in Chrome; mỗi tập một chủ đề, mỗi chủ đề một tag.
- 2026-11-20: thêm bỏ intro (`--start`), crop `top` và `square` khi chuẩn hóa footage.
- 2026-11-20: thêm bìa TikTok từng phần (`TikTokCover`, `tiktok-NN-cover.png`, `--only=cover`, `coverFocus`).
- 2026-11-20: ảnh bìa chuyển sang mẫu ảnh nhân vật + mảng giấy chữ hook; thêm `prep-thumb.mjs`, `thumbFocus`, `thumbTag`, `thumbAlt` (A/B).
- 2026-11-20: bản YouTube chuyển sang khung ngang 1920×1080, viền đen khi footage lệch tỉ lệ; TikTok giữ khung dọc, render riêng (bỏ `--cut`). Footage chia thư mục theo tag `public/footage/<tag>/`, giữ tỉ lệ gốc khi chuẩn hóa (cạnh ngắn 1080 px), nguồn clip ghi ở `public/footage/<tag>/sources.txt`.
- 2026-11-20: đổi tên kênh thành Quýt Nhỏ Audio, màu nhấn cam `#FF8A1F`; câu chào thêm "Chúc bạn nghe truyện vui vẻ."; nhãn tên kênh góc trái thay bằng watermark ảnh logo (`Watermark` trong `src/ui.tsx`, thay `CornerLabel`); thêm avatar kênh.
- 2026-11-20: bỏ thẻ chào và thẻ hook trên hình ở cả YouTube và TikTok để vào thẳng footage; giữ câu chào bằng giọng và watermark logo.
- 2026-11-20: ảnh bìa qua nhiều vòng chỉnh (giấy xé, confetti, khung nét đứt, vệt cọ nhọn đều đã thử và bỏ) rồi chốt mẫu hiện tại ở mục Ảnh bìa: chữ trái, ảnh tròn phải (TikTok: vòm dưới), logo kênh, nút đỏ SUBSCRIBE / PHẦN n/N, font Paytone One, viền và dải cọ khô vẽ bằng bộ lọc nhiễu (`Brush`, `BrushRing`, `BrushBar` trong `src/Thumbnail.tsx`).
- 2026-11-20: gỡ code thẻ chữ không còn dùng (`TitleCard`, `IntroCard`), trường `hookSec`, `episodeLabel` trong `episode.json` và `introLabel` trong `channel/channel.json`.
- 2026-11-21: TikTok chỉ đăng ~50–60% truyện, mặc định 3 phần, điểm dừng chọn theo cú treo gây tò mò (không theo con số), được lệch tới ~65%; thêm mục "TikTok: phạm vi và số phần" ở Khung hình; `SKILL.md` bảng định dạng cập nhật theo. Các tập đã sinh sẵn vẫn giữ chia cũ trong `episode.json` tới khi chỉnh.
- 2026-11-22: nạp 9 video dài từ Downloads (~9 giờ) thành 38 clip ở 8 tag bằng `split-footage.mjs` (đoạn ~15 phút, crop bỏ logo và phụ đề, giữ 720p không phóng to); thêm tag `anime` và `satisfying` ngoài 10 chủ đề gốc; loại 1 video có phụ đề cứng giữa khung.
- 2026-11-22: footage chạy liền từng clip ~15 phút theo thứ tự, bỏ đổi cảnh mỗi 28 giây (`cutEverySec`); mỗi tag chỉ một video nguồn: tách `craft` thành `scene` (dán sticker vào tranh cảnh) và `craft` (journal), tách `cook` thành `cook` và `bento`.
- 2026-11-22: kho footage riêng từng máy, tag mở (không giới hạn 10 chủ đề); thêm `footage-scan.mjs`, `footage-pick.mjs`, `tags.json`, `ingested.json`, `choices.json` (tag mỗi tập theo máy, thắng `footageTag`) và skill `footage-intake`.
- 2026-11-22: độ tối nền `dim` 0,4 → 0,15: 0,4 có từ lúc còn phụ đề chữ trắng; phụ đề tắt từ 2026-11-19, nền chỉ còn logo (có bóng đổ), 0,4 giảm 40% độ sáng footage, cảnh tối hẳn. Áp cho các tập chưa render; ts001, ts002, ts003, ts005, ts006, ts007 đã render ở 0,4, giữ tới khi render lại.
- 2026-11-22: thêm tốc độ footage theo tag (`speed`, `footage-preview.mjs`); quy tắc crop ≥ 60% diện tích, cạnh ngắn ≥ 576 px; loại tag `bake`, `satisfying`; ts003 đổi sang `paint`.
- 2026-11-22: thêm `start` theo tag (bỏ đoạn đầu clip 01); `craft` tốc độ 2, bỏ 86 giây đầu; `paint` bỏ 9 giây đầu có chữ kênh gốc.
- 2026-11-22: thêm `footageOffset` theo tập (xoay vòng thứ tự clip) để các tập cùng tag không mở đầu và đi theo cùng một thứ tự footage.
- 2026-11-22: footage không phủ kín khung (clip dọc trên khung ngang YouTube, clip vuông/ngang trên TikTok) đặt giữa nền kem họa tiết cùng mẫu bìa thay cho viền đen; `dim` chỉ áp cho footage; `dim` mặc định 0,15 (0,4 làm hình tối). Thêm `render-episode --limit=giây` để render thử đoạn đầu.
- 2026-11-23: thêm quy tắc không trùng footage giữa các tập; kho ít thì đảo điểm vào của từng tập (chưa có trường riêng theo tập trong `episode.json`: đang là `start` theo tag, xem skill `footage-intake`).
- 2026-11-26: giữ chữ trên hình của nguồn (tên món, hướng dẫn), chỉ crop bỏ logo và cắt thẻ logo toàn khung; nạp tag `cake` (8 clip, 122 phút) và `kitchen` (3 clip, 36 phút, lấy một vòng của nguồn lặp 8 lần).
- 2026-11-27 (từ phân tích video nhiều lượt xem nhất của 5 kênh cùng loại): tiêu đề `<hook> | Quýt Nhỏ Audio <số>`, một câu mỗi tập; bìa trùng tiêu đề, nhãn "Audio Full"; bỏ A/B test; bỏ câu chào ở giây 0, mở bằng văn án rồi mới đọc tên kênh; cảnh kẻ phản bội hối hận, vả mặt có con số, đồ vật ở chương 1 trở lại câu cuối là tùy chọn theo truyện, phần quan trọng là cấu trúc mở đầu. Giữ tốc độ giọng 1,2. 40 tập đã render (tc001–tc020, ts001–ts020) chỉ đổi tiêu đề.
- 2026-11-27: độ dài tối thiểu 25 phút tính theo tốc độ đọc đo thật ~290 chữ/phút (trước ghi 180): tổng ≥ 7.300 chữ, 8–12 chương 900–1.400 chữ. Áp cho tập chưa gen giọng.
- 2026-11-27: độ dài 25–60 phút là mục tiêu có dung sai. Ngưỡng đạt hạ còn 6.900 chữ (~24 phút), không bù chỉ để chạm 7.300; viết mới vẫn nhắm ≥ 7.300.
- 2026-11-27: mã hóa bản YouTube 8 Mbps, GOP 2 giây (60 khung), H.264 High 4.2; `kitchen` đặt `start` 12 giây để bỏ đoạn bày nguyên liệu, vào thẳng thao tác; bỏ A/B ảnh bìa (`thumbAlt`) khỏi code vì chuẩn là một bìa mỗi tập.
- 2026-11-27: `build-audio` chuẩn hóa độ to về -14 LUFS, đỉnh -1,5 dBTP, xuất `audio.mp3` 48 kHz mono 160 kbps (giọng TTS gốc khoảng -19 LUFS, nhỏ hơn video cùng thể loại). Áp cho tập build audio từ ngày này.
- 2026-11-27: thêm quy tắc chủ động nạp footage và phân bổ đa dạng cho các tập, ghi vào `tap.md`.
- 2026-11-27: tải footage bằng `yt-dlp`, thay trang tải trung gian và Claude in Chrome.
- 2026-11-27: tốc độ giọng 1,2 đạt bằng gen 1,0 rồi tăng tốc lúc ghép audio (`voice.tempo`). Áp cho tập chưa gen giọng (tc021–tc061, ts021–ts040) và tập mới.
