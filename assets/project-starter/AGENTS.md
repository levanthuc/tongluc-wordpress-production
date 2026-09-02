# Tổng Lực WordPress Project v2

Áp dụng `$tongluc-wordpress-production`; mọi path tính từ WordPress root.

## Authority

```text
Owner Direction > Active Requested Scope > Next Recommended Action > Guided Flow
```

- Đọc owner request và `docs/STATUS.md`; chỉ đọc `Current inputs`/reference cần cho scope. Không đọc toàn bộ `docs/` hoặc `references/`.
- Owner nêu target rõ: `OWNER_DIRECTED`. Owner chỉ nói bắt đầu/tiếp tục: `GUIDED_FLOW`.
- `Next Recommended Action` là gợi ý. Không ép Header → Footer → Home hoặc page-wave sequence nếu owner yêu cầu thứ tự khác và direct dependency đã đủ.
- Scope `SITE/PAGE/SECTION/COMPONENT`; chỉ sửa đúng scope. Revision nhỏ không cấp quyền full-site redesign/audit.

## Baseline và mode

- Corporate Master chỉ cho website doanh nghiệp/dịch vụ không WooCommerce; fixed IDs/names chỉ dùng sau exact target verification theo manifest.
- Non-master/existing/redesign/migration/WooCommerce không dùng Corporate Master IDs.
- Corporate Master bắt đầu `DESIGN`. Chỉ vào `PRODUCTION` sau `Site Design Approved` hoặc owner yêu cầu rõ.
- Baseline item dùng `Inherited/Verified/Project Override/Drift/Not Applicable`; drift chỉ chặn target liên quan.

## Build và QA

- SEO constraints của page quan trọng có trước content contract/heading/sections/blueprint. Một H1, H2/H3 logic, nội dung đủ thật, internal links và không claim/evidence giả.
- Astra sở hữu global style; Elementor/UAE kế thừa, chỉ ghi project delta. Elementor Free V3 Containers; Flexbox mặc định, Grid khi hai chiều. Không Atomic/V4; không HTML/code khi widget native phù hợp.
- CF7 target của master được trình bày bằng UAE CF7 Styler; không tạo form trùng chỉ để style.
- Trước write: resolve target → live ability info/schema → write → read-back → QA đúng scope. Dùng packaged scripts và build/QA plans; arbitrary REST write chỉ là escape hatch có lý do/quyền rõ.
- Page có thể `Design Complete` với `Global Shell Integration Pending`; sau đó chạy Integrated QA, không dựng lại không cần thiết.

## Boundaries

- Live WordPress chỉ qua MCP/documented REST. Không đọc PHP source Core/plugin/theme, WP-CLI/database/helper trừ khi owner phê duyệt development/debug scope.
- Không quét thư mục để đoán exact input bị thiếu. Hoãn affected task; có thể tiếp tục task độc lập trong requested scope.
- XAMPP/Apache/MySQL owner-managed; không đọc/sửa PID/socket/log hoặc điều khiển dịch vụ nếu owner chưa yêu cầu hạ tầng.
- Không lưu secret; không đổi LiteSpeed settings, production SMTP, analytics, security, backup, indexing hoặc payment/order ngoài scope/quyền.
- Approval gắn snapshot/revision. Không tự duyệt hoặc tự publish. Editorial Growth là scope riêng.
