# Stack và MCP Just-in-Time

## Stack chuẩn greenfield

- WordPress; Astra + Astra Pro; Elementor Free classic/V3; UAE Pro.
- MCP Adapter và Abilities API/polyfill khi phiên bản WordPress yêu cầu.
- Contact Form 7 là form engine; UAE CF7 Styler khi cần style; WP Mail SMTP do chủ dự án cấu hình.
- Rank Math quản lý SEO/schema chính; LiteSpeed Cache do chủ dự án cấu hình.
- WooCommerce chỉ cho website bán hàng; extension thanh toán/vận chuyển/thuế theo brief.

Existing/redesign giữ form/SEO/cache engine hiện có trừ khi scope phê duyệt migration.

Corporate Master v2 chỉ áp dụng website doanh nghiệp/dịch vụ không WooCommerce và dùng manifest `assets/baselines/corporate-master.json`. Website bán hàng dùng profile/commerce baseline khác; không nhận fixed ID của Corporate Master.

## Ownership của local runtime

XAMPP, Apache, MySQL và runtime máy local do owner quản lý; chúng không thuộc scope thiết kế/build WordPress mặc định.

- Health check thường lệ chỉ dùng site URL qua HTTP, WordPress REST API và MCP endpoint cần cho task. MCP/REST hoạt động là đủ; không cần kết nối raw MySQL.
- Không sửa, xóa, di chuyển hoặc tạo lại file PID/socket; không start, stop, restart hay kill Apache/MySQL nếu owner chưa yêu cầu rõ tác vụ hạ tầng trong lượt hiện tại.
- Không đọc PID, socket hoặc server log chỉ để thực hiện phase website. Chỉ chẩn đoán mức này khi owner yêu cầu xử lý runtime hoặc site thực sự không truy cập được từ cả phía owner lẫn công cụ phù hợp.
- Xác nhận của owner rằng site đang truy cập được là bằng chứng runtime đang phục vụ. Nếu browser của owner hoạt động nhưng HTTP/MCP từ môi trường Codex thất bại, thử URL/endpoint đúng phạm vi và phân loại là giới hạn network/sandbox/client; không suy ra Apache/MySQL đã dừng.
- Khi tool không thể truy cập endpoint nhưng owner vẫn truy cập được, dừng đúng write phụ thuộc kết nối, báo kiểm tra đã dùng và hướng dẫn owner xác minh nếu cần. Tiếp tục các tác vụ tài liệu/tài sản độc lập; không tự sửa hạ tầng.

## Endpoint

| Chế độ | Endpoint | Dùng khi |
|---|---|---|
| Global | `{site-url}/wp-json/mcp/mcp-adapter-default-server` | Mặc định |
| Astra Only | `{site-url}/wp-json/astra/v1/mcp` | Chẩn đoán hoặc chỉ quản lý Astra |

Global default server thường trả ba meta-tools:

1. `mcp-adapter-discover-abilities`
2. `mcp-adapter-get-ability-info`
3. `mcp-adapter-execute-ability`

Lấy `tools/list` làm bằng chứng. Nếu bản cài trả tên khác, ghi tên thực tế vào cache; không tự suy đoán alias.

## Mẫu cấu hình

```json
{
  "mcpServers": {
    "{{PROJECT_SLUG}}-wordpress": {
      "command": "npx",
      "args": ["-y", "@automattic/mcp-wordpress-remote@latest"],
      "env": {
        "WP_API_URL": "{{SITE_URL}}/wp-json/mcp/mcp-adapter-default-server",
        "WP_API_USERNAME": "{{WP_USERNAME}}",
        "WP_API_PASSWORD": "{{WP_APPLICATION_PASSWORD}}"
      }
    }
  }
}
```

Không ghi credential thật vào tài liệu, Git, issue, ảnh hoặc prompt. Thu hồi/hạ quyền credential không còn cần sau bàn giao.

## JIT capability workflow

Không connect hoặc discover trong intake/brief nếu phase không cần thao tác website.

### 1. Khi tác vụ đầu tiên cần MCP

1. Đọc `docs/mcp-capability-cache.md`.
2. Gọi `tools/list` để xác nhận server/meta-tools.
3. So sánh endpoint, user/role và stack/module fingerprint với cache.
4. Nếu cache `Current` và có candidate/read schema cần dùng, tái sử dụng coverage; không full discover. Write vẫn theo live-info rule bên dưới.
5. Nếu cache `Empty`, `Stale`, thiếu ability hoặc fingerprint khác, discover và cập nhật cache.

Nếu preconfigured baseline xác nhận connection configured và cache có coverage `Current`, không handshake/full discover lại chỉ để xác minh auth. Quy tắc này không bỏ `tools/list` khi client chưa có server/meta-tools trong run và không bỏ live `get-ability-info` trước first write.

Fingerprint chỉ tổng hợp bằng chứng sẵn có cho task: endpoint, principal/role, ability/schema, module/public-exposure và version nếu tình cờ có. Version là optional/non-blocking: không query riêng để điền và thiếu version không tự hạ coverage đã live-verified. Ability/coverage chưa được inspect vẫn là `Unknown` và chỉ được inspect JIT khi task cần.

### 2. Inspect vừa đủ

- Chỉ lấy ability info cho candidate cần tác vụ.
- Read operation có thể dùng schema cache còn hợp lệ.
- Capability cache dùng để chọn candidate và bỏ full discovery; không phải nguồn cuối cho write schema.
- Trước lần write đầu tiên bằng mỗi exact ability trong một execution run, luôn gọi live `get-ability-info` cho ability đó, kể cả cache đang `Current`.
- Execution run là một lượt thực thi liên tục cho yêu cầu hiện tại. Có thể dùng lại live info cho các write tiếp theo trong run nếu endpoint, principal, ability/schema và connection không đổi.
- Run/chat mới, reconnect, principal/endpoint đổi hoặc schema/permission nghi ngờ thì lấy live info lại.
- Nếu không lấy được live info, refresh coverage liên quan hoặc dùng fallback có validation riêng; không execute write dựa trên cached schema.
- Không kết luận Elementor/UAE/Woo hỗ trợ chỉ vì plugin active; phải có ability thực tế hoặc fallback đã kiểm thử.

### 3. Execute an toàn

- Xác định read/write, idempotence, permission, target và rollback.
- Smoke-test đọc trước khi write khi điều đó giảm rủi ro.
- Có ability: dùng ability. Không có thì dùng documented REST API trong scope. Arbitrary REST write là escape hatch cần cờ/xác nhận rõ, không phải build path thường lệ. Nếu cả hai không đáp ứng, báo giới hạn và dừng affected task; không đọc PHP source, tạo helper, dùng WP-CLI hoặc sửa trực tiếp database trong workflow production thông thường. Chỉ dùng fallback code/CLI khi owner yêu cầu hoặc phê duyệt rõ tác vụ phát triển/debug/compatibility và phạm vi thay đổi.
- Chuỗi write MCP chuẩn: cache chọn ability → live get-info → resolve/read target → write → read back.
- Cập nhật cache bằng ability, schema summary, lần kiểm tra và fallback vừa dùng.

## Reusable tooling

- Dùng `scripts/mcp-client.mjs` cho low-level connect/discover/info/schema/execute/read.
- Dùng `scripts/rest-client.mjs` cho documented REST read/upload hoặc escape hatch được cho phép.
- Dùng `scripts/elementor-build.mjs` với project build plan đã validate để verify target, live-info, preflight, write, regenerate CSS và read-back.
- Dùng `scripts/cdp-qa.mjs` với QA plan; không hardcode domain, ID, brand, year hoặc selector dự án vào script.
- Dependency được pin bằng `package.json`/`package-lock.json`; không import SDK từ `_npx` cache hoặc absolute user path.
- Temp data/log/screenshot được phép. Không tạo lại temp `.mjs` nếu packaged tool đáp ứng. Temp code chỉ cho capability thiếu hoặc diagnostic một lần, không secret, có lý do; nhu cầu lặp lại phải được promote vào `scripts/`.

Chi tiết plan/schema và command ở [tooling-and-build-plans.md](tooling-and-build-plans.md).

## Cache invalidation

Invalidate theo coverage, không mặc định xóa giá trị toàn cache:

- Endpoint, user/role hoặc Application Password principal thay đổi: đánh dấu mọi coverage `Stale`.
- WordPress hoặc MCP Adapter thay đổi: đánh dấu mọi coverage có thể bị ảnh hưởng `Stale`; nếu không xác định được phạm vi, stale toàn bộ.
- Astra/Pro, Elementor, UAE, WooCommerce hoặc module/public exposure thay đổi: chỉ stale coverage phụ thuộc; giữ coverage không liên quan `Current`.
- Ability thiếu, schema live khác cache hoặc execute lỗi không tương thích: stale ability/coverage đó.
- Chủ dự án yêu cầu refresh: stale đúng scope được yêu cầu.

Trạng thái tổng là `Current` khi mọi coverage đã ghi còn current, `Partial` khi current/stale/unknown trộn lẫn, và `Stale` khi connection fingerprint hoặc toàn bộ coverage không còn tin cậy.

Không dùng TTL cứng thay cho fingerprint. Timestamp dùng để audit; thay đổi kỹ thuật mới là tín hiệu invalidation chính.

Version khi được owner cung cấp hoặc xuất hiện trong thao tác hiện tại vẫn là tín hiệu invalidation hữu ích; việc version đang `Unknown` không cấp quyền suy đoán stack/module/ability.

## Troubleshooting

| Triệu chứng | Kiểm tra |
|---|---|
| 401/403 | Username, Application Password, role/capability, security rule |
| 404 endpoint | Permalink, plugin active, endpoint |
| Chỉ có 3 tools | Bình thường; abilities nằm sau layered discovery |
| Không thấy ability | Public metadata, hook đăng ký, module/version, cache stale |
| Astra đọc nhưng không sửa | `Enable Edit Abilities`, `edit_theme_options` |
| Client không chạy | Node/npx/PATH và restart client |

Bảng này chỉ hướng dẫn phân loại kết nối WordPress/MCP. Nó không cấp quyền sửa local runtime, PID/socket hoặc điều khiển dịch vụ.

## Báo cáo tối thiểu

- Endpoint và principal ở mức mô tả, không lộ secret.
- Cache dùng lại hay refresh và lý do.
- Ability/schema/fallback dùng cho tác vụ.
- Write impact, test và rollback khi có.
- Limitation hoặc invalidation đã phát hiện.
