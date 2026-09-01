# Design Foundation

> Trạng thái: Draft · Revision: YYYY-MM-DD-r1 · Chủ sở hữu: Chưa xác định · Cập nhật nội dung: YYYY-MM-DD HH:MM TZ · Người duyệt/ngày: Chưa

Nguồn chuẩn: cấu hình toàn cục trong Astra Customizer. Elementor/UAE kế thừa mặc định; chỉ override khi component có yêu cầu có chủ đích. Đây là record cấu hình đã áp dụng và bằng chứng frontend, không chỉ là đề xuất phong cách.

## Site identity và trạng thái áp dụng

- Logo desktop/mobile và Media ID/URL:
- Site icon/favicon và Media ID/URL:
- Site title/tagline:
- Astra/Elementor inheritance đã xác minh:
- Môi trường/URL kiểm tra:
- Trạng thái áp dụng: Chưa áp dụng / Đã áp dụng / Read-back đạt

## Brand tokens

| Vai trò | Giá trị | Cách dùng |
|---|---|---|
| Primary | | Tiêu đề nhấn, liên kết, nhận diện |
| CTA | | Hành động chính |
| Secondary | | Điểm nhấn phụ |
| Text | | Nội dung chính |
| Muted text | | Nội dung phụ |
| Surface | | Card/nền sáng |
| Dark surface | | Section tối |
| Border | | Viền/phân cách |
| Success/Warning/Error | | Trạng thái |

## Typography

| Role | Font | Desktop | Tablet | Mobile | Weight | Line height |
|---|---|---:|---:|---:|---:|---:|
| Body | | | | | | |
| H1 | | | | | | |
| H2 | | | | | | |
| H3 | | | | | | |
| Small/Label | | | | | | |

## Layout

- Content container:
- Wide container:
- Section padding desktop/tablet/mobile:
- Grid gap desktop/tablet/mobile:
- Border radius nhỏ/vừa/lớn:
- Shadow mặc định:
- Breakpoint được dùng:

## Components

### Button

- Primary:
- Secondary:
- Text/link:
- Hover/focus/disabled:

### Card

- Nền/viền/radius/padding:
- Kiểu ảnh/icon:
- Khoảng cách nội dung:

### Form

- Label/input/help/error/success:
- Focus state:
- Consent/privacy:

### Image

- Tỉ lệ theo loại nội dung:
- Crop/focal point:
- Quy tắc alt text:

## Quy tắc ngoại lệ

Mỗi override tại widget phải ghi: component, lý do, phạm vi, breakpoint và người duyệt. Không dùng giá trị gần giống chỉ vì thuận tay.

## Bằng chứng kiểm tra

| Hạng mục | Desktop | Tablet | Mobile | Frontend đăng xuất/bằng chứng |
|---|---|---|---|---|
| Palette/typography | | | | |
| Container/spacing | | | | |
| Button/form/focus | | | | |
| Logo/favicon | | | | |
