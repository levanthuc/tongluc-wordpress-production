# Owner-Preconfigured Baseline

> Trạng thái: Draft · Revision: YYYY-MM-DD-r1 · Owner xác nhận/ngày: Chưa · Environment/Site URL: Chưa

Chỉ có hiệu lực khi header là `Current` và STATUS trỏ đúng revision. `Keep/Skip` nghĩa là không audit, query để chứng minh, reapply hoặc tạo trùng. Codex chỉ làm `Action required`; trước exact write vẫn resolve target, lấy live ability info và read-back. Mọi path là exact input: thiếu file thì hoãn đúng task, không quét thư mục để đoán.

## Brand assets

| Asset | Path/Media ID/URL | Variant/kích thước | Trạng thái | Action required |
|---|---|---|---|---|
| Logo chính | `assets/brand/...` | Original/light surface | Keep/Skip | None |
| Logo inverted | | Chỉ dùng dark surface | N/A/Keep | |
| Favicon | `assets/brand/...` | 512×512 hoặc chuẩn đã duyệt | Keep/Skip | None |

## Theme globals đã cấu hình

| Nhóm | Giá trị owner xác nhận | Trạng thái | Action required |
|---|---|---|---|
| Typography | Arial system font; H1–H6/Body responsive đã cấu hình | Keep/Skip | None |
| Container | 1200px; narrow 750px; Full width; Normal; Unboxed | Keep/Skip | None |
| Outer margin | 0/0/0/0 mọi thiết bị | Keep/Skip | None |
| Inner padding | D 40/20/40/20; T 30/20/30/20; M 20/15/20/15 | Keep/Skip | None |
| Primary button | Weight 600; radius 8; D 14/24; M 12/20; filled brand/white | Keep/Skip | None |
| Secondary button | Radius 8; D 12/22; M 10/18; 1px brand/transparent | Keep/Skip | None |
| Global palette | Ghi mapping brand/theme hiện tại | Current/Delta | [Chỉ delta được phép] |

Widget Elementor/UAE kế thừa theme. Override chỉ khi blueprint có variant component có chủ đích; không override từng widget cho giá trị đã có global.

## Elementor baseline

| Setting | Giá trị owner xác nhận | Trạng thái |
|---|---|---|
| Default colors/fonts | Disabled để kế thừa Astra | Keep/Skip |
| Google Fonts | Disabled | Keep/Skip |
| Flexbox Container | Active | Keep/Skip |
| Inline Font Icons | Active | Keep/Skip |
| Panel Promotions | Inactive | Keep/Skip |
| Site content width/gap | 1200px / 24px | Keep/Skip |

Không audit/bật tắt experiment hoặc security-sensitive upload setting nếu owner không yêu cầu trực tiếp.

## Existing managed targets

Mỗi ID/key phải dành cho chính dự án này; không sao chép ID sang site khác.

| Type | ID/key | Name/slug/location | Ownership | Action required |
|---|---|---|---|---|
| Page | | Home/static homepage | Owner-adopted | Build content |
| Page | | Posts page | Owner-adopted | Build/archive as scoped |
| Page | | Contact | Owner-adopted | Build content |
| Page | | About | Owner-adopted | Build content |
| Astra layout | | Header/Footer/Hook + placement/conditions | Owner-adopted | Build only specified target |
| Menu | | Primary/Desktop | Owner-adopted | Reuse |
| Menu | | Off-canvas/Mobile | Owner-adopted | Reuse |

Core preset: permalink, timezone/language, static homepage/posts page và discussion đã được owner xác nhận; ghi delta nếu Codex được phép thay đổi. Không audit `.htaccess` hoặc WP Core settings chỉ để xác minh.

## Form preset

- Engine/title/ID:
- Shortcode: `[contact-form-7 id="..." title="..."]`
- Allowed presentation: Elementor Shortcode hoặc UAE CF7 Styler khi blueprint cần style.
- Action: Reuse; không tạo form khác trừ scope mới được duyệt.

## WooCommerce preset — chỉ website bán hàng

- Currency/country/format:
- Shop/Cart/Checkout/My Account IDs:
- State: N/A / Keep/Skip
- Action required:

Không audit/reapply currency/system-page mapping nếu state `Keep/Skip`; vẫn QA flow đại diện khi thuộc launch scope.

## Connection, cache và runtime

- Global MCP connection: Configured / Not configured; không ghi secret.
- Capability cache coverage:
- Cache policy/state: Owner-managed; Local plugin inactive / policy khác.
- XAMPP/Apache/MySQL: Owner-managed; kiểm tra thường lệ chỉ HTTP/REST/MCP.
- Action required:

## Visual và content rules theo dự án

- Logo component colors/approved surfaces:
- Header fallback surface: `#FFFFFF` / `#F8FAFC` / khác đã duyệt.
- Dark header chỉ dùng khi có inverted logo đã cung cấp.
- Zalo: Direct link `https://zalo.me/<number>` / N/A; không SDK nếu không được yêu cầu.
- Privacy/Terms: Ready / Deferred before publication / N/A.
- Evidence/media: Owner-provided / Licensed stock / Placeholder prototype only.

## Authorized delta

Chỉ liệt kê tác vụ Codex cần làm trong phase hiện tại, ví dụ palette delta, Global Shell target hoặc Page Wave target. Mục trống không cấp quyền thay đổi.

- Action required:
- Target IDs/keys:
- Acceptance/test scope:
