# Hồ sơ dự án

`STATUS.md` là router. Không đọc toàn bộ thư mục; chỉ đọc file được liệt kê trong `Current inputs`. Khi qua cổng duyệt, cập nhật STATUS và thêm đủ record bắt buộc của phase kế tiếp trước write.

Reference cũng được nạp theo allowlist của phase/Next action; không đọc toàn bộ `references/`. Exact input path bị thiếu thì ghi blocker, không quét thư mục để đoán; chỉ tiếp tục task độc lập đã được STATUS cho phép.

| File/thư mục | Vai trò | Khi đọc |
|---|---|---|
| `STATUS.md` | Phase, input hiện tại, next action, policy | Mọi phiên |
| `project-brief.md` | Nguồn sự thật do owner cung cấp về doanh nghiệp, mục tiêu, scope và phê duyệt | Intake/Discovery |
| `preconfigured-baseline.md` | Owner xác nhận settings/artifact đã sẵn sàng và delta Codex được làm | Chỉ khi STATUS đánh dấu Current/Partial và task liên quan |
| `site-inventory.md` | Dữ liệu/stack cũ và rủi ro ghi đè | Chỉ existing/redesign/migration/exception |
| `mcp-capability-cache.md` | Coverage/read schema/fingerprint; write cần live info | Khi task cần MCP |
| `build-manifest.md` | Ledger artifact managed/collision/rollback | Prototype/Production/QA hoặc resolve target |
| `sitemap-seo-map.md` | IA, intent, CTA, schema, links | Architecture trở đi |
| `content-contracts/` | Message/evidence/CTA/data trước layout | Content contract trở đi |
| `design-foundation.md` | Astra globals và component rules | Foundation/build |
| `global-shell-approval.md` | Menu, header, footer/hook và bằng chứng responsive đã duyệt | Global Shell trở đi |
| `blueprints/archetypes/` | Section/widget map dùng lại | Blueprint/build |
| `blueprints/pages/` | Trang độc nhất hoặc delta | Khi áp dụng |
| `prototype-approval.md` | Bằng chứng/pattern Prototype đã duyệt | Prototype/Production |
| `page-wave-status.md` | Queue và gate của từng trang/archetype wave | Home được duyệt trở đi |
| `content-briefs/` | Research brief cho bài chuyên sâu | Content production |
| `handoff-report.md` | QA, purge evidence, tồn đọng, nghiệm thu | QA/Handoff |

## Template

- Brief là tài liệu khẳng định, không phải bảng câu hỏi. Ô trống/TBD không tự động chặn; chỉ hard blocker ảnh hưởng thiết kế, scope, quyền hạn hoặc độ chính xác nội dung mới được hỏi bổ sung/xác minh. Yêu cầu duyệt revision tại cổng vẫn áp dụng.
- Baseline preconfigured `Current` được tin để bỏ audit/reapply. Khi phase cần dùng, thêm đúng revision vào `Current inputs`; không đọc ở startup nếu Next action không liên quan.
- Không sửa `_template.md`; sao chép và đặt slug chữ thường.
- Sitemap giữ registry tối thiểu; content contract chi tiết được tạo JIT và phải duyệt trước blueprint tương ứng, không bắt buộc duyệt mọi launch page cùng lúc.
- Instance tuân thủ archetype không cần blueprint riêng.
- Tạo page delta khi khác hierarchy, CTA, widget, data/schema, responsive hoặc acceptance criteria.
- Global Foundation phải được áp dụng/duyệt trước Global Shell; Global Shell phải duyệt trước Home build.
- Home là full-page Prototype mặc định. Prototype/representative pattern phải duyệt trước production hàng loạt.
- Delivery mode mặc định là `guided-wave`; chỉ một scope trong `page-wave-status.md` được active.
- Khi đạt `Website Core Complete`, dừng; Editorial Growth chỉ mở theo yêu cầu riêng.
- STATUS chỉ ghi trạng thái; `prototype-approval.md` giữ bằng chứng và revision đã duyệt.
- Build manifest không phải source of truth; mọi write vẫn resolve live target.

## Approval và revision

- Mỗi output dùng revision `YYYY-MM-DD-rN`; `N` tăng đơn điệu cho tài liệu. Trạng thái là trường riêng (`Draft`, `Approved`, `Revalidation required`; thêm `Rejected` khi áp dụng); không dùng revision như `r2-review`, `r3-draft` hoặc `r4-approved`.
- Marker mở gate duy nhất là header `Trạng thái: Approved` của tài liệu nguồn, đi cùng đúng `Revision` và `Người duyệt/ngày`. Metadata người duyệt không tự mở gate. File `_template.md` không phải output dự án.
- Approval gắn với snapshot. Nội dung trọng yếu đổi thì tạo revision kế tiếp ở `Draft`; xác nhận hoàn toàn trùng nội dung mới được chuyển revision hiện tại từ `Draft` sang `Approved`. Lúc chuyển chỉ sửa `Trạng thái` và `Người duyệt/ngày`, không sửa nội dung hoặc `Cập nhật nội dung`.
- Không sửa nội dung dưới cùng ID đã `Approved`. Facts mới kèm lời duyệt revision hiện tại/cũ phải tạo Draft mới, giữ phase và chờ duyệt; approval không rollover. Khi dependency đổi, đặt output downstream bị ảnh hưởng thành `Revalidation required`.
- `STATUS.md` chỉ liệt kê active gate set theo dạng `` `path` @ `revision` `` sau khi read-back marker nguồn; không dồn lịch sử approval vào STATUS.

## Tiếp tục sau cổng duyệt

- `Continuation mode` mặc định là `confirm-next-phase`.
- Sau approval, Codex chuyển phase, nêu Next action và hỏi xác nhận; owner chỉ cần trả lời `Tiếp tục`.
- `Tiếp tục` không phải approval và không cấp quyền cho scope change hoặc hành động rủi ro. Có thể dùng `Duyệt [OUTPUT] [REVISION] và tiếp tục` để chạy ngay phase kế tiếp.

## Bảo mật

Không ghi Application Password, SMTP password, API/payment key hoặc secret. Chỉ ghi trạng thái/fingerprint không nhạy cảm và nơi owner quản lý.
