# Project Status v2

Đọc file này sau owner request. Chỉ nạp `Current inputs` cần cho requested scope. `Next Recommended Action` là khuyến nghị, không thắng explicit owner request.

## Project Profile

- Project profile: `corporate-master-v2` / `greenfield-standard-v1` / `commerce` / `existing` / `redesign` / `migration`
- Website type: Corporate/Service / Commerce / Other
- Environment: Local / Staging / Production
- Site URL:

## Baseline

- Baseline: `corporate-master` / custom / none
- Baseline version: `2.0.0` / N/A
- Baseline verification: Not started / Partial / Verified / Drift / N/A
- Evidence: `docs/preconfigured-baseline.md` @ revision

## Execution

- Execution mode: `DESIGN` / `PRODUCTION`
- Execution strategy: `GUIDED_FLOW` / `OWNER_DIRECTED`
- Current requested scope: SITE / PAGE / SECTION / COMPONENT · target:
- Current task type: CREATE / REVISE / INTEGRATE / QA / PRODUCE
- Current revision intent: N/A / POLISH / REDESIGN / REPLACE_DIRECTION / RESPONSIVE_FIX / CONTENT_LAYOUT_FIX / SECTION_REVISION
- Current phase: Project Context / Foundation / Design Execution / Integrated QA / Design Approval / Production / Launch / Editorial Growth

## Router

- Current inputs:
  - `docs/project-brief.md`
- Direct dependencies:
  - Chưa xác định theo requested scope
- Active unfinished scope: Không có
- Next Recommended Action: Xác nhận brief/profile/baseline; nếu owner chưa chỉ target, đề xuất scope thiết kế có giá trị cao nhất

## Page/Component States

| Scope/target | State | Dependency flags | Revision/evidence | Next |
|---|---|---|---|---|
| Home | Not Started | | | |
| Header | Not Started | | | |
| Footer | Not Started | | | |

State: `Not Started`, `Planned`, `Design In Progress`, `Design Complete`, `Page Design Approved`, `Revision Requested`, `QA Pending`, `Integrated QA Passed`, `Production Ready`, `Complete`.

## Approved Gates

- Approved outputs/gates:
  - Chưa có
- Gate names: Page Design Approved / Design Direction Approved / Site Design Approved / Production Approved / Launch Approved

Mỗi entry dùng `` `path` @ `revision` `` và phải khớp marker nguồn. Đây là dependency active, không phải lịch sử đầy đủ.

## Deferred Work và policy

- Deferred work: Rank Math detail; performance/cache; production SMTP; analytics/security/indexing — mở ở Production Mode hoặc explicit request
- MCP capability cache: Empty · `docs/mcp-capability-cache.md`
- Build manifest: Empty · `docs/build-manifest.md`
- Cache purge policy: `owner`
- Exceptions/risks:
- Last updated: YYYY-MM-DD HH:MM TZ
