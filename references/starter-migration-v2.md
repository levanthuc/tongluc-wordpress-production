# Nâng project starter cũ lên workflow v2

Áp dụng khi một website đã được khởi tạo bằng starter cũ. Không chạy lại `scripts/init-project.sh`: script cố ý không ghi đè hồ sơ dự án.

## Trình tự an toàn

1. Commit hoặc sao chép các file dự án hiện tại để có điểm khôi phục.
2. Merge bản mới của `AGENTS.md`, `AI-START-HERE.md` và `docs/README.md`; không chép đè dữ liệu đã điền mà chưa đối chiếu.
3. Merge cấu trúc mới của `docs/project-brief.md` nhưng giữ nguyên facts owner đã điền. Chuyển gap phase sau sang `Deferred decisions`; chỉ chuyển mâu thuẫn/thiếu dữ liệu thật sự chặn thiết kế, scope, quyền hạn hoặc độ chính xác nội dung sang `Hard blockers`. Chuẩn hóa revision về `YYYY-MM-DD-rN`, trạng thái tách riêng và một header marker; thay đổi nội dung khi merge phải tạo revision `Draft` mới, không tự giữ `Approved`.
4. Thêm `docs/STATUS.md`, đặt đúng profile, phase, `Current inputs`, `Next action`, trạng thái MCP cache và cache-purge policy. Chuyển `Approved outputs` thành active gate set theo `` `path` @ `revision` ``; chỉ ghi entry khi header nguồn có `Trạng thái: Approved`, revision khớp và có người duyệt/ngày.
5. Đổi `docs/mcp-capability-audit.md` thành `docs/mcp-capability-cache.md`; giữ lại tên/coverage đã xác minh nhưng không dùng schema cache để write ở run mới. Trước first write của mỗi exact ability/run phải lấy live ability info. Version là optional; không query riêng để hoàn thiện cache.
6. Thêm `docs/build-manifest.md`. Chỉ đánh dấu `Project-managed`/`Owner-adopted` cho artifact có bằng chứng và đã resolve live; không suy ownership từ slug hoặc sitemap. Artifact chưa rõ để `Unexpected`/`External-unmanaged` và xử lý collision theo scope.
7. Chuyển blueprint cũ:
   - cấu trúc lặp lại → `docs/blueprints/archetypes/[name].md`;
   - trang độc nhất hoặc khác biệt có ý nghĩa → `docs/blueprints/pages/[slug].md`;
   - bỏ blueprint chỉ lặp lại cùng section/widget mà không có delta.
8. Thêm content contract vào `docs/content-contracts/` trước khi duyệt hoặc sửa blueprint tương ứng.
9. Website khởi tạo theo greenfield và chỉ có artifact project-managed vẫn giữ profile; inventory là `N/A for greenfield`. Existing/redesign/migration hoặc dữ liệu pre-project/unmanaged đáng kể: giữ và hoàn thiện inventory.
10. Ghi rõ Prototype đã duyệt hay chưa; không coi trang production hàng loạt là bằng chứng thay cho Prototype.
11. Khi nâng sang Guided Wave, thêm `docs/global-shell-approval.md`, `docs/page-wave-status.md` và các field Delivery mode/Global Shell/Active page wave trong STATUS. Không hồi tố approval: dữ liệu hiện hữu được map vào record mới ở trạng thái Draft hoặc grandfathered có ghi rõ bằng chứng.
11. Ghi `Continuation mode: confirm-next-phase`; nếu field thiếu, skill vẫn dùng mode này làm mặc định.
12. Ghi `Cache purge policy`: `owner` mặc định hoặc `codex-scoped` chỉ cho Local/Staging.

Dự án đã production trước workflow v2 không phải dựng lại Prototype hồi tố cho chỉnh sửa nhỏ. Ghi baseline hiện hữu là `grandfathered` trong STATUS/handoff; bắt đầu Prototype gate khi có redesign, archetype mới hoặc thay đổi pattern có rủi ro.

## Không tự động di trú

Không có script overwrite tự động vì project brief, inventory, cache audit và blueprint có thể đã chứa dữ liệu duy nhất của dự án. Việc merge có chủ đích an toàn hơn một migration cơ học.
