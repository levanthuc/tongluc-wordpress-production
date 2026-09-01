# Design foundation với Astra + Elementor V3 + UAE

## Nguồn chuẩn

Astra Customizer là source of truth cho:

- Global Color Palette.
- Body và heading font family.
- Body, H1–H6 size/weight/line-height.
- Link normal/hover.
- Button, input và form cơ bản.
- Site/container width.
- Header/footer typography và màu nền khi dùng builder của theme.

Trong Elementor Settings, bật `Disable Default Colors` và `Disable Default Fonts`. Trong widget, giữ typography/color ở `Default` nếu nó kế thừa đúng. Thiết lập riêng chỉ là ngoại lệ có chủ đích.

## Design token sheet

Mỗi dự án ghi bảng ánh xạ:

| Vai trò | Astra palette slot | Giá trị | Cách dùng |
|---|---|---|---|
| Primary |  |  | Brand/heading/active |
| Accent |  |  | Điểm nhấn có kiểm soát |
| CTA |  |  | Nút hành động chính |
| Text |  |  | Nội dung body |
| Heading |  |  | H1–H6 |
| Muted |  |  | Meta/helper text |
| Border |  |  | Divider/card border |
| Surface |  |  | Card/background |
| Soft surface |  |  | Section xen kẽ |
| Dark surface |  |  | Footer/CTA tối |

Không gọi màu bằng tên thị giác như “màu đỏ 2” trong thiết kế. Gọi theo vai trò để dễ thay thương hiệu.

## Typography

- Tối đa hai font family nếu không có lý do thương hiệu.
- Body tối thiểu thường 16px; xác nhận theo font và đối tượng người dùng.
- Line-height body khoảng 1.55–1.8.
- H1–H6 có scale responsive trong theme; widget Heading dùng đúng tag và để typography mặc định.
- Không dùng Heading widget chỉ để tạo chữ to; chọn tag theo ngữ nghĩa rồi styling theo hệ thống.
- Không gán từng font family ở từng widget.

## Spacing scale

Astra không quản lý mọi khoảng cách trong Elementor. Mỗi dự án chọn scale nhất quán, ví dụ:

| Token | Desktop | Tablet | Mobile | Dùng cho |
|---|---:|---:|---:|---|
| XS | 8 | 8 | 6 | Icon/text gap |
| S | 16 | 14 | 12 | Nội dung nhỏ |
| M | 24 | 20 | 18 | Card gap/padding |
| L | 40 | 32 | 28 | Nhóm nội dung |
| XL | 72 | 56 | 44 | Section compact |
| 2XL | 96 | 72 | 56 | Section chuẩn |

Không sao chép cứng bảng này cho mọi thương hiệu; scale là điểm khởi đầu và phải ghi trong foundation.

## Container và layout

- Outer section/container có thể full width để nền trải toàn màn hình.
- Inner content dùng width từ Astra, không tạo nhiều max-width tùy ý.
- Bắt buộc dùng Elementor Containers cho build mới V3; không dùng Section/Column legacy.
- Flexbox là mặc định cho bố cục một chiều và phần lớn section; Grid dùng cho bố cục hai chiều/card matrix. Không ép Grid nếu Flexbox đơn giản và semantic hơn.
- Giới hạn số lớp container; mỗi lớp phải có mục đích layout hoặc semantic rõ.
- Grid card phải có row/column gap nhất quán và trạng thái 3/2/1 hoặc 4/2/1 rõ.
- Mobile order theo hành trình nội dung, không nhất thiết giống desktop.

## Buttons và CTA

- Primary CTA: một màu và lời gọi hành động nhất quán.
- Secondary CTA: outline hoặc neutral.
- Button label mô tả hành động: “Nhận báo giá”, “Xem sản phẩm”, không dùng “Bấm vào đây”.
- Vùng bấm tối thiểu hợp lý, focus state nhìn thấy, không chỉ phân biệt bằng màu.
- UAE Marketing Button chỉ dùng khi cần title + subtitle hoặc nhấn mạnh giá trị; button thường dùng Elementor Button.

## Card và icon

- Dùng UAE Info Box khi card có icon/image + heading + copy + CTA lặp lại.
- Dùng Icon List khi chỉ cần danh sách dấu tích; không dựng nhiều Info Box cho danh sách một dòng.
- Icon cùng bộ, cùng optical size; không trộn nhiều phong cách.
- Shadow/radius có tối đa 2–3 cấp và ghi trong foundation.

## Images

- Xác định ratio theo pattern: hero, card, gallery, product.
- Upload WebP/AVIF khi phù hợp, kích thước không vượt quá nhu cầu hiển thị quá mức.
- Alt mô tả nội dung/chức năng; ảnh trang trí có alt rỗng.
- Không nhúng chữ quan trọng chỉ trong ảnh.
- Hạn chế slider/carousel nếu nội dung có thể trình bày rõ hơn bằng grid.

## CSS và HTML ngoại lệ

Được dùng khi:

- Widget không có control cần thiết.
- Cần fix bug/compatibility đã xác minh.
- Cần semantic hoặc performance tốt hơn widget hiện có.

Phải:

- Dùng class có namespace dự án.
- Đặt CSS tập trung trong child theme/plugin dự án hoặc nơi đã thống nhất.
- Không dùng selector dựa vào ID Elementor ngẫu nhiên nếu có thể dùng class ổn định.
- Ghi lý do trong handoff.
