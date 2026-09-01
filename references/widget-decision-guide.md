# Ma trận quyết định widget

## Cây quyết định chung

1. Nội dung có thể biểu diễn bằng Heading, Text, Image, Button hoặc Icon List không?
   - Có: dùng Elementor core.
2. Có pattern lặp gồm icon/image + title + description + CTA?
   - Có: dùng UAE Info Box.
3. Có query dữ liệu động như post/product/category?
   - Có: dùng UAE Posts hoặc Woo widget phù hợp.
4. Có yêu cầu schema chuyên biệt và nội dung thật?
   - Có: dùng UAE FAQ Schema/How-To Schema hoặc nguồn schema trung tâm đã thống nhất.
5. Có interaction phức tạp như popup/off-canvas/toggle?
   - Có: chọn UAE widget tương ứng và kiểm tra keyboard/focus.
6. Không có widget phù hợp?
   - Xem Shortcode/API/custom widget. HTML là lựa chọn cuối.

## Nội dung và typography

| Nhu cầu | Dùng | Khi nên dùng | Không nên dùng / thay thế |
|---|---|---|---|
| H1–H6 thông thường | Elementor Heading | Heading semantic đơn giản | Không cần Advanced Heading chỉ để đổi màu |
| Eyebrow + title + separator | UAE Advanced Heading | Một component heading có subheading/line rõ | Heading + Text nếu pattern quá đơn giản |
| Hai màu trong một title | UAE Dual Color Heading | Brand emphasis có chủ đích | Không làm mọi heading hai màu |
| Hiệu ứng chữ đặc biệt | UAE Fancy Heading | Hero/campaign có lý do | Tránh trên heading SEO chính nếu làm khó đọc |
| Văn bản dài | Text Editor | Nội dung editorial | Không dùng nhiều Heading để tạo body text |
| Hai phiên bản nội dung | Content Toggle | Monthly/yearly, product/service comparison | Tabs nếu hơn hai nhóm; Table nếu dữ liệu cần so hàng/cột |
| Bảng dữ liệu | UAE Table | Thông số, so sánh, lịch | Không dùng Table để bố trí layout; kiểm tra mobile |
| Mục lục bài dài | UAE Table of Contents | Bài hướng dẫn dài có heading tốt | Không dùng với trang ngắn |

## Cards, dịch vụ và chuyển đổi

| Nhu cầu | Dùng | Khi nên dùng | Không nên dùng / thay thế |
|---|---|---|---|
| Card dịch vụ/lợi ích | UAE Info Box | Icon/image, title, copy, CTA lặp lại | Icon List cho dòng ngắn; manual container cho card rất đặc biệt |
| Card rất ngắn | UAE Info Card | Thông tin gọn | Info Box nếu cần nhiều control/CTA |
| Danh sách dấu tích | Elementor Icon List | Cam kết, tính năng, contact | Không dựng từng item bằng HTML/Info Box |
| CTA thường | Elementor Button | Một label, một link | Marketing Button khi cần title + subtitle |
| CTA giàu thông tin | UAE Marketing Button | Giá trị phụ/miêu tả trong nút | Không dùng nếu button quá dài trên mobile |
| Nhiều CTA ngang hàng | UAE Multi Buttons | Hai hoặc nhiều hành động cùng pattern | Container + Button nếu cần linh hoạt hơn |
| Giá dịch vụ dạng gói | UAE Price Box | Tên gói, giá, features, CTA | Price List cho menu/danh sách giá từng mục |
| Danh sách giá | UAE Price List | Món/dịch vụ và giá từng dòng | Price Box nếu là subscription/package |
| Popup tư vấn/lead | UAE Modal Popup | Nội dung bổ trợ không cần URL riêng | Không che nội dung cốt lõi; kiểm tra focus/ESC |
| Đếm ngược thật | UAE Countdown Timer | Campaign có deadline thật | Không dùng countdown giả/reset liên tục |

## Media và hình ảnh

| Nhu cầu | Dùng | Khi nên dùng | Không nên dùng / thay thế |
|---|---|---|---|
| Một ảnh | Elementor Image | Mọi ảnh nội dung đơn | Retina Image khi có nhu cầu retina riêng |
| Gallery đơn giản | Elementor Basic Gallery | Grid ảnh tĩnh | UAE Image Gallery khi cần filter/layout/lightbox nâng cao |
| Gallery nâng cao | UAE Image Gallery | Portfolio/category filter | Không tải quá nhiều ảnh trên một trang |
| Video đơn | Elementor Video hoặc UAE Video | Core cho embed đơn giản; UAE khi cần nâng cao | Thumbnail + lightbox nếu video ảnh hưởng tải trang |
| Nhiều video | UAE Video Gallery | Thư viện video | Không autoplay nhiều video |
| So sánh trước/sau | UAE Before After Slider | Nội thất, nha khoa, chỉnh sửa ảnh | Phải có ảnh cùng góc/kích thước và consent |
| Điểm chú thích trên ảnh | UAE Hotspots | Sơ đồ/product feature | Không dùng nếu nội dung khó tiếp cận bằng keyboard |
| SVG chuyển động | UAE SVG Animator | Minh họa nhẹ có chủ đích | Tôn trọng reduced motion; không thay text quan trọng |

## Location, team và social proof

| Nhu cầu | Dùng | Quy tắc |
|---|---|---|
| Bản đồ embed đơn giản | Elementor Google Maps | Một địa điểm, ít tùy chỉnh |
| Bản đồ nâng cao | UAE Google Map | Nhiều marker/style/control; kiểm tra API/billing nếu dùng |
| Giờ làm việc | UAE Business Hours | Dữ liệu phải có owner cập nhật |
| Thành viên | UAE Team Member | Có ảnh, chức danh, bio/link thật |
| Đánh giá doanh nghiệp | UAE Business Reviews | Chỉ nguồn và review thật; không nhập review giả |
| Instagram/X feed | UAE feed widget | Có giá trị social proof; có fallback khi API lỗi |
| Chia sẻ bài | UAE Social Share | Post/resource; không làm CTA chính bị nhiễu |

## Blog và nội dung động

| Nhu cầu | Dùng | Quy tắc |
|---|---|---|
| Bài mới/related posts | UAE Posts | Query rõ category/tag/order; H3 cho card dưới H2 section |
| Bài đơn giản | UAE Free Basic Posts | Chỉ khi layout đáp ứng và ít control |
| Tiến độ đọc | UAE Reading Progress Bar | Bài dài; không cần cho landing page |
| Post meta | UAE Post Info | Single template |
| Breadcrumbs | UAE Breadcrumbs hoặc SEO plugin | Chọn một nguồn duy nhất để tránh schema trùng |

## FAQ, HowTo và interaction

| Nhu cầu | Dùng | Quy tắc |
|---|---|---|
| FAQ có schema | UAE FAQ Schema | Câu hỏi/câu trả lời nhìn thấy, chính xác, không trùng schema |
| Accordion giao diện | Elementor Accordion | Khi không cần FAQ schema hoặc nội dung không phải FAQ |
| Toggle đơn giản | Elementor Accordion/Content Toggle | Chọn theo số nhóm và interaction |
| Hướng dẫn theo bước | UAE How-To Schema | Chỉ quy trình thực có bước rõ; dữ liệu visible khớp schema |
| Timeline | UAE Timeline | Chỉ cho lịch sử/quy trình theo thời gian; dùng Cards/Steps nếu không có tính thời gian |

## Form

| Form engine | Widget trình bày | Lưu ý |
|---|---|---|
| Contact Form 7 | UAE CF7 Styler | Mặc định greenfield; CF7 quản lý form/notification, xác định entry retention theo brief |
| WPForms | UAE WPForms Styler | Chỉ existing/exception; không đổi engine chỉ vì style |
| Fluent Forms | UAE WP Fluent Forms Styler | Chỉ existing/exception; không đổi engine chỉ vì style |
| Gravity Forms | UAE Gravity Form Styler | Kiểm tra license và add-ons |

Mọi form phải có label, required state, validation, success/error message, consent khi cần, email routing và test SMTP.

## WooCommerce

| Nhu cầu | Dùng | Quy tắc |
|---|---|---|
| Grid sản phẩm | UAE Woo – Products/Product Grid | Query và sort theo merchandising, không chỉ mới nhất |
| Danh mục | UAE Woo – Categories | Có ảnh/category description tốt |
| Add to Cart riêng | UAE Woo – Add to Cart | Chỉ khi context sản phẩm rõ |
| Mini cart | UAE Woo – Mini Cart hoặc Astra cart | Chọn một giải pháp, kiểm tra AJAX/cache |
| Checkout | Woo native hoặc UAE Woo – Checkout | Ưu tiên compatibility; test mọi payment/shipping path |

## Widget mặc định tránh dùng nếu không có lý do

- HTML để vẽ card/list/button.
- Spacer để tạo hệ thống khoảng cách.
- Carousel cho nội dung quan trọng mà người dùng phải tự tìm.
- Welcome Music/autoplay audio.
- Particle/Party effects trên website doanh nghiệp thông thường.
- Countdown giả.
- Popup mở ngay, không có close/focus tốt.
- Nhiều nguồn schema cùng một loại trên một trang.
