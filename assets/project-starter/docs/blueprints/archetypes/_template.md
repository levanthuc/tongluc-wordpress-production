# Archetype Blueprint

> Trạng thái: Draft · Revision: YYYY-MM-DD-r1 · Chủ sở hữu: Chưa xác định · Cập nhật nội dung: YYYY-MM-DD HH:MM TZ · Người duyệt/ngày: Chưa

Mẫu gốc: sao chép thành `[archetype].md` trước khi điền; `_template.md` không phải output dự án.

## Phạm vi kế thừa

- Archetype: Trang dịch vụ / Landing page / Bài viết / Dự án / Sản phẩm / Archive / Khác
- Áp dụng cho URL hoặc content type:
- Content contract đã duyệt:
- Template Astra Site Builder liên quan:
- Ngoại lệ đã biết:

## Section–widget map

| # | Section/mục tiêu | Input từ content contract | Widget Elementor/UAE | Container layout: Flex/Grid | CTA/link | Responsive | SEO/A11y | Data/query/schema | Bắt buộc/Tùy chọn |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | Hero | | | | | | | | |

## Quy tắc chọn widget

- Ưu tiên widget semantic và đúng mục đích.
- Không dùng HTML widget nếu Elementor/UAE có widget phù hợp.
- Greenfield: Rank Math là nguồn SEO/schema chính. Existing/redesign: dùng SEO/schema owner đã duyệt. UAE FAQ Schema chỉ dùng khi không tạo FAQ schema trùng trên cùng trang.
- Danh sách lợi ích: Icon List; thẻ dịch vụ: Info Box; CTA giàu ngữ cảnh: Marketing Button.
- Bài viết: UAE Posts; sản phẩm: UAE Woo Products hoặc widget Woo phù hợp.
- Greenfield: Contact Form 7 + UAE CF7 Styler khi cần. Existing/redesign giữ form engine đã duyệt; không dựng form giả.
- Popup chỉ dùng cho ngữ cảnh có giá trị, có nút đóng, focus và không gây cản trở.

## Dữ liệu động và instance

- Query/content model:
- Field bắt buộc cho mỗi instance:
- Field tùy chọn và fallback:
- Quy tắc ảnh/tỉ lệ/alt:
- Quy tắc internal link:
- Điều kiện cần page override:

## Acceptance criteria

- [ ] Một H1 rõ ràng; heading không nhảy cấp vô lý
- [ ] CTA và form hoạt động
- [ ] Kế thừa design foundation
- [ ] Không có nội dung/chứng cứ giả
- [ ] Responsive desktop/tablet/mobile
- [ ] Keyboard/focus/contrast/alt text đạt yêu cầu
- [ ] Không có HTML widget không cần thiết
- [ ] Không Section/Column legacy; Flexbox mặc định và Grid chỉ cho bố cục hai chiều
- [ ] Schema chỉ phản ánh nội dung nhìn thấy
- [ ] Prototype coverage cần thiết đã được nêu; bằng chứng duyệt lưu tại `docs/prototype-approval.md`
