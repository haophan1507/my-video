# my-video

Dự án kênh audio truyện tiếng Việt. Mọi việc theo `SKILL.md` (nạp bên dưới). Khi người dùng nhắc tới một truyện hoặc một tập: đọc `stories/README.md` và `episodes/<tập>/tap.md` trước, rồi làm theo mục "Làm một tập".

Thư mục:
- `references/`: hướng dẫn theo bước (bảng "File hướng dẫn" trong SKILL.md).
- `stories/`: kho truyện nguồn chia theo thể loại `stories/<thể-loại>/<mã>-slug.md` (mã = 2 chữ thể loại + số, ví dụ `tc005`; chỉ có hai thể loại `ts`, `tc`) (bản dịch sát); `stories/README.md` là danh mục kho và các tập. `episodes/<thể-loại>/<mã>-slug/`: mọi thứ của một tập (`tap.md`, `outline.md`, `episode.json`, `script/`, `audio/`, `out/`). `channel/`: tài sản dùng chung cả kênh (câu chào). Quy ước tên đầy đủ ở `stories/README.md`.
- `scripts/`: script dùng chung (nhận mã tập `tc005`). `src/`, `public/`: project Remotion (`public/footage/<tag>/` footage dùng chung theo chủ đề, `public/<mã>/` do script sinh).

@SKILL.md
