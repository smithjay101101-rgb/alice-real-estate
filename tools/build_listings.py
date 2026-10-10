#!/usr/bin/env python3
"""Build static, crawlable listing pages from the Alice Rentals Google Sheet.

Reads the residential and commercial tabs (the same CSV exports script.js and
commercial.js load in the browser) and writes, under rentals/:

  - one page per active listing, at /rentals/<type>-<area>-<code>
  - /rentals/ (every listing, grouped by area), one page per area, and the
    apartments, houses-and-villas and commercial-spaces hubs

plus sitemap-rentals.xml, a managed block in llms.txt, and a managed block of
301s in _redirects for listing pages that were published and have since gone.

Listing codes reproduce generateCode() in script.js and generateCommercialCode()
in commercial.js exactly, including the order rows are numbered in, so a page
shows the same code as the card on the homepage. listingPagePath() in script.js
builds the same addresses as page_slug() here; change them together.

The page chrome (nav, drawer, contact modal, footer) is copied from 404.html,
which already uses root-absolute paths. Output is deterministic: running this
twice on the same sheet changes nothing, and tools/listings-manifest.json only
moves a listing's lastmod when its data changes.

Run from anywhere:  python3 tools/build_listings.py
Python 3.9+, standard library only.
"""

import csv
import datetime as dt
import hashlib
import html
import io
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://alice-rentals.com"
SHEET = "https://docs.google.com/spreadsheets/d/1yzmziGKMNNwomQldOxEJH7FfpUi1IwD4zRVdRE47hNQ/gviz/tq?tqx=out:csv"
RESIDENTIAL_CSV = SHEET
COMMERCIAL_CSV = SHEET + "&gid=1301362763"   # COMMERCIAL_GID in commercial.js

OUT_DIR = ROOT / "rentals"
MANIFEST = ROOT / "tools" / "listings-manifest.json"
SITEMAP = ROOT / "sitemap-rentals.xml"
LLMS = ROOT / "llms.txt"
REDIRECTS = ROOT / "_redirects"
CHROME_SOURCE = ROOT / "404.html"

RENTED_KEEP_DAYS = 45      # a rented listing keeps its page this long, then 301s to its area
MIN_INDEXABLE_AREA = 3     # area pages with fewer listings are noindex, follow
MORE_LIKE_THIS = 6
WHATSAPP = "84787664959"
ZALO = "https://zalo.me/84787664959"
ORG_ID = SITE + "/#organization"
WEBSITE_ID = SITE + "/#website"

AREA_NAMES = {   # LOCATION_NAMES in script.js
    "my-khe": "Mỹ Khê", "son-tra": "Sơn Trà", "hai-chau": "Hải Châu",
    "my-an": "Mỹ An", "ngu-hanh-son": "Ngũ Hành Sơn", "cam-le": "Cẩm Lệ",
}
AREA_ASCII = {
    "my-khe": "My Khe", "son-tra": "Son Tra", "hai-chau": "Hai Chau",
    "my-an": "My An", "ngu-hanh-son": "Ngu Hanh Son", "cam-le": "Cam Le",
}
# One or two sentences per area, drawn from what the guides already say.
AREA_BLURBS = {
    "my-khe": "Mỹ Khê is the beach strip along the east side of the city. You can walk to the sand, and cafes and gyms are everywhere.",
    "my-an": "Mỹ An, which most foreigners call An Thượng, is the walkable grid behind My Khe beach, with the densest mix of cafes, restaurants, gyms and coworking spaces in the city. Since July 2025 it is officially part of Ngũ Hành Sơn ward.",
    "son-tra": "Sơn Trà is quieter and greener, on the streets toward the Sơn Trà peninsula, and has the cheapest standalone houses in the city. Most things are a five to ten minute ride rather than a walk.",
    "hai-chau": "Hải Châu is the city centre on the west bank of the Han River, with riverside towers, restaurants and rooftop bars, and the shortest ride to central offices.",
    "ngu-hanh-son": "Ngũ Hành Sơn runs south along the coast toward the Marble Mountains and Hội An. It is where most villas and houses with gardens are, and where APU and Singapore International School are.",
    "cam-le": "Cẩm Lệ is a residential area south-west of the city centre.",
}
AREA_GUIDES = {
    "my-khe": ("/blog/posts/son-tra-vs-my-an-da-nang", "Son Tra or My An: Where Should You Rent in Da Nang?"),
    "my-an": ("/blog/posts/son-tra-vs-my-an-da-nang", "Son Tra or My An: Where Should You Rent in Da Nang?"),
    "son-tra": ("/blog/posts/son-tra-vs-my-an-da-nang", "Son Tra or My An: Where Should You Rent in Da Nang?"),
    "hai-chau": ("/blog/posts/luxury-apartments-da-nang", "What Are the Best Luxury Apartment Buildings in Da Nang?"),
    "ngu-hanh-son": ("/blog/posts/da-nang-with-kids", "Is Da Nang a Good Place to Live With Kids?"),
}
HOMEPAGE_AREAS = ("my-khe", "son-tra", "hai-chau")   # the homepage area cards link to these
MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]


# ── Sheet reading, matching script.js and commercial.js ──

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "alice-rentals-listing-builder/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8")


def parse_csv(text):
    # parseCSV() trims every field and drops rows with a single field.
    rows = [[f.strip() for f in row] for row in csv.reader(io.StringIO(text))]
    return [r for r in rows if len(r) > 1]


def js_parse_int(value):
    m = re.match(r"\s*([+-]?\d+)", value or "")
    return int(m.group(1)) if m else 0


def js_code(title, prefix, used):
    """generateCode() / generateCommercialCode(): a 32-bit string hash of the title."""
    h = 0
    data = title.encode("utf-16-le")
    for i in range(0, len(data), 2):
        c = data[i] | (data[i + 1] << 8)
        h = ((h << 5) - h + c) & 0xFFFFFFFF
    if h >= 0x80000000:
        h -= 0x100000000
    num = abs(h) % 1000
    tries = 0
    while num in used and tries < 10000:
        num = (num + 1) % 10000
        tries += 1
    used.add(num)
    return prefix + str(num).zfill(4)[-4:]


def col(r, i):
    return r[i] if i < len(r) else ""


def map_residential(rows):
    used, out = set(), []
    for r in rows:
        title = col(r, 0)
        cat = col(r, 12).strip().lower()
        out.append({
            "kind": "residential",
            "title": title,
            "location": col(r, 1),
            "price": js_parse_int(col(r, 2)),
            "bedrooms": js_parse_int(col(r, 3)),
            "bathrooms": js_parse_int(col(r, 4)),
            "sqm": js_parse_int(col(r, 5)),
            "description": col(r, 6),
            "images": [col(r, 7)] + [u.strip() for u in col(r, 8).split(",") if u.strip()],
            "status": col(r, 9).lower().strip(),
            "featured": col(r, 10).lower().strip() == "yes",
            "date_added": col(r, 11),
            "category": "house-villa" if cat in ("house-villa", "house", "villa") else "apartment",
            "code": js_code(title, "#", used),
        })
    return out


def map_commercial(rows):
    used, out = set(), []
    for r in rows:
        title = col(r, 0)
        out.append({
            "kind": "commercial",
            "title": title,
            "location": col(r, 1),
            "price": js_parse_int(col(r, 2)),
            "floor": col(r, 3),
            "sqm": js_parse_int(col(r, 4)),
            "description": col(r, 5),
            "images": [col(r, 6)] + [u.strip() for u in col(r, 7).split(",") if u.strip()],
            "status": col(r, 8).lower().strip(),
            "featured": col(r, 9).lower().strip() == "yes",
            "date_added": col(r, 10),
            "business_type": col(r, 11).strip(),
            "code": js_code(title, "C", used),
        })
    return out


# ── Addresses and labels ──

def slug_part(value):
    return re.sub(r"^-+|-+$", "", re.sub(r"[^a-z0-9-]+", "-", (value or "").lower()))


def area_of(l):
    return slug_part(l["location"]) or "da-nang"


def home_type(l):
    if l["category"] == "house-villa":
        return "villa" if "villa" in l["title"].lower() else "house"
    return "apartment"


def commercial_kind(l):
    bt = slug_part(l["business_type"])
    return (bt if bt and bt != "general" else "commercial") + "-space"


def page_slug(l):
    """Mirrors listingPagePath() in script.js."""
    digits = re.sub(r"[^0-9]", "", l["code"])
    if l["kind"] == "commercial":
        return "%s-%s-c%s" % (commercial_kind(l), area_of(l), digits)
    t = home_type(l)
    head = "%d-bedroom-%s" % (l["bedrooms"], t) if l["bedrooms"] > 0 else ("studio" if t == "apartment" else t)
    return "%s-%s-%s" % (head, area_of(l), digits)


def area_name(a):
    return AREA_NAMES.get(a, "Đà Nẵng")


def area_ascii(a):
    return AREA_ASCII.get(a, "Da Nang")


def type_label(l, plural=False):
    """'2 bedroom apartment', 'Restaurant space', 'Commercial space'."""
    if l["kind"] == "commercial":
        bt = l["business_type"]
        return (bt.capitalize() if bt and bt.lower() != "general" else "Commercial") + " space"
    t = home_type(l)
    if l["bedrooms"] > 0:
        return "%d bedroom %s" % (l["bedrooms"], t)
    return "Studio" if t == "apartment" else t.capitalize()


def money(n):
    return "${:,}".format(n)


def fmt_date(iso):
    try:
        d = dt.date.fromisoformat(iso)
    except (TypeError, ValueError):
        return ""
    return "%d %s %d" % (d.day, MONTHS[d.month - 1], d.year)


def iso_date(value):
    try:
        return dt.date.fromisoformat((value or "").strip()).isoformat()
    except ValueError:
        return ""


def e(text):
    return html.escape(text or "", quote=True)


def cld(url, transform):
    """Insert a Cloudinary transformation unless the URL already carries one."""
    m = re.match(r"(https://res\.cloudinary\.com/[^/]+/image/upload/)(.+)$", url or "")
    if not m:
        return url
    first = m.group(2).split("/", 1)[0]
    if re.fullmatch(r"(?:[a-z]{1,4}_[^,/]+)(?:,[a-z]{1,4}_[^,/]+)*", first) and not re.fullmatch(r"v\d+", first):
        return url
    return m.group(1) + transform + "/" + m.group(2)


IMG_MAIN = "c_limit,w_1400,f_auto,q_auto"
IMG_THUMB = "c_fill,g_auto,w_600,h_400,f_auto,q_auto"
IMG_FULL = "c_limit,w_2000,f_auto,q_auto"
IMG_CARD = "c_fill,g_auto,w_640,h_360,f_auto,q_auto"
IMG_SHARE = "c_fill,g_auto,w_1200,h_630,f_jpg,q_auto"


def images_of(l):
    seen, out = set(), []
    for u in l["images"]:
        if u and u not in seen:
            seen.add(u)
            out.append(u)
    return out


def first_sentence(text, limit):
    text = re.sub(r"\s+", " ", text or "").strip()
    m = re.match(r"(.+?[.!?])(\s|$)", text)
    s = m.group(1) if m else text
    if len(s) > limit:
        s = s[:limit].rsplit(" ", 1)[0].rstrip(",;:") + "…"
    return s


def clip(text, limit):
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0].rstrip(",;:.") + "…"


def paragraphs(text):
    parts = [p.strip() for p in re.split(r"\n\s*\n|\r?\n", text or "") if p.strip()]
    return "\n".join("      <p>%s</p>" % html.escape(p, quote=False) for p in parts)


def data_hash(l):
    keys = sorted(k for k in l if k not in ("featured",))
    blob = json.dumps({k: l[k] for k in keys}, ensure_ascii=False, sort_keys=True)
    return hashlib.sha1(blob.encode("utf-8")).hexdigest()[:16]


def file_hash(rel):
    return hashlib.md5((ROOT / rel).read_bytes()).hexdigest()[:8]


# ── Page shell ──

def chrome():
    src = CHROME_SOURCE.read_text(encoding="utf-8")
    top = src[src.index("<body>"):src.index('<main id="main"')]
    bottom = src[src.index("</main>") + len("</main>"):]
    vi_note = re.search(r'id="langFallback" hidden>([^<]+)</p>',
                        (ROOT / "blog/posts/da-nang-vs-hanoi.html").read_text(encoding="utf-8")).group(1)
    return top, bottom, vi_note


def head(title, description, canonical, robots, og_image, ld, versions):
    return """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{t}</title>
<meta name="description" content="{d}">
<meta name="author" content="Alice Pham">
<meta name="robots" content="{robots}">

<!-- Open Graph -->
<meta property="og:title" content="{t}">
<meta property="og:description" content="{d}">
<meta property="og:image" content="{img}">
<meta property="og:url" content="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Alice Rentals">
<meta property="og:locale" content="en_US">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{t}">
<meta name="twitter:description" content="{d}">
<meta name="twitter:image" content="{img}">

<link rel="canonical" href="{url}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://res.cloudinary.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css?v={v_styles}">
<link rel="stylesheet" href="/blog/blog.css?v={v_blog}">
<link rel="stylesheet" href="/rentals/rentals.css?v={v_rentals}">
<script src="/blog/blog.js?v={v_js}" defer></script>
<script type="application/ld+json">
{ld}
</script>
</head>
""".format(t=e(title), d=e(description), robots=robots, img=e(og_image), url=e(canonical),
           v_styles=versions["styles"], v_blog=versions["blog_css"], v_rentals=versions["rentals_css"],
           v_js=versions["blog_js"], ld=json.dumps(ld, ensure_ascii=False, indent=2).replace("</", "<\\/"))


def breadcrumb_html(crumbs):
    items = []
    for name, href in crumbs[:-1]:
        items.append('    <li><a href="%s">%s</a></li>' % (href, e(name)))
    items.append('    <li aria-current="page">%s</li>' % e(crumbs[-1][0]))
    return '<nav class="breadcrumb" aria-label="Breadcrumb">\n  <ol>\n%s\n  </ol>\n</nav>' % "\n".join(items)


def breadcrumb_ld(crumbs, page_url):
    return {
        "@type": "BreadcrumbList",
        "@id": page_url + "#breadcrumb",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": name, "item": SITE + href}
            for i, (name, href) in enumerate(crumbs)
        ],
    }


def wa_link(text):
    return "https://wa.me/%s?text=%s" % (WHATSAPP, urllib.parse.quote(text, safe=""))


def card(l, heading="h2"):
    url = "/rentals/" + l["slug"]
    imgs = images_of(l)
    img = ('  <a class="post-card-media" href="%s" tabindex="-1" aria-hidden="true">\n'
           '    <img src="%s" alt="%s" width="640" height="360" loading="lazy" decoding="async">\n'
           '  </a>\n') % (url, e(cld(imgs[0], IMG_CARD)), e(l["title"])) if imgs else ""
    if l["kind"] == "commercial":
        facts = [money(l["price"]) + "/mo" if l["price"] else "Price on request"]
        if l["sqm"]:
            facts.append("%d m²" % l["sqm"])
        if l["floor"]:
            facts.append("Floor " + l["floor"])
    else:
        facts = [money(l["price"]) + "/mo" if l["price"] else "Price on request"]
        if l["bathrooms"]:
            facts.append("%d bath" % l["bathrooms"])
        if l["sqm"]:
            facts.append("%d m²" % l["sqm"])
    return ('<li class="post-card rl-card">\n%s'
            '  <p class="post-card-kicker">%s · %s</p>\n'
            '  <%s><a href="%s">%s</a></%s>\n'
            '  <p class="rl-price">%s</p>\n'
            '  <p class="post-card-meta"><span>%s</span></p>\n'
            '</li>') % (img, e(type_label(l)), e(area_name(l["area"])), heading, url, e(l["title"]), heading,
                        e(" · ".join(facts)), e(l["code"]))


def cta_aside(title, text, wa_text):
    return """<aside class="post-cta">
  <h2>{t}</h2>
  <p>{p}</p>
  <p class="post-cta-btns">
    <a class="btn-primary" href="{wa}" target="_blank" rel="noopener">Message Alice on WhatsApp</a>
    <a class="btn-outline" href="{zalo}" target="_blank" rel="noopener">Message on Zalo</a>
  </p>
</aside>""".format(t=e(title), p=e(text), wa=e(wa_link(wa_text)), zalo=ZALO)


# ── Listing page ──

def listing_page(l, peers, shell, versions, area_count):
    top, bottom, vi_note = shell
    url = SITE + "/rentals/" + l["slug"]
    a = l["area"]
    imgs = images_of(l)
    rented = l["page_status"] == "rented"
    tl = type_label(l)
    price_text = money(l["price"]) if l["price"] else "Price on request"

    if l["kind"] == "commercial":
        hub = ("Commercial spaces", "/rentals/commercial-spaces")
        size = ("%d m² " % l["sqm"]) if l["sqm"] else ""
        title_tag = "%s%s for Rent in %s, Da Nang" % (size, tl.title(), area_ascii(a))
        lead = "%s%s for rent in %s, Đà Nẵng" % (size, tl.lower(), area_name(a))
    else:
        hub = ("Apartments" if l["category"] == "apartment" else "Houses and villas",
               "/rentals/apartments" if l["category"] == "apartment" else "/rentals/houses-and-villas")
        title_tag = "%s for Rent in %s, Da Nang" % (tl.title(), area_ascii(a))
        lead = "%s for rent in %s, Đà Nẵng" % (tl, area_name(a))
    if l["price"]:
        title_tag += ", %s/mo" % money(l["price"])
    if l.get("dup_title"):
        title_tag += " (%s)" % l["code"]

    bits = []
    if l["price"]:
        bits.append("%s a month" % money(l["price"]))
    if l["kind"] == "residential" and l["bathrooms"]:
        bits.append("%d bathroom%s" % (l["bathrooms"], "" if l["bathrooms"] == 1 else "s"))
    if l["sqm"]:
        bits.append("%d m²" % l["sqm"])
    desc = clip("%s: %s. %s" % (lead[0].upper() + lead[1:], ", ".join(bits), first_sentence(l["description"], 120)), 158)

    crumbs = [("Home", "/"), ("Rentals", "/rentals/"), (area_name(a), "/rentals/" + a), (clip(l["title"], 60), "/rentals/" + l["slug"])]
    if a not in area_count:
        crumbs = [("Home", "/"), ("Rentals", "/rentals/"), hub, (clip(l["title"], 60), "/rentals/" + l["slug"])]

    # Structured data
    address = {"@type": "PostalAddress", "addressLocality": "%s, Đà Nẵng" % area_name(a) if a in AREA_NAMES else "Đà Nẵng",
               "addressRegion": "Đà Nẵng", "addressCountry": "VN"}
    if l["kind"] == "commercial":
        props = []
        if l["sqm"]:
            props.append({"@type": "PropertyValue", "name": "Floor area", "value": l["sqm"], "unitCode": "MTK"})
        if l["floor"]:
            props.append({"@type": "PropertyValue", "name": "Floor", "value": l["floor"]})
        if l["business_type"]:
            props.append({"@type": "PropertyValue", "name": "Use", "value": l["business_type"]})
        entity = {"@type": "Place", "name": l["title"], "address": address}
        if props:
            entity["additionalProperty"] = props
    else:
        entity = {"@type": "Apartment" if l["category"] == "apartment" else "House", "name": l["title"], "address": address}
        if l["bedrooms"]:
            entity["numberOfBedrooms"] = l["bedrooms"]
        if l["bathrooms"]:
            entity["numberOfBathroomsTotal"] = l["bathrooms"]
        if l["sqm"]:
            entity["floorSize"] = {"@type": "QuantitativeValue", "value": l["sqm"], "unitCode": "MTK"}
    listing_ld = {
        "@type": "RealEstateListing",
        "@id": url + "#listing",
        "url": url,
        "name": l["title"],
        "description": clip(l["description"], 500),
        "inLanguage": "en",
        "isPartOf": {"@id": WEBSITE_ID},
        "dateModified": l["lastmod"],
        "mainEntity": entity,
    }
    if imgs:
        listing_ld["image"] = [cld(imgs[0], IMG_SHARE)] + [cld(u, IMG_MAIN) for u in imgs[1:4]]
    if iso_date(l["date_added"]):
        listing_ld["datePosted"] = iso_date(l["date_added"])
    if l["price"]:
        listing_ld["offers"] = {
            "@type": "Offer",
            "price": l["price"],
            "priceCurrency": "USD",
            "availability": "https://schema.org/SoldOut" if rented else "https://schema.org/InStock",
            "businessFunction": "http://purl.org/goodrelations/v1#LeaseOut",
            "priceSpecification": {"@type": "UnitPriceSpecification", "price": l["price"], "priceCurrency": "USD",
                                   "unitText": "MONTH", "referenceQuantity": {"@type": "QuantitativeValue", "value": 1, "unitCode": "MON"}},
            "offeredBy": {"@id": ORG_ID},
        }
    ld = {"@context": "https://schema.org", "@graph": [listing_ld, breadcrumb_ld(crumbs, url)]}

    # Body
    gallery = []
    for i, u in enumerate(imgs):
        main = i == 0
        gallery.append(
            '  <a class="rl-photo%s" href="%s" target="_blank" rel="noopener">'
            '<img src="%s" alt="%s, photo %d of %d" width="%d" height="%d"%s decoding="async"></a>'
            % (" is-main" if main else "", e(cld(u, IMG_FULL)), e(cld(u, IMG_MAIN if main else IMG_THUMB)),
               e(l["title"]), i + 1, len(imgs), 1400 if main else 600, 933 if main else 400,
               ' fetchpriority="high"' if main else ' loading="lazy"'))
    rows = [("Monthly rent", price_text + (" a month" if l["price"] else ""))]
    if l["kind"] == "commercial":
        if l["sqm"]:
            rows.append(("Floor area", "%d m²" % l["sqm"]))
        if l["floor"]:
            rows.append(("Floor", l["floor"]))
        rows.append(("Use", l["business_type"] if l["business_type"] and l["business_type"].lower() != "general" else "General commercial"))
    else:
        if l["bedrooms"]:
            rows.append(("Bedrooms", str(l["bedrooms"])))
        if l["bathrooms"]:
            rows.append(("Bathrooms", str(l["bathrooms"])))
        if l["sqm"]:
            rows.append(("Floor area", "%d m²" % l["sqm"]))
        rows.append(("Type", home_type(l).capitalize()))
    rows.append(("Area", "%s, Đà Nẵng" % area_name(a) if a in AREA_NAMES else "Đà Nẵng"))
    rows.append(("Listing code", l["code"]))
    if fmt_date(l["date_added"]):
        rows.append(("Listed", fmt_date(l["date_added"])))
    table = "\n".join('          <tr><th scope="row">%s</th><td>%s</td></tr>' % (e(k), e(v)) for k, v in rows)

    area_bits = []
    if a in AREA_BLURBS:
        area_bits.append("      <p>%s</p>" % e(AREA_BLURBS[a]))
    links = []
    if a in area_count:
        n = area_count[a]
        links.append('<a href="/rentals/%s">See all %d home%s for rent in %s</a>' % (a, n, "" if n == 1 else "s", e(area_name(a))))
    if a in AREA_GUIDES:
        links.append('<a href="%s">%s</a>' % AREA_GUIDES[a])
    if links:
        area_bits.append("      <p>%s</p>" % " · ".join(links))
    area_section = ""
    if area_bits:
        area_section = """    <section aria-labelledby="h-area">
      <h2 id="h-area">Living in {name}</h2>
{bits}
    </section>
""".format(name=e(area_name(a)), bits="\n".join(area_bits))

    if l["kind"] == "commercial":
        terms = ["Alice negotiates with the landlord in Vietnamese and reviews the lease with you in English before you sign.",
                 "She can show you the space on a video call over WhatsApp or Zalo before you visit."]
    else:
        terms = ["Leases usually run six or twelve months, with one month's rent as the deposit. Some landlords ask for two months on shorter or furnished leases.",
                 "Electricity is usually billed separately by the landlord, typically at 4,000 to 6,000 VND per kWh.",
                 "You need your passport and visa to sign. The landlord registers your temporary residence with the police after you move in.",
                 "Alice reviews the contract with you in English before you sign, and can show you the home on a video call before you arrive."]
    terms_html = "\n".join("        <li>%s</li>" % e(t) for t in terms)

    status = ""
    if rented:
        status = ('  <p class="rl-status">This home has been rented. The homes below in %s are available now, '
                  'or message Alice and she will find something similar.</p>\n') % e(area_name(a))

    more = ""
    if peers:
        more = """  <section class="rl-more" aria-labelledby="h-more">
    <h2 id="h-more">{h}</h2>
    <ul class="post-grid">
{cards}
    </ul>
  </section>
""".format(h=e("More %s for rent%s" % ("commercial spaces" if l["kind"] == "commercial" else "homes",
                                         (" in " + area_name(a)) if all(p["area"] == a for p in peers) else " in Đà Nẵng")),
           cards="\n".join(card(p, "h3") for p in peers))

    wa_text = "Hi Alice, I'm interested in %s (%s): %s" % (l["title"], l["code"], url)
    kicker = "%s · %s" % (tl, area_name(a))
    facts_inline = [b for b in [
        ("%d bedroom%s" % (l["bedrooms"], "" if l["bedrooms"] == 1 else "s")) if l["kind"] == "residential" and l["bedrooms"] else "",
        ("%d bathroom%s" % (l["bathrooms"], "" if l["bathrooms"] == 1 else "s")) if l["kind"] == "residential" and l["bathrooms"] else "",
        ("%d m²" % l["sqm"]) if l["sqm"] else "",
        ("Floor %s" % l["floor"]) if l["kind"] == "commercial" and l["floor"] else "",
        "%s, Đà Nẵng" % area_name(a) if a in AREA_NAMES else "Đà Nẵng",
    ] if b]

    body = """<main id="main" class="post-main rl-main">
{crumbs}

<article class="rl-listing">
<header class="rl-header">
  <p class="post-kicker">{kicker} <span class="rl-code">{code}</span></p>
  <h1>{h1}</h1>
  <p class="rl-price-big">{price}{per}</p>
  <ul class="rl-facts">
{facts}
  </ul>
{status}  <p class="lang-fallback" id="langFallback" hidden>{vi}</p>
</header>

<div class="rl-gallery">
{gallery}
</div>

<div class="rl-layout">
  <div class="rl-body">
    <section aria-labelledby="h-about">
      <h2 id="h-about">About this {noun}</h2>
{paras}
    </section>
    <section aria-labelledby="h-details">
      <h2 id="h-details">Details</h2>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Details of listing {code}">
        <table class="post-table">
        <tbody>
{table}
        </tbody>
        </table>
      </div>
    </section>
{area_section}    <section aria-labelledby="h-terms">
      <h2 id="h-terms">How renting through Alice works</h2>
      <ul>
{terms}
      </ul>
      <p class="rl-note">These are the usual terms in Đà Nẵng. The terms for this {noun} are confirmed in its lease.</p>
    </section>
  </div>
  <aside class="rl-cta" aria-labelledby="h-cta">
    <h2 id="h-cta">Ask Alice about this {noun}</h2>
    <p>Quote listing code <strong>{code}</strong>. Alice usually replies within an hour.</p>
    <a class="btn-primary" href="{wa}" target="_blank" rel="noopener">Message Alice on WhatsApp</a>
    <a class="btn-outline" href="{zalo}" target="_blank" rel="noopener">Message on Zalo</a>
    <p class="rl-cta-small"><a href="/rentals/">Browse all rentals</a></p>
  </aside>
</div>

{more}</article>
</main>""".format(
        crumbs=breadcrumb_html(crumbs), kicker=e(kicker), code=e(l["code"]), h1=e(l["title"]),
        price=e(price_text), per='<span> / month</span>' if l["price"] else "",
        facts="\n".join("    <li>%s</li>" % e(f) for f in facts_inline), status=status, vi=vi_note,
        gallery="\n".join(gallery), noun="space" if l["kind"] == "commercial" else "home",
        paras=paragraphs(l["description"]) or "      <p>Message Alice for the full description and more photos.</p>",
        table=table, area_section=area_section, terms=terms_html, wa=e(wa_link(wa_text)), zalo=ZALO, more=more)

    robots = "noindex, follow" if rented else "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    og = cld(imgs[0], IMG_SHARE) if imgs else SITE + "/underlay.jpg"
    return head(title_tag, desc, url, robots, og, ld, versions) + top + body + bottom


# ── Hub pages ──

def filter_nav(current, area_count, has_commercial):
    links = [("All rentals", "/rentals/"), ("Apartments", "/rentals/apartments"), ("Houses and villas", "/rentals/houses-and-villas")]
    if has_commercial:
        links.append(("Commercial spaces", "/rentals/commercial-spaces"))
    links += [(area_name(a), "/rentals/" + a) for a in AREA_NAMES if area_count.get(a)]
    items = "\n".join('    <li><a href="%s"%s>%s</a></li>' % (h, ' aria-current="page"' if h == current else "", e(n)) for n, h in links)
    # A div, not <nav>: styles.css gives every <nav> the fixed site-header styling.
    return '<div class="rl-filter" role="navigation" aria-label="Browse rentals">\n  <ul>\n%s\n  </ul>\n</div>' % items


def hub_page(path, title_tag, h1, kicker, intro, listings, shell, versions, area_count, has_commercial,
             robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1", groups=None, crumb_name=None):
    top, bottom, _ = shell
    url = SITE + path
    crumbs = [("Home", "/"), ("Rentals", "/rentals/")] if path != "/rentals/" else [("Home", "/")]
    crumbs.append((crumb_name or h1, path))
    if path == "/rentals/":
        crumbs[-1] = ("Rentals", path)
    lastmod = max([l["lastmod"] for l in listings] or [""])
    count = len(listings)
    noun = "spaces" if listings and all(l["kind"] == "commercial" for l in listings) else "homes"
    meta = "%d %s listed%s. Monthly rents in US dollars%s." % (
        count, noun if count != 1 else noun[:-1], (", updated " + fmt_date(lastmod)) if lastmod else "",
        "" if noun == "spaces" else ", for leases of six months or more")
    desc = clip("%s %s" % (intro, meta), 158)
    imgs = [images_of(l)[0] for l in listings if images_of(l)]
    og = cld(imgs[0], IMG_SHARE) if imgs else SITE + "/underlay.jpg"
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "CollectionPage", "@id": url + "#page", "url": url, "name": h1, "description": desc,
         "inLanguage": "en", "isPartOf": {"@id": WEBSITE_ID}, "about": {"@id": ORG_ID},
         **({"dateModified": lastmod} if lastmod else {}),
         "mainEntity": {"@type": "ItemList", "numberOfItems": count, "itemListElement": [
             {"@type": "ListItem", "position": i + 1, "url": SITE + "/rentals/" + l["slug"], "name": l["title"]}
             for i, l in enumerate(listings)]}},
        breadcrumb_ld(crumbs, url)]}

    if groups:
        sections = []
        for gid, gname, glist, gpath in groups:
            sections.append("""<section class="rl-group" aria-labelledby="g-{gid}">
  <h2 class="rl-group-title" id="g-{gid}"><a href="{gpath}">{gname}</a> <span>{n}</span></h2>
  <ul class="post-grid">
{cards}
  </ul>
</section>""".format(gid=gid, gpath=gpath, gname=e(gname), n=len(glist), cards="\n".join(card(l, "h3") for l in glist)))
        grid = "\n\n".join(sections)
    elif listings:
        grid = '<section aria-label="Listings">\n  <ul class="post-grid">\n%s\n  </ul>\n</section>' % "\n".join(card(l) for l in listings)
    else:
        grid = '<section aria-label="Listings"><p class="rl-empty">Nothing is listed here right now. Message Alice and she will tell you what is coming up.</p></section>'

    body = """<main id="main" class="page-main rl-hub">
{crumbs}

<header class="blog-hero">
  <p class="post-kicker">{kicker}</p>
  <h1>{h1}</h1>
  <p>{intro}</p>
  <p class="rl-hub-meta">{meta}</p>
</header>

{nav}

{grid}

{cta}
</main>""".format(crumbs=breadcrumb_html(crumbs), kicker=e(kicker), h1=e(h1), intro=e(intro), meta=e(meta),
                  nav=filter_nav(path, area_count, has_commercial), grid=grid,
                  cta=cta_aside("Not seeing the right one?",
                                "Tell Alice your budget, the area you like and your move-in date, and she will send you a shortlist that fits.",
                                "Hi Alice, I'm looking for a rental in Đà Nẵng"))
    return head(title_tag, desc, url, robots, og, ld, versions) + top + body + bottom, lastmod


# ── Managed blocks in shared files ──

def replace_block(text, begin, end, block, insert_before=None):
    pattern = re.compile(re.escape(begin) + r".*?" + re.escape(end), re.S)
    new = begin + "\n" + block + end
    if pattern.search(text):
        return pattern.sub(lambda m: new, text)
    if insert_before and insert_before in text:
        return text.replace(insert_before, new + "\n\n" + insert_before, 1)
    return text.rstrip("\n") + "\n\n" + new + "\n"


def write_if_changed(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.read_text(encoding="utf-8") == content:
        return False
    path.write_text(content, encoding="utf-8")
    return True


# ── Main ──

def main():
    today = dt.date.today().isoformat()
    try:
        res_rows = parse_csv(fetch(RESIDENTIAL_CSV))
        com_rows = parse_csv(fetch(COMMERCIAL_CSV))
    except Exception as exc:   # never touch the site on a failed download
        sys.exit("Could not read the sheet, nothing changed: %s" % exc)
    if not res_rows or res_rows[0][0].lower() != "title":
        sys.exit("Residential sheet header looks wrong, nothing changed: %r" % (res_rows[:1],))
    if not com_rows or com_rows[0][0].lower() != "title":
        sys.exit("Commercial sheet header looks wrong, nothing changed: %r" % (com_rows[:1],))

    all_listings = map_residential(res_rows[1:]) + map_commercial(com_rows[1:])
    for l in all_listings:
        l["slug"] = page_slug(l)
        l["area"] = area_of(l)

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {"listings": {}, "gone": {}}
    prev = manifest.get("listings", {})
    gone = dict(manifest.get("gone", {}))

    active = [l for l in all_listings if l["status"] == "active"]
    prev_active_res = sum(1 for v in prev.values() if v.get("status") == "active" and v.get("kind") == "residential")
    now_active_res = sum(1 for l in active if l["kind"] == "residential")
    if prev_active_res and now_active_res < prev_active_res * 0.5 and os.environ.get("ALLOW_BIG_DROP") != "1":
        sys.exit("Active residential listings fell from %d to %d. Set ALLOW_BIG_DROP=1 if that is real. Nothing changed."
                 % (prev_active_res, now_active_res))

    # Which pages exist after this run
    pages = {}
    for l in active:
        l["page_status"] = "active"
        pages[l["slug"]] = l
    by_slug_all = {l["slug"]: l for l in all_listings}
    for slug, info in prev.items():
        if slug in pages:
            continue
        l = by_slug_all.get(slug)
        if l and l["status"] == "rented":
            since = info.get("rented_since") or today
            age = (dt.date.fromisoformat(today) - dt.date.fromisoformat(since)).days
            if age <= RENTED_KEEP_DAYS:
                l["page_status"] = "rented"
                l["rented_since"] = since
                pages[slug] = l
                continue
        gone[slug] = info.get("area") or "da-nang"
    for slug in list(gone):
        if slug in pages:
            del gone[slug]

    new_manifest = {"listings": {}, "gone": {}}
    for slug, l in sorted(pages.items()):
        h = data_hash(l)
        old = prev.get(slug, {})
        l["lastmod"] = old.get("lastmod") if old.get("hash") == h and old.get("status") == l["page_status"] else today
        entry = {"area": l["area"], "hash": h, "kind": l["kind"], "lastmod": l["lastmod"], "status": l["page_status"]}
        if l["page_status"] == "rented":
            entry["rented_since"] = l["rented_since"]
        new_manifest["listings"][slug] = entry

    def order(ls):
        # Featured first, then newest date_added, then by address; Python's sort is stable.
        ls = sorted(ls, key=lambda l: l["slug"])
        ls = sorted(ls, key=lambda l: l["date_added"] or "", reverse=True)
        return sorted(ls, key=lambda l: not l["featured"])

    live = [l for l in pages.values() if l["page_status"] == "active"]
    residential = order([l for l in live if l["kind"] == "residential"])
    commercial = order([l for l in live if l["kind"] == "commercial"])
    area_count = {}
    for l in residential:
        area_count[l["area"]] = area_count.get(l["area"], 0) + 1
    for a in HOMEPAGE_AREAS:
        area_count.setdefault(a, 0)

    # Duplicate <title>s get the listing code appended
    seen_titles = {}
    for l in pages.values():
        key = (l["kind"], type_label(l), l["area"], l["price"])
        seen_titles.setdefault(key, []).append(l)
    for group in seen_titles.values():
        if len(group) > 1:
            for l in group:
                l["dup_title"] = True

    shell = chrome()
    versions = {"styles": file_hash("styles.css"), "blog_css": file_hash("blog/blog.css"),
                "rentals_css": file_hash("rentals/rentals.css"), "blog_js": file_hash("blog/blog.js")}

    outputs = {}
    for slug, l in pages.items():
        pool = commercial if l["kind"] == "commercial" else residential
        others = [p for p in pool if p["slug"] != slug]
        same_area = [p for p in others if p["area"] == l["area"]]
        rest = [p for p in others if p["area"] != l["area"]]
        key = lambda p: (p["category"] != l.get("category"), abs(p["price"] - l["price"]), p["slug"]) if l["kind"] == "residential" \
            else (abs(p["price"] - l["price"]), p["slug"])
        peers = (sorted(same_area, key=key) + sorted(rest, key=key))[:MORE_LIKE_THIS]
        outputs[OUT_DIR / (slug + ".html")] = listing_page(l, peers, shell, versions,
                                                          {a: n for a, n in area_count.items() if n})

    hubs = []   # (path, lastmod, indexable)
    has_com = bool(commercial)
    groups = [(a, "Homes for rent in " + area_name(a), [l for l in residential if l["area"] == a], "/rentals/" + a)
              for a in AREA_NAMES if area_count.get(a)]
    other = [l for l in residential if l["area"] not in AREA_NAMES]
    if other:
        groups.append(("other", "Elsewhere in Đà Nẵng", other, "/rentals/"))
    page, lm = hub_page("/rentals/", "Apartments, Houses and Villas for Rent in Da Nang | Alice Rentals",
                        "Apartments, houses and villas for rent in Đà Nẵng", "Rentals",
                        "Every home Alice has available right now, grouped by area. Each one has been checked by Alice and has its own page with photos, the full details and a WhatsApp button that sends her the listing code.",
                        residential, shell, versions, area_count, has_com, groups=groups, crumb_name="Rentals")
    outputs[OUT_DIR / "index.html"] = page
    hubs.append(("/rentals/", lm, True))
    apts = [l for l in residential if l["category"] == "apartment"]
    page, lm = hub_page("/rentals/apartments", "Apartments for Rent in Da Nang | Alice Rentals", "Apartments for rent in Đà Nẵng",
                        "Rentals", "Apartments for rent across Đà Nẵng, from one bedroom units near the beach to large sea view apartments in the riverside towers. Every listing has been checked by Alice.",
                        apts, shell, versions, area_count, has_com)
    outputs[OUT_DIR / "apartments.html"] = page
    hubs.append(("/rentals/apartments", lm, bool(apts)))
    houses = [l for l in residential if l["category"] == "house-villa"]
    page, lm = hub_page("/rentals/houses-and-villas", "Houses and Villas for Rent in Da Nang | Alice Rentals",
                        "Houses and villas for rent in Đà Nẵng", "Rentals",
                        "Houses and villas for rent across Đà Nẵng, for families and anyone who wants more space and outdoor room. Every listing has been checked by Alice.",
                        houses, shell, versions, area_count, has_com)
    outputs[OUT_DIR / "houses-and-villas.html"] = page
    hubs.append(("/rentals/houses-and-villas", lm, bool(houses)))
    if has_com:
        page, lm = hub_page("/rentals/commercial-spaces", "Commercial Spaces for Rent in Da Nang | Alice Rentals",
                            "Commercial spaces for rent in Đà Nẵng", "Rentals",
                            "Shops, offices and restaurant spaces for rent in Đà Nẵng. Every listing has been checked by Alice.",
                            commercial, shell, versions, area_count, has_com)
        outputs[OUT_DIR / "commercial-spaces.html"] = page
        hubs.append(("/rentals/commercial-spaces", lm, True))
    for a in AREA_NAMES:
        if a not in area_count:
            continue
        ls = [l for l in residential if l["area"] == a]
        indexable = len(ls) >= MIN_INDEXABLE_AREA
        page, lm = hub_page("/rentals/" + a, "Homes for Rent in %s, Da Nang | Alice Rentals" % area_ascii(a),
                            "Homes for rent in %s" % area_name(a), "Rentals by area", AREA_BLURBS.get(a, ""),
                            ls, shell, versions, area_count, has_com,
                            robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" if indexable else "noindex, follow")
        outputs[OUT_DIR / (a + ".html")] = page
        hubs.append(("/rentals/" + a, lm, indexable))

    # Write pages, then remove generated pages that no longer exist
    changed = []
    for path, content in sorted(outputs.items()):
        if write_if_changed(path, content):
            changed.append(path)
    keep = set(outputs)
    for path in sorted(OUT_DIR.glob("*.html")):
        if path not in keep:
            path.unlink()
            changed.append(path)

    # Sitemap of live listings and indexable hubs
    urls = [(SITE + p, lm) for p, lm, ok in hubs if ok]
    urls += [(SITE + "/rentals/" + l["slug"], l["lastmod"]) for l in residential + commercial]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u, lm in urls:
        sm += ["  <url>", "    <loc>%s</loc>" % e(u)] + (["    <lastmod>%s</lastmod>" % lm] if lm else []) + ["  </url>"]
    sm.append("</urlset>")
    if write_if_changed(SITEMAP, "\n".join(sm) + "\n"):
        changed.append(SITEMAP)

    # llms.txt block
    lines = ["- [All homes for rent](%s/rentals/): %d apartments, houses and villas currently listed in Đà Nẵng, each with its own page, monthly price in USD, bedrooms, bathrooms, floor area and listing code."
             % (SITE, len(residential))]
    lines.append("- [Apartments for rent](%s/rentals/apartments): %d apartments." % (SITE, len(apts)))
    lines.append("- [Houses and villas for rent](%s/rentals/houses-and-villas): %d houses and villas." % (SITE, len(houses)))
    if has_com:
        lines.append("- [Commercial spaces for rent](%s/rentals/commercial-spaces): %d shops, offices and restaurant spaces." % (SITE, len(commercial)))
    for a in AREA_NAMES:
        if area_count.get(a):
            n = area_count[a]
            lines.append("- [Homes for rent in %s](%s/rentals/%s): %d listing%s." % (area_name(a), SITE, a, n, "" if n == 1 else "s"))
    block = "## Rentals\n\n" + "\n".join(lines) + "\n"
    llms = LLMS.read_text(encoding="utf-8")
    new_llms = replace_block(llms, "<!-- BEGIN rentals, generated by tools/build_listings.py -->",
                             "<!-- END rentals -->", block, insert_before="## Guides")
    if write_if_changed(LLMS, new_llms):
        changed.append(LLMS)

    # 301s for pages that are gone
    for slug in list(gone):
        target = gone[slug]
        gone[slug] = target if area_count.get(target) else ""
    new_manifest["gone"] = dict(sorted(gone.items()))
    redirect_lines = "".join("/rentals/%s /rentals/%s 301\n" % (slug, t) for slug, t in sorted(gone.items()))
    red = REDIRECTS.read_text(encoding="utf-8") if REDIRECTS.exists() else ""
    new_red = replace_block(red, "# BEGIN listing redirects, generated by tools/build_listings.py",
                            "# END listing redirects", redirect_lines)
    if write_if_changed(REDIRECTS, new_red):
        changed.append(REDIRECTS)

    if write_if_changed(MANIFEST, json.dumps(new_manifest, ensure_ascii=False, indent=1, sort_keys=True) + "\n"):
        changed.append(MANIFEST)

    print("Listing pages: %d residential, %d commercial, %d rented; hubs: %d; redirects: %d; files changed: %d"
          % (len(residential), len(commercial), sum(1 for l in pages.values() if l["page_status"] == "rented"),
             len(hubs), len(gone), len(changed)))


if __name__ == "__main__":
    main()
