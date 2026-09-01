# QA và bàn giao

## 1. Scope và content

- [ ] Sitemap/menu đúng bản duyệt.
- [ ] Content contract, archetype blueprint, full unique-page blueprint và page delta đúng bản duyệt.
- [ ] Build manifest khớp live artifacts; không còn `Conflict` chưa có owner/decision.
- [ ] Prototype/pattern đã duyệt trước production hàng loạt.
- [ ] Không còn lorem ipsum, placeholder, link `#` ngoài ý muốn.
- [ ] Tên công ty, địa chỉ, hotline, email, pháp lý nhất quán.
- [ ] Giá, cam kết, chính sách đã được duyệt.
- [ ] CTA và form recipient đúng.

## 2. Elementor/UAE

- [ ] Elementor V3/classic; không có Atomic V4 trong trang mới.
- [ ] Không có HTML widget thay cho widget native phù hợp.
- [ ] Container hierarchy hợp lý, không lồng dư.
- [ ] Font/màu/typography kế thừa Astra hoặc ngoại lệ đã ghi.
- [ ] Chỉ bật UAE modules cần dùng.
- [ ] Query Posts/Products đúng status/category/order.
- [ ] Accordion/modal/off-canvas dùng được bằng keyboard và có focus/close rõ.

## 3. Astra/Site Builder

- [ ] Global palette, typography, container, button đã lưu.
- [ ] Header desktop/tablet/mobile.
- [ ] Một footer chính, không trùng.
- [ ] Hook placement, priority và display conditions đúng.
- [ ] Single/archive/404 đúng frontend đăng xuất.
- [ ] Woo pages được include/exclude đúng.

## 4. Responsive và browser

- [ ] Desktop phổ biến.
- [ ] Tablet portrait/landscape.
- [ ] Mobile nhỏ và lớn.
- [ ] Không horizontal overflow.
- [ ] Text không quá nhỏ; line-height hợp lý.
- [ ] Tap targets và sticky elements không che nội dung.
- [ ] Test Chrome/Safari/Firefox tối thiểu theo phạm vi.

## 5. Accessibility

- [ ] Một H1 và heading order logic.
- [ ] Landmark/header/main/footer hợp lý.
- [ ] Alt ảnh đúng; ảnh trang trí alt rỗng.
- [ ] Contrast đủ.
- [ ] Focus visible.
- [ ] Form có label, error và instruction.
- [ ] Không bắt buộc hover để truy cập nội dung.
- [ ] Motion/autoplay có kiểm soát.

## 6. SEO/AEO/LLMO

- [ ] Title/meta/slug riêng.
- [ ] Canonical/index directive.
- [ ] Sitemap/robots.
- [ ] Internal links.
- [ ] Schema một nguồn, khớp visible content.
- [ ] Rank Math là schema owner greenfield; UAE/component không tạo duplicate.
- [ ] NAP/entity nhất quán.
- [ ] Nội dung chính tồn tại dạng text.
- [ ] Search Console/Analytics chỉ kiểm tra khi brief đưa vào scope.
- [ ] Không index staging/demo/search/cart/checkout/account ngoài ý muốn.

## 7. Form và email

- [ ] Contact Form 7 đúng form/notification greenfield; existing giữ engine đã duyệt.
- [ ] Required/validation.
- [ ] Success/error state.
- [ ] Gửi thử form theo phạm vi an toàn; không thay đổi WP Mail SMTP do owner quản lý.
- [ ] Recipient/CC/BCC.
- [ ] Reply-To.
- [ ] Spam protection.
- [ ] Consent/privacy link khi cần.
- [ ] Entry storage/retention theo brief.

## 8. WooCommerce nếu có

- [ ] Product types/variations.
- [ ] Price/tax/stock.
- [ ] Cart/coupon.
- [ ] Shipping zones/methods.
- [ ] Payment success/fail/cancel.
- [ ] Transactional emails.
- [ ] Account/order/refund.
- [ ] Cache exclusions.
- [ ] Test mode đã xử lý trước live.

## 9. Performance và security

- [ ] Ảnh được resize/compress và lazy-load hợp lý.
- [ ] Font không tải dư; local/preload theo cấu hình.
- [ ] Không có console/PHP lỗi rõ ràng.
- [ ] Cache purge theo policy; ghi người thực hiện, scope và kết quả trước/sau.
- [ ] Không đổi LiteSpeed/CDN/object-cache settings do owner quản lý.
- [ ] Backup/security chỉ kiểm tra khi thuộc scope; ngoài scope ghi owner-managed.
- [ ] Update/license owner rõ.
- [ ] User role tối thiểu cần thiết.
- [ ] Application Password không nằm trong repo và được thu hồi/hạ quyền khi cần.

## 10. Handoff package

- Project profile; site inventory chỉ khi áp dụng; capability-cache coverage cần thiết và observed versions chỉ khi đã có sẵn.
- Sitemap/menu/template inventory.
- Danh sách plugin/theme/license owner.
- Tài khoản và cách chuyển credential an toàn.
- Hướng dẫn cập nhật page/post/form/product/order.
- Backup/restore và maintenance cadence do owner cung cấp; Codex chỉ ghi nhận nếu ngoài scope.
- Báo cáo QA, issue được chấp nhận và ngoại lệ SOP.
- Thời gian bảo hành/hỗ trợ và kênh tiếp nhận.

## Báo cáo hoàn thành chuẩn

```text
Outcome:
URLs/templates changed:
Widgets/features used:
MCP abilities/fallback used:
Tests passed:
Known limitations:
Credentials/actions owner must complete:
Rollback/recovery note:
```
