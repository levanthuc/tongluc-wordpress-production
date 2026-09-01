# Greenfield standard v1

Áp dụng khi `docs/STATUS.md` ghi `Profile: greenfield-standard-v1`. Baseline là snapshot nguồn gốc dự án tại lúc khởi tạo, không phải yêu cầu website phải trống suốt vòng đời build.

## Baseline được chủ dự án xác nhận

- Website hoàn toàn mới; chưa có page, post, project, product, menu hoặc form.
- WordPress, PHP, theme và plugin đã được kiểm tra, cập nhật và hoạt động ổn định.
- Astra active; Astra Pro và modules cần thiết đã bật.
- Elementor Free dùng classic/V3, không dùng Atomic/V4.
- UAE Pro active và widgets/modules cần thiết đã bật.
- Plugin chuẩn: Astra Pro, Elementor, UAE Pro, MCP Adapter, WP Mail SMTP, Contact Form 7, Rank Math SEO và LiteSpeed Cache.
- WooCommerce chỉ được cài/bật cho website bán hàng.
- Permalink là `/%postname%/`.
- Contact Form 7 là form engine; form được tạo mới. WP Mail SMTP do chủ dự án cấu hình.
- Rank Math là nguồn quản lý SEO/schema chính.
- LiteSpeed Cache do chủ dự án cấu hình; Codex không thay đổi setting.
- Analytics, đo lường, bảo mật và backup do chủ dự án quản lý, ngoài phạm vi cấu hình của Codex.
- Global MCP đã có credential riêng; không lưu credential vào hồ sơ dự án.

## Workflow rút gọn

- Không chạy full site inventory hoặc audit lại PHP/plugin/update.
- Không kiểm kê content cũ vì baseline xác nhận không có.
- Chỉ smoke-check điều kiện cần cho tác vụ hiện tại và xác minh đúng đối tượng trước write.
- Không query toàn site chỉ để chứng minh site trống.
- Đọc `docs/build-manifest.md` trong Prototype, Production, QA hoặc khi cần resolve collision/rollback; không đọc ở Intake mặc định.
- Artifact do dự án hiện tại tạo và đã create + read-back thành công được ghi `Project-managed`; nó không làm greenfield mất hiệu lực.
- Artifact có trước chỉ trở thành `Owner-adopted` sau khi owner xác nhận và live identity khớp. Sitemap/blueprint chỉ thể hiện ý định, không tự chứng minh ownership.
- Trước write vẫn resolve live target. Manifest lệch type/ID/stable key/slug hoặc target không được quản lý thì dừng affected write; không ghi đè theo manifest cũ.
- `docs/site-inventory.md` chỉ bắt buộc khi chuyển sang redesign/migration, phát hiện dữ liệu có trước ở phạm vi đáng kể, hoặc có bằng chứng site không còn đúng nguồn gốc greenfield.
- MCP discovery chạy JIT theo [stack-and-mcp.md](stack-and-mcp.md), không phải cổng khởi động.
- Codex có thể đo/report hiệu năng, schema, bảo mật hiển nhiên và trạng thái email nhưng không tự đổi các hệ thống owner-managed.
- Nếu owner đã cấu hình thêm settings/artifact sau khởi tạo, ghi chúng vào `docs/preconfigured-baseline.md` và đánh dấu trong STATUS. Baseline `Current` thay thế audit/reapply cho đúng scope đó; không biến site thành redesign.

Một object lẻ không có trong manifest chưa tự động biến dự án thành redesign. Đánh dấu collision, kiểm tra đúng phạm vi và xin quyết định adopt/đổi target/xử lý nếu cần. Chỉ ghi profile exception và hoàn thành site inventory khi dữ liệu pre-project/unmanaged có phạm vi đáng kể, xung đột lan rộng không thể giải quyết theo target, stack không ổn định hoặc plugin khác baseline ảnh hưởng triển khai.
