// ── Commercial listings ──
// Expected Commercial tab columns (in order):
// 0:title, 1:location, 2:price_usd, 3:floor, 4:sqm, 5:description,
// 6:image_main, 7:image_gallery (comma-separated), 8:status, 9:featured, 10:date_added

(function() {
  var grid = document.getElementById('commercialListingsGrid');
  if (!grid) return;

  var COMMERCIAL_GID = '1301362763';
  var COMMERCIAL_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1yzmziGKMNNwomQldOxEJH7FfpUi1IwD4zRVdRE47hNQ/gviz/tq?tqx=out:csv&gid=' + COMMERCIAL_GID;
  var CACHE_KEY = 'alice_commercial_cache_v3';
  var CACHE_TTL = 5 * 60 * 1000;
  var INITIAL_COUNT = 9;
  var BATCH_SIZE = 5;

  // ── PREVIEW MODE — flip to false before delivering to Alice ──
  var USE_MOCK_DATA = false;
  var MOCK_LISTINGS = [
    {
      title: 'Bright corner café space on Mỹ Khê',
      location: 'my-khe', price: 1850, floor: 'Ground floor', sqm: 85,
      description: 'Corner unit with two street-facing windows, 30m from the beach promenade. High foot traffic from morning runners and evening tourists. Previously a coffee shop — kitchen plumbing and ventilation already in place. Long lease available, owner is flexible on fit-out modifications.',
      imageMain: 'commercial.jpeg', imageGallery: ['commercial.jpeg'],
      status: 'active', featured: false, dateAdded: '2026-05-26',
      code: generateCommercialCode('Bright corner café space on Mỹ Khê')
    },
    {
      title: 'Modern office floor in Hải Châu CBD',
      location: 'hai-chau', price: 3200, floor: '4th floor', sqm: 140,
      description: 'Full floor in a serviced building two blocks from Bạch Đằng. Floor-to-ceiling windows on three sides, river views from the east side. Includes reception, two meeting rooms, and a small kitchenette. Fibre internet, backup generator, 24/7 security.',
      imageMain: 'commercial.jpeg', imageGallery: ['commercial.jpeg'],
      status: 'active', featured: false, dateAdded: '2026-05-20',
      code: generateCommercialCode('Modern office floor in Hải Châu CBD')
    },
    {
      title: 'Boutique retail unit on Trần Phú',
      location: 'hai-chau', price: 980, floor: 'Ground floor', sqm: 42,
      description: 'Narrow shopfront on one of Đà Nẵng’s busiest retail streets. Suits fashion, accessories, or small-footprint F&B. Tall ceiling, original tile floor, fresh repaint last month. Landlord prefers tenants with established brand or business plan.',
      imageMain: 'commercial.jpeg', imageGallery: ['commercial.jpeg'],
      status: 'active', featured: false, dateAdded: '2026-05-15',
      code: generateCommercialCode('Boutique retail unit on Trần Phú')
    }
  ];

  function updateSeeMoreButton() {
    var seeMoreWrapper = document.querySelector('.listings-section .listings-see-more-wrapper');
    var seeMoreBtn = document.getElementById('commercial-see-more');
    if (!seeMoreWrapper || !seeMoreBtn) return;
    var hiddenCount = grid.querySelectorAll('.listing-card.listing-hidden').length;
    if (hiddenCount === 0) {
      seeMoreWrapper.style.display = 'none';
      return;
    }
    seeMoreWrapper.style.display = '';
    var next = Math.min(BATCH_SIZE, hiddenCount);
    seeMoreBtn.querySelector('.see-more-text').textContent =
      'See ' + next + ' More Space' + (next !== 1 ? 's' : '');
  }

  function generateCommercialCode(title) {
    var hash = 0;
    for (var i = 0; i < title.length; i++) {
      hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0;
    }
    var num = Math.abs(hash) % 1000;
    return 'C' + ('00' + num).slice(-3);
  }

  function mapCommercialRow(r) {
    var title = r[0] || '';
    return {
      title: title,
      location: r[1] || '',
      price: parseInt(r[2]) || 0,
      floor: r[3] || '',
      sqm: parseInt(r[4]) || 0,
      description: r[5] || '',
      imageMain: r[6] || '',
      imageGallery: r[7] ? r[7].split(',').map(function(u){ return u.trim(); }).filter(Boolean) : [],
      status: (r[8] || '').toLowerCase().trim(),
      featured: (r[9] || '').toLowerCase().trim() === 'yes',
      dateAdded: r[10] || '',
      code: generateCommercialCode(title)
    };
  }

  function buildCommercialCard(l) {
    var photoCount = 1 + l.imageGallery.length;
    var locName = (typeof LOCATION_NAMES !== 'undefined' && LOCATION_NAMES[l.location]) || l.location;
    var slug = slugify(l.title);
    var floorSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>';
    var areaSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/></svg>';
    var camSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';

    return '<article class="listing-card commercial-card" tabindex="0" id="listing-' + slug + '" data-slug="' + slug + '" data-location="' + l.location + '" data-price="' + l.price + '" data-code="' + l.code + '">' +
      '<div class="listing-card-image">' +
        '<img src="' + l.imageMain + '" alt="' + l.title.replace(/"/g, '&quot;') + '" loading="lazy" width="600" height="400">' +
        '<span class="listing-badge-photos">' + camSvg + ' ' + photoCount + ' photo' + (photoCount !== 1 ? 's' : '') + '</span>' +
      '</div>' +
      '<div class="listing-card-body">' +
        '<p class="listing-card-location">' + locName + ' <span class="listing-card-ref">' + l.code + '</span></p>' +
        '<p class="listing-card-price">$' + l.price.toLocaleString() + '/mo</p>' +
        '<h3 class="listing-card-title">' + l.title + '</h3>' +
        '<div class="listing-card-meta">' +
          '<span>' + floorSvg + ' ' + (l.floor || 'Ground floor') + '</span>' +
          '<span>' + areaSvg + ' ' + l.sqm + ' sqm</span>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function showInitial() {
    var cards = grid.querySelectorAll('.listing-card');
    cards.forEach(function(card, i) {
      card.classList.remove('listing-hidden');
      card.style.display = '';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = '';
      if (i >= INITIAL_COUNT) {
        card.style.display = 'none';
        card.classList.add('listing-hidden');
      }
    });
    updateSeeMoreButton();
  }

  function checkHashAndOpen() {
    var hash = window.location.hash;
    if (!hash || hash.indexOf('#listing-') !== 0) return;
    var slug = hash.replace('#listing-', '');
    var card = grid.querySelector('[data-slug="' + slug + '"]');
    if (!card) return;
    card.style.display = '';
    card.classList.remove('listing-hidden');
    setTimeout(function() { card.click(); }, 300);
  }

  function showEmpty(message) {
    grid.innerHTML = '<div class="listings-empty"><p>' + message + '</p></div>';
    var seeMoreWrapper = document.querySelector('.listings-section .listings-see-more-wrapper');
    if (seeMoreWrapper) seeMoreWrapper.style.display = 'none';
  }

  function render(listings) {
    if (!listings.length) {
      showEmpty('No commercial spaces listed right now. Check back soon or message Alice directly.');
      return;
    }
    grid.innerHTML = listings.map(buildCommercialCard).join('');
    var cards = grid.querySelectorAll('.listing-card');
    cards.forEach(function(card, i) {
      card.addEventListener('click', function() { openLightbox(listings[i]); });
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(listings[i]); }
      });
    });
    showInitial();
    checkHashAndOpen();
  }

  async function load() {
    if (USE_MOCK_DATA) {
      render(MOCK_LISTINGS);
      return;
    }
    if (COMMERCIAL_GID === 'COMMERCIAL_GID_HERE') {
      showEmpty('Commercial listings will appear here once the Sheet is connected.');
      return;
    }

    try {
      var cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        var parsed = JSON.parse(cached);
        if (Date.now() - parsed.ts < CACHE_TTL) {
          render(parsed.data);
          return;
        }
      }
    } catch (e) {}

    try {
      var response = await fetch(COMMERCIAL_SHEET_URL);
      var text = await response.text();
      var rows = parseCSV(text);
      rows.shift();
      var listings = rows.map(mapCommercialRow)
        .filter(function(l) { return l.status === 'active'; })
        .sort(function(a, b) {
          return (b.dateAdded || '').localeCompare(a.dateAdded || '');
        });
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: listings }));
      } catch (e) {}
      render(listings);
    } catch (err) {
      console.error('Failed to load commercial listings:', err);
      grid.innerHTML = '<div class="listings-error">' +
        '<p>Unable to load commercial listings. Please try again later.</p>' +
        '<button class="btn-primary" onclick="location.reload()">Retry</button>' +
        '</div>';
    }
  }

  function filterCommercialListings(location, budget, code) {
    var cards = grid.querySelectorAll('.listing-card');
    var seeMoreWrapper = document.querySelector('.listings-section .listings-see-more-wrapper');
    var codeNorm = (code || '').replace(/[^0-9]/gi, '').toUpperCase();
    var isFiltering = location || budget || codeNorm;
    var visibleCount = 0;

    cards.forEach(function(card) {
      card.classList.remove('listing-hidden');
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = '';

      var show = true;
      if (location) {
        show = show && card.dataset.location === location;
      }
      if (budget) {
        var price = parseInt(card.dataset.price);
        if (budget === '500-1000') show = show && price >= 500 && price <= 1000;
        else if (budget === '1000-2000') show = show && price >= 1000 && price <= 2000;
        else if (budget === '2000-3000') show = show && price >= 2000 && price <= 3000;
        else if (budget === '3000-5000') show = show && price >= 3000 && price <= 5000;
        else if (budget === '5000-10000') show = show && price >= 5000 && price <= 10000;
        else if (budget === '10000+') show = show && price >= 10000;
      }
      if (codeNorm) {
        var cardCodeNorm = (card.dataset.code || '').replace(/[^0-9]/g, '');
        show = show && cardCodeNorm.indexOf(codeNorm) !== -1;
      }
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (seeMoreWrapper) {
      if (isFiltering) {
        seeMoreWrapper.style.display = 'none';
      } else {
        showInitial();
      }
    }

    var existing = document.querySelector('.listings-no-results');
    if (visibleCount === 0 && isFiltering) {
      if (!existing) {
        var msg = document.createElement('div');
        msg.className = 'listings-no-results';
        msg.innerHTML = '<p>No commercial spaces match your filters. Try adjusting your search.</p>';
        grid.after(msg);
      } else {
        existing.style.display = '';
      }
    } else if (existing) {
      existing.style.display = 'none';
    }
  }

  var searchForm = document.getElementById('commercialSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var loc = document.getElementById('commercial-location').value;
      var budget = document.getElementById('commercial-budget').value;
      var code = document.getElementById('commercial-code').value;
      filterCommercialListings(loc, budget, code);
      document.getElementById('listings').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  var seeMoreBtn = document.getElementById('commercial-see-more');
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', function() {
      var hiddenCards = grid.querySelectorAll('.listing-card.listing-hidden');
      var batch = Array.prototype.slice.call(hiddenCards, 0, BATCH_SIZE);
      batch.forEach(function(card, index) {
        setTimeout(function() {
          card.style.display = '';
          card.classList.remove('listing-hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(function() {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, index * 80);
      });
      setTimeout(updateSeeMoreButton, batch.length * 80 + 50);
    });
  }

  load();
})();
