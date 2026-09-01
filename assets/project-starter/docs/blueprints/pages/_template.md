# Page Blueprint / Archetype Override

> Trạng thái: Draft · Revision: YYYY-MM-DD-r1 · Chủ sở hữu: Chưa xác định · Cập nhật nội dung: YYYY-MM-DD HH:MM TZ · Người duyệt/ngày: Chưa

Mẫu gốc: sao chép thành `[slug].md` khi trang độc nhất hoặc khác archetype; `_template.md` không phải output dự án.

## Kế thừa

- Trang/URL:
- Content contract đã duyệt:
- Extends archetype: `[archetype]` / `none`
- Base archetype revision: `YYYY-MM-DD-rN` / N/A
- Lý do cần blueprint riêng hoặc override:

Nếu `Extends archetype` là `none`, bảng dưới là full section–widget map và phải đủ các trường để build độc lập. Nếu có archetype, chỉ ghi phần thêm, bớt hoặc thay đổi và revalidate khi base revision đổi.

| Vị trí | Section/thay đổi và mục tiêu | Input nội dung | Widget | Container layout: Flex/Grid | CTA | Responsive | SEO/A11y/data |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

## Acceptance delta

- [ ] Không lặp lại quy tắc đã có trong archetype
- [ ] Mọi khác biệt có lý do nội dung, chuyển đổi hoặc kỹ thuật
- [ ] CTA/form/schema không xung đột với archetype
- [ ] Nếu kế thừa: base revision còn đúng; nếu `none`: map đủ để build độc lập
- [ ] Build mới dùng Container; Flexbox mặc định, Grid chỉ khi có bố cục hai chiều; không Section/Column legacy
