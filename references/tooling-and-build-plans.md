# Tooling và data-driven build plans

## Nguyên tắc

Script là capability tái sử dụng; project plan là dữ liệu. Script không chứa domain, WordPress ID, brand, year, content, selector hoặc absolute path của dự án.

Tại skill/repository root, chạy `npm ci` sau khi clone/update. Dependency được pin trong lockfile; không đổi version JIT khi đang build site.

- Config connection: `--config <path>`; không in secret.
- Baseline: `--baseline <path>`; chỉ cung cấp role/expected target/ownership.
- Build plan: validate bằng `assets/schemas/build-plan.schema.json`.
- QA plan: validate bằng `assets/schemas/qa-plan.schema.json`.
- Dry-run là mặc định cho builder; `--execute` mới cho phép write.

## MCP client

```text
node scripts/mcp-client.mjs list --config mcp-config.json
node scripts/mcp-client.mjs discover --filter elementor --config mcp-config.json
node scripts/mcp-client.mjs info <ability> --config mcp-config.json
node scripts/mcp-client.mjs execute <ability> --input input.json --config mcp-config.json --allow-write
```

Client chỉ là low-level adapter, không điều phối workflow dự án. `execute` luôn lấy live ability info trước call; write cần `--allow-write`.

## Elementor builder

```text
node scripts/elementor-build.mjs --plan docs/build-plans/home.json --baseline assets/baselines/corporate-master.json --config mcp-config.json
node scripts/elementor-build.mjs --plan docs/build-plans/home.json --baseline assets/baselines/corporate-master.json --config mcp-config.json --execute
```

Pipeline: load/validate plan → resolve baseline role → verify target → get live ability/schema → preflight → write → regenerate CSS → read-back → compare/report. Plan phải chứa exact operations/parameters vì ability names/schema có thể đổi theo môi trường.

Placeholder hợp lệ trong operation parameters: `$TARGET_ID`, `$STRUCTURE`, `$STRUCTURE_JSON`. Script thay đúng value từ target; không eval code.

## REST client

Read/upload dùng documented endpoint. `write` yêu cầu `--allow-write --reason <text>` và chỉ dùng khi MCP/ability không đáp ứng nhưng documented REST route đã được owner cho phép.

## CDP QA

```text
node scripts/cdp-qa.mjs --plan docs/qa-plans/design.json --output docs/qa-reports/design.json
```

QA plan cung cấp URL/pages, viewport, selector/assertion. Script tạo Chrome profile tạm và tự xóa; chỉ giữ bằng `--keep-artifacts`.

## Promotion rule

Nếu một capability temp được dùng lần thứ hai hoặc có khả năng tái dùng dự án khác, chuyển nó vào `scripts/`, parameterize, thêm validation/safe output, cập nhật docs và test. Không promote project payload thành master template.
