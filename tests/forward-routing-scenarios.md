# Forward routing acceptance scenarios

Các scenario này kiểm tra semantics của router v2; owner request phải thắng queue/khuyến nghị.

| Owner request | Expected strategy/scope | Direct dependency behavior | Expected state/result |
|---|---|---|---|
| Thiết kế Homepage trước | OWNER_DIRECTED / PAGE Home | Brief + Home SEO/content + target; Header/Footer không là hard blocker | `Design Complete`, có thể `Global Shell Integration Pending` |
| Làm Footer | OWNER_DIRECTED / COMPONENT Footer | Contact/legal facts + Footer target | Footer design state cập nhật; không dựng Home |
| Làm About trước | OWNER_DIRECTED / PAGE About | Lightweight SEO/content + About target | About design state cập nhật |
| Chỉ fix Hero | OWNER_DIRECTED / SECTION Hero | Current live Hero + preservation constraints | Chỉ Hero write/read-back/QA |
| Redesign Homepage | OWNER_DIRECTED / PAGE revision | Current live page + business/SEO constraints | REDESIGN; không rerun whole site |
| Chỉ sửa mobile Contact | OWNER_DIRECTED / PAGE responsive revision | Contact current structure + mobile viewport | RESPONSIVE_FIX; desktop/tablet preserved |
| Làm Service trước Header | OWNER_DIRECTED / PAGE Service | Service SEO/content + exact target | Page provisional; shell integration deferred |
| Tiếp tục | GUIDED_FLOW nếu không có active request | Active unfinished scope trước, sau đó Next Recommended Action | Không tự mở Production |

Các trường hợp fail: từ chối chỉ vì page-wave order; bắt buộc Global Shell trước mọi page; mở full-site audit cho section fix; áp Corporate Master ID cho Woo/non-master; vào Production khi chưa có approval/explicit request.
