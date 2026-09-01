# Content contracts, archetypes và prototype

## Contract registry trước, contract chi tiết JIT

Sau khi sitemap được duyệt, lập registry tối thiểu toàn site trong sitemap nhưng không mặc định chi tiết hóa mọi launch page cùng lúc. Trước blueprint của scope đang hoạt động, tạo content contract JIT để khóa mục đích, intent, thông điệp, heading, CTA, evidence, entity/schema, media và dynamic source. Không chọn section/widget dựa trên nội dung giả.

- Trang độc nhất hoặc chuyển đổi cao: contract riêng.
- Nhóm trang lặp lại: contract theo archetype; mỗi instance chỉ cung cấp dữ liệu khác nhau.
- Contract phải được duyệt trước blueprint tương ứng.
- Guided-wave ưu tiên contract shared/global shell khi có copy, Home, rồi từng page wave. Contract Draft tạo sớm có thể giữ làm planning artifact nhưng không tự mở gate hoặc buộc batch production.

## Blueprint theo archetype

Không bắt buộc blueprint đầy đủ cho mọi URL.

| Trường hợp | Đầu ra |
|---|---|
| Trang dịch vụ/sản phẩm/dự án/bài viết có cấu trúc lặp | Một archetype blueprint |
| Một instance tuân thủ archetype | Không tạo blueprint mới |
| Instance thêm/bớt/đổi section hoặc CTA/schema | Page override chỉ ghi delta |
| Trang chủ, liên hệ, báo giá, checkout hoặc trang độc nhất | Page blueprint riêng; có thể `Extends: none` |

Tạo blueprint riêng khi khác biệt làm thay đổi hierarchy, conversion path, widget, dữ liệu động, schema, responsive behavior hoặc acceptance criteria. Không tạo chỉ vì copy/ảnh khác nhau.

## Home và representative prototype là cổng bắt buộc

Sau khi contract, foundation và blueprint đại diện được duyệt:

1. Dựng Home trước như full-page prototype bằng nội dung gần thực tế.
2. Kiểm tra frontend đăng xuất trên desktop, tablet và mobile.
3. Xác minh component, form, Posts/Products query, FAQ, header/footer và cache behavior liên quan.
4. Duyệt prototype và ghi pattern được chấp thuận.
5. Chỉ sau đó mới sản xuất hàng loạt các instance cùng archetype.

Nếu archetype hoặc pattern rủi ro chưa được Home bao phủ, prototype một representative trước batch; không mặc định prototype mọi instance.

## Page wave

Mỗi wave chỉ có một active scope và đi qua contract → blueprint → build/QA → approval. Trang độc nhất duyệt riêng; nhóm lặp duyệt representative archetype rồi mới tạo instance. Theo dõi queue và revision trong `docs/page-wave-status.md` để chat mới không suy đoán phạm vi tiếp theo.
