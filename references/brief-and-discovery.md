# Brief và discovery

## Mô hình thẩm quyền

`docs/project-brief.md` do owner kiểm soát là nguồn sự thật cho thông tin doanh nghiệp, khách hàng, offer, phạm vi và định hướng đã ghi. “Owner cung cấp” xác định thẩm quyền dữ liệu, không bắt buộc owner tự gõ file: Codex được chép và chuẩn hóa trung thành chỉ thị rõ ràng của owner vào phần 1–4, nhưng không được suy diễn, đổi ý nghĩa hoặc tự duyệt. Brief không phải bảng câu hỏi và dữ liệu rõ ràng không cần xác nhận lại.

- `Draft`: các khẳng định đã ghi được tin dùng, nhưng chưa mở cổng sang Architecture.
- `Approved`: revision được duyệt mở cổng sang Architecture.
- `Revalidation required`: dừng output bị ảnh hưởng cho đến khi revision mới được duyệt.

Chỉ thị owner mới hơn và được ghi nhận có thể sửa brief. Live WordPress/MCP là nguồn sự thật cho ID, capability và trạng thái kỹ thuật; brief không thay thế kiểm tra live hoặc cấp thêm quyền mutate.

## Revision và snapshot approval

- Revision dùng duy nhất định dạng `YYYY-MM-DD-rN`; `N` tăng đơn điệu cho tài liệu. Trạng thái nằm ở trường riêng, không thêm hậu tố như `-review`, `-draft` hay `-approved` vào revision ID.
- Snapshot của revision gồm toàn bộ facts, quyết định, scope, deferred decisions, hard blockers, giả định và rủi ro. Sửa nội dung trọng yếu hoặc trạng thái blocker tạo revision kế tiếp ở `Draft`; sửa chính tả/định dạng không đổi ý nghĩa không bắt buộc tăng revision.
- Approval chỉ áp dụng cho đúng snapshot/revision owner nêu. Nếu một thông điệp vừa thêm hoặc đổi nội dung trọng yếu vừa duyệt revision hiện tại/cũ, ưu tiên cập nhật nội dung vào revision kế tiếp ở `Draft`; approval không chuyển tiếp, phase không đổi và Codex dừng để owner duyệt revision mới.
- Nếu owner chỉ xác nhận nội dung đã có và không làm snapshot đổi, revision hiện tại có thể chuyển `Draft → Approved`. Trong lần chuyển này chỉ được đổi `Trạng thái` và `Người duyệt/ngày`; `Cập nhật nội dung` và phần nội dung phải giữ nguyên.
- Không sửa nội dung dưới cùng ID revision đã `Approved`. Mọi thay đổi tiếp theo tạo revision `Draft` mới; bỏ dependency cũ khỏi active gate set và đặt output downstream bị ảnh hưởng thành `Revalidation required`.

Marker mở gate chính thức là `Trạng thái: Approved` trong header tài liệu nguồn, đi cùng đúng `Revision` và `Người duyệt/ngày`. Metadata người duyệt không tự mở gate nếu trạng thái chưa `Approved`.

## Quy tắc Intake

1. Đọc nguyên trạng brief và project profile; không tự diễn giải ô trống thành yêu cầu phỏng vấn.
2. Không tự sửa facts/claim của owner. Được chép chỉ thị owner từ chat vào đúng mục và được biên tập/copywrite khi scope yêu cầu, nhưng phải bảo toàn ý nghĩa, ghi nhận revision mới khi nội dung trọng yếu đổi và không tự phát minh bằng chứng hay lời hứa.
3. Ghi quyết định chưa cần ngay vào `Deferred decisions` với phase đến hạn, owner và default hiện tại; không hỏi sớm.
4. Có thể dùng giả định an toàn, ít rủi ro và dễ đảo ngược; ghi rõ giả định và nơi phải xác minh.
5. Chỉ tạo câu hỏi bổ sung/xác minh khi có hard blocker. Gom các blocker liên quan thành một lượt ngắn và nêu tác động cần tránh.
6. Nếu không có hard blocker: dừng tại cổng duyệt khi brief còn `Draft`; nếu revision đã `Approved`, chuyển Architecture theo STATUS.

Yêu cầu owner phê duyệt một revision `Draft` là thao tác cổng duyệt, không phải câu hỏi bổ sung và không cần hard blocker.

## Hard blocker được phép hỏi

Chỉ hỏi bổ sung/xác minh khi ít nhất một điều sau đúng và không có default an toàn:

- Hai khẳng định rõ ràng trong brief mâu thuẫn nhau.
- Thiếu quyết định làm thay đổi đáng kể loại website, scope, kiến trúc, quyền hạn hoặc định hướng thiết kế của output hiện tại.
- Thiếu hoặc chưa xác minh fact/claim/giá/chính sách/pháp lý/thanh toán cần xuất bản, có thể làm thông tin trên website sai hoặc gây hiểu nhầm.
- Thiếu tài sản hay dữ liệu thiết yếu khiến không thể hoàn thành output hiện tại đúng nội dung và không thể dùng phương án tạm an toàn.

Không hỏi chỉ để brief đầy đủ hơn, để lấy thông tin “nice to have”, hoặc cho phase chưa tới hạn. Không tự đặt giá, claim, chứng nhận, review, quyền sử dụng tài sản hay chính sách pháp lý/đổi trả.

## Dependency theo phase

Đây là lịch kiểm tra JIT, không phải danh sách câu hỏi Intake.

| Cần trước | Dependency thường cần |
|---|---|
| Architecture | Dịch vụ/sản phẩm; khu vực/ngôn ngữ; mục tiêu/đối tượng; trang, CTA hoặc ràng buộc bắt buộc owner đã biết; chủ đề SEO; với migration: URL/redirect phải giữ. Menu, URL và IA chi tiết là đầu ra Architecture, không phải dữ liệu owner bắt buộc cung cấp trước |
| Content contract/content | Lợi ích, quy trình, giá hoặc nguyên tắc báo giá, FAQ, evidence, claim/pháp lý và người duyệt |
| Foundation/Prototype | Logo/favicon, màu/font, phong cách, ảnh/video và quyền sử dụng |
| Form/integration build | Loại form, recipient, người xử lý lead, consent/spam/retention và integration owner |
| WooCommerce build | Catalog/variation/stock; giá/thuế; shipping/payment; chính sách và quy trình đơn |
| QA/Launch | Public facts cuối, domain/environment owner, integration readiness và cache-purge policy |

## Đầu ra

1. Brief revision với facts, scope và owner rõ ràng; Codex không tự phê duyệt thay owner.
2. `Deferred decisions` có due phase và default/status hiện tại.
3. `Hard blockers` chỉ chứa vấn đề thật sự ảnh hưởng thiết kế, scope, quyền hạn hoặc độ chính xác nội dung.
4. Giả định, rủi ro và ngoại lệ đã ghi nhận.
