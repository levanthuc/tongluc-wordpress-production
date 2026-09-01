# Workflow website bán hàng WooCommerce

Đọc cùng SOP chung. WooCommerce là nhánh bổ sung, không thay đổi nguyên tắc Astra + Elementor V3 + UAE.

## Discovery nghiệp vụ

Phải xác nhận trước khi dựng shop:

- Loại sản phẩm và số lượng SKU/variation.
- Thuộc tính, category, tag, brand, shipping class.
- Giá thường, giá sale, thuế, tiền tệ.
- Tồn kho, backorder, low-stock notification.
- Khu vực bán và vùng giao.
- Payment online/offline/COD.
- Chính sách đổi trả, bảo hành, giao hàng.
- Guest checkout, account, email order.
- Coupon, upsell/cross-sell, review.
- Đồng bộ CRM/POS/kho/hóa đơn nếu có.
- Người chịu trách nhiệm vận hành sau bàn giao.

Không tự suy đoán chính sách thương mại hoặc pháp lý.

Sau khi sitemap WooCommerce được duyệt, tạo content contract cho Product, Category và các trang giao dịch/độc nhất cần thiết trước blueprint. Không chọn layout/widget từ dữ liệu sản phẩm giả.

## Content model

### Product

- Product name rõ loại/model.
- Short description: value proposition và điểm mua chính.
- Long description: use case, lợi ích, thông số, hướng dẫn.
- Gallery nhất quán ratio/chất lượng.
- SKU, price, stock, shipping data.
- Attributes/variations có quy tắc đặt tên.
- Category chính và taxonomy hỗ trợ.
- Chính sách liên quan và FAQ sản phẩm nếu có thật.

### Category

- Category name và slug ngắn.
- Intro có ích cho người mua, không chỉ danh sách sản phẩm.
- Filter/sort dựa trên dữ liệu taxonomy thật.
- SEO title/meta riêng cho category quan trọng.
- Canonical/faceted navigation được kiểm soát.

## Kiến trúc trang tối thiểu

- Shop.
- Product categories.
- Product single.
- Cart.
- Checkout.
- My Account.
- Order received.
- Search/no results.
- Chính sách thanh toán, vận chuyển, đổi trả, riêng tư, điều khoản.
- Contact/support.

## Thiết kế

- Dùng Astra WooCommerce module cho foundation và pattern native khi đáp ứng.
- Dùng UAE Woo widgets cho grid, category, mini cart hoặc layout cụ thể có giá trị.
- Cart/checkout ưu tiên ổn định, rõ ràng và ít xao nhãng hơn hiệu ứng.
- Loại pre-footer marketing/global popup khỏi cart và checkout trừ khi có mục tiêu được duyệt.
- Product CTA, variation, stock, shipping và return info phải nhìn thấy tốt trên mobile.
- Không che giá/CTA/validation bằng sticky hoặc popup.
- Prototype tối thiểu phải bao phủ một sản phẩm đại diện; nếu có variation hoặc logic giao dịch khác đáng kể, thêm representative tương ứng trước production hàng loạt.

## Cấu hình và test matrix

### Catalog

- [ ] Simple product.
- [ ] Variable product và mọi variation.
- [ ] Sale/scheduled sale.
- [ ] Out of stock/backorder.
- [ ] Virtual/downloadable nếu dùng.
- [ ] Tax display đúng.

### Cart

- [ ] Add/remove/update quantity.
- [ ] Coupon hợp lệ/không hợp lệ.
- [ ] Cart totals.
- [ ] Mini cart AJAX/cache.
- [ ] Empty cart.

### Checkout

- [ ] Guest và account flow.
- [ ] Required/optional fields.
- [ ] Address validation.
- [ ] Shipping zone/method/rate.
- [ ] COD/offline.
- [ ] Mỗi cổng thanh toán online ở sandbox/test mode.
- [ ] Failed/cancelled/duplicate payment.
- [ ] Thank-you page và order status.

### Email và vận hành

- [ ] New order tới đúng recipient.
- [ ] Processing/completed/refunded tới khách.
- [ ] SMTP và deliverability.
- [ ] Inventory decrement/restore.
- [ ] Refund/cancel workflow.
- [ ] Export/report theo brief.

## SEO sản phẩm

- Product/category URL ổn định.
- Product schema do một nguồn quản lý và khớp giá/tồn kho visible.
- Unique product copy; không sao chép nguyên mô tả nhà sản xuất nếu không bổ sung giá trị.
- Alt ảnh mô tả sản phẩm/biến thể.
- Internal link category → product, guide → category/product và related products.
- Canonical cho variation/filter/parameter được kiểm tra.
- Không index cart, checkout, account, internal search và filter vô giá trị.

## Performance

- Không tải script WooCommerce ở trang không cần nếu giải pháp tối ưu đã kiểm thử.
- Cache không được làm hỏng cart, checkout, account hoặc session.
- Ảnh product có kích thước/ratio chuẩn, lazy load hợp lý.
- Hạn chế plugin coupon, wishlist, compare nếu brief không cần.
- Kiểm tra mobile mạng chậm cho category, product, cart và checkout.

## Bàn giao WooCommerce

- Hướng dẫn tạo/sửa sản phẩm, variation và category.
- Quy trình order, refund, coupon, inventory.
- Quyền user Shop Manager/Admin.
- Chủ sở hữu merchant/payment/shipping account.
- Chế độ test đã tắt và live key được quản lý an toàn.
- Chính sách và email transaction đã duyệt.
