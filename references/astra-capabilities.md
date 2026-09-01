# Nhóm tính năng Astra trong SOP Tổng Lực

Không bật tất cả module theo thói quen. Bật theo kiến trúc đã duyệt và kiểm kê lại sau triển khai.

## Global design và Customizer

- Global Color Palette.
- Typography body và heading.
- Buttons, links, forms.
- Site identity, logo, favicon.
- Container/content width.
- Page/sidebar/content layout.

Đây là foundation để Elementor/UAE kế thừa. Thiết lập theme trước page styling.

## Header và Footer Builder

- Site identity/logo.
- Primary/secondary/off-canvas menu.
- Button, search, social, account, cart.
- Desktop/tablet/mobile rows.
- Transparent/sticky behavior khi module hỗ trợ.

Dùng cho header/footer tiêu chuẩn vì nhẹ và kế thừa theme tốt. Dùng Site Builder khi cần bố cục Elementor/UAE tùy biến hơn.

## Site Builder

- Header.
- Footer.
- Hooks.
- Inside Post/Page.
- Single.
- Archive.
- 404.

Site Builder quản lý display conditions và template toàn website. Đọc [astra-site-builder.md](astra-site-builder.md).

## Blog

- Blog/archive layout.
- Single post layout.
- Featured image, meta, author, related navigation tùy phiên bản/module.
- Sidebar và content width.

Xác định phần do Astra quản lý và phần do Site Builder template quản lý; không cấu hình cả hai rồi kỳ vọng cùng tác dụng.

## Navigation và Mega Menu

- Dùng menu thường cho IA đơn giản.
- Mega Menu chỉ khi có nhiều nhóm điều hướng và người dùng thực sự được lợi.
- Mobile phải có cấu trúc thay thế rõ; không thu nhỏ mega menu desktop nguyên trạng.
- Menu label ngắn, mô tả destination; không nhồi từ khóa.

## Site layouts

- Full width/contained/boxed/fluid theo thương hiệu và page type.
- Outer section Elementor có thể full width; inner content theo Astra container.
- Layout mặc định ghi trong archetype blueprint; ngoại lệ từng trang ghi trong page delta/override.

## WooCommerce

- Shop/product layout, cart icon/tray, catalog style và các option module theo phiên bản.
- Chọn Astra Woo controls hoặc UAE Woo widget theo ownership rõ; tránh hai lớp cùng override một thành phần.
- Test cart/checkout/account sau mọi thay đổi header/footer/layout.

## Performance và assets

- Local fonts/file generation/performance options tùy phiên bản.
- Chỉ bật module cần thiết.
- Kiểm tra CSS/JS thực tế trên frontend; không suy ra nhẹ/nặng chỉ từ tên feature.
- Cache/minify/defer phải được test cùng Elementor, UAE, WooCommerce và Site Builder conditions.

## Astra MCP

Astra MCP có thể đọc/cập nhật nhiều nhóm setting như performance, palette, typography, buttons, layout, header, footer, blog, sidebar và scroll-to-top. Khả năng thay đổi theo phiên bản. Dùng cache để chọn coverage, discover JIT khi thiếu/stale; trước first write của mỗi exact ability/run luôn lấy live ability info theo SOP MCP.

## Quy tắc ownership

Mỗi thành phần chỉ có một owner chính:

| Thành phần | Owner ưu tiên |
|---|---|
| Palette/font/container/button | Astra Customizer |
| Page content | Elementor V3 + UAE |
| Header/footer tiêu chuẩn | Astra Header/Footer Builder |
| Header/footer tùy biến | Astra Site Builder |
| Global CTA/pre-footer | Site Builder Hook |
| Blog single/archive | Astra hoặc Site Builder, chọn một |
| Product grid | Astra/Woo native/UAE, chọn theo blueprint |
| SEO/schema | SEO plugin/UAE/custom, chọn một nguồn mỗi schema type |
