# Nâng project starter cũ lên v2 Design-First

Không chạy lại installer lên hồ sơ đã có; merge có chủ đích và giữ facts/approval lịch sử.

## Migration map

1. Có recovery point trước khi merge.
2. Merge `AGENTS.md`, `AI-START-HERE.md`, `docs/README.md` và STATUS schema mới.
3. Giữ brief facts; revision đã Approved vẫn là lịch sử, nhưng dependency đang dùng phải được map lại rõ.
4. Chọn `Project Profile`, `Baseline`, `Execution Mode` và `Execution Strategy`.
5. Với Corporate Master, chỉ đánh `Verified` sau khi exact target khớp manifest; không gán fixed ID cho non-master.
6. Chuyển hard `Phase/Next action` cũ thành `Current Requested Scope`, `Direct Dependencies` và `Next Recommended Action`.
7. Chuyển Global Foundation/Global Shell/Home/Page Wave gate cứng thành page/component states. Output đã có có thể `Design Complete`, `Integrated QA Pending` hoặc `grandfathered` với evidence.
8. Page Wave được giữ làm scheduling aid, không phải authority. Owner request mới có thể thay queue.
9. Thêm SEO brief cho page quan trọng khi thiết kế/revision tiếp theo chạm page đó; không bắt buộc hồi tố full brief cho utility page.
10. Thêm build manifest/capability cache nếu còn dùng; cache không thay live-info/write/read-back.
11. Chuyển script project-specific sang build/QA plans; không giữ domain/ID/brand trong reusable `.mjs`.

## Không hồi tố quá mức

Dự án production cũ không phải dựng lại toàn bộ theo master. Revision nhỏ chỉ dùng requested scope và direct dependency. Chỉ revalidation downstream thật sự bị ảnh hưởng.

## Compatibility

- Existing/redesign/migration tiếp tục standard discovery và inventory đúng scope.
- WooCommerce giữ commerce workflow; không nhận Corporate Master fixed contract.
- Project chưa xác minh master không được dùng optimized skip rules.
