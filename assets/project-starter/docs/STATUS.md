# Project Status

Đọc file này trước; sau đó chỉ đọc hồ sơ dự án trong `Current inputs`. Skill có thể nạp reference đúng phase cho `Next action`; không đọc các hồ sơ dự án khác. Khi qua cổng duyệt, phải thêm mọi record bắt buộc của next action vào `Current inputs` trước write (đặc biệt build manifest ở Prototype/Production/QA và prototype approval ở Production/QA).

`Approved outputs` chỉ là tập dependency đã duyệt đang chi phối `Next action`, không phải lịch sử. Mỗi entry dùng `` `path` @ `revision` `` và phải khớp header `Trạng thái: Approved`, đúng `Revision` và `Người duyệt/ngày` trong tài liệu gốc; lệch là routing error/revalidation, chưa được write.

- Profile: `greenfield-standard-v1`
- Profile source: Owner đã khởi tạo starter greenfield Tổng Lực; đổi profile nếu thực tế mâu thuẫn
- Website type: Chưa xác định
- Environment: Local / Staging / Production
- Delivery mode: `guided-wave` / `strict-sequential` / `batch-production`
- Preconfigured baseline: Not used / Current / Partial / Stale · Evidence: `docs/preconfigured-baseline.md` @ `revision`
- Phase: Intake
- Approved outputs — active gate set:
  - Chưa có
- Current inputs:
  - `docs/project-brief.md`
- Next action: Đọc/cập nhật brief theo snapshot guard; ghi deferred decisions/hard blockers. Nếu không bị chặn, dừng tại cổng duyệt. Nếu đúng revision đã Approved, chuyển Architecture theo operating-model
- MCP capability cache: Empty · Coverage: none
- Build manifest: Empty · `docs/build-manifest.md`
- Prototype approval: Not started · Evidence: `docs/prototype-approval.md`
- Global Shell approval: Not started · Evidence: `docs/global-shell-approval.md`
- Active page wave: Not started · Queue: `docs/page-wave-status.md`
- Continuation mode: `confirm-next-phase`
- Cache purge policy: `owner`
- Exceptions from profile: Không có
- Last updated: YYYY-MM-DD HH:MM TZ

Phase hợp lệ: `Intake`, `Architecture`, `Contract JIT`, `Global Foundation`, `Global Shell`, `Home Blueprint`, `Home Prototype`, `Page Waves`, `Core QA/Handoff`, `Website Core Complete`, `Editorial Growth`. Không tự chuyển từ `Website Core Complete` sang `Editorial Growth`.
