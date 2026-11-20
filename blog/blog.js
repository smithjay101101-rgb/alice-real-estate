// ── Blog chrome: language switch, drawer, modal, table of contents ──
// Article text is server rendered and never touched by this file. Only the
// navigation, footer and modal are translated, so crawlers that ignore
// JavaScript still see the full post.

var BLOG_T = {
  en: {
    navApartments: "Apartments", navHousesVillas: "Houses & Villas", navCommercial: "Commercial",
    navBlog: "Blog", navAboutAlice: "About Alice", navContact: "Contact",
    navListings: "Rentals", navTestimonials: "Stories", navCta: "Message Alice",
    navBuy: "Buy Property",
    footNav: "Navigate", footContact: "Reach Alice",
    footerDesc: "Licensed real estate agent. 1,000+ families housed in Đà Nẵng since 2019. Send Alice a message. She usually replies within an hour.",
    modalTitle: "Get in touch",
    modalSub: "Pick whichever is easiest for you. Alice usually replies within an hour.",
    modalClose: "Maybe later",
    copy: "© 2026 Alice Rentals. All rights reserved."
  },
  vi: {
    navApartments: "Căn hộ", navHousesVillas: "Nhà & Biệt thự", navCommercial: "Mặt bằng",
    navBlog: "Blog", navAboutAlice: "Về Alice", navContact: "Liên hệ",
    navListings: "Nhà cho thuê", navTestimonials: "Câu chuyện", navCta: "Nhắn tin cho Alice",
    navBuy: "Mua nhà",
    footNav: "Điều hướng", footContact: "Liên hệ Alice",
    footerDesc: "Môi giới bất động sản có giấy phép. Hơn 1.000 gia đình đã an cư tại Đà Nẵng từ 2019. Nhắn tin cho Alice. Thường trả lời trong vòng một giờ.",
    modalTitle: "Liên hệ",
    modalSub: "Chọn cách tiện nhất cho bạn. Alice thường trả lời trong vòng một giờ.",
    modalClose: "Để sau",
    copy: "© 2026 Alice Rentals. Bảo lưu mọi quyền.",
    fallbackNote: "Bài viết này hiện chỉ có bản tiếng Anh. Menu và phần điều hướng đã chuyển sang tiếng Việt. Alice nói tiếng Việt và tiếng Anh, nhắn tin cho cô nếu bạn cần giải thích bằng tiếng Việt."
  },
  ru: {
    navApartments: "Квартиры", navHousesVillas: "Дома и виллы", navCommercial: "Коммерция",
    navBlog: "Блог", navAboutAlice: "Об Алисе", navContact: "Контакты",
    navListings: "Аренда", navTestimonials: "Отзывы", navCta: "Написать Алисе",
    navBuy: "Купить",
    footNav: "Навигация", footContact: "Связаться с Алисой",
    footerDesc: "Лицензированный агент по недвижимости. Более 1000 семей заселены в Дананге с 2019 года. Напишите Алисе, обычно она отвечает в течение часа.",
    modalTitle: "Связаться",
    modalSub: "Выберите самый удобный способ. Алиса обычно отвечает в течение часа.",
    modalClose: "Может, позже",
    copy: "© 2026 Alice Rentals. Все права защищены.",
    fallbackNote: "Эта статья пока доступна только на английском. Меню и навигация переведены на русский. Алиса говорит по-английски и по-вьетнамски, напишите ей, если что-то нужно пояснить."
  }
};

// Button labels for the language switcher, read by screen readers
var LANG_NAMES = { en: 'English', vi: 'Tiếng Việt', ru: 'Русский' };
var LANG_SWITCH = { en: 'English', vi: 'Vietnamese', ru: 'Russian' };

// Language switch. Posts are written in English, so switching to Vietnamese
// or Russian translates the interface and shows a note rather than emptying
// the page.
function setLang(lang) {
  var strings = BLOG_T[lang] || BLOG_T.en;

  document.querySelectorAll('[data-t]').forEach(function(el) {
    var key = el.getAttribute('data-t');
    if (strings[key]) el.textContent = strings[key];
  });

  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    var isActive = btn.textContent.trim().toLowerCase() === lang;
    btn.classList.toggle('active', isActive);
    var btnLang = btn.textContent.trim().toLowerCase();
    if (isActive) {
      btn.setAttribute('aria-current', 'true');
      btn.setAttribute('aria-label', LANG_NAMES[btnLang]);
    } else {
      btn.removeAttribute('aria-current');
      btn.setAttribute('aria-label', 'Switch to ' + LANG_SWITCH[btnLang]);
    }
  });

  // The article stays in English. Say so instead of showing an empty page.
  var fallback = document.getElementById('langFallback');
  if (fallback) {
    if (strings.fallbackNote) fallback.textContent = strings.fallbackNote;
    fallback.hidden = (lang === 'en');
  }

  // The document language attribute keeps describing the article, which is
  // English on every page for now.
  document.documentElement.lang = 'en';
}

// ── Contact modal ──
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
  if (!modal) return;
  modalOpener = document.activeElement;
  modal.classList.add('open');
  var first = modal.querySelector('.modal-btn, button, a[href]');
  if (first) setTimeout(function() { first.focus(); }, 30);
}
function closeModal() {
  var modal = document.getElementById('contactModal');
  if (!modal || !modal.classList.contains('open')) return;
  modal.classList.remove('open');
  if (modalOpener && modalOpener.focus) modalOpener.focus();
  modalOpener = null;
}

// ── Mobile drawer ──
function openDrawer() {
  var backdrop = document.getElementById('drawerBackdrop');
  var toggle = document.querySelector('.mobile-toggle');
  if (!backdrop) return;
  backdrop.classList.add('open');
  document.body.classList.add('drawer-open');
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
  var firstLink = backdrop.querySelector('.drawer-links a');
  if (firstLink) firstLink.focus();
}
function closeDrawer() {
  var backdrop = document.getElementById('drawerBackdrop');
  var toggle = document.querySelector('.mobile-toggle');
  if (!backdrop) return;
  backdrop.classList.remove('open');
  document.body.classList.remove('drawer-open');
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }
}

(function() {
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    var backdrop = document.getElementById('drawerBackdrop');
    var modal = document.getElementById('contactModal');
    if (backdrop && backdrop.classList.contains('open')) closeDrawer();
    if (modal && modal.classList.contains('open')) closeModal();
  });

  // Trap focus inside the drawer while it is open.
  var backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) {
    backdrop.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;
      var focusable = backdrop.querySelectorAll('a, button');
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
    // Drawer links are same-page navigations on some pages, so close on click.
    backdrop.querySelectorAll('.drawer-links a').forEach(function(link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ── Table of contents: one line glides to the section currently in view ──
  var toc = document.getElementById('postToc');
  var tocList = toc && toc.querySelector('ol');
  if (tocList) {
    var links = {};
    toc.querySelectorAll('a[href^="#"]').forEach(function(link) {
      links[link.getAttribute('href').slice(1)] = link;
    });
    var sections = Object.keys(links)
      .map(function(id) { return document.getElementById(id); })
      .filter(Boolean);
    var marker = document.createElement('span');
    marker.className = 'toc-marker';
    marker.setAttribute('aria-hidden', 'true');
    tocList.appendChild(marker);

    var currentId = null;
    function moveMarker(link) {
      marker.style.transform = 'translateY(' + link.offsetTop + 'px)';
      marker.style.height = link.offsetHeight + 'px';
    }
    function update() {
      ticking = false;
      // The current section is the last one whose top has passed just under the header
      var line = 120, id = null;
      sections.forEach(function(section) {
        if (section.getBoundingClientRect().top <= line) id = section.id;
      });
      if (id === currentId) return;
      if (currentId && links[currentId]) links[currentId].classList.remove('is-current');
      currentId = id;
      if (!id) { marker.classList.remove('is-on'); return; }
      var link = links[id];
      link.classList.add('is-current');
      moveMarker(link);
      marker.classList.add('is-on');
      // Keep the current item visible when the contents rail scrolls on its own
      if (toc.scrollHeight > toc.clientHeight) {
        var top = link.offsetTop + tocList.offsetTop, bottom = top + link.offsetHeight;
        if (top < toc.scrollTop || bottom > toc.scrollTop + toc.clientHeight) {
          toc.scrollTo({ top: top - toc.clientHeight / 3, behavior: 'smooth' });
        }
      }
    }
    var ticking = false;
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function() {
      if (currentId && links[currentId]) moveMarker(links[currentId]);
    });
    update();
  }

  // ── Blog index: topic filter and a wide card for the newest guide ──
  var grid = document.getElementById('postGrid');
  var filter = document.getElementById('postFilter');
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.post-card'));
    var topicOf = function(card) {
      var k = card.querySelector('.post-card-kicker');
      return k ? k.textContent.trim() : '';
    };
    var feature = function() {
      var first = true;
      cards.forEach(function(card) {
        card.classList.toggle('is-featured', !card.hidden && first);
        if (!card.hidden) first = false;
      });
    };
    feature();
    if (filter) {
      var buttons = Array.prototype.slice.call(filter.querySelectorAll('.post-filter-btn'));
      buttons.forEach(function(btn) {
        var topic = btn.getAttribute('data-topic');
        var n = topic ? cards.filter(function(c) { return topicOf(c) === topic; }).length : cards.length;
        if (topic && !n) { btn.remove(); return; }
        var count = document.createElement('span');
        count.className = 'post-filter-count';
        count.textContent = n;
        btn.appendChild(count);
        btn.addEventListener('click', function() {
          buttons.forEach(function(b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
          cards.forEach(function(card) { card.hidden = !!topic && topicOf(card) !== topic; });
          feature();
        });
      });
      filter.hidden = false;
    }
  }

  setLang('en');
})();
