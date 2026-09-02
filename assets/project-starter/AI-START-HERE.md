# Bắt đầu với Codex

Sau khi starter đã cài, owner điền `docs/project-brief.md`, đặt asset đúng path, chọn profile/baseline trong `docs/STATUS.md` và cấu hình MCP riêng.

## Prompt chung

```text
Dùng $tongluc-wordpress-production. Đọc AGENTS.md và docs/STATUS.md. Thực hiện yêu cầu hiện tại theo đúng requested scope; chỉ nạp direct dependencies, tự tiếp tục phần không bị chặn và báo rõ state/Next Recommended Action.
```

## Không cần nhớ workflow command

Owner có thể nói tự nhiên:

```text
Hãy bắt đầu dự án.
Hãy thiết kế Trang chủ trước.
Hãy làm Footer.
Hãy thiết kế trang Giới thiệu trước.
Hãy thiết kế trang Dịch vụ trước Header.
Chỉ sửa Hero trên mobile.
Chỉ sửa responsive trang Liên hệ trên mobile.
Hãy redesign Trang chủ, giữ business facts và SEO constraints.
Tiếp tục requested scope đang làm dở.
```

Nếu target rõ, Codex dùng `OWNER_DIRECTED`; nếu chỉ “bắt đầu/tiếp tục”, dùng `GUIDED_FLOW`. STATUS lưu trạng thái nhưng không ép thứ tự.

Corporate Master bắt đầu ở Design Mode. Production Mode chỉ mở sau `Site Design Approved` hoặc yêu cầu rõ của owner.
