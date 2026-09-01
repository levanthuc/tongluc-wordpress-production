---
name: tongluc-wordpress-production
description: Lập kế hoạch, thiết kế, xây dựng, viết nội dung, kiểm thử hoặc bàn giao website WordPress theo SOP của Tổng Lực với Astra Pro, Elementor Free V3, UAE Pro và WooCommerce khi cần. Dùng cho dự án website doanh nghiệp hoặc bán hàng; không dùng cho website không thuộc stack này.
---

# Tổng Lực WordPress Production

Áp dụng progressive disclosure; không đọc toàn bộ `docs/` hoặc `references/`.

## Router

1. Nếu có `docs/STATUS.md`, đọc trước; trong hồ sơ dự án chỉ nạp `Current inputs`, rồi chỉ đọc reference được Router chỉ định và thực sự cần cho `Next action`. Không đọc trọn thư mục `references/` hoặc nạp reference của phase/tính năng khác trong cùng turn. Khi chuyển phase, phải đưa mọi record bắt buộc của next action vào `Current inputs`; thiếu record bắt buộc là routing error cần sửa trước write. Nếu chưa có starter/STATUS, suy phase từ yêu cầu và chỉ đọc reference tối thiểu cần cho tác vụ.
2. STATUS rõ thì không đọc [operating-model.md](references/operating-model.md). Chỉ đọc khi không có/thiếu/mâu thuẫn router, chuyển phase/gate, scope change hoặc phục hồi dự án gián đoạn.
3. Intake/Discovery: [brief-and-discovery.md](references/brief-and-discovery.md). Với greenfield, đọc [greenfield-baseline.md](references/greenfield-baseline.md) ở lúc phân loại ban đầu, technical setup hoặc xử lý profile/collision; không reread trong tác vụ thường lệ. Chỉ đọc `docs/site-inventory.md` cho existing/redesign/migration hoặc exception có dữ liệu pre-project/unmanaged đáng kể.
4. Nếu STATUS ghi `Preconfigured baseline: Current`, chỉ đọc `docs/preconfigured-baseline.md` khi Next action đụng live settings/artifact/visual rule và file này có trong `Current inputs`; áp dụng [preconfigured-skip-policy.md](references/preconfigured-skip-policy.md). Không đọc baseline này cho tác vụ không liên quan.
5. Khi cần thao tác site/MCP: [stack-and-mcp.md](references/stack-and-mcp.md). Contract/blueprint/Prototype: [content-contracts-and-blueprints.md](references/content-contracts-and-blueprints.md).
6. UI: [design-system.md](references/design-system.md), [widget-decision-guide.md](references/widget-decision-guide.md); chỉ tra [widget-catalog.md](references/widget-catalog.md) khi cần catalog.
7. Astra global/template: [astra-capabilities.md](references/astra-capabilities.md), [astra-site-builder.md](references/astra-site-builder.md). Woo: [woocommerce-workflow.md](references/woocommerce-workflow.md).
8. Nội dung/SEO: [seo-aeo-llmo.md](references/seo-aeo-llmo.md), [content-writing.md](references/content-writing.md). QA: [qa-and-handoff.md](references/qa-and-handoff.md).

## Quy tắc cốt lõi

- Stack: Astra/Astra Pro, Elementor Free classic/V3 (không Atomic/V4), UAE Pro; WooCommerce chỉ cho website bán hàng.
- Brief do owner kiểm soát là nguồn sự thật cho thông tin nghiệp vụ, phạm vi và định hướng đã ghi; Codex được chép trung thành chỉ thị rõ ràng của owner vào brief. Không hỏi xác nhận lại; ô trống/TBD không tự động là câu hỏi. Chỉ hỏi bổ sung/xác minh khi có hard blocker có thể làm sai thiết kế, phạm vi hoặc thông tin công khai; yêu cầu phê duyệt tại cổng không phải câu hỏi bổ sung.
- Approval gắn với đúng snapshot và revision. Nội dung trọng yếu đổi thì tạo revision `YYYY-MM-DD-rN` kế tiếp ở trạng thái `Draft`; không sửa nội dung dưới ID đã `Approved`. Facts mới kèm lời duyệt revision cũ phải ưu tiên tạo Draft mới và giữ phase; xác nhận trùng hoàn toàn mới được duyệt revision hiện tại. Chỉ `Approved` mới mở gate tiếp theo.
- Continuation mặc định là `confirm-next-phase`: sau approval hợp lệ, cập nhật marker/STATUS và chuyển phase nhưng chưa chạy Next action mới; nêu Next action rồi hỏi owner xác nhận bằng `Tiếp tục`. Câu này chỉ cho phép thực hiện Next action hiện có đến gate kế tiếp, không tự duyệt output, mở rộng scope hoặc thay thế xác nhận hành động rủi ro. Nếu owner ghi rõ `và tiếp tục` ngay trong lệnh duyệt, không hỏi lại.
- Astra Customizer sở hữu global styles; Astra Site Builder sở hữu site-wide templates. Ưu tiên widget native; code/HTML chỉ khi thiếu widget phù hợp và phải ghi lý do.
- Delivery mode mặc định cho greenfield là `guided-wave`: IA → contract tối thiểu/JIT → Global Foundation đã áp dụng → Global Shell → Home Prototype → page wave → QA/Handoff. `strict-sequential` duyệt từng trang; `batch-production` chỉ dùng khi owner chọn và representative prototype/archetype đã duyệt.
- Content contract phải duyệt trước blueprint tương ứng, nhưng không bắt buộc chi tiết hóa mọi launch page cùng lúc. Sau IA, lập registry tối thiểu toàn site; tạo/duyệt contract JIT cho Global Shell, Home rồi từng page wave.
- Không production trang nội dung trước khi Global Foundation và Global Shell được duyệt. Home là full-page prototype mặc định; production hàng loạt chỉ cho pattern/archetype đã duyệt.
- Dùng Elementor V3 Containers: Flexbox mặc định, Grid cho bố cục hai chiều; không dùng Section/Column legacy cho build mới và không ép Grid khi Flexbox phù hợp hơn.
- Greenfield là nguồn gốc dự án, không phải trạng thái luôn trống. Artifact project-managed được theo dõi trong `docs/build-manifest.md`; mismatch/unmanaged target phải dừng affected write.
- Baseline preconfigured `Current` do owner xác nhận là nguồn sự thật cho hạng mục đã cấu hình: không audit, discover, upload hoặc reapply chỉ để xác minh. Chỉ làm delta được ghi `Action required`. Baseline không bỏ kiểm tra đúng live target trước write, live ability info, read-back hoặc kiểm tra frontend của output vừa thay đổi; evidence drift làm stale đúng scope.
- Trong production website thông thường, live WordPress read/write chỉ qua MCP hoặc REST API đã xác định; frontend/browser chỉ dùng QA. Không đọc, tìm kiếm hoặc suy luận từ PHP source của WordPress Core/plugin/theme. Nếu API thiếu capability, dừng affected task và báo giới hạn; chỉ mở source-code/helper/WP-CLI fallback khi owner yêu cầu hoặc phê duyệt rõ tác vụ phát triển/debug/compatibility và phạm vi đó.
- File input được baseline/STATUS chỉ định nhưng không tồn tại là dependency thiếu: không quét thư mục để đoán hoặc thay bằng file gần giống. Hoãn affected task; chỉ chuyển sang Next action độc lập đã được STATUS cho phép, nếu không thì ghi blocker và dừng. Không vượt gate hoặc tiếp tục downstream phụ thuộc file thiếu.
- Cache MCP chỉ bỏ full discovery. Trước first write của mỗi exact ability trong mỗi execution run, lấy live ability info; không write theo cached schema nếu live info thất bại.
- Local runtime như XAMPP/Apache/MySQL do owner quản lý. Kiểm tra thường lệ chỉ qua site HTTP, WordPress REST và MCP endpoint. Không sửa/xóa/di chuyển PID hoặc socket, không start/stop/restart dịch vụ, và không đọc PID/log/socket để chẩn đoán trừ khi owner yêu cầu rõ tác vụ hạ tầng. Nếu owner/browser xác nhận site truy cập được nhưng môi trường Codex không kết nối được, báo giới hạn môi trường; không kết luận dịch vụ hỏng hoặc tự sửa runtime.
- Form/SEO/schema owner theo profile; không tạo schema trùng. Không đổi LiteSpeed settings, analytics, security hoặc backup do owner quản lý.
- Kết thúc Core Website ở `Website Core Complete`; không tự chuyển sang lập kế hoạch/viết bài. Editorial Growth là scope riêng, chỉ bắt đầu khi owner yêu cầu; nếu Blog/Knowledge có trong launch IA thì vẫn chốt tối thiểu archive/taxonomy/URL trước launch.
- Review chỉ đọc; mutate khi yêu cầu cho phép. Xác nhận scope trước xóa/ghi đè hàng loạt, đổi global display/homepage, gửi email/giao dịch thật hoặc tác động order/payment.
- Không lưu secret. Cache purge theo `docs/STATUS.md` và [cache-policy.md](references/cache-policy.md); purge không cấp quyền đổi settings.

## Tài nguyên

`assets/project-starter/` chứa hồ sơ tối thiểu; dùng `scripts/init-project.sh <absolute-wordpress-root>`. Prompt theo phase ở `assets/prompts/`; nguồn review ở [sources.md](references/sources.md).
