# SEO, AIO, AEO và LLMO cho website

## Định nghĩa vận hành

- SEO: giúp search engine crawl, hiểu, index và xếp hạng nội dung hữu ích.
- AIO trong SOP này: tối ưu khả năng nội dung được các trải nghiệm tìm kiếm dùng AI hiểu và trích dẫn; không phải “AI Overview” như một sản phẩm riêng.
- AEO: cấu trúc câu trả lời rõ cho câu hỏi/ngữ cảnh cụ thể.
- LLMO: làm entity, dữ kiện, quan hệ, nguồn và ngữ cảnh đủ rõ để hệ thống ngôn ngữ có thể hiểu/ground.

Đây không phải bốn chiến thuật tách rời. Nền tảng chung là content hữu ích, crawlable, chính xác, có nguồn và cấu trúc tốt. Google nêu rằng AI features không yêu cầu schema hoặc file AI đặc biệt; SEO nền tảng vẫn áp dụng.

Trong workflow dự án, khóa intent, entity, message, evidence, CTA và schema owner trong content contract trước khi chọn layout/widget hoặc viết bản dài.

## SEO-aware design contract

SEO không bị hoãn toàn bộ đến Production. Ngay Design Mode, sitemap/SEO map phải ghi cho mỗi page quan trọng: URL, primary keyword/topic, secondary topics, intent, audience, geographic intent, conversion goal, internal-link direction và priority.

- Full SEO brief bắt buộc cho Home, main service, local/commercial và important solution pages.
- About/Contact dùng lightweight brief trừ khi có search goal đáng kể.
- Privacy/utility/legal không cần full SEO brief.
- SEO constraints phải có trước content contract; contract có trước H1/H2/H3, sections và blueprint.
- Mỗi page indexable chỉ có một H1; heading order logic, copy đủ thật và internal links được định hướng từ design stage.
- Design Mode không buộc hoàn tất Rank Math metadata/indexing. Phần technical/detail production được làm sau `Site Design Approved` hoặc explicit owner request.

## Technical baseline

- HTTPS, một hostname chuẩn và redirect nhất quán.
- Robots không chặn nhầm CSS/JS/nội dung cần index.
- XML sitemap chỉ chứa canonical, indexable URLs.
- Canonical hợp lý; không để demo/staging được index.
- Status code đúng; 404 thật, redirect có chủ đích.
- Mobile usable; font, tap target và layout ổn định.
- Core Web Vitals và page experience được kiểm tra.
- Nội dung quan trọng có dạng text, không chỉ ảnh/video/JS interaction.
- Search Console/Analytics được cấu hình theo phạm vi.

## Information architecture

- Một trang cho một intent chính; tránh cannibalization bằng trang biến thể từ khóa gần giống.
- URL ngắn, mô tả, không phụ thuộc ngày nếu nội dung evergreen.
- Menu và breadcrumbs tạo đường crawl.
- Hub/service/category liên kết tới trang chi tiết.
- Blog hỗ trợ topical authority và link vào money pages một cách hữu ích.
- Entity map xác định Organization, Person, Service, Product, Place, Area Served và mối quan hệ.

## On-page

- Title độc nhất, mô tả đúng lợi ích và intent.
- Một H1; H2/H3 theo logic.
- Mở bài trả lời nhanh “đây là gì/cho ai/giải quyết gì”.
- Nội dung có bằng chứng, quy trình, ví dụ, giới hạn và CTA.
- Alt text đúng nội dung; caption khi bổ sung ngữ cảnh.
- Anchor text mô tả trang đích.
- Thông tin ngày/tác giả/cập nhật khi phù hợp.
- Không nhồi mọi biến thể từ khóa; dùng ngôn ngữ tự nhiên và entity liên quan.

## Structured data

- Chọn một nguồn schema chính để tránh trùng.
- Organization/LocalBusiness/ProfessionalService theo mô hình thực tế.
- WebSite, BreadcrumbList, Article, Product, Service hoặc FAQPage khi phù hợp.
- Schema phải khớp nội dung visible, chính xác và cập nhật.
- Không tạo review/rating giả.
- FAQ schema chỉ cho FAQ thật; việc hợp lệ không đảm bảo rich result.
- Kiểm tra bằng validator/Rich Results Test và inspect HTML frontend.

## AEO pattern

Mỗi câu hỏi quan trọng nên có:

1. Heading hoặc câu hỏi rõ.
2. Câu trả lời trực tiếp 1–3 câu.
3. Giải thích/điều kiện.
4. Ví dụ, bảng hoặc bước nếu cần.
5. Link đến nguồn/trang chi tiết.

Không biến mọi đoạn thành FAQ. Dùng FAQ cho câu hỏi khách hàng thật; dùng section thường cho nội dung chính.

## LLMO/entity pattern

- Nêu đầy đủ tên doanh nghiệp, loại hình, dịch vụ và khu vực trên trang About/Contact.
- Thông tin NAP và pháp lý nhất quán.
- Trang dịch vụ định nghĩa phạm vi, deliverable, quy trình, đối tượng và giới hạn.
- Dữ kiện quan trọng có ngữ cảnh và thời điểm; tránh câu chung chung như “chúng tôi hàng đầu” nếu không có chứng cứ.
- Tác giả/chuyên gia có hồ sơ và kinh nghiệm thật.
- Trích dẫn nguồn sơ cấp cho dữ liệu bên ngoài.
- Duy trì consistency giữa website, Business Profile, social/profile quan trọng.

## Local SEO

- NAP nhất quán.
- Khu vực phục vụ thật, không tạo hàng loạt trang địa phương mỏng.
- Trang địa phương cần nội dung riêng: dịch vụ, bằng chứng, case, địa chỉ/khu vực, FAQ thật.
- Google Business Profile cập nhật.
- Map và directions phục vụ người dùng; embed map không tự tạo thứ hạng.
- Review acquisition phải thật và tuân chính sách.

## Page type checklist

### Homepage

- Brand/entity rõ; offer, audience, location, CTA.
- Link tới dịch vụ/category cốt lõi.
- Trust/case/contact.

### Service page

- Intent riêng; pain, solution, deliverables, process, proof, FAQ, CTA.
- Link tới case study và bài hỗ trợ.

### About

- Entity, người thật, lịch sử, năng lực, pháp lý, chứng nhận.

### Contact

- NAP, giờ làm việc, map nếu hữu ích, form, channel và expectation phản hồi.

### Blog/article

- Intent, direct answer, depth, source, author, related links, Article schema.

### Product/category

- Đọc [woocommerce-workflow.md](woocommerce-workflow.md).

## Đo lường

- Index coverage và sitemap.
- Query/page/country/device trong Search Console.
- Organic landing page conversions.
- Leads/orders và assisted conversions.
- Rich result/merchant issues.
- Core Web Vitals.
- Branded/non-branded visibility và entity consistency.
- AI feature traffic được Google gộp trong Web search reporting; không hứa đo lường chính xác từng hệ thống LLM nếu nguồn không cung cấp.

## Những điều không được cam kết

- Không cam kết TOP 1/TOP Google vô điều kiện.
- Không tuyên bố schema bảo đảm rich result.
- Không tạo `llms.txt` hoặc markup “AI-only” như yêu cầu bắt buộc nếu không có mục tiêu kỹ thuật riêng.
- Không xuất bản hàng loạt nội dung AI mỏng.
- Không đổi ngày chỉ để tạo cảm giác mới.
