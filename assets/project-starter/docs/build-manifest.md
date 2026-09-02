# Build Manifest

> Trạng thái: Empty / Current / Conflict · Cập nhật: YYYY-MM-DD HH:MM TZ

Ledger này phân biệt artifact do dự án quản lý với dữ liệu có trước hoặc không rõ nguồn. Chỉ đọc khi requested scope cần resolve/write/read-back/collision/rollback; không phải input Intake mặc định.

## Quy tắc

- Chỉ ghi `Project-managed` sau create/update thành công và read-back xác nhận live identity.
- Artifact có trước chỉ ghi `Owner-adopted` sau khi owner duyệt và Codex xác minh live.
- Manifest không thay thế dữ liệu live. Trước write phải resolve target; mismatch type/ID/stable key/slug đặt `Conflict` và dừng affected write.
- Item `Planned` không cấp quyền ghi đè object cùng slug. Catalog lớn có thể ghi theo batch/archetype nếu có stable scope và rollback rõ.
- Migration đổi WP ID phải rebind bằng type + stable key/slug và xác minh trước khi cập nhật manifest.
- Corporate Master expected IDs/names đến từ baseline manifest nhưng vẫn cần exact target verification. Ghi baseline role/version để phân biệt contract với project-created artifact.

## Artifacts

| Type | WP ID/key | Baseline role/version | Slug/URL/name | Source + revision | Ownership | State | Last verified | Notes |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

Ownership: `Project-managed` / `Owner-adopted` / `External-unmanaged` / `Unexpected`.

State: `Planned` / `Created` / `Updated` / `Retired` / `Conflict`.
