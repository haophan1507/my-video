# Quy trình kênh audio truyện

Giọng kể dài chạy trên nền footage dễ xem, dựng bằng Remotion. Người xem ở lại vì **truyện và giọng kể**; hình chỉ giữ mắt. Dồn công cho truyện, hook, nhịp trước; hình và render sau.

## Kênh và định dạng

- **Tên kênh và chữ cố định**: một nơi duy nhất là `channel/channel.json` (`name`, câu chào `introText`, nhãn `partLabel` `chapterLabel`, màu nhấn `accent`, `voice.speed` của câu chào). Mọi chỗ ghi `<Tên kênh>` trong hướng dẫn lấy `name`. Đổi tên hoặc câu chào: sửa file đó, chạy `node scripts/gen-voice.mjs channel` (tự nhận ra chữ đổi), rồi `build-audio` lại từng tập (`references/san-xuat.md` mục 3).
- Giọng đọc và footage chọn riêng cho từng tập: giọng ghi ở `voice` trong `episode.json` (nguồn chính để gen lại y hệt), cả hai tóm tắt trong `tap.md`. Thiết lập hình và giọng đang dùng nằm ở `references/edit-yeu-cau.md`.

Mỗi truyện thành **một video dài khung ngang** cho YouTube và **nhiều phần khung dọc** cho TikTok, render riêng từ cùng audio và mốc chương. **Chương** là đơn vị chung: viết, gen giọng, timestamp YouTube và phần TikTok đều theo chương.

| | YouTube (bản dài) | TikTok (theo chương) |
|---|---|---|
| Khung | Ngang 1920×1080, 30 fps, H.264; footage lệch tỉ lệ thì viền đen hai bên | Dọc 1080×1920, 30 fps, H.264 |
| Độ dài | 25–60 phút ≈ 4.500–11.000 chữ (~180 chữ/phút), lệch nhẹ hai đầu được; độ dài theo truyện, không phải chỉ tiêu (2026-11-21); truyện nguồn có base ≥ 15 phút | Chỉ đăng 50–60% truyện, mặc định **3 phần** (mỗi phần 1–2 chương, ~5–9 phút), dừng ở chỗ treo trước cao trào (2026-11-21) |
| Cấu trúc | 6–12 chương, mỗi chương 700–1.100 chữ | Mở bằng hook chương, kết bằng cliffhanger; phần cuối kết bằng cú treo mạnh, dẫn về YouTube |
| Chữ trên màn | Câu chào kênh bằng giọng, watermark logo; không thẻ chữ | Watermark logo, nhãn "Phần n/N"; không thẻ chữ |
| Ảnh bìa | 1280×720 render từ Remotion: nền kem, logo + hook + nút Subscribe bên trái, ảnh nhân vật khung tròn bên phải (`dang-bai.md` mục 2) | 1080×1920 mỗi phần, cùng mẫu: logo, nút "PHẦN n/N", hook phần ở trên, ảnh tròn ở dưới (`dang-bai.md` mục 5) |

Số trong bảng này thắng số ở file khác.

## Làm một tập

Khi người dùng nói "làm truyện số N", "tiếp tục tập X", "tập này còn thiếu gì":

1. **Tìm tập** trong `stories/README.md` (mã truyện như `tc005`; chạy `node scripts/stories.mjs` để xem truyện nào chưa/đang/đã làm). Tập mới: tạo `episodes/<thể-loại>/<mã>-slug/` (cùng mã và slug với truyện nguồn; truyện gộp từ nhiều nguồn đã là một file, một mã), chép `references/tap-mau.md` thành `tap.md` và `references/episode-mau.json` thành `episode.json` trong đó, thêm một dòng vào bảng Các tập. Không rõ truyện nào thì hỏi.
2. **Tìm bước hiện tại**: chạy `node scripts/status.mjs <mã>` (tính từ file thật: số chương, số chữ, mốc sửa file), rồi đi qua bảng 7 bước, mở file đầu ra và so với cột "Xong khi" những chỗ script không đo được (không chỉ tin dấu tick). Bước đầu tiên chưa xong là bước hiện tại.
3. **Báo cáo ngắn**: tập, truyện nguồn, bước hiện tại; đã có gì, thiếu gì (kèm đường dẫn); **Cần bạn quyết**: gom mọi quyết định còn trống của bước này, cộng giọng đọc và footage nếu chưa chốt (cần thời gian chuẩn bị). Mỗi mục một gợi ý mặc định kèm lý do một dòng.
4. **Làm bước đó.** Chỉ dùng gợi ý mặc định khi người dùng đã đồng ý. Xong thì: ghi file đầu ra; trong `tap.md` tick tiến độ, ghi quyết định, thêm một dòng nhật ký; sửa cột "Bước" ở `stories/README.md`.

## 7 bước

| # | Bước | Đầu ra | Xong khi | Hỏi người dùng | Đọc |
|---|---|---|---|---|---|
| 1 | Chọn truyện | Mục Quyết định trong `tap.md` | Có truyện nguồn, thể loại, điểm ≥ 15/25 | Truyện nào | `truyen.md` 1–2 |
| 2 | Dàn ý | `episodes/<thể-loại>/<mã>-*/outline.md` | 6–12 chương, mỗi chương có hook mở và cliffhanger; có bảng tên, chia phần TikTok, tổng chữ quanh 4.500–11.000 | Duyệt dàn ý, tên, tiêu đề | `truyen.md` 3–5; `dang-bai.md` 1 |
| 3 | Viết chương | `chNN.tts.txt` (một file mỗi chương, viết sẵn dạng máy đọc được: số, tiền, viết tắt thành chữ) | Đủ chương, mỗi chương 700–1.100 chữ, qua bảng soát | Duyệt chương 1 trước khi viết tiếp | `van-phong.md` |
| 4 | Soát TTS | Báo cáo của `normalize-vi.mjs` (sửa trực tiếp `chNN.tts.txt`) | Hết chữ số, ngoặc; đã xử lý tên ngoại, câu dài | — | `san-xuat.md` 1 |
| 5 | Giọng đọc | `episodes/<thể-loại>/<mã>-*/audio/chNN.mp3` | Mỗi chương một file, cùng giọng và tốc độ; đã nghe thử chương 1 | Dịch vụ, giọng, tốc độ | `san-xuat.md` 2 |
| 6 | Footage | `public/footage/<tag>/<tag>-NN.mp4`, `sources.txt`, `manifest.json` | Đủ clip, đã chuẩn hóa; clip YouTube/TikTok/nền tảng khác tải bằng `dl-video.mjs` (dự phòng: Claude in Chrome) | Chủ đề, duyệt danh sách clip trước khi tải | `edit-yeu-cau.md`, `san-xuat.md` 4 |
| 7 | Dựng, render | `episode.json`; `out/` trong thư mục tập | Render xong, đã xem lướt đầu và cuối | Ảnh nhân vật và chữ ảnh bìa (duyệt danh sách ảnh trước khi tải), có teaser không | `edit-yeu-cau.md`, `san-xuat.md` 5 |

- Bước 6 làm song song với 3–5 được.
- Truyện trong kho có hai dạng: bản dịch sát (lô L01) hoặc khung tiếng Việt + nguyên văn tiếng Trung (từ lô L02). Mỗi truyện có base ≥ 15 phút. Ở bước 2 gom thành 6–12 chương; độ dài theo sức của truyện: còn đất sáng tạo thì cứ viết thêm cảnh, vòng, twist; không thấy chỗ mở hợp lý thì để 25–30 phút, không cố kéo; truyện dài thì cắt cảnh phụ. Tự do đổi cảnh, thêm twist, sửa kết nếu hay hơn. Không ghép hai truyện khác nhân vật vào một tập.

## Lệnh

Chạy ở thư mục gốc, truyền mã tập ngắn (`tc005`). Chi tiết và lỗi hay gặp: `references/san-xuat.md`.

```bash
node scripts/new-episode.mjs tc005 [...] | --all [--genre=tc]   # 1: mở tập (tap.md, episode.json, dòng ở stories/README.md)
node scripts/names.mjs [--surnames]                  # 2: tên nhân vật đã dùng ở các tập, tránh đặt trùng
node scripts/normalize-vi.mjs tc005 [--fix]           # 4: báo cáo chNN.tts.txt; --fix tự đổi số, tiền, viết tắt tại chỗ
node scripts/gen-voice.mjs tc005 [--dry-run]          # 5: GenMax; khóa trong .env, cài đặt giọng ở voice trong episode.json; chỉ gen chương đã đổi
node scripts/dl-video.mjs <link> --name=craft-01 [--list]   # 6: tải video từ link nền tảng vào raw/ (API gendownload.com)
node scripts/prep-footage.mjs raw cook [--start=giây] [--max=giây] [--crop=top|square]   # 6: chuẩn hóa clip vào public/footage/cook/ + manifest
node scripts/footage-manifest.mjs                    # 6: quét lại kho footage, in bảng clip theo tag
node scripts/build-audio.mjs tc005                    # 7: ghép chương, ghi mốc, out/chapters.txt
node scripts/prep-thumb.mjs tc005 raw/anh.jpg [--name=thumb-bg-2]   # 7: ảnh nhân vật cho bìa -> public/tc005/
npx remotion studio src/index.ts                     # 7: xem trước
node scripts/render-episode.mjs tc005 [--only=youtube|tiktok|cover|thumb] [--parts=1,3]   # youtube ngang, tiktok dọc + bìa phần, thumb (+ thumbAlt)
node scripts/status.mjs [tc005]                       # bước hiện tại của tập (không tham số: mọi tập)
node scripts/stories.mjs [--todo|--doing|--done] [--genre=tc]   # kho truyện: chưa/đang/đã làm, tính từ file thật
npm run typecheck                                    # kiểm kiểu code
```

Cần ffmpeg, ffprobe trong PATH. Phụ đề đang tắt và đã gỡ whisper (xem `edit-yeu-cau.md`); chỉ còn `rough-captions.mjs` (mốc theo số ký tự). Chưa có chế độ nền "một cảnh dài liền".

Khi tới bước cần công cụ chưa có: nói trong báo cáo, đề xuất dựng một lần cho mọi tập hoặc làm tay. Dựng xong thì sửa mục này.

## File hướng dẫn

Mỗi chủ đề chỉ có một nơi chi tiết. Chỉ đọc khi tới bước cần.

| File | Nội dung | Bước |
|---|---|---|
| `stories/README.md` | Quy ước tên, kho truyện, các tập và lựa chọn của từng tập | mọi bước |
| `references/tap-mau.md` | Mẫu hồ sơ tập | mở tập |
| `references/truyen.md` | Thể loại, chấm điểm, hook, nhịp, cliffhanger, prompt dàn ý | 1–2 |
| `references/van-phong.md` | Tên, xưng hô, giọng kể, prompt viết chương, bảng soát | 3 |
| `references/kich-ban-hang-loat.md` | Sinh sẵn bước 1–4 cho nhiều truyện bằng agent, brief cho từng agent | 1–4 |
| `references/san-xuat.md` | Soát TTS, giọng, footage, dựng, render, quy tắc code Remotion | 4–7 |
| `references/edit-yeu-cau.md` | **Tiêu chuẩn đang áp dụng** về khung hình, chữ, footage, giọng; thắng mọi mặc định | 5–7 |
| `references/dang-bai.md` | Tiêu đề, ảnh bìa, A/B test, mô tả, caption TikTok, lịch, khai báo AI, đo và sửa | 2, 7 |
| `references/nguon-tra-cuu.md` | Skill và tài liệu ngoài đã xem (dùng / không dùng), trợ giúp YouTube | khi cần sâu hơn |

## Quy tắc

- **Thay đổi tiêu chuẩn edit video** (khung hình, phụ đề, chữ, đoạn mở, footage, nhịp dựng, tốc độ giọng): cập nhật `edit-yeu-cau.md` kèm ngày, rồi mới sửa code.
- **Văn phong tài liệu**: ghi quy tắc và thông số dạng mệnh lệnh trung tính (ví dụ "Tập trung thể loại tình cảm"), không ghi ai quyết định hay sở thích cá nhân ("người dùng thích/không thích", "bị chê"). Lý do, nếu cần, ghi bằng số liệu hoặc quan sát kèm ngày.
- **Không ghi tên kênh khác** trong hướng dẫn và ví dụ. Mô tả đặc điểm và điểm nổi trội ("kênh hài cá mặn top, video 2,7 triệu lượt"), kèm ngày quan sát.
- Trả lời ngắn, thực hành: bảng, danh sách, mẫu dùng ngay. Tách **đã kiểm chứng** (nguồn, ngày) với **ước đoán**. Công cụ AI và giá đổi nhanh: xem lại nguồn hiện tại trước khi chốt.
- Không nhắc rủi ro bản quyền hay bị gỡ video.
- Remotion: dựa vào tài liệu hiện tại (remotion.dev/docs), nêu phiên bản đã kiểm tra. Code trong `src/` là chuẩn, không chép code vào hướng dẫn. Trước khi sửa `src/` đọc `references/san-xuat.md` mục 6 (quy tắc code và chuyển động).
