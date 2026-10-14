// ── i18n translations ──
const T = {
  en: {
    navAbout: "About", navTestimonials: "Stories", navContact: "Contact", navListings: "Rentals",
    navBlog: "Blog", navAboutAlice: "About Alice",
    navApartments: "Apartments", navHousesVillas: "Houses & Villas",
    navCta: "Message Alice",
    searchReset: "Reset", filterLabel: "Search:", filterClearAll: "Clear search",
    countOne: "rental", countMany: "rentals", countOf: "of",
    noResultsText: "No listings match your filters. Try adjusting your search.",
    noResultsClear: "Clear search filters",
    heroTag: "Đà Nẵng Rentals for Expats",
    heroH1: 'Find your place in&nbsp;<span class="coral" style="white-space:nowrap">Đà Nẵng</span>',
    heroSub: "Most expats waste weeks on bad listings and unreliable landlords. Alice knows the best buildings, the fair prices, and the landlords you can trust. Tell her what you need and she\u2019ll send you a shortlist worth seeing.",
    btnListings: "Browse Rentals", btnCall: "Message Alice",
    stat1: "500+", stat1L: "Families Housed",
    stat2: "7+", stat2L: "Years in Đà Nẵng",
    stat3L: "Google Rating",
    areasLabel: "Where most expats rent",
    aboutTag: "Why Alice", aboutTitle: "She does the hard part<br>so you don't have to",
    aboutP1: "Relocating is stressful enough without spending weeks on apartment hunting. Alice is a Private Rental Advisor and has been matching renters with homes in Đà Nẵng since 2019. She knows which buildings have reliable landlords, which streets flood in rainy season, and where the best morning coffee is.",
    aboutP2: "She speaks English and Vietnamese, so nothing gets lost in translation. Tell her your budget and your must-haves. She will send you a short list of places that actually fit.",
    h1Title: "Licensed & Insured", h1Sub: "Every contract reviewed. Every deposit protected. Alice holds a Đà Nẵng real estate license, so your lease is legally airtight.",
    h2Title: "7+ Years in Đà Nẵng", h2Sub: "Not a newcomer. Alice has placed 500+ families and knows every building, landlord, and neighborhood personally.",
    h3Title: "She Negotiates For You", h3Sub: "Alice speaks the language and knows the market rates. Her clients consistently pay less rent than they would on their own.",
    h4Title: "Your Lease, Fully Protected", h4Sub: "Alice reviews every clause before you sign. She makes sure your deposit is safe, your terms are fair, and there are no surprises buried in the fine print.",
    guidesTag: "Renting guides", guidesTitle: "Read this before you sign", guidesAll: "All renting guides \u2192",
    g1Title: "Renting in Da Nang as a foreigner", g1Sub: "Deposits, contracts, extra costs and police registration.",
    g2Title: "Son Tra or My An: where should you rent?", g2Sub: "The two beach areas compared on rent, noise and walkability.",
    g3Title: "Is Da Nang a good place to live with kids?", g3Sub: "International schools, family budgets and which area suits which family.",
    faqTag: "Before you rent", faqTitle: "Questions renters ask Alice",
    faqSub: "The things people message about before they sign anything. Prices are from listings that are live today.",
    faqMore: "Read the full renting guides \u2192",
    testiTag: "From Renters", testiTitle: "Real people, real moves",
    testiRead: "Read on Google", testiAll: "See all reviews on Google",
    listTag: "Available Now", listTitle: "Rentals in Đà Nẵng",
    listSub: "Every listing here has been checked by Alice. Fair prices, honest landlords, ready to move in.",
    filterRent: "For Rent",
    listMore: "See All Rentals",
    bedLabel: "Beds", bathLabel: "Baths", areaLabel: "m\u00B2",
    badgeRent: "For Rent",
    footerDesc: "500+ families housed in Đà Nẵng since 2019. Send Alice a message. She usually replies within an hour.",
    modalTitle: "Get in touch", modalSub: "Pick whichever is easiest for you. Alice usually replies within an hour.", modalClose: "Maybe later",
    footNav: "Navigate", footContact: "Reach Alice",
    copy: "\u00A9 2026 Alice Rentals. All rights reserved.",
    navCommercial: "Commercial",
    commHeroH1: "Find the right space <em>for your business.</em>",
    commHeroSub: "Offices, retail, and F&amp;B spaces across Đà Nẵng. Alice knows which buildings have reliable landlords, fair rates, and the foot traffic you actually need.",
    commBtnBrowse: "Browse Commercial",
    commListTag: "AVAILABLE SPACES",
    commListTitle: "Commercial properties",
    commListSub: "Updated weekly. Tap any listing to see photos, floor plans, and details.",
    commH2Sub: "Not a newcomer. Alice has placed 500+ families and businesses and knows every building, landlord, and neighborhood personally.",
    commAboutP1: "Relocating a business is stressful enough without spending weeks on viewings. Alice has been matching tenants with spaces in Đà Nẵng since 2019. She knows which buildings have reliable landlords, which streets get the right foot traffic, and where the best deals are this quarter.",
    commAboutP2: "She speaks English and Vietnamese, so nothing gets lost in translation. Tell her your budget and your must-haves. She will send you a short list of places that actually fit.",
    commCrossEyebrow: "Need a home instead?",
    commCrossTitle: "Residential rentals available",
    commCrossDesc: "Apartments, villas, and houses across Đà Nẵng for expats, remote workers, and families.",
    commCrossCta: "Browse Residential →",
    commFooterDesc: "500+ families and businesses housed in Đà Nẵng since 2019. Send Alice a message. She usually replies within an hour.",
    navBuy: "Buy Property",
    buyHeroTag: "Buy in Đà Nẵng",
    buyHeroH1: "Your home in Đà Nẵng, <em>found on request.</em>",
    buyHeroSub: "Apartments, houses and villas for sale across the city. Our sale listings are coming soon. Until then, tell Alice what you want to buy and she will look for it personally.",
    buyHeroBtn: "Start your search",
    buyListTag: "Homes for sale",
    buyListTitle: "Sale listings are coming soon",
    buyListSub: "Until they are live, Alice finds apartments, houses and villas on request. Choose one below and WhatsApp opens with your message ready.",
    buyOptAptTitle: "Buy an apartment",
    buyOptHouseTitle: "Buy a house",
    buyAlt: "Prefer to call?",
    buyStepsTag: "How it works",
    buyStepsTitle: "Buying with Alice, step by step",
    buyStep1Title: "Send your brief",
    buyStep1Text: "Apartment or house, the area, your budget and your timing. A few lines on WhatsApp is enough.",
    buyStep2Title: "Get a short list",
    buyStep2Text: "Alice searches for you and sends the homes that fit, with photos, prices and her honest opinion of each one.",
    buyStep3Title: "View and decide",
    buyStep3Text: "See the homes in person or on a video call, and take your time. You decide when you are ready.",
    buyFaqTag: "Before you buy",
    buyFaqTitle: "Questions buyers ask Alice",
    buyCrossEyebrow: "Not ready to buy yet?",
    buyCrossTitle: "Rent first and get to know the city",
    buyCrossDesc: "A few months in a rental is a good way to find the area you want to buy in. Alice has apartments, houses and villas for rent across Đà Nẵng.",
    buyCrossCta: "Browse rentals →"
  },
  vi: {
    guidesTag: "Cẩm nang thuê nhà", guidesTitle: "Nên đọc trước khi ký hợp đồng", guidesAll: "Tất cả cẩm nang thuê nhà \u2192",
    g1Title: "Thuê nhà ở Đà Nẵng khi là người nước ngoài", g1Sub: "Tiền cọc, hợp đồng, chi phí phát sinh và đăng ký tạm trú.",
    g2Title: "Sơn Trà hay Mỹ An: nên thuê ở đâu?", g2Sub: "So sánh hai khu biển về giá thuê, độ ồn và sự tiện đi bộ.",
    g3Title: "Đà Nẵng có phải nơi tốt để sống cùng con nhỏ?", g3Sub: "Trường quốc tế, ngân sách gia đình và khu vực phù hợp cho từng gia đình.",
    faqTag: "Trước khi thuê", faqTitle: "Những câu hỏi khách thuê hay hỏi Alice",
    faqSub: "Những điều mọi người hay nhắn hỏi trước khi ký hợp đồng. Giá lấy từ các tin đăng đang có sẵn.",
    faqMore: "Xem các bài hướng dẫn thuê nhà \u2192",
    navAbout: "Về Alice", navTestimonials: "Câu chuyện", navContact: "Liên hệ", navListings: "Cho thuê",
    navBlog: "Blog", navAboutAlice: "Về Alice",
    navApartments: "Căn hộ", navHousesVillas: "Nhà & Biệt thự",
    navCta: "Nhắn tin cho Alice",
    searchReset: "Đặt lại", filterLabel: "Tìm kiếm:", filterClearAll: "Xóa tìm kiếm",
    countOne: "nhà", countMany: "nhà", countOf: "trong",
    noResultsText: "Không có nhà nào khớp với bộ lọc. Hãy thử điều chỉnh tìm kiếm.",
    noResultsClear: "Xóa bộ lọc tìm kiếm",
    heroTag: "Cho Thuê Cao Cấp tại Đà Nẵng",
    heroH1: 'Tìm ngôi nhà <em>hoàn hảo</em> tại <span class="coral">Đà Nẵng</span>',
    heroSub: "Không cần tự mình tìm kiếm mệt mỏi. Alice giúp bạn tìm nhà cho thuê đã kiểm tra, sẵn sàng dọn vào tại những khu vực tốt nhất Đà Nẵng, để bạn an cư nhanh hơn và tận hưởng cuộc sống bên biển.",
    btnListings: "Xem Nhà Trống", btnCall: "Nhắn Tin Cho Alice",
    stat1: "500+", stat1L: "Gia Đình Đã An Cư",
    stat2: "7+", stat2L: "Năm tại Đà Nẵng",
    stat3L: "Đánh giá Google",
    areasLabel: "Khu vực chúng tôi am hiểu",
    aboutTag: "Vì sao chọn Alice", aboutTitle: "Việc tìm nhà,<br>để Alice lo",
    aboutP1: "Chuyển đến thành phố mới đã đủ vất vả. Tìm nhà không nên khó thêm. Alice là chuyên viên tư vấn thuê nhà. Với hơn 7 năm kinh nghiệm tại thị trường cho thuê Đà Nẵng, Alice biết chủ nhà nào uy tín, con đường nào hay ngập mùa mưa, và quán cà phê sáng nào ngon nhất.",
    aboutP2: "Alice hỗ trợ người nước ngoài, người làm việc từ xa và gia đình Việt Nam, bằng tiếng Anh và tiếng Việt. Hãy cho Alice biết bạn cần gì, chị ấy sẽ gửi danh sách ngắn những nơi đáng xem.",
    h1Title: "Được Cấp Phép & Bảo Hiểm", h1Sub: "Mọi hợp đồng đều được kiểm tra. Mọi khoản đặt cọc đều được bảo vệ. Alice có giấy phép bất động sản Đà Nẵng, đảm bảo hợp đồng thuê hợp pháp.",
    h2Title: "7+ Năm tại Đà Nẵng", h2Sub: "Không phải người mới. Alice đã hỗ trợ hơn 500 gia đình và hiểu rõ từng tòa nhà, chủ nhà và khu vực.",
    h3Title: "Alice Đàm Phán Cho Bạn", h3Sub: "Alice nói tiếng Việt và hiểu rõ giá thị trường. Khách hàng của cô luôn trả tiền thuê thấp hơn so với tự tìm kiếm.",
    h4Title: "Hợp Đồng Được Bảo Vệ", h4Sub: "Alice xem xét từng điều khoản trước khi bạn ký. Cô đảm bảo tiền cọc an toàn, điều khoản công bằng, và không có bất ngờ nào ẩn trong hợp đồng.",
    testiTag: "Khách Thuê Nói Gì", testiTitle: "Những người đã tìm được nhà qua Alice",
    testiRead: "Xem trên Google", testiAll: "Xem tất cả đánh giá trên Google",
    listTag: "Đang Trống", listTitle: "Nhà cho thuê tại Đà Nẵng",
    listSub: "Đã kiểm tra, giá hợp lý, sẵn sàng dọn vào.",
    filterRent: "Cho thuê",
    listMore: "Xem Tất Cả Nhà Trống",
    bedLabel: "PN", bathLabel: "WC", areaLabel: "m\u00B2",
    badgeRent: "Cho thuê",
    footerDesc: "Hơn 500 gia đình đã an cư tại Đà Nẵng từ 2019. Nhắn tin cho Alice. Thường trả lời trong vòng một giờ.",
    modalTitle: "Nhắn tin cho Alice", modalSub: "Chọn cách bạn muốn liên hệ. Alice thường trả lời trong vòng một giờ.", modalClose: "Để sau",
    footNav: "Điều Hướng", footContact: "Liên Hệ Alice",
    copy: "\u00A9 2026 Alice Rentals. Bảo lưu mọi quyền.",
    navCommercial: "Mặt bằng",
    commHeroH1: "Tìm không gian phù hợp <em>cho doanh nghiệp.</em>",
    commHeroSub: "Văn phòng, mặt bằng bán lẻ và nhà hàng/quán cà phê khắp Đà Nẵng. Alice biết tòa nhà nào có chủ tốt, giá hợp lý, và lượng khách phù hợp cho hoạt động kinh doanh của bạn.",
    commBtnBrowse: "Xem Mặt Bằng",
    commListTag: "MẶT BẰNG TRỐNG",
    commListTitle: "Mặt bằng thương mại tại Đà Nẵng",
    commListSub: "Cập nhật hàng tuần. Bấm vào bất kỳ tin đăng để xem ảnh và chi tiết.",
    commH2Sub: "Không phải người mới. Alice đã hỗ trợ hơn 500 gia đình và doanh nghiệp, hiểu rõ từng tòa nhà, chủ nhà và khu vực.",
    commAboutP1: "Chuyển địa điểm kinh doanh đã đủ vất vả. Alice đã kết nối khách thuê với mặt bằng phù hợp tại Đà Nẵng từ năm 2019. Cô biết tòa nhà nào có chủ uy tín, đường nào có lượng khách tốt, và đâu là cơ hội tốt nhất quý này.",
    commAboutP2: "Cô nói tiếng Anh và tiếng Việt nên không có rào cản ngôn ngữ. Hãy cho Alice biết ngân sách và nhu cầu của bạn — cô sẽ gửi danh sách rút gọn các nơi thực sự phù hợp.",
    commCrossEyebrow: "Đang tìm nhà ở?",
    commCrossTitle: "Nhà cho thuê có sẵn",
    commCrossDesc: "Căn hộ, biệt thự và nhà phố tại Đà Nẵng cho người nước ngoài, người làm việc từ xa và gia đình Việt Nam.",
    commCrossCta: "Xem Nhà Cho Thuê →",
    commFooterDesc: "Hơn 500 gia đình và doanh nghiệp đã an cư tại Đà Nẵng từ 2019. Nhắn tin cho Alice. Thường trả lời trong vòng một giờ.",
    navBuy: "Mua nhà",
    buyHeroTag: "Mua nhà tại Đà Nẵng",
    buyHeroH1: "Ngôi nhà của bạn ở Đà Nẵng, <em>tìm theo yêu cầu.</em>",
    buyHeroSub: "Căn hộ, nhà phố và biệt thự để bán khắp thành phố. Danh sách nhà bán sẽ sớm có trên trang. Trong lúc chờ, hãy cho Alice biết bạn muốn mua gì, chị sẽ trực tiếp tìm giúp bạn.",
    buyHeroBtn: "Bắt đầu tìm nhà",
    buyListTag: "Nhà đang bán",
    buyListTitle: "Danh sách nhà bán sắp ra mắt",
    buyListSub: "Trong lúc chờ, Alice tìm căn hộ, nhà phố và biệt thự theo yêu cầu. Chọn một nút bên dưới, WhatsApp sẽ mở sẵn tin nhắn cho bạn.",
    buyOptAptTitle: "Mua căn hộ",
    buyOptHouseTitle: "Mua nhà",
    buyAlt: "Muốn gọi điện?",
    buyStepsTag: "Cách thức",
    buyStepsTitle: "Mua nhà cùng Alice, từng bước một",
    buyStep1Title: "Gửi yêu cầu",
    buyStep1Text: "Căn hộ hay nhà, khu vực, ngân sách và thời gian bạn muốn. Vài dòng trên WhatsApp là đủ.",
    buyStep2Title: "Nhận danh sách ngắn",
    buyStep2Text: "Alice tìm giúp bạn và gửi những căn phù hợp, kèm ảnh, giá và nhận xét thật lòng của chị về từng căn.",
    buyStep3Title: "Xem nhà và quyết định",
    buyStep3Text: "Xem nhà trực tiếp hoặc qua video call, không cần vội. Bạn quyết định khi đã sẵn sàng.",
    buyFaqTag: "Trước khi mua",
    buyFaqTitle: "Những câu hỏi người mua hay hỏi Alice",
    buyCrossEyebrow: "Chưa sẵn sàng mua?",
    buyCrossTitle: "Thuê trước để hiểu thành phố",
    buyCrossDesc: "Thuê vài tháng là cách tốt để tìm ra khu vực bạn muốn mua. Alice có căn hộ, nhà và biệt thự cho thuê khắp Đà Nẵng.",
    buyCrossCta: "Xem nhà cho thuê →"
  },
  ru: {
    navAbout: "Об Алисе", navTestimonials: "Отзывы", navContact: "Контакты", navListings: "Аренда",
    navBlog: "Блог", navAboutAlice: "Об Алисе",
    navApartments: "Квартиры", navHousesVillas: "Дома и виллы",
    navCta: "Написать Алисе",
    searchReset: "Сбросить", filterLabel: "Поиск:", filterClearAll: "Очистить поиск",
    countOne: "объект", countFew: "объекта", countMany: "объектов", countOf: "из",
    noResultsText: "Нет объектов по вашим фильтрам. Попробуйте изменить параметры поиска.",
    noResultsClear: "Сбросить фильтры",
    heroTag: "Аренда в Дананге для экспатов",
    heroH1: 'Найдите свой дом в&nbsp;<span class="coral" style="white-space:nowrap">Дананге</span>',
    heroSub: "Большинство экспатов тратят недели на плохие объявления и ненадёжных арендодателей. Алиса знает лучшие дома, честные цены и арендодателей, которым можно доверять. Расскажите ей, что вам нужно, и она пришлёт короткий список вариантов, которые стоит посмотреть.",
    btnListings: "Смотреть объекты", btnCall: "Написать Алисе",
    stat1: "500+", stat1L: "Семей заселено",
    stat2: "7+", stat2L: "Лет в Дананге",
    stat3L: "Рейтинг Google",
    areasLabel: "Где чаще всего снимают экспаты",
    aboutTag: "Почему Алиса", aboutTitle: "Она берёт на себя сложное,<br>чтобы вам не пришлось",
    aboutP1: "Переезд и так даётся нелегко, а тут ещё недели поиска квартиры. Алиса работает частным консультантом по аренде и с 2019 года подбирает жильё в Дананге. Она знает, в каких домах надёжные арендодатели, какие улицы затапливает в сезон дождей и где лучший утренний кофе.",
    aboutP2: "Она говорит по-английски и по-вьетнамски, так что ничего не теряется при переводе. Назовите ей бюджет и обязательные требования, и она пришлёт короткий список мест, которые действительно подходят.",
    h1Title: "Лицензия и страховка", h1Sub: "Каждый договор проверен. Каждый депозит защищён. У Алисы есть лицензия риелтора в Дананге, поэтому ваш договор аренды юридически надёжен.",
    h2Title: "7+ лет в Дананге", h2Sub: "Не новичок. Алиса заселила более 500 семей и лично знает каждый дом, арендодателя и район.",
    h3Title: "Она торгуется за вас", h3Sub: "Алиса говорит на местном языке и знает рыночные цены. Её клиенты стабильно платят за аренду меньше, чем если бы искали сами.",
    h4Title: "Ваш договор под защитой", h4Sub: "Алиса проверяет каждый пункт до того, как вы подпишете. Она следит, чтобы депозит был в безопасности, условия были честными, а в мелком шрифте не пряталось сюрпризов.",
    guidesTag: "Гиды по аренде", guidesTitle: "Прочитайте перед подписанием", guidesAll: "Все гиды по аренде \u2192",
    g1Title: "Аренда в Дананге для иностранцев", g1Sub: "Депозит, договор, дополнительные расходы и регистрация в полиции.",
    g2Title: "Шонча или Миан: где снимать жильё?", g2Sub: "Два пляжных района: цены, шум и что рядом пешком.",
    g3Title: "Хорошо ли жить в Дананге с детьми?", g3Sub: "Международные школы, семейный бюджет и какой район кому подходит.",
    faqTag: "Перед арендой", faqTitle: "Вопросы, которые задают Алисе",
    faqSub: "О чём спрашивают, прежде чем что-либо подписать. Цены взяты из актуальных объявлений.",
    faqMore: "Читать все гиды по аренде →",
    testiTag: "Отзывы арендаторов", testiTitle: "Реальные люди, реальные переезды",
    testiRead: "Читать в Google", testiAll: "Все отзывы в Google",
    listTag: "Свободно сейчас", listTitle: "Аренда в Дананге",
    listSub: "Каждый объект здесь проверен Алисой. Честные цены, порядочные арендодатели, можно сразу заезжать.",
    filterRent: "Аренда",
    listMore: "Смотреть все объекты",
    bedLabel: "Спальни", bathLabel: "Ванные", areaLabel: "м²",
    badgeRent: "Аренда",
    footerDesc: "Более 500 семей заселены в Дананге с 2019 года. Напишите Алисе, обычно она отвечает в течение часа.",
    modalTitle: "Связаться", modalSub: "Выберите самый удобный способ. Алиса обычно отвечает в течение часа.", modalClose: "Может, позже",
    footNav: "Навигация", footContact: "Связаться с Алисой",
    copy: "© 2026 Alice Rentals. Все права защищены.",
    navCommercial: "Коммерция",
    commHeroH1: "Найдите подходящее помещение <em>для вашего бизнеса.</em>",
    commHeroSub: "Офисы, торговые площади и помещения под кафе и рестораны по всему Данангу. Алиса знает, в каких зданиях надёжные арендодатели, честные ставки и тот поток посетителей, который вам действительно нужен.",
    commBtnBrowse: "Смотреть помещения",
    commListTag: "СВОБОДНЫЕ ПОМЕЩЕНИЯ",
    commListTitle: "Коммерческая недвижимость",
    commListSub: "Обновляется каждую неделю. Нажмите на объявление, чтобы увидеть фото, планировки и подробности.",
    commH2Sub: "Не новичок. Алиса помогла более чем 500 семьям и компаниям и лично знает каждое здание, арендодателя и район.",
    commAboutP1: "Переезд бизнеса и так даётся нелегко, а тут ещё недели просмотров. Алиса подбирает помещения для арендаторов в Дананге с 2019 года. Она знает, в каких зданиях надёжные арендодатели, на каких улицах нужный поток покупателей и где лучшие предложения в этом квартале.",
    commAboutP2: "Она говорит по-английски и по-вьетнамски, так что ничего не теряется при переводе. Назовите ей бюджет и обязательные требования, и она пришлёт короткий список мест, которые действительно подходят.",
    commCrossEyebrow: "Ищете жильё?",
    commCrossTitle: "Жильё в аренду",
    commCrossDesc: "Квартиры, виллы и дома по всему Данангу для экспатов, удалённых работников и семей.",
    commCrossCta: "Смотреть жильё →",
    commFooterDesc: "Более 500 семей и компаний нашли жильё и помещения в Дананге с 2019 года. Напишите Алисе, обычно она отвечает в течение часа.",
    navBuy: "Купить",
    buyHeroTag: "Покупка в Дананге",
    buyHeroH1: "Ваш дом в Дананге, <em>найдём по запросу.</em>",
    buyHeroSub: "Квартиры, дома и виллы на продажу по всему городу. Объявления о продаже скоро появятся на сайте. А пока расскажите Алисе, что вы хотите купить, и она лично займётся поиском.",
    buyHeroBtn: "Начать поиск",
    buyListTag: "Продажа",
    buyListTitle: "Объявления о продаже скоро появятся",
    buyListSub: "А пока Алиса подбирает квартиры, дома и виллы по запросу. Выберите вариант ниже, и WhatsApp откроется с готовым сообщением.",
    buyOptAptTitle: "Купить квартиру",
    buyOptHouseTitle: "Купить дом",
    buyAlt: "Удобнее позвонить?",
    buyStepsTag: "Как это работает",
    buyStepsTitle: "Покупка с Алисой, шаг за шагом",
    buyStep1Title: "Отправьте запрос",
    buyStep1Text: "Квартира или дом, район, бюджет и сроки. Достаточно нескольких строк в WhatsApp.",
    buyStep2Title: "Получите короткий список",
    buyStep2Text: "Алиса подберёт подходящие варианты и пришлёт фото, цены и своё честное мнение о каждом.",
    buyStep3Title: "Посмотрите и решите",
    buyStep3Text: "Смотрите объекты лично или по видеосвязи, без спешки. Решение за вами, когда будете готовы.",
    buyFaqTag: "Перед покупкой",
    buyFaqTitle: "Вопросы, которые покупатели задают Алисе",
    buyCrossEyebrow: "Пока не готовы покупать?",
    buyCrossTitle: "Сначала снимите и узнайте город",
    buyCrossDesc: "Несколько месяцев аренды помогут найти район, в котором хочется купить. У Алисы есть квартиры, дома и виллы в аренду по всему Данангу.",
    buyCrossCta: "Смотреть аренду →"
  },
};

// Button labels for the language switcher, read by screen readers
const LANG_NAMES = { en: 'English', vi: 'Tiếng Việt', ru: 'Русский' };
const LANG_SWITCH = { en: 'English', vi: 'Vietnamese', ru: 'Russian' };

// "rental" or "rentals". Russian has three plural forms, and after "из"
// ("of") the noun takes the genitive, so it needs its own rule.
function countWord(s, num, afterOf) {
  if (!s.countFew) return num === 1 ? s.countOne : s.countMany;
  var m10 = num % 10, m100 = num % 100;
  var endsInOne = m10 === 1 && m100 !== 11;
  if (afterOf) return endsInOne ? s.countFew : s.countMany;
  if (endsInOne) return s.countOne;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return s.countFew;
  return s.countMany;
}


// ── Listing photos at the size they are shown ──
// Same rule as cld() in tools/build_listings.py: add a Cloudinary transformation
// unless the URL already carries one.
var CLD_CARD = 'c_fill,g_auto,w_640,h_427,f_auto,q_auto';
var CLD_FULL = 'c_limit,w_1400,f_auto,q_auto';
function cldUrl(url, transform) {
  var m = /^(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)(.+)$/.exec(url || '');
  if (!m) return url;
  var first = m[2].split('/')[0];
  if (/^[a-z]{1,4}_[^,\/]+(,[a-z]{1,4}_[^,\/]+)*$/.test(first) && !/^v\d+$/.test(first)) return url;
  return m[1] + transform + '/' + m[2];
}

// ── Modal + Mobile drawer ──
  // The contact popup is a dialog: focus moves in, Escape closes it, focus goes back.
  var modalOpener = null;
  (function() {
    var box = document.querySelector('#contactModal .modal');
    if (!box) return;
    var title = box.querySelector('h3');
    if (title && !title.id) title.id = 'contactModalTitle';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    if (title) box.setAttribute('aria-labelledby', title.id);
  })();
  function openModal() {
    var modal = document.getElementById('contactModal');
    modalOpener = document.activeElement;
    modal.classList.add('open');
    var first = modal.querySelector('.modal-btn, button, a[href]');
    if (first) setTimeout(function() { first.focus(); }, 30);
  }
  function closeModal() {
    var modal = document.getElementById('contactModal');
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    if (modalOpener && modalOpener.focus) modalOpener.focus();
    modalOpener = null;
  }
  document.addEventListener('keydown', function(e) {
    var modal = document.getElementById('contactModal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;
    var items = Array.prototype.filter.call(modal.querySelectorAll('a[href], button'), function(el) { return el.offsetParent !== null; });
    if (!items.length) return;
    if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); items[items.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === items[items.length - 1]) { e.preventDefault(); items[0].focus(); }
  });

  // ── MOBILE DRAWER ──
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileToggle = document.querySelector('.mobile-toggle');

  function openDrawer() {
    drawerBackdrop.classList.add('open');
    document.body.classList.add('drawer-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    // Focus first link
    const firstLink = drawerBackdrop.querySelector('.drawer-links a');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    drawerBackdrop.classList.remove('open');
    document.body.classList.remove('drawer-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.focus();
  }

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawerBackdrop.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Trap focus inside drawer when open
  drawerBackdrop.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    const focusable = drawerBackdrop.querySelectorAll('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

// ── Listings: Google Sheet CSV, render, filter ──
  // ── LISTINGS: Google Sheet CSV ──
  var SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1yzmziGKMNNwomQldOxEJH7FfpUi1IwD4zRVdRE47hNQ/gviz/tq?tqx=out:csv';
  var CACHE_KEY = 'alice_listings_cache_v3';
  var CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  var LOCATION_NAMES = {
    'my-khe': 'Mỹ Khê', 'son-tra': 'Sơn Trà', 'hai-chau': 'Hải Châu',
    'my-an': 'Mỹ An', 'ngu-hanh-son': 'Ngũ Hành Sơn', 'cam-le': 'Cẩm Lệ'
  };

  var listingsData = [];
  var currentLang = 'en';

  function parseCSV(text) {
    var rows = [];
    var current = '';
    var inQuotes = false;
    var row = [];
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      var next = text[i + 1];
      if (inQuotes) {
        if (ch === '"' && next === '"') { current += '"'; i++; }
        else if (ch === '"') { inQuotes = false; }
        else { current += ch; }
      } else {
        if (ch === '"') { inQuotes = true; }
        else if (ch === ',') { row.push(current.trim()); current = ''; }
        else if (ch === '\n' || (ch === '\r' && next === '\n')) {
          row.push(current.trim());
          if (row.length > 1) rows.push(row);
          row = []; current = '';
          if (ch === '\r') i++;
        } else { current += ch; }
      }
    }
    if (current || row.length) {
      row.push(current.trim());
      if (row.length > 1) rows.push(row);
    }
    return rows;
  }

  // Reference codes are 4 digits and never repeat. A listing keeps the number its
  // title hashes to; if that number is already taken, we step forward until a free
  // one turns up, so no two listings can ever end up with the same code.
  var usedCodes = {};

  function resetCodes() {
    usedCodes = {};
  }

  function generateCode(title) {
    var hash = 0;
    for (var i = 0; i < title.length; i++) {
      hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0;
    }
    var num = Math.abs(hash) % 1000;
    for (var tries = 0; usedCodes[num] && tries < 10000; tries++) {
      num = (num + 1) % 10000;
    }
    usedCodes[num] = true;
    return '#' + ('000' + num).slice(-4);
  }

  function normalizeCategory(raw) {
    var val = (raw || '').toString().trim().toLowerCase();
    if (val === 'house-villa' || val === 'house' || val === 'villa') return 'house-villa';
    return 'apartment'; // default fallback
  }

  function mapRow(r) {
    var title = r[0] || '';
    return {
      title: title,
      location: r[1] || '',
      price: parseInt(r[2]) || 0,
      bedrooms: parseInt(r[3]) || 0,
      bathrooms: parseInt(r[4]) || 0,
      sqm: parseInt(r[5]) || 0,
      description: r[6] || '',
      imageMain: r[7] || '',
      imageGallery: r[8] ? r[8].split(',').map(function(u) { return u.trim(); }).filter(Boolean) : [],
      status: (r[9] || '').toLowerCase().trim(),
      featured: (r[10] || '').toLowerCase().trim() === 'yes',
      dateAdded: r[11] || '',
      category: normalizeCategory(r[12]),
      code: generateCode(title)
    };
  }

  // Address of a listing's static page, written by tools/build_listings.py.
  // page_slug() there builds the same path; change the two together.
  function slugPart(value) {
    return (value || '').toString().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function listingPagePath(l) {
    var digits = (l.code || '').replace(/[^0-9]/g, '');
    var area = slugPart(l.location) || 'da-nang';
    if ((l.code || '').charAt(0) === 'C') {
      var bt = slugPart(l.businessType);
      return '/rentals/' + (bt && bt !== 'general' ? bt : 'commercial') + '-space-' + area + '-c' + digits;
    }
    var type = l.category === 'house-villa' ? (/villa/i.test(l.title) ? 'villa' : 'house') : 'apartment';
    var head = l.bedrooms > 0 ? l.bedrooms + '-bedroom-' + type : (type === 'apartment' ? 'studio' : type);
    return '/rentals/' + head + '-' + area + '-' + digits;
  }

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s]+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  function buildListingCard(l) {
    var photoCount = 1 + l.imageGallery.length;
    var locName = LOCATION_NAMES[l.location] || l.location;
    var slug = slugify(l.title);
    var bedSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7v11"/><path d="M21 7v11"/><path d="M3 13h18"/><path d="M3 7h18v3a3 3 0 01-3 3H6a3 3 0 01-3-3V7z"/></svg>';
    var bathSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5z"/><path d="M6 12V7a4 4 0 018 0v5"/></svg>';
    var areaSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/></svg>';
    var camSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';

    return '<article class="listing-card" tabindex="0" id="listing-' + slug + '" data-slug="' + slug + '" data-location="' + l.location + '" data-price="' + l.price + '" data-bedrooms="' + l.bedrooms + '" data-category="' + l.category + '" data-code="' + l.code + '">' +
      '<div class="listing-card-image">' +
        '<img src="' + cldUrl(l.imageMain, CLD_CARD) + '" alt="' + l.title.replace(/"/g, '&quot;') + '" loading="lazy" width="600" height="400">' +
        '<span class="listing-badge-photos">' + camSvg + ' ' + photoCount + ' photo' + (photoCount !== 1 ? 's' : '') + '</span>' +
      '</div>' +
      '<div class="listing-card-body">' +
        '<p class="listing-card-location">' + locName + ' <span class="listing-card-ref">' + l.code + '</span></p>' +
        '<p class="listing-card-price">$' + l.price.toLocaleString() + '/mo</p>' +
        '<h3 class="listing-card-title">' + l.title + '</h3>' +
        '<div class="listing-card-meta">' +
          '<span>' + bedSvg + ' ' + l.bedrooms + ' bed</span>' +
          '<span>' + bathSvg + ' ' + l.bathrooms + ' bath</span>' +
          '<span>' + areaSvg + ' ' + l.sqm + ' sqm</span>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  var INITIAL_COUNT = 9;
  var BATCH_SIZE = 6;

  // ── Listings state (source of truth) ──
  var allListings = [];        // current filtered subset being shown (sorted newest-first)
  var shownCount = 0;          // how many cards are currently rendered into the grid
  var activeCategory = 'all';  // 'all' | 'apartment' | 'house-villa'
  var currentSearch = { location: '', budget: '', bedrooms: '', code: '' };

  function priceInBudget(price, budget) {
    if (!budget) return true;
    if (budget === '500-1000') return price >= 500 && price <= 1000;
    if (budget === '1000-1500') return price >= 1000 && price <= 1500;
    if (budget === '1500-2000') return price >= 1500 && price <= 2000;
    if (budget === '2000-3000') return price >= 2000 && price <= 3000;
    if (budget === '3000-5000') return price >= 3000 && price <= 5000;
    if (budget === '5000+') return price >= 5000;
    return true;
  }

  function matchesSearch(l) {
    var s = currentSearch;
    if (s.location && l.location !== s.location) return false;
    if (s.budget && !priceInBudget(l.price, s.budget)) return false;
    if (s.bedrooms && String(l.bedrooms) !== String(s.bedrooms)) return false;
    if (s.code) {
      var codeNorm = s.code.replace(/[^0-9]/g, '');
      var cardCodeNorm = (l.code || '').replace(/[^0-9]/g, '');
      if (codeNorm && cardCodeNorm.indexOf(codeNorm) === -1) return false;
    }
    return true;
  }

  // Single source of truth for category changes: updates pills + the Type select in the search bar
  function setActiveCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(function(p) {
      var on = p.dataset.category === cat;
      p.classList.toggle('active', on);
      p.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var typeSel = document.getElementById('ptype');
    if (typeSel) typeSel.value = (cat === 'all' ? '' : cat);
  }

  function hasActiveSearch() {
    return !!(currentSearch.location || currentSearch.budget || currentSearch.bedrooms || currentSearch.code);
  }

  function searchFormHasValues() {
    var ids = ['ptype', 'location', 'budget', 'bedrooms', 'code'];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.value) return true;
    }
    return false;
  }

  function optionText(selectId, value) {
    var select = document.getElementById(selectId);
    if (!select) return value;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === value) return select.options[i].text;
    }
    return value;
  }

  // Chips above the grid showing the APPLIED search, each removable; reset button in the form
  function updateSearchUI() {
    var s = T[currentLang] || T.en;
    var chipsEl = document.getElementById('activeFilters');
    if (chipsEl) {
      if (!hasActiveSearch()) {
        chipsEl.hidden = true;
        chipsEl.innerHTML = '';
      } else {
        var chips = [];
        if (currentSearch.location) chips.push({ key: 'location', label: optionText('location', currentSearch.location) });
        if (currentSearch.budget) chips.push({ key: 'budget', label: optionText('budget', currentSearch.budget) });
        if (currentSearch.bedrooms) chips.push({ key: 'bedrooms', label: optionText('bedrooms', currentSearch.bedrooms) });
        if (currentSearch.code) chips.push({ key: 'code', label: '#' + currentSearch.code.replace(/^#/, '') });
        chipsEl.innerHTML =
          '<span class="active-filters-label">' + s.filterLabel + '</span>' +
          chips.map(function(c) {
            return '<button type="button" class="filter-chip" data-filter-key="' + c.key + '" aria-label="Remove filter: ' + c.label.replace(/"/g, '&quot;') + '">' +
              c.label + ' <span class="chip-x" aria-hidden="true">&times;</span></button>';
          }).join('') +
          '<button type="button" class="filter-clear-all" onclick="clearSearch()">' + s.filterClearAll + '</button>';
        chipsEl.hidden = false;
      }
    }
    var resetBtn = document.getElementById('searchReset');
    if (resetBtn) {
      resetBtn.classList.toggle('is-visible', hasActiveSearch() || searchFormHasValues());
    }
  }

  // "5 of 14 rentals" feedback line under the category pills
  function updateResultsCount() {
    var el = document.getElementById('resultsCount');
    if (!el) return;
    if (!listingsData.length) { el.hidden = true; return; }
    var s = T[currentLang] || T.en;
    var n = allListings.length;
    var total = listingsData.length;
    var word = countWord(s, n < total ? total : n, n < total);
    el.textContent = (n < total) ? (n + ' ' + s.countOf + ' ' + total + ' ' + word) : (n + ' ' + word);
    el.hidden = false;
  }

  function clearSearchField(key) {
    var el = document.getElementById(key);
    if (el) el.value = '';
    currentSearch[key] = '';
    applyFilters();
  }

  function clearSearch() {
    ['location', 'budget', 'bedrooms', 'code'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.value = '';
    });
    currentSearch = { location: '', budget: '', bedrooms: '', code: '' };
    applyFilters();
  }

  function appendCard(l) {
    var grid = document.getElementById('listingsGrid');
    grid.insertAdjacentHTML('beforeend', buildListingCard(l));
    var card = grid.lastElementChild;
    card.addEventListener('click', function() { openLightbox(l); });
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(l); }
    });
  }

  function updateSeeMoreButton() {
    var wrapper = document.querySelector('.listings-section .listings-see-more-wrapper');
    var btn = document.querySelector('.listings-section .listings-see-more');
    if (!wrapper || !btn) return;
    var remaining = allListings.length - shownCount;
    if (remaining <= 0) {
      wrapper.style.display = 'none';
      return;
    }
    wrapper.style.display = '';
    var n = Math.min(remaining, BATCH_SIZE);
    var label = btn.querySelector('.see-more-text');
    if (label) label.textContent = 'See ' + n + ' More Rental' + (n === 1 ? '' : 's');
  }

  function showNoResults(show) {
    var grid = document.getElementById('listingsGrid');
    if (!grid) return;
    var existing = document.querySelector('.listings-no-results');
    if (show) {
      if (!existing) {
        var msg = document.createElement('div');
        msg.className = 'listings-no-results';
        grid.after(msg);
        existing = msg;
      }
      var s = T[currentLang] || T.en;
      existing.innerHTML = '<p>' + s.noResultsText + '</p>' +
        (hasActiveSearch()
          ? '<button type="button" class="btn-primary" style="margin-top:16px" onclick="clearSearch()">' + s.noResultsClear + '</button>'
          : '');
      existing.style.display = '';
    } else if (existing) {
      existing.style.display = 'none';
    }
  }

  function renderListings(reset) {
    if (reset === undefined) reset = true;
    var grid = document.getElementById('listingsGrid');
    if (!grid) return;

    if (reset) {
      shownCount = 0;
      grid.innerHTML = '';
    }

    // Nothing active on the whole site
    if (listingsData.length === 0) {
      grid.innerHTML = '<div class="listings-empty">' +
        '<p>No rentals available right now. New listings are added weekly.</p>' +
        '<a href="https://wa.me/84787664959?text=Hi%20Alice%2C%20I%27m%20looking%20for%20a%20rental%20in%20%C4%90%C3%A0%20N%E1%BA%B5ng" class="btn-primary">Message Alice on WhatsApp</a>' +
        '</div>';
      showNoResults(false);
      updateSeeMoreButton();
      return;
    }

    // No matches for the current category/search combination
    if (allListings.length === 0) {
      showNoResults(true);
      updateSeeMoreButton();
      return;
    }
    showNoResults(false);

    var take = reset ? INITIAL_COUNT : BATCH_SIZE;
    var startIndex = shownCount;
    var next = allListings.slice(shownCount, shownCount + take);
    next.forEach(function(l) { appendCard(l); });
    shownCount += next.length;

    // Stagger-in animation for appended batches only (initial paint stays instant)
    if (!reset) {
      var cards = grid.querySelectorAll('.listing-card');
      // Move focus to the first revealed card so keyboard/AT users follow the new content
      if (cards[startIndex]) cards[startIndex].focus({ preventScroll: true });
      next.forEach(function(_, i) {
        var card = cards[startIndex + i];
        if (!card) return;
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(function() {
          requestAnimationFrame(function() {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, i * 80);
      });
    }

    updateSeeMoreButton();
  }

  function applyFilters() {
    var filtered = listingsData;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(function(l) { return l.category === activeCategory; });
    }
    filtered = filtered.filter(matchesSearch);
    allListings = filtered;
    renderListings(true);
    updateSearchUI();
    updateResultsCount();
  }

  function checkUrlHashAndOpenListing() {
    var hash = window.location.hash;
    if (!hash || hash.indexOf('#listing-') !== 0) return;
    var slug = hash.replace('#listing-', '');
    var match = null;
    for (var i = 0; i < listingsData.length; i++) {
      if (slugify(listingsData[i].title) === slug) { match = listingsData[i]; break; }
    }
    if (match) setTimeout(function() { openLightbox(match); }, 300);
  }

  function loadListings() {
    // Check sessionStorage cache
    try {
      var cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        var parsed = JSON.parse(cached);
        if (Date.now() - parsed.ts < CACHE_TTL) {
          listingsData = parsed.data;
          applyFilters();
          checkUrlHashAndOpenListing();
          return;
        }
      }
    } catch (e) {}

    fetch(SHEET_CSV_URL)
      .then(function(r) { return r.text(); })
      .then(function(text) {
        var rows = parseCSV(text);
        // Skip header row
        rows.shift();
        resetCodes();
        listingsData = rows.map(mapRow)
          .filter(function(l) { return l.status === 'active'; })
          .sort(function(a, b) {
            return (b.dateAdded || '').localeCompare(a.dateAdded || '');
          });
        // Cache
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: listingsData }));
        } catch (e) {}
        applyFilters();
        checkUrlHashAndOpenListing();
      })
      .catch(function() {
        document.getElementById('listingsGrid').innerHTML =
          '<div class="listings-error">' +
          '<p>Unable to load listings. Please try again later.</p>' +
          '<button class="btn-primary" onclick="loadListings()">Retry</button>' +
          '</div>';
      });
  }

  // Search filtering — stacks with the active category pill, paginates the result
  function filterListings(location, budget, bedrooms, code) {
    currentSearch = {
      location: location || '',
      budget: budget || '',
      bedrooms: bedrooms || '',
      code: code || ''
    };
    applyFilters();
  }

  function setLang(lang) {
    currentLang = lang;
    const s = T[lang] || T.en;
    document.querySelectorAll('[data-t]').forEach(el => {
      if (el.hasAttribute('data-count-target')) return;
      const k = el.getAttribute('data-t');
      if (s[k]) el.textContent = s[k];
    });
    document.querySelectorAll('[data-t-html]').forEach(el => {
      const k = el.getAttribute('data-t-html');
      if (s[k]) el.innerHTML = s[k];
    });
    document.querySelectorAll('.lang-btn').forEach(b => {
      const isActive = b.textContent.trim().toLowerCase() === lang;
      b.classList.toggle('active', isActive);
      const btnLang = b.textContent.trim().toLowerCase();
      if (isActive) {
        b.setAttribute('aria-current', 'true');
        b.setAttribute('aria-label', LANG_NAMES[btnLang]);
      } else {
        b.removeAttribute('aria-current');
        b.setAttribute('aria-label', 'Switch to ' + LANG_SWITCH[btnLang]);
      }
    });
    document.documentElement.lang = lang;
    if (listingsData.length) {
      applyFilters();
    }
  }
  setLang('en');
  if (document.getElementById('listingsGrid')) loadListings();

  // See More: reveal the next batch (preserves the current category + search filter)
  var residentialGrid = document.getElementById('listingsGrid');
  var residentialSeeMore = residentialGrid ? residentialGrid.closest('.listings-section').querySelector('.listings-see-more') : null;
  if (residentialSeeMore) {
    residentialSeeMore.addEventListener('click', function() {
      renderListings(false);
    });
  }

  // Category filter pills
  document.querySelectorAll('.cat-pill').forEach(function(pill) {
    pill.addEventListener('click', function() {
      setActiveCategory(pill.dataset.category);
      applyFilters();

      var listingsSection = document.getElementById('listings');
      if (listingsSection) {
        listingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Nav category links → reuse the matching pill's click logic (filter + reset + scroll)
  document.querySelectorAll('[data-nav-category]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var cat = link.dataset.navCategory;
      var pill = document.querySelector('.cat-pill[data-category="' + cat + '"]');
      if (pill) {
        pill.click(); // runs existing filter + pagination reset + smooth scroll
      } else {
        var listingsSection = document.getElementById('listings');
        if (listingsSection) listingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close the mobile drawer if it's open
      var drawer = document.getElementById('drawerBackdrop');
      if (drawer && drawer.classList.contains('open')) closeDrawer();
    });
  });

  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 120);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── STATS COUNT-UP ANIMATION ──
  function animateCountUp(element, target, suffix, duration, decimals) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    decimals = decimals || 0;
    function show(v) { element.textContent = v.toFixed(decimals) + suffix; }
    show(0);
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var factor = Math.pow(10, decimals);
      show(Math.floor(eased * target * factor) / factor);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        show(target);
      }
    }
    requestAnimationFrame(step);
  }

  (function initStatsAnimation() {
    var statNumbers = document.querySelectorAll('[data-count-target]');
    if (!statNumbers.length) return;
    // The page holds the real numbers for crawlers and reduced motion; everyone else
    // sees them start at zero and count up when the stats come into view.
    var counts = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function parts(el) {
      return { target: parseFloat(el.dataset.countTarget), suffix: el.dataset.countSuffix || '', decimals: parseInt(el.dataset.countDecimals || '0', 10) };
    }
    if (counts) statNumbers.forEach(function(el) { var p = parts(el); el.textContent = (0).toFixed(p.decimals) + p.suffix; });
    var hasAnimated = false;
    var statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          // On load the stats fade in after about a second; start counting once they are visible
          var wait = Math.max(0, 1100 - performance.now());
          statNumbers.forEach(function(el, index) {
            var p = parts(el);
            if (isNaN(p.target)) return;
            setTimeout(function() {
              animateCountUp(el, p.target, p.suffix, 1800, p.decimals);
            }, wait + index * 200);
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0 });   // start as soon as any part of the stats shows, so nobody sees a zero waiting
    var container = statNumbers[0].closest('.hero-stats') || statNumbers[0].parentElement.parentElement;
    statsObserver.observe(container);
  })();

  // About section scroll-triggered animation
  var aboutSection = document.querySelector('.about');
  if (aboutSection) {
    var aboutObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    aboutObserver.observe(aboutSection);
  }

  // Search form: filter listings and scroll down
  var searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var type = document.getElementById('ptype');
      setActiveCategory((type && type.value) || 'all');
      var loc = document.getElementById('location').value;
      var budget = document.getElementById('budget').value;
      var beds = document.getElementById('bedrooms').value;
      var code = document.getElementById('code').value;
      filterListings(loc, budget, beds, code);
      document.getElementById('listings').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Selects apply instantly on change; the code field applies on Search/Enter
    ['ptype', 'location', 'budget', 'bedrooms'].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('change', function() {
        if (id === 'ptype') {
          setActiveCategory(el.value || 'all');
        } else {
          currentSearch[id] = el.value;
        }
        applyFilters();
      });
    });
    var codeField = document.getElementById('code');
    if (codeField) codeField.addEventListener('input', updateSearchUI);

    // Arriving from a rentals page search: /?type=…&location=…&budget=…&bedrooms=…&code=…
    (function() {
      var params = new URLSearchParams(window.location.search);
      var fields = { type: 'ptype', location: 'location', budget: 'budget', bedrooms: 'bedrooms', code: 'code' };
      var given = Object.keys(fields).filter(function(k) { return params.get(k); });
      if (!given.length) return;
      given.forEach(function(k) { var el = document.getElementById(fields[k]); if (el) el.value = params.get(k); });
      var tries = 0;
      (function run() {
        if (listingsData.length) searchForm.dispatchEvent(new Event('submit', { cancelable: true }));
        else if (tries++ < 50) setTimeout(run, 200);
      })();
    })();

    // Reset clears the whole form, including Type → All
    var searchResetBtn = document.getElementById('searchReset');
    if (searchResetBtn) {
      searchResetBtn.addEventListener('click', function() {
        setActiveCategory('all');
        clearSearch();
      });
    }
  }

  // Removable filter chips above the grid (event delegation)
  var activeFiltersEl = document.getElementById('activeFilters');
  if (activeFiltersEl) {
    activeFiltersEl.addEventListener('click', function(e) {
      var chip = e.target.closest('.filter-chip');
      if (chip) clearSearchField(chip.dataset.filterKey);
    });
  }

  // Neighborhood cards: filter listings and scroll down
  document.querySelectorAll('.neighborhood-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      // The href goes to the area's own page for crawlers and new tabs; a
      // normal click filters the grid on this page instead.
      var location = card.dataset.location ||
        new URL(card.getAttribute('href'), window.location.origin).searchParams.get('location');
      filterListings(location, '', '', '');
      document.getElementById('listings').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

// ── Lightbox ──
  // Scroll lock for iOS
  function lockScroll() {
    var scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.width = '100%';
    document.body.dataset.scrollY = scrollY;
  }
  function unlockScroll() {
    var scrollY = document.body.dataset.scrollY || 0;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY));
  }

  // Gallery dots
  function updateDots(gallery) {
    var dots = document.querySelectorAll('.lightbox-dot');
    if (!dots.length) return;
    var scrollLeft = gallery.scrollLeft;
    var img = gallery.querySelector('img');
    var itemWidth = img ? img.offsetWidth : 1;
    var gap = 8;
    var activeIndex = Math.round(scrollLeft / (itemWidth + gap));
    dots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === activeIndex);
    });
    var counter = document.getElementById('lightbox-counter');
    if (counter && dots.length > 1) {
      var idx = Math.max(0, Math.min(activeIndex, dots.length - 1));
      counter.textContent = (idx + 1) + '/' + dots.length;
    }
  }

  document.getElementById('lightbox-gallery').addEventListener('scroll', function(e) {
    updateDots(e.target);
  }, { passive: true });

  function openLightbox(listing) {
    var lightbox = document.getElementById('lightbox');
    var gallery = document.getElementById('lightbox-gallery');
    var info = document.getElementById('lightbox-info');
    var dotsEl = document.getElementById('lightbox-dots');
    var locNames = {
      'my-khe': 'Mỹ Khê', 'son-tra': 'Sơn Trà', 'hai-chau': 'Hải Châu',
      'my-an': 'Mỹ An', 'ngu-hanh-son': 'Ngũ Hành Sơn', 'cam-le': 'Cẩm Lệ'
    };

    var allImages = [listing.imageMain].concat(listing.imageGallery);
    gallery.innerHTML = allImages.map(function(url) {
      return '<img src="' + cldUrl(url, CLD_FULL) + '" alt="' + listing.title.replace(/"/g, '&quot;') + '" loading="lazy">';
    }).join('');
    gallery.scrollLeft = 0;

    // Dots
    dotsEl.innerHTML = allImages.map(function(_, i) {
      return '<span class="lightbox-dot' + (i === 0 ? ' active' : '') + '"></span>';
    }).join('');

    // Photo counter ("1/9"); hidden for single-photo listings via :empty
    var counterEl = document.getElementById('lightbox-counter');
    if (counterEl) counterEl.textContent = allImages.length > 1 ? '1/' + allImages.length : '';

    var waSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.591-.813-6.344-2.18l-.443-.347-3.09 1.036 1.036-3.09-.347-.443A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>';

    var isCommercial = listing.code && listing.code.charAt(0) === 'C';
    var metaHtml = isCommercial
      ? '<span>' + listing.floor + '</span>' +
        '<span>' + listing.sqm + ' sqm</span>'
      : '<span>' + listing.bedrooms + ' bedroom' + (listing.bedrooms > 1 ? 's' : '') + '</span>' +
        '<span>' + listing.bathrooms + ' bathroom' + (listing.bathrooms > 1 ? 's' : '') + '</span>' +
        '<span>' + listing.sqm + ' sqm</span>';

    info.innerHTML =
      (isCommercial && listing.businessType ? '<p class="listing-card-type">' + listing.businessType + '</p>' : '') +
      '<p class="listing-card-location">' + (locNames[listing.location] || listing.location) + ' <span class="listing-card-ref">' + listing.code + '</span></p>' +
      '<h2 class="lightbox-title">' + listing.title + '</h2>' +
      '<p class="lightbox-price">$' + listing.price.toLocaleString() + '/mo</p>' +
      '<div class="lightbox-meta">' + metaHtml + '</div>' +
      '<p class="lightbox-description">' + listing.description + '</p>' +
      '<a href="https://wa.me/84787664959?text=Hi%20Alice%2C%20I%27m%20interested%20in%3A%20' + encodeURIComponent(listing.title) + '%20%28' + encodeURIComponent(listing.code) + '%29" class="lightbox-cta" target="_blank" rel="noopener">' +
        waSvg + ' Ask Alice about this property</a>' +
      '<button class="lightbox-copy-link" onclick="copyListingLink(this)">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>' +
          '<path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>' +
        '</svg> Share property</button>';

    // Link to the listing's own page once the builder has published it. A
    // listing added to the sheet minutes ago has no page yet, so ask first.
    var pagePath = listingPagePath(listing);
    var shareBtn = info.querySelector('.lightbox-copy-link');
    info.dataset.page = pagePath;
    fetch(pagePath, { method: 'HEAD' }).then(function(r) {
      if (!r.ok || info.dataset.page !== pagePath) return;
      var link = document.createElement('a');
      link.href = pagePath;
      link.className = 'lightbox-page-link';
      link.textContent = 'Open the full listing page';
      link.style.cssText = 'display:block;margin-top:14px;text-align:center;font-size:.95rem;color:var(--color-primary-dark,#0F6E56);';
      info.appendChild(link);
      if (shareBtn) shareBtn.dataset.pageUrl = window.location.origin + pagePath;
    }).catch(function() {});

    lightbox.hidden = false;
    requestAnimationFrame(function() { lightbox.classList.add('is-open'); });
    lockScroll();
    lightbox.querySelector('.lightbox-close').focus();

    var slug = slugify(listing.title);
    window.history.replaceState(null, '', '#listing-' + slug);

    // Swipe hint
    setTimeout(function() {
      if (gallery.scrollWidth > gallery.clientWidth) {
        gallery.scrollTo({ left: 60, behavior: 'smooth' });
        setTimeout(function() {
          gallery.scrollTo({ left: 0, behavior: 'smooth' });
        }, 400);
      }
    }, 500);
  }

  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('is-open');
    unlockScroll();
    setTimeout(function() { lightbox.hidden = true; }, 300);
    window.history.replaceState(null, '', window.location.pathname);
  }

  function copyListingLink(button) {
    var url = button.dataset.pageUrl || window.location.href;
    var restoreHtml = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg> Share property';
    var copiedHtml = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Copied!';

    function showCopied() {
      button.innerHTML = copiedHtml;
      button.style.borderColor = 'var(--color-primary, #1D9E75)';
      button.style.color = 'var(--color-primary, #1D9E75)';
      setTimeout(function() {
        button.innerHTML = restoreHtml;
        button.style.borderColor = '';
        button.style.color = '';
      }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showCopied).catch(function() {
        fallbackCopy(url);
        showCopied();
      });
    } else {
      fallbackCopy(url);
      showCopied();
    }
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(textarea);
  }

  window.addEventListener('hashchange', function() {
    var lightbox = document.getElementById('lightbox');
    if (!window.location.hash || window.location.hash.indexOf('#listing-') !== 0) {
      if (lightbox && !lightbox.hidden) closeLightbox();
    }
  });

  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });

  // Trap focus inside the lightbox dialog while it is open
  document.getElementById('lightbox').addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    var lb = document.getElementById('lightbox');
    var focusable = Array.prototype.filter.call(
      lb.querySelectorAll('button, a[href]'),
      function(el) { return el.offsetParent !== null; }
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  function scrollLightbox(direction) {
    var gallery = document.getElementById('lightbox-gallery');
    var img = gallery.querySelector('img');
    if (!img) return;
    var itemWidth = img.offsetWidth + 8;
    gallery.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
  }

  document.getElementById('lightbox-prev').addEventListener('click', function() { scrollLightbox(-1); });
  document.getElementById('lightbox-next').addEventListener('click', function() { scrollLightbox(1); });

  document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') scrollLightbox(-1);
    if (e.key === 'ArrowRight') scrollLightbox(1);
  });
