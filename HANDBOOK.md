# Hệ thống sản xuất website Tổng Lực v2

Skill này triển khai mô hình `Design-First Corporate Master + Flexible Owner-Directed Workflow` cho WordPress, Astra Pro, Elementor Free classic/V3 và UAE Pro.

## Bắt đầu dự án

1. Khôi phục đúng Corporate Master cho website doanh nghiệp/dịch vụ; website WooCommerce dùng baseline riêng.
2. Chạy `scripts/init-project.sh <absolute-wordpress-root>` để cài hồ sơ dự án, hoặc merge thủ công nếu starter đã tồn tại.
3. Rebind domain/environment và cấu hình Global MCP bằng credential riêng; không lưu secret vào Git/docs.
4. Owner điền `docs/project-brief.md`, đặt brand assets theo exact path và chọn baseline/profile trong STATUS.
5. Mở chat bằng prompt trong `AI-START-HERE.md`, sau đó chỉ cần nêu yêu cầu thiết kế tự nhiên.

Ví dụ hợp lệ:

```text
Dùng $tongluc-wordpress-production. Hãy thiết kế Trang chủ trước.
Dùng $tongluc-wordpress-production. Hãy làm Footer.
Dùng $tongluc-wordpress-production. Chỉ sửa Hero trên mobile.
Dùng $tongluc-wordpress-production. Hãy redesign Trang chủ nhưng giữ nội dung và SEO constraints.
```

## Corporate Master Contract

Contract máy đọc nằm ở `assets/baselines/corporate-master.json`:

- Home page ID `50`.
- Contact page ID `55`.
- About page ID `57`.
- Footer Astra Advanced Hook ID `59`.
- Contact Form 7 ID `843524c`.
- Menu `Primary Menu` và `Off-Canvas Menu`.

Đây là ID của đúng master/version, không phải hằng số cho mọi WordPress. Codex luôn xác minh exact target trước write. Footer target cố định nhưng layout/footer composition là project delta. CF7 được trình bày bằng UAE CF7 Styler.

## Workflow linh hoạt

Thứ tự quyền hạn:

```text
Owner Direction > Active Requested Scope > Next Recommended Action > Guided Flow
```

- `OWNER_DIRECTED`: owner nêu rõ page/section/component hoặc revision. Codex làm đúng scope và direct dependency.
- `GUIDED_FLOW`: owner chỉ nói “bắt đầu/tiếp tục”. Codex đi theo đường khuyến nghị Project Context → Foundation delta → representative page/design → integrated QA → Site Design Approval → Production.

Owner có thể làm Home trước Header, Footer trước About, Service trước Header hoặc chỉ sửa một section. Page có thể `Design Complete` với `Global Shell Integration Pending`; sau đó chỉ chạy integrated QA khi shell có.

Page Wave là lịch gợi ý, không phải chuỗi bắt buộc. Approval có thể theo page/direction/site; không ép duyệt từng section.

## Design Mode và Production Mode

Corporate Master bắt đầu ở `DESIGN`. Design Mode tập trung content gần thật, hierarchy, sections/widgets, visual direction, responsive, accessibility và SEO-aware architecture.

`PRODUCTION` chỉ mở sau `Site Design Approved` hoặc explicit owner request. Khi đó mới hoàn thiện Rank Math chi tiết, performance/cache, production SMTP, analytics/security/indexing theo scope. LiteSpeed settings vẫn owner-managed.

## SEO-aware design

Sitemap map page/URL, primary topic, secondary topics, intent, audience, geographic intent, conversion goal, internal links và priority. Full SEO brief cần cho Home/main service/local-commercial/important solution. About/Contact dùng brief nhẹ khi đủ; utility/legal không cần full brief.

SEO constraints → content contract → heading/sections → blueprint. Mỗi page indexable có một H1, H2/H3 logic, nội dung đủ thật, internal links và không có claim/evidence bịa đặt.

## Revisions

Revision là task hạng nhất: `POLISH`, `REDESIGN`, `REPLACE_DIRECTION`, `RESPONSIVE_FIX`, `CONTENT_LAYOUT_FIX`, `SECTION_REVISION`. Codex đọc live structure, giữ business/SEO constraints theo mặc định, write đúng scope, read-back và QA đúng viewport. Không rerun toàn site cho một fix nhỏ.

## Tooling tái sử dụng

- `scripts/mcp-client.mjs`: MCP low-level adapter.
- `scripts/rest-client.mjs`: documented REST/read/upload; arbitrary write là escape hatch.
- `scripts/elementor-build.mjs`: build-plan-driven Elementor/UAE pipeline.
- `scripts/cdp-qa.mjs`: QA-plan-driven responsive/browser checks.
- `assets/schemas/`: schemas cho build/QA plan.
- `assets/baselines/`: Corporate Master manifest.

Sau khi clone/update repository, chạy `npm ci` tại skill root. Không import dependency từ cache `_npx` hoặc absolute user path.

Script không chứa domain, ID dự án, brand, year hoặc absolute user path. Temp data được phép; temp code chỉ khi tool thiếu capability và phải promote nếu lặp lại.

## Backward compatibility

- Corporate Master verified: dùng optimized inheritance/delta workflow.
- Non-master/existing/redesign/migration: dùng standard discovery/profile; không áp fixed IDs.
- WooCommerce: dùng commerce workflow/baseline riêng, không kế thừa Corporate Master doanh nghiệp.

## Bản đồ tài liệu

| Nhu cầu | Tài liệu |
|---|---|
| Router/dependency/state | `references/operating-model.md` |
| Corporate Master | `references/corporate-master.md`, `assets/baselines/corporate-master.json` |
| Brief | `references/brief-and-discovery.md` |
| MCP/tooling | `references/stack-and-mcp.md`, `references/tooling-and-build-plans.md` |
| SEO/content/blueprint | `references/seo-aeo-llmo.md`, `references/content-contracts-and-blueprints.md` |
| Design/widgets | `references/design-system.md`, `references/widget-decision-guide.md` |
| Astra templates | `references/astra-site-builder.md` |
| WooCommerce | `references/woocommerce-workflow.md` |
| QA/handoff | `references/qa-and-handoff.md` |

## Bảo mật

Không commit credential, Application Password, SMTP/payment key hoặc browser profile. Chỉ lưu config example/placeholder. Publication, email/giao dịch thật và production settings vẫn theo quyền owner.
