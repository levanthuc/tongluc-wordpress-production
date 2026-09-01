# Tổng Lực WordPress Project

Áp dụng `$tongluc-wordpress-production`; mọi đường dẫn dưới đây tính từ WordPress root.

- Đọc `docs/STATUS.md` trước, sau đó chỉ đọc `Current inputs` và reference tối thiểu đúng `Next action`; không đọc toàn bộ `references/` hoặc reference của phase khác. Thiếu record bắt buộc của phase trong `Current inputs` là routing error phải sửa trước write. Hồ sơ `Approved` là nguồn quyết định; thực hiện next action rồi dừng ở cổng duyệt kế tiếp.
- Brief do owner kiểm soát là nguồn sự thật cho facts, scope và định hướng đã ghi; Codex được chép trung thành chỉ thị rõ ràng của owner vào brief. Không hỏi xác nhận lại hoặc coi ô trống/TBD là câu hỏi; chỉ hỏi bổ sung/xác minh khi có hard blocker ảnh hưởng thiết kế, scope, quyền hạn hoặc độ chính xác thông tin sắp đăng.
- Approval gắn đúng snapshot/revision. Nội dung trọng yếu đổi thì tạo revision `YYYY-MM-DD-rN` kế tiếp ở `Draft`; facts mới kèm lời duyệt revision cũ không được rollover approval hoặc qua gate. Không sửa nội dung dưới ID đã `Approved`; xác nhận không đổi snapshot mới được duyệt revision hiện tại.
- Sau approval hợp lệ, mặc định chỉ cập nhật STATUS/chuyển phase rồi nêu Next action và hỏi owner `Tiếp tục?`. Phản hồi `Tiếp tục` cho phép chạy đúng Next action hiện có đến gate kế tiếp; không thay thế approval, scope decision hoặc xác nhận hành động rủi ro. Lệnh duyệt có thêm `và tiếp tục` thì được chạy ngay mà không hỏi lại.
- Greenfield là profile lúc khởi tạo, không phải yêu cầu site luôn trống. Artifact dự án theo `docs/build-manifest.md`; target live không khớp hoặc không rõ ownership thì dừng affected write và xử lý collision, không tự động full audit.
- Nếu STATUS ghi preconfigured baseline `Current`, tin `docs/preconfigured-baseline.md`: không audit/reapply/upload lại mục `Keep/Skip`, chỉ làm `Action required`. Trước exact write vẫn resolve target, lấy live ability info và read-back; drift chỉ stale scope liên quan. Không đọc baseline khi task không liên quan.
- MCP chỉ chạy JIT. Trước first write của mỗi exact ability trong mỗi execution run, lấy live ability info; cache không cấp quyền write theo schema cũ.
- Live WordPress read/write chỉ qua MCP hoặc documented REST; frontend/browser dùng QA. Không đọc/tìm PHP source WordPress Core/plugin/theme, không tạo helper hoặc dùng WP-CLI/database fallback trừ khi owner yêu cầu/phê duyệt rõ tác vụ development/debug/compatibility.
- Input exact path trong STATUS/baseline bị thiếu thì không quét thư mục để đoán. Hoãn affected task; chỉ tiếp tục task độc lập đã được STATUS cho phép, nếu không ghi blocker và dừng. Không vượt gate.
- XAMPP/Apache/MySQL do owner quản lý. Chỉ kiểm tra thường lệ qua HTTP/WordPress REST/MCP; không sửa/xóa/di chuyển PID hoặc socket, không start/stop/restart dịch vụ và không chẩn đoán PID/log/socket nếu owner chưa yêu cầu rõ tác vụ hạ tầng. Owner/browser truy cập được nhưng Codex không kết nối được là giới hạn môi trường cần báo, không phải quyền tự sửa runtime.
- Không dùng Atomic/V4; ưu tiên Elementor/UAE widget native, không thay bằng HTML/code khi widget đáp ứng.
- Delivery mặc định là `guided-wave`: contract JIT → Global Foundation đã áp dụng/duyệt → Global Shell đã duyệt → Home Blueprint/Prototype → từng page wave. Không production trang trước các global gate.
- Build mới dùng Elementor V3 Containers: Flexbox mặc định, Grid cho bố cục hai chiều; không dùng Section/Column legacy. Chỉ một scope trong `docs/page-wave-status.md` được active.
- Khi đạt `Website Core Complete`, dừng. Editorial Growth chỉ mở theo yêu cầu riêng của owner.
- Không lưu secret; không tự đổi LiteSpeed settings, Analytics, security hoặc backup. Không xóa/ghi đè hàng loạt, đổi global display/homepage, publish production, gửi email/giao dịch thật hoặc tác động order/payment ngoài quyền đã duyệt.
