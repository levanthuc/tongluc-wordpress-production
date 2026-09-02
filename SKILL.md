---
name: tongluc-wordpress-production
description: Lập kế hoạch, thiết kế, xây dựng, chỉnh sửa, kiểm thử hoặc bàn giao website WordPress theo SOP Tổng Lực với Astra Pro, Elementor Free V3, UAE Pro và WooCommerce khi phù hợp. Dùng cho website doanh nghiệp/dịch vụ hoặc bán hàng thuộc stack này.
---

# Tổng Lực WordPress Production v2

Áp dụng progressive disclosure. Không đọc toàn bộ `docs/` hoặc `references/` trong một lượt.

## Router ưu tiên

Đọc chỉ thị owner hiện tại, rồi `docs/STATUS.md` nếu có. Thứ tự quyết định tuyệt đối:

```text
Owner Direction > Active Requested Scope > Next Recommended Action > Guided Flow
```

1. `Explicit Owner Request`.
2. Dependency trực tiếp bắt buộc của requested scope.
3. Requested scope đang làm dở.
4. `Next Recommended Action` trong STATUS.
5. Guided Flow mặc định.

`Next Recommended Action` là khuyến nghị, không phải lệnh bắt buộc. STATUS là persistent state, không phải workflow prison.

- Owner chỉ định rõ page/section/component hoặc revision: dùng `OWNER_DIRECTED`; chỉ nạp scope đó và dependency trực tiếp.
- Owner nói “bắt đầu/tiếp tục” mà không chỉ target: dùng `GUIDED_FLOW`.
- Scope hợp lệ: `SITE`, `PAGE`, `SECTION`, `COMPONENT`. Không mở rộng scope chỉ để “làm cho đồng bộ”.
- Revision intent hợp lệ: `POLISH`, `REDESIGN`, `REPLACE_DIRECTION`, `RESPONSIVE_FIX`, `CONTENT_LAYOUT_FIX`, `SECTION_REVISION`.

## Progressive disclosure

1. Luôn đọc `docs/STATUS.md`; trong hồ sơ dự án chỉ đọc `Current inputs` cần cho requested scope.
2. Chỉ đọc [operating-model.md](references/operating-model.md) khi STATUS thiếu/mâu thuẫn, cần chọn/chuyển mode, xử lý scope/revision/gate hoặc khôi phục dự án.
3. Intake: [brief-and-discovery.md](references/brief-and-discovery.md). Corporate Master: đọc manifest `assets/baselines/corporate-master.json` và [corporate-master.md](references/corporate-master.md) khi project chọn baseline này. Greenfield khác: [greenfield-baseline.md](references/greenfield-baseline.md). Inventory chỉ cho existing/redesign/migration hoặc collision đáng kể.
4. Site/MCP/tooling: [stack-and-mcp.md](references/stack-and-mcp.md), [tooling-and-build-plans.md](references/tooling-and-build-plans.md). UI/blueprint: [design-system.md](references/design-system.md), [widget-decision-guide.md](references/widget-decision-guide.md), [content-contracts-and-blueprints.md](references/content-contracts-and-blueprints.md).
5. SEO-aware design: [seo-aeo-llmo.md](references/seo-aeo-llmo.md). Astra template: [astra-site-builder.md](references/astra-site-builder.md). Woo: [woocommerce-workflow.md](references/woocommerce-workflow.md). QA: [qa-and-handoff.md](references/qa-and-handoff.md).
6. Không đọc catalog/reference của phase hoặc tính năng không liên quan.

## Project profile và baseline

- `corporate-master-v2`: chỉ website doanh nghiệp/dịch vụ không WooCommerce. Dùng fixed contract sau khi xác minh đúng baseline/version/target; không tin ID mù.
- Website bán hàng, non-master, existing, redesign hoặc migration dùng workflow/profile phù hợp và không nhận ID cố định của Corporate Master.
- Corporate Master cung cấp hạ tầng ổn định; nội dung, hình ảnh, hierarchy, section order, widget composition và visual direction vẫn là project delta.
- Nếu baseline drift ở một target, cô lập target đó; không vô hiệu hóa toàn baseline khi phần khác còn hợp lệ.

## Design Mode và Production Mode

- Corporate Master bắt đầu ở `DESIGN`. Ưu tiên structure, content gần thật, visual hierarchy, responsive và SEO-aware architecture.
- `PRODUCTION` chỉ mở sau `Site Design Approved` hoặc owner yêu cầu rõ. Khi đó mới hoàn thiện Rank Math chi tiết, cache/performance, SMTP production, analytics/security/indexing theo scope.
- Không thay LiteSpeed settings. Cache purge chỉ theo policy trong STATUS.

## Dependency graph, state và approval

- Guided Flow khuyến nghị: Project Context → Foundation delta → page/component design → integrated QA → Site Design Approval → Production.
- Owner có thể yêu cầu Home trước Header, Footer trước About, một Hero, hoặc mobile-only fix nếu direct dependency đã đủ.
- Page có thể `Design Complete` trong khi `Global Shell Integration Pending`; sau khi shell có, chạy integrated QA thay vì dựng lại page.
- Approval có thể ở mức `Page Design Approved`, `Design Direction Approved`, `Site Design Approved`, `Production Approved`, `Launch Approved`. Không ép micro-approval từng section nếu owner không yêu cầu.
- Approval gắn đúng snapshot/revision. Thay đổi trọng yếu tạo revision `Draft`; dependency bị đổi chỉ revalidate output bị ảnh hưởng.

## Content, SEO và thiết kế

- Brief do owner kiểm soát là nguồn sự thật; chỉ hỏi khi blocker có thể làm sai thiết kế, scope, quyền hạn hoặc thông tin công khai.
- Với trang SEO quan trọng, SEO constraints phải có trước content contract, heading, sections và blueprint. About/Contact có thể dùng brief nhẹ; utility/legal không cần full SEO brief.
- Mỗi trang indexable có một H1, H2/H3 logic, nội dung đủ thật để thiết kế, internal link direction và không có evidence/claim bịa đặt.
- Astra sở hữu global typography/color/button/container; Elementor/UAE kế thừa, project chỉ ghi delta.
- Elementor Free classic/V3, không Atomic/V4. Build mới dùng Containers; Flexbox mặc định, Grid cho bố cục hai chiều. Ưu tiên widget native, không dùng HTML/code khi widget phù hợp.
- Corporate Master dùng Contact Form 7 target đã xác minh; trình bày bằng UAE CF7 Styler, không tái tạo form chỉ để đổi giao diện.

## Write, tooling và boundary

- Live WordPress read/write chỉ qua MCP hoặc documented REST. Không đọc/tìm PHP source Core/plugin/theme, dùng WP-CLI/database/helper trừ khi owner yêu cầu/phê duyệt tác vụ development/debug/compatibility.
- Dùng script đóng gói trong `scripts/`; không viết lại temp code khi công cụ đã có. Temp data được phép. Temp code chỉ cho capability thiếu/diagnostic một lần, không chứa secret, phải ghi lý do; nhu cầu lặp lại phải promote vào repo.
- Trước write: resolve exact target → lấy live ability/schema cho exact ability lần đầu trong run → write → read-back → QA scope. Cache chỉ bỏ full discovery.
- `elementor-build.mjs` dùng build plan đã validate; `cdp-qa.mjs` dùng QA plan. Arbitrary REST write là escape hatch có cờ cho phép rõ, không phải đường build mặc định.
- XAMPP/Apache/MySQL do owner quản lý. Không đọc/sửa PID/socket/log hoặc điều khiển dịch vụ nếu owner chưa yêu cầu rõ tác vụ hạ tầng.
- Không lưu secret; không tự đổi analytics, security, backup, production mail hoặc payment/order.

## Tài nguyên

Starter: `assets/project-starter/`. Corporate baseline: `assets/baselines/corporate-master.json`. Schemas: `assets/schemas/`. Tools: `scripts/`. Prompt theo intent ở `assets/prompts/`.
