// ── Blog chrome: language switch, drawer, modal, table of contents ──
// Article text is server rendered and never touched by this file. Only the
// navigation, footer and modal are translated, so crawlers that ignore
// JavaScript still see the full post.

var BLOG_T = {
  en: {
    navApartments: "Apartments", navHousesVillas: "Houses & Villas", navCommercial: "Commercial",
    navBlog: "Blog", navAboutAlice: "About Alice", navContact: "Contact",
    navListings: "Rentals", navTestimonials: "Stories", navCta: "Message Alice",
    footNav: "Navigate", footContact: "Reach Alice",
    footerDesc: "500+ families housed in Đà Nẵng since 2019. Send Alice a message. She usually replies within an hour.",
    modalTitle: "Get in touch",
    modalSub: "Pick whichever is easiest for you. Alice usually replies within an hour.",
    modalClose: "Maybe later",
    copy: "© 2026 Alice Rentals. All rights reserved."
  },
  vi: {
    navApartments: "Căn hộ", navHousesVillas: "Nhà & Biệt thự", navCommercial: "Mặt bằng",
    navBlog: "Blog", navAboutAlice: "Về Alice", navContact: "Liên hệ",
    navListings: "Nhà cho thuê", navTestimonials: "Câu chuyện", navCta: "Nhắn tin cho Alice",
    footNav: "Điều hướng", footContact: "Liên hệ Alice",
    footerDesc: "Hơn 500 gia đình đã an cư tại Đà Nẵng từ 2019. Nhắn tin cho Alice. Thường trả lời trong vòng một giờ.",
    modalTitle: "Liên hệ",
    modalSub: "Chọn cách tiện nhất cho bạn. Alice thường trả lời trong vòng một giờ.",
    modalClose: "Để sau",
    copy: "© 2026 Alice Rentals. Bảo lưu mọi quyền."
  }
};

// Language switch. Posts are written in English, so switching to Vietnamese
// translates the interface and shows a note rather than emptying the page.
function setLang(lang) {
  var strings = BLOG_T[lang] || BLOG_T.en;

  document.querySelectorAll('[data-t]').forEach(function(el) {
    var key = el.getAttribute('data-t');
    if (strings[key]) el.textContent = strings[key];
  });

  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    var isActive = btn.textContent.trim().toLowerCase() === lang;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      btn.setAttribute('aria-current', 'true');
      btn.setAttribute('aria-label', lang === 'en' ? 'English' : 'Tiếng Việt');
    } else {
      btn.removeAttribute('aria-current');
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Vietnamese' : 'Switch to English');
    }
  });

  // The article stays in English. Say so instead of showing an empty page.
  var fallback = document.getElementById('langFallback');
  if (fallback) fallback.hidden = (lang === 'en');

  // The document language attribute keeps describing the article, which is
  // English on every page for now.
  document.documentElement.lang = 'en';
}

// ── Contact modal ──
function openModal() {
  var modal = document.getElementById('contactModal');
  if (modal) modal.classList.add('open');
}
function closeModal() {
  var modal = document.getElementById('contactModal');
  if (modal) modal.classList.remove('open');
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

  // ── Table of contents: highlight the section currently in view ──
  var toc = document.getElementById('postToc');
  if (toc && 'IntersectionObserver' in window) {
    var links = {};
    toc.querySelectorAll('a[href^="#"]').forEach(function(link) {
      links[link.getAttribute('href').slice(1)] = link;
    });
    var sections = Object.keys(links)
      .map(function(id) { return document.getElementById(id); })
      .filter(Boolean);

    var visible = {};
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      var current = null;
      sections.forEach(function(section) {
        if (visible[section.id] && !current) current = section.id;
      });
      if (!current) return;
      Object.keys(links).forEach(function(id) {
        links[id].classList.toggle('is-current', id === current);
      });
    }, { rootMargin: '-96px 0px -60% 0px', threshold: 0 });

    sections.forEach(function(section) { observer.observe(section); });
  }

  setLang('en');
})();
