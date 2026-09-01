# SOP sản xuất website Tổng Lực

## Nguyên tắc vận hành

- `docs/STATUS.md` là router: chỉ nạp `Current inputs`, thực hiện `Next action`, rồi cập nhật tại gate. Dependency dùng `path @ revision`; mismatch là routing error trước write.
- Greenfield là nguồn gốc dự án. Artifact project-managed không làm đổi profile; existing/redesign/migration hoặc dữ liệu unmanaged đáng kể mới cần inventory.
- Brief là nguồn sự thật do owner kiểm soát. Chỉ hỏi khi hard blocker có thể làm sai thiết kế, scope, quyền hạn hoặc thông tin công khai.

## Delivery mode

- `guided-wave` (mặc định): duyệt Foundation, Global Shell, Home rồi từng trang độc nhất hoặc archetype wave. Đây là cân bằng mặc định giữa kiểm soát và tốc độ.
- `strict-sequential`: duyệt riêng từng trang. Chỉ dùng khi owner yêu cầu và chấp nhận nhiều lượt duyệt.
- `batch-production`: chỉ dùng khi owner chọn và representative prototype/archetype liên quan đã duyệt.

Ghi mode trong STATUS. Không tự chuyển từ `guided-wave` sang batch.

## Pipeline và cổng duyệt

| Stage | Đầu ra | Cổng duyệt |
|---|---|---|
| 0–1. Intake/Discovery | Brief, profile, blockers/deferred decisions | Brief duyệt |
| 2. Architecture | Sitemap, URL, menu intent, SEO/entity map, contract registry | IA duyệt |
| 3. Contract JIT | Contract chi tiết cho scope kế tiếp | Duyệt đúng contract đang kích hoạt |
| 4. Global Foundation | Astra globals, logo/favicon, layout/component rules đã áp dụng | Foundation duyệt |
| 5. Global Shell | Page shells/menu, header, footer/hook responsive | Global Shell duyệt |
| 6. Home Blueprint | Section–widget/layout map | Home Blueprint duyệt |
| 7. Home Prototype | Trang chủ responsive bằng nội dung gần thật | Home Prototype duyệt |
| 8. Page Waves | Trang độc nhất hoặc representative archetype rồi instance | Duyệt theo page/wave/mode |
| 9. Core QA/Handoff | Site lõi đã kiểm thử và hướng dẫn bàn giao | Website Core Complete |
| 10. Editorial Growth | Taxonomy, content plan, bài viết | Chỉ mở theo yêu cầu riêng |

## Continuation handshake

- Mặc định `confirm-next-phase`: sau approval đúng snapshot, cập nhật marker/STATUS và chuyển phase, nhưng chưa chạy Next action mới.
- Nêu phase/Next action rồi hỏi: `Tôi có tiếp tục thực hiện Next action này không? Chỉ cần trả lời: Tiếp tục.`
- `Tiếp tục` chỉ chạy Next action hiện có đến hard blocker hoặc gate kế tiếp; không tự duyệt output, đổi scope hoặc thay xác nhận hành động rủi ro.
- Approval có thêm `và tiếp tục` thì chạy ngay Next action mới.

## Stage 0–2: Brief và Architecture

Tin facts rõ trong brief; ô trống/TBD không tự động là câu hỏi. Chỉ hỏi blocker không có default an toàn. Greenfield không full audit và không discover MCP ở startup.

Sau Brief approval, IA phải xác định URL/content type, intent, primary topic, CTA, schema owner, internal links, archetype và menu intent. Với Blog/Knowledge thuộc launch, chốt tối thiểu archive, taxonomy và URL dù bài viết được deferred. Với WooCommerce, bổ sung Shop/category/product/cart/checkout/account/policy và Single/Archive.

Sitemap đồng thời giữ contract registry tối thiểu; không tạo nhiều URL gần trùng chỉ để nhắm biến thể từ khóa.

## Stage 3: Contract JIT

Không bắt buộc tạo toàn bộ contract chi tiết trong một lượt. Thứ tự mặc định:

1. Shared/Global Shell nếu có copy hoặc CTA toàn cục.
2. Home.
3. Trang độc nhất/rủi ro cao.
4. Representative archetype.
5. Instance chỉ cần dữ liệu khác biệt.

Trước blueprint của scope nào, contract scope đó phải khóa message, heading, CTA, facts/evidence, media, dynamic source, entity và schema. Không dùng lorem ipsum để quyết định layout. Contract Draft tạo sớm được giữ như planning artifact nhưng không tự mở gate.

## Stage 4: Global Foundation

Nếu preconfigured baseline `Current`, không audit/reapply các nhóm `Keep/Skip`; chép mapping cần dùng vào foundation và chỉ thực hiện `Action required`/delta. Nếu không có baseline này, thiết lập và áp dụng Astra palette, font/H1–H6 responsive, content width, buttons/forms, radius, spacing, logo/favicon và image policy. Elementor/UAE kế thừa theme trừ ngoại lệ đã ghi. Chỉ xác minh frontend phần vừa thay đổi, ghi bằng chứng trong `docs/design-foundation.md`, rồi dừng để owner duyệt trước Global Shell.

## Stage 5: Global Shell

Tái sử dụng page/menu/layout ID trong preconfigured baseline nếu có; resolve đúng target nhưng không inventory hoặc tạo trùng. Nếu chưa có, tạo page shell nháp và menu theo IA khi cần. Không publish production ngoài quyền hiện có. Dựng header/footer bằng Astra Builder hoặc Site Builder đúng ownership; Hook dùng cho vị trí như pre-footer CTA khi phù hợp.

Kiểm tra frontend đăng xuất desktop/tablet/mobile, sticky/transparent/off-canvas và display conditions. Ghi bằng chứng trong `docs/global-shell-approval.md`; dừng để duyệt.

## Stage 6–7: Home Blueprint và Prototype

Home là full unique-page blueprint mặc định. Mỗi section map mục tiêu/nội dung sang Elementor/UAE widget, CTA, responsive, SEO/A11y/data và layout. Flexbox Container là mặc định; Grid chỉ dùng cho bố cục hai chiều/card matrix. Không dùng Section/Column legacy trong build mới hoặc lồng container không có mục đích.

Sau khi blueprint duyệt, build Home bằng nội dung gần thật. Kiểm tra editor và frontend đăng xuất desktop/tablet/mobile; header/footer, CTA, form, query, FAQ/schema và cache behavior liên quan. Ghi `docs/prototype-approval.md` và dừng để duyệt. Chỉ mở Page Waves sau approval.

## Stage 8: Page Waves

Theo `docs/page-wave-status.md`, chỉ có một active scope:

1. Contract JIT và approval.
2. Blueprint trang độc nhất hoặc representative archetype và approval.
3. Build, read-back, frontend/responsive QA.
4. Approval theo delivery mode.
5. Chuyển scope tiếp theo hoặc tạo instance theo archetype đã duyệt.

Trang độc nhất/chuyển đổi cao như Báo giá, Liên hệ, landing, Cart/Checkout được duyệt riêng. Trang lặp dùng representative archetype rồi batch instance. Trang pháp lý/nội dung đơn giản có thể gom wave nếu owner không chọn strict sequential.

Resolve exact live target và đối chiếu build manifest/preconfigured baseline trước write; không query toàn site nếu ID/key đã rõ. Chỉ ghi managed sau write + read-back. Tái sử dụng form/shortcode và Woo baseline `Keep/Skip`; không tạo/reconfigure trùng. Woo vẫn có representative cho type/variation. Pattern chưa được Home bao phủ phải có representative prototype trước batch.

## Stage 9–10: Core Complete và Editorial Growth

QA frontend đăng xuất theo `qa-and-handoff.md`, purge theo policy và không đổi LiteSpeed settings. Bàn giao vận hành, accepted issues và ngoại lệ. Khi đạt, ghi `Website Core Complete` và dừng.

Không tự chuyển sang lập kế hoạch hoặc viết bài. Editorial Growth chỉ mở khi owner yêu cầu; dùng workflow SEO/AIO/AEO/LLMO riêng.

## Scope change và revalidation

Xin duyệt khi thay sitemap, contract, archetype, content model, checkout, tích hợp, ngôn ngữ hoặc template toàn site. Copy/ảnh instance vẫn đúng contract không phải scope change cấu trúc. Dependency đổi ảnh hưởng downstream thì đặt output liên quan thành `Revalidation required`.
