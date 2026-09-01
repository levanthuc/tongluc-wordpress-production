# Bắt đầu với Codex

File này xuất hiện sau khi project starter đã được cài. Từ root WordPress, xác nhận `$tongluc-wordpress-production` đã được cài trong Codex và có `AGENTS.md`, `docs/STATUS.md`, `docs/project-brief.md`; không cần chạy lại installer.

## Prompt mở đầu

```text
Dùng $tongluc-wordpress-production. Đọc AGENTS.md và docs/STATUS.md; chỉ đọc Current inputs, thực hiện Next action và dừng tại cổng duyệt tiếp theo.
```

## Workflow greenfield `guided-wave`

1. Đọc brief do owner cung cấp, chỉ xử lý hard blocker và duyệt revision.
2. Sitemap/IA.
3. Contract registry tối thiểu; contract chi tiết JIT cho scope kế tiếp.
4. Áp dụng và duyệt Global Foundation (Astra globals, logo, favicon).
5. Tạo page shells/menu; thiết kế và duyệt Global Shell.
6. Home contract → blueprint → full-page Prototype → duyệt.
7. Từng page wave: unique page hoặc representative archetype → duyệt → instances.
8. Core QA/Handoff → `Website Core Complete` và dừng.

Không tự chuyển sang lập kế hoạch/viết bài. Editorial Growth là yêu cầu riêng sau này.

MCP discovery không phải bước khởi động. Khi tác vụ cần MCP, Codex dùng cache để chọn coverage; trước first write của mỗi exact ability trong run, Codex lấy live ability info. `docs/site-inventory.md` chỉ bắt buộc cho existing/redesign/migration hoặc exception có dữ liệu pre-project/unmanaged đáng kể; artifact project-managed không làm mất profile greenfield.

Cache purge mặc định do owner thực hiện. Muốn Codex tự purge scope hẹp trên Local/Staging, đổi `Cache purge policy` trong STATUS thành `codex-scoped`.

Sau mỗi approval hợp lệ, Codex sẽ chuyển phase, nêu Next action và hỏi xác nhận. Chỉ cần trả lời:

```text
Tiếp tục
```

Muốn bỏ lượt hỏi đó cho một gate cụ thể, dùng: `Duyệt [OUTPUT] [REVISION] và tiếp tục`.
