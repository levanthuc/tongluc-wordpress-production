# Cache purge và xác minh giao diện

Purge cache là một mutation vận hành, khác với thay đổi cấu hình LiteSpeed. Codex không được đổi LiteSpeed settings, CDN, object cache, PHP opcode cache hoặc hạ tầng do chủ dự án quản lý.

## Policy trong `docs/STATUS.md`

- `owner` — mặc định: Codex báo cache cần purge, nêu scope; chủ dự án thực hiện rồi Codex tiếp tục verify.
- `codex-scoped` — chủ dự án ủy quyền trước: Codex được purge page/site cache của WordPress plugin và regenerate generated CSS/assets liên quan trên Local/Staging.

Production luôn cần ủy quyền rõ trong lượt hiện tại, kể cả `codex-scoped`.

`codex-scoped` không bao gồm CDN purge, object-cache flush, PHP opcode cache, reverse proxy/host cache hoặc thay đổi cache exclusion. Các thao tác này luôn do owner thực hiện hoặc cần ủy quyền rõ trong lượt hiện tại. Không flush object cache như bước xác minh thông thường, đặc biệt trên WooCommerce vì có thể ảnh hưởng session/cart.

## Khi được tự động purge

Chỉ purge khi cả bốn điều kiện đúng:

1. Cần thiết để phân biệt cache cũ với lỗi giao diện hiện tại.
2. Đích là đúng site và scope đã xác định.
3. Cache có thể tái tạo; thao tác không đổi setting hay dữ liệu nghiệp vụ.
4. Policy và environment cho phép.

Ưu tiên purge hẹp nhất: page cache hoặc generated CSS/assets của trang đang kiểm tra trước, site cache sau. Không lặp quá một lần nếu output không đổi; chuyển sang chẩn đoán nguyên nhân khác.

## Báo cáo

Ghi environment, cache layer/scope, lý do, thời điểm, kết quả trước/sau và ai thực hiện. Nếu policy là `owner`, không tuyên bố frontend đã được xác minh sau purge cho đến khi chủ dự án xác nhận thao tác hoàn tất.
