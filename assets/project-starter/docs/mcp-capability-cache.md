# MCP Capability Cache

> Cache schema: v2 · Trạng thái tổng: Empty / Partial / Current / Stale · Cập nhật: YYYY-MM-DD HH:MM TZ

Cache được tạo Just-in-Time khi một tác vụ thực sự cần MCP. Không discover toàn bộ chỉ để khởi động dự án.

`Current` chỉ có nghĩa với coverage được liệt kê bên dưới; nhóm không liệt kê là `Unknown`, không được suy ra là đã discover.

Cache chỉ giúp tìm ability và tránh full discovery. Nó không cấp quyền tái sử dụng write schema giữa các execution run: trước first write của mỗi exact ability trong run mới phải lấy live ability info.

## Kết nối

- Site URL:
- Endpoint Global:
- Username (không ghi password):
- Thời điểm kiểm tra:
- Kết quả xác thực:
- Client/transport:
- User/role fingerprint không chứa bí mật:
- Enabled abilities/modules fingerprint:
- Fingerprint evidence/source:

### Phiên bản quan sát được — Optional, non-blocking

Chỉ ghi version khi owner cung cấp hoặc thông tin xuất hiện tự nhiên trong thao tác hiện tại. Không query/discover riêng để điền đủ; `Unknown` là hợp lệ.

- WordPress version:
- MCP Adapter version:
- Astra/Astra Pro version:
- Elementor/UAE version:
- WooCommerce version hoặc N/A:

Không full-discover chỉ để điền fingerprint/version. Thiếu version không tự hạ coverage đã được kiểm chứng trực tiếp; ability/coverage chưa inspect vẫn là `Unknown` và chỉ refresh đúng phần task cần.

## Coverage map

| Nhóm/tác vụ | Status: Current/Stale/Unknown | Fingerprint áp dụng | Checked at | Ghi chú |
|---|---|---|---|---|
| Core content read/write | Unknown | | | |
| Astra settings | Unknown | | | |
| Elementor document | Unknown | | | |
| UAE widgets | Unknown | | | |
| WooCommerce | N/A / Unknown | | | |

## Meta-tools

- `mcp-adapter-discover-abilities`: Có / Không
- `mcp-adapter-get-ability-info`: Có / Không
- `mcp-adapter-execute-ability`: Có / Không
- Tên khác do `tools/list` trả về (nếu có):
- Ghi chú lỗi/quyền:

## Ability inventory theo coverage

| Namespace/nhóm | Ability | Read/Write | Schema/tóm tắt input | Kiểm tra gần nhất | Kết quả |
|---|---|---|---|---|---|
| Core | | | | | |
| Astra | | | | | |
| Elementor | | | | | |
| UAE | | | | | |
| WooCommerce | | | | | |

## Invalidation log

| Tín hiệu thay đổi | Coverage bị ảnh hưởng | Trạng thái mới | Lý do/bằng chứng |
|---|---|---|---|
| Endpoint/principal | All | Stale | |
| Core/MCP Adapter | All hoặc scope xác định | | |
| Astra/Elementor/UAE/Woo/module | Chỉ nhóm phụ thuộc | | |
| Ability/schema/execute mismatch | Ability/nhóm liên quan | | |
| Owner refresh request | Scope được yêu cầu | | |

Giữ coverage không liên quan ở `Current`. Trạng thái tổng là `Partial` khi các row có trạng thái trộn lẫn; chỉ dùng `Stale` toàn cục khi connection fingerprint hoặc toàn bộ coverage không còn tin cậy. Version trống không tự đổi trạng thái coverage đã live-verified. Read có thể tái sử dụng cache hợp lệ; write luôn tuân thủ live-info-per-ability-per-run ở trên.

## Kết luận

- Tác vụ có thể tự động hóa an toàn:
- Tác vụ bị MCP/REST chặn hoặc cần owner phê duyệt fallback development/debug:
- Tác vụ cần người dùng phê duyệt:
- Ability/fallback vừa bổ sung vào cache:
- Rủi ro/bất thường:
