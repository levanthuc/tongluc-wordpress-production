# Hệ thống tri thức và SOP sản xuất website Tổng Lực

Đây là bộ tài liệu chuẩn cho dự án WordPress dùng Astra Pro, Elementor Free V3, UAE Pro và WooCommerce khi là website bán hàng.

## Cách dùng với Codex

### Dùng như Skill

Skill entrypoint là `SKILL.md`. Khi skill đã được cài vào Codex, bắt đầu chat mới bằng:

```text
Use $tongluc-wordpress-production để bắt đầu dự án website này theo SOP Tổng Lực.
```

Prompt không cần chép lại toàn bộ quy trình; Skill sẽ đọc reference phù hợp.

### Dùng trong website mới

1. Sao chép có kiểm soát `assets/project-starter/` vào root website, hoặc chạy `scripts/init-project.sh <absolute-wordpress-root>`. Installer chỉ nhận WordPress root chuẩn có `wp-load.php`, `wp-admin/`, `wp-content/`, `wp-includes/`; layout không chuẩn phải merge thủ công sau khi xác định đường dẫn.
2. Xác nhận skill đã được cài trong Codex và root website có `AGENTS.md`, `AI-START-HERE.md`, `docs/STATUS.md`; starter là hồ sơ dự án, không phải bản sao SOP/reference.
3. Owner kiểm soát facts/quyết định ở phần 1–4 của `docs/project-brief.md`; owner có thể điền trực tiếp hoặc để Codex chép trung thành chỉ thị rõ ràng từ chat. Codex chỉ hỏi bổ sung/xác minh khi có hard blocker. Với website mới đúng baseline Tổng Lực, để `docs/site-inventory.md` ở trạng thái `N/A for greenfield`.
   Nếu owner đã cấu hình sẵn theme globals, page/menu/form/Woo target, điền `docs/preconfigured-baseline.md`, đặt header `Current` và ghi đúng revision vào STATUS. Codex sẽ bỏ audit/reapply, chỉ làm `Action required`; không lưu secret.
4. Mở chat mới bằng prompt ngắn trong `AI-START-HERE.md`. Codex đọc `docs/STATUS.md`, chỉ nạp `Current inputs`, thực hiện `Next action` và dừng ở cổng duyệt tiếp theo. Sau approval, Codex hỏi xác nhận cho phase mới; owner chỉ cần trả lời `Tiếp tục`.
5. Sao chép file `_template.md` thành tên archetype/slug trước khi điền; không sửa mẫu gốc.
6. Không lưu credential thật trong tài liệu dự án.

Workflow chuẩn mặc định `guided-wave`:

```text
Brief → Sitemap/IA + contract registry → Contract JIT
→ Global Foundation đã áp dụng/duyệt → Global Shell đã duyệt
→ Home Blueprint → Home Prototype → Page Waves
→ Core QA/Handoff → Website Core Complete → Dừng
```

`strict-sequential` duyệt từng trang; `batch-production` chỉ dùng khi owner chọn và representative prototype/archetype đã duyệt. Editorial Growth (taxonomy, kế hoạch và bài viết SEO/AIO/AEO/LLMO) là scope riêng, không tự khởi chạy sau Core Complete.

MCP được khám phá JIT khi tác vụ đầu tiên cần truy cập site, không phải ở bước intake. Cache purge mặc định do chủ dự án thực hiện; quyền tự purge scope hẹp trên Local/Staging phải được ghi rõ trong `docs/STATUS.md`.

Capability cache chỉ giúp bỏ full discovery. Trước first write của mỗi exact ability trong một execution run, Codex phải lấy live ability info. Artifact tạo và read-back thành công được ghi vào `docs/build-manifest.md`; manifest hỗ trợ ownership/collision nhưng không thay thế dữ liệu live.

## Bản đồ tài liệu

| Nhu cầu | Tài liệu |
|---|---|
| Quy trình dự án | `references/operating-model.md` |
| Baseline website mới | `references/greenfield-baseline.md` |
| Baseline owner đã cấu hình/skip rule | `references/preconfigured-skip-policy.md`, `assets/project-starter/docs/preconfigured-baseline.md` |
| Brief/discovery | `references/brief-and-discovery.md` |
| Artifact ownership/build manifest | `assets/project-starter/docs/build-manifest.md` |
| Stack và MCP | `references/stack-and-mcp.md` |
| Content contract, archetype, prototype | `references/content-contracts-and-blueprints.md` |
| Global Shell/page waves | `assets/project-starter/docs/global-shell-approval.md`, `assets/project-starter/docs/page-wave-status.md` |
| Cache purge/xác minh giao diện | `references/cache-policy.md` |
| Astra modules | `references/astra-capabilities.md` |
| Site Builder/Hooks | `references/astra-site-builder.md` |
| Design foundation | `references/design-system.md` |
| Danh sách widget | `references/widget-catalog.md` |
| Chọn widget | `references/widget-decision-guide.md` |
| WooCommerce | `references/woocommerce-workflow.md` |
| SEO/AEO/LLMO | `references/seo-aeo-llmo.md` |
| Viết bài | `references/content-writing.md` |
| QA/bàn giao | `references/qa-and-handoff.md` |
| Nâng starter dự án cũ | `references/starter-migration-v2.md` |
| Nguồn/cập nhật | `references/sources.md` |

## Quản trị phiên bản

- Cập nhật `references/sources.md` và ngày review khi catalog thay đổi.
- Không sửa SOP vì một trường hợp cá biệt nếu chưa xác định đó là quy tắc chung.
- Project-specific exception nằm trong tài liệu dự án, không ghi ngược vào Skill trừ khi đã được Tổng Lực chuẩn hóa.
- Trước nâng version lớn của WordPress/Astra/Elementor/UAE/WooCommerce, đánh dấu capability cache là stale và refresh JIT ở lần dùng tiếp theo.

## Bảo mật

- Template chỉ dùng placeholder.
- Application Password/API key/payment key chuyển qua kênh bí mật.
- Không commit file config chứa secret.
- Thu hồi credential và account không còn cần sau bàn giao.
