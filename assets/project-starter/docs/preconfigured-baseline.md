# Baseline Verification & Project Delta

> Trạng thái: Draft · Revision: YYYY-MM-DD-r1 · Baseline: corporate-master / custom / none · Version: 2.0.0 / N/A · Owner xác nhận/ngày: Chưa

Corporate Master contract nằm ở skill `assets/baselines/corporate-master.json`. Không chép credential vào đây. Fixed IDs chỉ hợp lệ cho đúng baseline/version và phải được xác minh theo target trước write.

Trạng thái: `Inherited`, `Verified`, `Project Override`, `Drift`, `Not Applicable`.

## Fixed targets

| Role | Expected identity | State | Live evidence | Project action/delta |
|---|---|---|---|---|
| Static Homepage | Page ID 50 | Inherited | | |
| Contact | Page ID 55 | Inherited | | |
| About | Page ID 57 | Inherited | | |
| Footer | Astra Advanced Hook ID 59 | Inherited | | Composition is project-defined |
| Contact Form | CF7 ID 843524c | Inherited | | Present with UAE CF7 Styler |
| Desktop Menu | Primary Menu | Inherited | | |
| Mobile Menu | Off-Canvas Menu | Inherited | | |

Nếu project không dùng Corporate Master, đổi toàn bộ row thành `Not Applicable` và resolve target theo profile; không cố tạo lại các ID này.

## Inherited systems

| System | Master ownership | State | Project override/delta |
|---|---|---|---|
| Astra typography/buttons/container | Global baseline | Inherited | |
| Elementor V3 known-good settings | Builder baseline | Inherited | |
| UAE common module profile | Module baseline | Inherited | |
| Rank Math technical baseline | Technical SEO baseline | Inherited | Design Mode chỉ làm phần SEO-aware cần thiết |
| LiteSpeed | Owner-managed | Inherited | Không đổi settings |

## Assets và identity

| Asset/fact | Exact path/Media ID/value | State | Action |
|---|---|---|---|
| Logo | | Project Override | |
| Favicon | | Project Override | |
| Site title/tagline | | Project Override | |

Exact path bị thiếu thì hoãn đúng task liên quan; không quét thư mục để đoán.

## Authorized project delta

- Visual direction:
- Brand colors/fonts overrides:
- Page/section/widget composition:
- Header/Footer/menu delta:
- Form fields/notification delta:
- Accepted drift/exception:

## Connection/runtime

- Global MCP: Configured / Not configured; config path (không secret):
- Capability cache:
- XAMPP/Apache/MySQL: Owner-managed; chỉ HTTP/REST/MCP health check
