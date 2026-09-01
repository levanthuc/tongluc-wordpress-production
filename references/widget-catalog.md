# Catalog widget Elementor Free và UAE

Cập nhật theo nguồn chính thức ngày 2026-08-28. Kiểm kê lại trong Elementor panel của website trước mỗi dự án vì tên và gói có thể thay đổi.

## Elementor Free – V3/classic workflow

### Layout

- Container
- Grid

### Basic/content

- Heading
- Text Editor
- Image
- Video
- Button
- Star Rating
- Divider
- Google Maps
- Icon
- Image Box
- Icon Box
- Basic Gallery
- Image Carousel
- Icon List
- Counter
- Spacer
- Testimonial
- Tabs
- Accordion
- Social Icons
- Progress Bar
- SoundCloud
- Shortcode
- HTML
- Menu Anchor
- Alert
- Sidebar
- Read More
- Text Path
- Minimalist Link in Bio

Các WordPress widgets như Archives, Calendar, Categories, Menu, Meta, Pages, Recent Comments, Recent Posts, RSS, Search, Tag Cloud hoặc Text có thể xuất hiện tùy WordPress/theme/plugin. Chúng không phải lựa chọn mặc định khi đã có widget chuyên dụng tốt hơn.

### Quy tắc sử dụng

- Container/Grid tạo layout.
- Heading/Text Editor/Image/Button/Icon List giải quyết phần lớn nội dung cơ bản.
- `Spacer` không dùng thay cho padding/gap có hệ thống.
- `HTML` và `Shortcode` chỉ dùng khi không có native widget phù hợp hoặc khi tích hợp yêu cầu.
- Google Maps core phù hợp embed đơn giản; UAE Google Map dùng khi cần marker/style/controls nâng cao.

## UAE Pro – Content widgets

- Advanced Heading
- Business Hours
- Content Toggle
- Google Map
- Image Gallery
- Info Box
- Modal Popup
- Posts
- Price List
- Table
- Video
- Video Gallery
- SVG Animator

## UAE Pro – Creative widgets

- Before After Slider
- Countdown Timer
- Welcome Music
- Dual Color Heading
- Fancy Heading
- Hotspots
- Login Form
- Marketing Button
- Multi Buttons
- Navigation Menu
- Off Canvas
- Retina Image
- Team Member
- Price Box
- Timeline
- User Registration Form

## UAE Pro – Form stylers

- Contact Form 7 Styler
- Gravity Form Styler
- WP Fluent Forms Styler
- WPForms Styler

Widget styler chỉ hiển thị/styling form do plugin form tương ứng quản lý. Validation, notification, entry storage, consent và chống spam vẫn cấu hình trong plugin form.

## UAE Pro – WooCommerce

- Woo – Add to Cart
- Woo – Categories
- Woo – Checkout
- Woo – Mini Cart
- Woo – Products

Chỉ bật nếu WooCommerce active và widget thực sự được dùng. Không tùy biến checkout chỉ vì có widget; ưu tiên tính ổn định, payment compatibility và ít xung đột.

## UAE Pro – Social, trust và SEO/schema

- Instagram Feed
- X Feed
- Social Share
- Business Reviews
- How-To Schema
- FAQ Schema
- Table of Contents

Review, FAQ và HowTo markup phải phản ánh nội dung thật, nhìn thấy và phù hợp trang. Không dùng schema chỉ để hy vọng rich result.

## UAE Pro – Special Features

- Cross-Site Copy Paste
- Presets
- Particle Backgrounds
- Party Propz
- Display Conditions
- Sticky Header

Các effect như particles/party/welcome music mặc định tắt; chỉ bật khi có mục tiêu trải nghiệm rõ và đã đánh giá accessibility/performance.

## UAE Free widgets

Theo trang widget chính thức tại ngày cập nhật:

- Navigation Menu
- Site Title
- Site Logo
- Site Tagline
- Search
- Cart
- Retina Logo
- Page Title
- Breadcrumbs
- Post Info
- Scroll to Top
- Reading Progress Bar
- Info Card
- Copyright
- Basic Posts
- Woo – Product Grid
- Counter

Website chuẩn Tổng Lực có UAE Pro, nhưng catalog Free vẫn hữu ích để biết widget nào không phụ thuộc license Pro.

## Module hygiene

- Sau blueprint, lập danh sách UAE widget/feature cần bật.
- Tắt module không sử dụng để giảm asset, bề mặt lỗi và nhiễu trong editor.
- Existing/redesign/site có dữ liệu: trước khi tắt, audit usage để tránh làm mất widget đang tồn tại. Greenfield: đối chiếu blueprint/Prototype và dependency trước khi tắt.
- Ghi phiên bản/fingerprint trong capability cache khi MCP cần dùng; ghi module bật và lý do trong design foundation/blueprint. Site inventory chỉ dùng khi profile yêu cầu.
