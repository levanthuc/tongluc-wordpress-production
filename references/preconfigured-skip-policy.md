# Owner-preconfigured baseline và skip policy

Đọc reference này chỉ khi STATUS ghi `Preconfigured baseline: Current` và Next action đụng live settings, artifact hoặc visual rule đã liệt kê trong `docs/preconfigured-baseline.md`.

## Ý nghĩa của `Current`

Baseline là lời khẳng định có revision của owner về trạng thái đã cấu hình. Với hạng mục `Keep/Skip`, Codex:

- Không audit lại, không query chỉ để chứng minh, không reapply, upload lại hoặc “chuẩn hóa” giá trị.
- Không đọc file ảnh, settings, version, API hoặc toàn site nếu Next action không cần dùng chúng.
- Dùng trực tiếp ID/key/shortcode/path đã khai báo; không tạo object trùng.
- Chỉ thực hiện các mục trong `Action required` hoặc delta được owner yêu cầu sau đó.

## Kiểm tra tối thiểu vẫn bắt buộc

Skip audit không đồng nghĩa ghi mù:

- Trước write exact target, resolve tối thiểu ID/type/stable key để tránh ghi nhầm; không inventory toàn site.
- MCP write vẫn cần live ability info lần đầu mỗi ability/run, rồi write + read-back theo SOP. Có thể bỏ full discovery khi cache đủ.
- Frontend QA chỉ kiểm tra output vừa thay đổi và dependency trực tiếp; không kiểm tra lại mọi baseline setting.
- Nếu target không khớp, endpoint/schema đổi hoặc có bằng chứng drift, đặt riêng scope đó `Stale/Conflict`; không vô hiệu hóa toàn baseline nếu phần khác không bị ảnh hưởng.

## Ranh giới an toàn

- Không ghi hoặc đọc secret từ hồ sơ dự án. Baseline chỉ ghi “connection configured”, principal/fingerprint không nhạy cảm và nơi owner quản lý.
- Form preset dùng widget Shortcode hoặc widget styler đúng engine; không dùng HTML widget khi Shortcode/native widget đáp ứng.
- Privacy/Terms có thể `Deferred` và không chặn prototype/layout, nhưng phải là blocker trước publication nếu site/form/commerce cần nội dung pháp lý theo scope hoặc pháp luật áp dụng.
- Placeholder được phép ở prototype nếu được đánh dấu; không publish stock/placeholder khi chưa xác nhận license. Không thay evidence, testimonial hoặc claim thật bằng ảnh/nội dung giả.
- Logo contrast dùng metadata variant/màu đã ghi. Không phân tích lại ảnh mỗi lần; nếu không có inverted logo, dùng surface sáng đã duyệt thay vì tự tạo variant.

## Token discipline

- Không chạy audit Markdown/table/link/shell ngoài phạm vi chỉ để “chắc chắn” trong tác vụ website thường lệ; chỉ chạy khi file liên quan vừa sửa, có lỗi hiển thị hoặc QA/package yêu cầu.
- Không đọc catalog/reference dài khi baseline, blueprint và candidate widget đã chỉ rõ quyết định.
- Báo ngắn phần baseline đã tái sử dụng và chỉ mô tả delta/test thực hiện.
