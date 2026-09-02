# Corporate Master v2

Áp dụng cho website doanh nghiệp/dịch vụ không WooCommerce được khởi tạo từ đúng master Tổng Lực.

## Fixed Baseline Contract

Nguồn machine-readable: `assets/baselines/corporate-master.json`.

| Role | Expected target |
|---|---|
| Static homepage | Page ID `50` |
| Contact | Page ID `55` |
| About | Page ID `57` |
| Footer target | Astra Advanced Hook ID `59` |
| Contact form | Contact Form 7 ID `843524c` |
| Desktop menu | `Primary Menu` |
| Mobile menu | `Off-Canvas Menu` |

ID/name là contract của bản master, không phải hằng số WordPress toàn cầu. Trước lần dùng đầu tiên của từng target, xác minh type, role/purpose và identity qua MCP/REST; mismatch đặt `Drift` cho đúng target và không ghi đè.

## Inheritance và project delta

Master sở hữu page/menu/form infrastructure; Astra typography/buttons/container; Elementor V3 known-good baseline; UAE module profile dùng chung; và Rank Math technical baseline.

Project sở hữu nội dung, hình ảnh, brand assets, visual direction, hierarchy, section order, widget composition, responsive behavior, SEO brief, internal links và mọi override được ghi trong `docs/design-foundation.md`.

Footer ID `59` chỉ là target ổn định; composition footer vẫn do dự án quyết định. CF7 `843524c` là form-engine target; presentation dùng UAE CF7 Styler.

## Verification tối thiểu

1. Xác nhận baseline ID/version owner chọn.
2. Resolve đúng target đang cần; không inventory toàn site.
3. So type/purpose/stable name với manifest.
4. Ghi `Inherited`, `Verified`, `Project Override`, `Drift` hoặc `Not Applicable` vào baseline record.
5. Chỉ target `Verified` hoặc project target được owner cho phép mới được write.

## Design/Production boundary

Design Mode không đổi LiteSpeed settings và không tự cấu hình production SMTP, analytics, security hoặc indexing. Rank Math chỉ làm phần cần cho kiến trúc/visible design; metadata/schema/indexing hoàn chỉnh thuộc Production Mode trừ khi owner yêu cầu rõ.

WooCommerce không dùng Corporate Master này. Website bán hàng dùng profile/commerce master riêng; tuyệt đối không áp fixed IDs của manifest.
