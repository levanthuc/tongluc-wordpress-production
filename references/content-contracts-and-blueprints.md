# SEO brief, content contract và blueprint linh hoạt

## Khi nào cần tài liệu nào

| Page type | SEO brief | Content contract | Blueprint |
|---|---|---|---|
| Home, main service, local/commercial, important solution | Bắt buộc | Bắt buộc trước build | Page hoặc archetype |
| About, Contact | Lightweight; full chỉ khi có SEO goal đáng kể | Tối thiểu facts/CTA/form | Page blueprint nếu layout độc nhất |
| Privacy/utility | Không cần full SEO brief | Facts/legal guard | Chỉ khi layout đặc biệt |
| Section/component revision | Kế thừa page constraints | Fragment/delta | Chỉ scope đang sửa |

SEO constraints có trước content contract; content contract có trước heading/section/widget decisions. Không dùng lorem ipsum hoặc text giả để quyết định layout.

## Contract registry và JIT

Sitemap giữ registry tối thiểu toàn site. Contract chi tiết được tạo JIT cho requested scope hoặc direct dependency; không bắt buộc soạn mọi launch page cùng lúc.

- Trang độc nhất/chuyển đổi cao: contract riêng.
- Nhóm lặp: contract theo archetype; instance chỉ cung cấp data delta.
- Owner-directed revision: đọc contract hiện tại và chỉ bổ sung delta nếu business/SEO constraints không đổi.
- Claim, giá, review, chứng nhận, pháp lý và evidence không được tự phát minh.

## Blueprint

Blueprint là build plan thiết kế, không phải gate toàn site.

| Trường hợp | Đầu ra |
|---|---|
| Trang dịch vụ/dự án có cấu trúc lặp | Archetype blueprint |
| Instance tuân thủ archetype | Build plan/delta, không cần full blueprint mới |
| Home/trang độc nhất | Page blueprint |
| Chỉ sửa Hero/CTA/form/mobile | Section/component delta |

Mỗi scope map: mục tiêu → content → heading semantics → Container Flex/Grid → widget Elementor/UAE → CTA/data/form → responsive → accessibility → SEO/schema ownership → acceptance.

## Prototype và design review

Prototype vẫn là accelerator quan trọng nhưng không phải “Home bắt buộc trước mọi thứ”. Trong Guided Flow, Home thường là representative prototype. Trong Owner-Directed, page/section owner yêu cầu có thể là prototype/direction sample.

- Dùng nội dung gần thật và exact target đã xác minh.
- Kiểm tra frontend đăng xuất ở viewport liên quan.
- Duyệt bằng `Page Design Approved` hoặc `Design Direction Approved` khi phù hợp.
- Pattern đã duyệt có thể tái sử dụng; owner có thể sửa/loại bỏ bất kỳ pattern nào.
- Production hàng loạt chỉ dùng direction/archetype đã đủ bằng chứng; không bắt buộc micro-approval mọi instance.

## Provisional và Integrated

Page có thể đạt `Design Complete` khi Header/Footer chưa có, kèm `Global Shell Integration Pending`. Khi shell sẵn sàng, chạy Integrated QA cho header/footer interaction, spacing, anchors, responsive và visual continuity; không rebuild page nếu không có issue.

## Page Wave

`docs/page-wave-status.md` chỉ là scheduling aid cho nhiều page. Owner có thể thay queue bằng explicit request. Chỉ cấm hai write xung đột cùng target; không cấm quản lý nhiều state song song.
