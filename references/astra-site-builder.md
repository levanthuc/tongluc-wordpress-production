# Astra Site Builder và thành phần toàn website

## Chọn đúng công cụ

| Nhu cầu | Công cụ ưu tiên |
|---|---|
| Header tiêu chuẩn | Astra Header Builder trong Customizer |
| Footer tiêu chuẩn | Astra Footer Builder hoặc Site Builder → Footer khi cần Elementor/UAE |
| Header thiết kế đặc biệt | Site Builder → Header |
| CTA trước footer toàn site | Site Builder → Hooks, `astra_footer_before` |
| Nội dung sau bài viết | Site Builder → Hooks với display condition phù hợp |
| Single post/product tùy biến | Site Builder → Single |
| Archive/category | Site Builder → Archive |
| Trang lỗi | Site Builder → 404 Page |

Không gọi Astra Site Builder là Elementor Theme Builder. Website dùng Elementor Free, còn template toàn site do Astra Pro quản lý.

## Header

- Header Builder của Astra nhanh, nhẹ và kế thừa Customizer tốt; dùng mặc định.
- Chỉ dùng Site Builder Header khi cấu trúc vượt khả năng Header Builder.
- Khi Site Builder Header thay header mặc định, nhiều setting Customizer của header cũ không còn áp dụng; styling phải được kiểm tra lại.
- Kiểm tra desktop/tablet/mobile, sticky, transparent, off-canvas và trạng thái đăng nhập.

## Footer

Phân biệt:

- Footer thực: logo, menu, contact, legal, copyright.
- Pre-footer/global CTA: nội dung chuyển đổi ngay trước footer.

Cấu trúc khuyến nghị:

```text
Page content
→ Hook layout tại astra_footer_before: Global CTA (nếu có)
→ Footer layout hoặc Astra Footer Builder
```

Không tạo footer thật bằng Hook nếu Footer layout đáp ứng rõ hơn. Không để Astra Footer và Site Builder Footer cùng hiển thị gây trùng.

## Hook layout SOP

1. Bật Astra Pro Site Builder.
2. Cho phép Elementor trên post type Site Builder nếu cần dùng Elementor editor.
3. Tạo layout type `Hooks`.
4. Chọn placement/action chính xác.
5. Đặt priority; thấp chạy sớm hơn khi nhiều layout dùng cùng hook.
6. Để spacing của Site Builder bằng 0 nếu spacing đã do Elementor quản lý.
7. Chọn Display On và Exclusion hợp lý.
8. User Roles thường là All; chỉ giới hạn khi nội dung thực sự theo role.
9. Kiểm tra frontend đăng xuất trên trang, post, archive, WooCommerce và 404.

## Display conditions

- Entire Website chỉ dùng cho thành phần thật sự toàn cục.
- Với CTA dịch vụ, có thể include service pages và exclude landing page đặc biệt.
- Với WooCommerce, kiểm tra shop, product, cart, checkout, account. Global marketing CTA thường nên loại khỏi cart/checkout để giảm xao nhãng.
- Ghi condition vào blueprint/Site Builder map; existing/redesign có thể đối chiếu thêm site inventory.

## Naming convention

```text
TL – Header – Global
TL – Footer – Global
TL – Hook – Pre Footer CTA – Global
TL – Single – Post
TL – Archive – Knowledge
TL – Single – Product
TL – Archive – Product Category
TL – 404
```

## Kiểm tra trùng lặp

- Một header/footer thắng theo condition mong muốn.
- Không có hai Hook layout cùng placement và condition ngoài ý muốn.
- Không có hai plugin cùng thay header/footer.
- Schema Organization, breadcrumbs và FAQ không bị in hai lần bởi nhiều nguồn.
- Sau thay đổi condition, xác minh frontend theo cache policy dự án; chỉ purge scope được phép và không tự đổi cache/CDN settings.
