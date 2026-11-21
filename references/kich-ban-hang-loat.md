# Sinh sẵn kịch bản hàng loạt (bước 1–4)

Làm trước bước 1–4 cho các truyện trong kho, để khi làm video chỉ còn bước 5–7. Mỗi truyện một agent riêng, ngữ cảnh sạch. File này là brief cho agent đó; quy tắc chi tiết vẫn nằm ở file gốc được trỏ tới, không chép lại ở đây.

Khác quy trình thường: không dừng chờ duyệt dàn ý và chương 1. Agent tự duyệt theo các bảng soát, ghi "chưa duyệt" vào `tap.md`; người duyệt khi tới lượt làm video.

## Điều phối (phiên chính)

1. Mở tập: `node scripts/new-episode.mjs <mã> [...]` (hoặc `--all [--genre=tc]`).
2. Agent chạy model Sonnet (từ đợt 2 hàng loạt; Opus chạm giới hạn 5 giờ sau ~8 truyện). Chạy mỗi đợt 4–5 agent song song, mỗi agent một mã, prompt là: "Làm theo `references/kich-ban-hang-loat.md` mục Brief cho tập `<mã>`. Họ dành cho tập này: nữ chính `<họ>`, nam chính `<họ>`." Các agent trong một đợt không thấy nhau, nên phát trước họ riêng cho từng agent, lấy họ chưa có trong `node scripts/names.mjs --surnames`.
3. Hết đợt: `node scripts/status.mjs` (mỗi tập phải ở bước 5), `node scripts/names.mjs` (không trùng họ tên vai chính giữa các tập), đọc lướt hook và chương 1 của vài tập, commit theo đợt.

Thử 3 tập (tc004, tc007, ts003) ngày 2026-11-21: khi chưa có quy tắc tên, cả 3 nữ chính cùng tên "Giang Ninh", 2 nam chính cùng họ Hoắc, 3 bạn hóng hớt cùng họ Chu. Câu chào kênh nằm ở chữ 190–320 (1–1,8 phút) thay vì giây 50–60. Mỗi agent ~9–10 phút, ~170.000 token.

## Brief cho agent (một tập)

Thư mục gốc `/Users/haopv/Documents/my-video`. Chỉ ghi trong thư mục tập `episodes/<thể-loại>/<mã>-*/`. Không commit, không sửa file ngoài thư mục tập.

**Đọc trước**
- `SKILL.md` (bảng Kênh và định dạng, 7 bước).
- `references/truyen.md` mục 2–5; `references/van-phong.md` toàn bộ; `references/dang-bai.md` mục 1 (tiêu đề).
- File truyện nguồn ghi ở dòng "Truyện nguồn" trong `tap.md`, đọc toàn văn (cả phần tiếng Trung nếu có).
- Mẫu đầu ra đã duyệt: `episodes/tinh-cam/tc005-*/outline.md` (cấu trúc dàn ý) và `script/ch01.tts.txt` (giọng văn).

**Bước 1. Chọn truyện.** Chấm lại 5 mục theo `truyen.md` mục 2 sau khi đọc toàn văn. Dưới 15/25: ghi lý do vào `tap.md`, dừng, báo lại.

**Bước 2. Dàn ý** `outline.md`, theo đúng cấu trúc tc005:
- Dòng Tổng (chương, chữ, phút), Cách đủ độ dài (cắt gì hoặc thêm vòng nào), Hook cả truyện.
- Bảng tên: đặt tên Hán Việt mới theo `van-phong.md` mục 2, mỗi người một họ và một âm đầu; cột tên bản nguồn; xưng hô cố định. Dùng đúng họ được giao cho nữ chính và nam chính. Mọi nhân vật có tên khác không dùng họ nào trong `node scripts/names.mjs --surnames` (kể cả tên tập đoàn "<họ> thị" và thành phố); tránh tên quen của thể loại khi đặt tên (Giang Ninh, Tô Nhiên, Lâm Vãn, Cố/Hoắc/Lục/Phó/Thẩm cho nam chính).
- Bảng chương, rồi mỗi chương một mục `### Chương N. Tiêu đề (số chữ)` gồm Hook mở, Nội dung, Cliffhanger.
- `## Chia phần TikTok` (3–8 phút mỗi phần; hai chương liền ~900 chữ trở lên đã vượt 8 phút, nên tách mỗi chương một phần; `episode.json` `parts` khớp bảng này) và `## 5 phương án tiêu đề YouTube` có điểm.
- Độ dài theo sức của truyện, 25–60 phút (≈ 4.500–11.000 chữ), lệch nhẹ hai đầu được. Độ dài không phải chỉ tiêu: truyện còn đất sáng tạo (cảnh, vòng, twist, nhân vật phụ) thì cứ viết thêm thoải mái; không thấy chỗ mở hợp lý thì để ~25–30 phút, không cố kéo; truyện dài thì cắt cảnh phụ. Giữ 6–12 chương, 700–1.100 chữ mỗi chương. Không cần gom các tập về cùng một độ dài.
- Tự do sáng tạo: đổi trình tự, thêm twist, thêm hoặc bỏ nhân vật phụ, sửa kết nếu làm truyện hay hơn; ghi lý do vào dòng "Cách đủ độ dài".
- Làm theo dòng "Cần làm ở bước 2" của truyện nguồn và cột Lưu ý trong `stories/README.md`.

**Bước 3. Viết chương** `script/chNN.tts.txt` (`ch01`, `ch02`…), lần lượt từ chương 1, theo prompt `van-phong.md` mục 6:
- 700–1.100 chữ mỗi chương, sát số chữ trong dàn ý. Mở đúng hook chương, kết đúng cliffhanger.
- Chương 1 mở bằng hook cả truyện, rồi "Chuyện bắt đầu từ…"; trong 150–180 chữ đầu (giây 50–60, ngay sau xung đột đầu) chèn một câu: "Các bạn đang nghe truyện tại Quýt Nhỏ Audio, đừng quên đăng ký kênh nha." Chương cuối kết bằng câu hỏi chia phe và nhắc đăng ký.
- Viết từ khung và dàn ý, không dịch câu của bản gốc. Chỉ văn bản thuần: không tiêu đề, không markdown, không ngoặc, không dòng "Lưu ý".
- Sau mỗi chương, đếm chữ (`node scripts/status.mjs <mã>` hoặc `wc -w`) và tự soát theo `van-phong.md` mục 7; ngoài khoảng 700–1.100 thì sửa trước khi viết chương sau.

**Bước 4. Soát TTS.** `node scripts/normalize-vi.mjs <mã> --fix`, rồi chạy lại không `--fix`; xử lý tay mọi cảnh báo còn lại (câu dài, tên ngoại, ký tự lạ). `node scripts/status.mjs <mã>` phải báo bước hiện tại là 5.

**Ghi kết quả**
- `episode.json`: `title` (phương án tiêu đề điểm cao nhất, bỏ phần `[Truyện Audio]` và `| <Tên kênh>`), `chapters[].title`, `parts[]` (chương và hook mỗi phần, khớp bảng TikTok), `thumbText` (3–4 dòng theo `dang-bai.md` mục 2). Giữ nguyên các khóa khác.
- `tap.md`: điền bảng Quyết định (trừ giọng, footage, ảnh bìa ảnh nhân vật, teaser); tick bước 1–4; Bước hiện tại 5; thêm nhật ký: "<ngày>: sinh sẵn kịch bản bước 1–4 theo `references/kich-ban-hang-loat.md`; N chương, ~X chữ, ~Y phút; dàn ý và chương chưa duyệt."

**Báo lại** (ngắn, dưới 150 chữ): điểm, số chương, tổng chữ và phút, cách đủ độ dài, hook cả truyện, mọi chỗ đã lệch khỏi khung hoặc còn băn khoăn.
