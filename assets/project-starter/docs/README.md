# Hồ sơ dự án v2

`STATUS.md` lưu state; owner request hiện tại quyết định requested scope. Authority:

```text
Owner Direction > Active Requested Scope > Next Recommended Action > Guided Flow
```

## Router tối thiểu

| File | Khi đọc |
|---|---|
| `STATUS.md` | Mọi phiên |
| `project-brief.md` | Project Context hoặc khi facts/scope liên quan |
| `preconfigured-baseline.md` | Khi verify/use master target hoặc project override |
| `sitemap-seo-map.md` | Architecture/page intent/internal links |
| `seo-briefs/[slug].md` | Page SEO quan trọng trước contract/blueprint |
| `content-contracts/[scope].md` | Trước design/build/revision liên quan |
| `design-foundation.md` | Khi style inheritance/delta ảnh hưởng scope |
| `blueprints/` | Build/revision scope tương ứng |
| `build-manifest.md` | Resolve/write/read-back/collision |
| `mcp-capability-cache.md` | MCP JIT |
| `prototype-approval.md` | Design review/evidence khi áp dụng |
| `global-shell-approval.md` | Header/Footer/Menu state và integrated QA |
| `page-wave-status.md` | Optional scheduling, không phải authority |
| `revisions/` | Revision task |
| `handoff-report.md` | Integrated/Production QA và handoff |

Không đọc toàn bộ thư mục. Exact input bị thiếu thì ghi dependency và hoãn đúng task, không quét để đoán.

## Baseline

Corporate Master chỉ cho corporate/service không WooCommerce. Fixed contract chỉ dùng sau verification. Trạng thái item: `Inherited`, `Verified`, `Project Override`, `Drift`, `Not Applicable`.

## Design-first workflow

- `GUIDED_FLOW`: Codex chọn bước khuyến nghị theo dependency graph.
- `OWNER_DIRECTED`: owner chọn SITE/PAGE/SECTION/COMPONENT; chỉ direct dependency có thể chặn.
- Page có thể `Design Complete` và `Global Shell Integration Pending`; sau đó Integrated QA.
- Page Wave là scheduling aid. Home là prototype mặc định, không phải gate cứng trước mọi target.
- Design Mode trước; Production Mode sau Site Design Approval hoặc explicit request.

## SEO/content order

Trang SEO quan trọng: SEO brief → content contract → heading/sections → blueprint/build. About/Contact có thể lightweight; utility/legal không cần full brief. Không bịa facts/evidence/claim.

## Approval/revision

Approval gắn snapshot/revision và có thể ở mức Page/Direction/Site/Production/Launch. Không ép micro-approval. Thay đổi dependency chỉ revalidate downstream bị ảnh hưởng.

## Bảo mật

Không ghi Application Password, SMTP/payment key hoặc secret. Config thực nằm ngoài repo/hồ sơ hoặc trong file ignored do owner quản lý.
