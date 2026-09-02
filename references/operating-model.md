# Operating model v2 — Design First, Flexible Master

## Authority và strategy

Thứ tự tuyệt đối:

```text
Owner Direction > Active Requested Scope > Next Recommended Action > Guided Flow
```

- `GUIDED_FLOW`: dùng khi owner chỉ nói bắt đầu/tiếp tục. Codex tự chọn bước có giá trị tiếp theo theo dependency graph.
- `OWNER_DIRECTED`: dùng khi owner nêu target/scope/revision. Thứ tự owner thắng lịch gợi ý; Codex chỉ bổ sung direct prerequisite thật sự bắt buộc.

Không được biến STATUS, prompt đánh số hoặc page-wave queue thành chuỗi lệnh cứng.

## Four-layer model

1. `MASTER SITE`: hạ tầng WordPress/Astra/Elementor/UAE/form/menu/target ổn định.
2. `PROJECT CONTEXT`: brief, sitemap/SEO map, brand assets, baseline verification và project delta.
3. `DESIGN EXECUTION`: trang/section/component, content-aware layout, responsive và revisions.
4. `PRODUCTION`: SEO kỹ thuật chi tiết, performance/cache, mail/analytics/security/indexing và launch.

## Modes

- `DESIGN`: mặc định cho Corporate Master. Cho phép dựng các target thiết kế theo owner direction sau khi direct dependencies đủ.
- `PRODUCTION`: chỉ sau `Site Design Approved` hoặc owner yêu cầu rõ. High-risk publication/integration vẫn cần quyền phù hợp.

## Dependency graph

Dependency chỉ là điều kiện trực tiếp, không phải thứ tự toàn dự án.

| Requested scope | Direct dependency tối thiểu |
|---|---|
| Foundation delta | Brief/brand facts liên quan; baseline verification khi dùng master |
| Home | Baseline verified; page target; business facts; Design Delta; Home SEO brief/content requirements |
| Header/Menu | Logo/brand identity; Primary Menu; CTA nếu có; Design Delta; target ownership |
| Footer | Footer target; company/contact facts; relevant navigation; Design Delta |
| About | About target; company facts; content contract; Design Delta; SEO brief nếu cần |
| Contact | Contact target; contact facts; CF7 target; Design Delta; production SMTP không phải dependency Design Mode |
| Service/other page | Brief + SEO/content constraints + Design Delta; tạo page/menu record là direct prerequisite nếu sitemap đã xác nhận |
| Section/Component | Current live structure hoặc blueprint fragment + content/acceptance của scope |
| Integrated QA | Page/component output + các global dependency thực tế đã tồn tại |
| Production | Site Design Approved hoặc explicit owner request + production scope |

Ví dụ: Home có thể được dựng trước Header và ghi `Global Shell Integration Pending`; khi Header/Footer hoàn tất, chỉ chạy Integrated QA. Footer không bắt buộc chờ Home.

## Scope và revision

Scope: `SITE`, `PAGE`, `SECTION`, `COMPONENT`.

Task type: `CREATE`, `REVISE`, `INTEGRATE`, `QA`, `PRODUCE`.

Revision intent: `POLISH`, `REDESIGN`, `REPLACE_DIRECTION`, `RESPONSIVE_FIX`, `CONTENT_LAYOUT_FIX`, `SECTION_REVISION`.

Revision flow: đọc current live structure → xác định preservation constraints → write đúng scope → read-back → responsive QA liên quan → cập nhật state. Không rerun toàn workflow nếu direct dependency không đổi.

## State model

Mỗi page/component có thể mang state độc lập: `Not Started`, `Planned`, `Design In Progress`, `Design Complete`, `Page Design Approved`, `Revision Requested`, `QA Pending`, `Integrated QA Passed`, `Production Ready`, `Complete`.

Dependency flags có thể đi kèm: `Global Shell Integration Pending`, `Content Pending`, `SEO Brief Pending`, `Asset Pending`, `Revalidation Required`.

Approval gates linh hoạt: `Page Design Approved`, `Design Direction Approved`, `Site Design Approved`, `Production Approved`, `Launch Approved`. Owner có thể duyệt theo page hoặc duyệt direction/site; không bắt buộc approval từng section. Codex không tự duyệt.

## Guided Flow khuyến nghị

Đây là default hữu ích, không phải luật cứng:

1. Xác nhận Project Context và baseline.
2. Chốt sitemap/SEO map và Foundation delta.
3. Dựng page/section có giá trị cao nhất; thường là Home.
4. Dựng Header/Footer/Menu hoặc target owner ưu tiên.
5. Dựng các page theo archetype/priority; Page Wave chỉ là scheduling aid.
6. Integrated Design QA và `Site Design Approved`.
7. Production Mode theo scope.

## Corporate Master và compatibility

Corporate Master chỉ cho website doanh nghiệp/dịch vụ không WooCommerce. Fixed ID/name chỉ dùng sau verification theo manifest. Không full inventory khi baseline khớp; chỉ resolve target cần dùng. Website không khớp master chuyển standard discovery/profile, không ép fixed contract.

## Completion

- Design hoàn tất khi mọi scope launch có state phù hợp, integrated QA không còn blocker và owner cấp `Site Design Approved`.
- Production hoàn tất khi production checklist theo scope đạt và owner cấp `Production Approved`/`Launch Approved` khi áp dụng.
- Editorial Growth không tự khởi chạy; dùng yêu cầu riêng.
