#!/usr/bin/env python3
"""Tell IndexNow which pages of alice-rentals.com changed.

IndexNow passes the list to Bing (which feeds Copilot) and the other engines in
the IndexNow network, so changed pages are recrawled within minutes instead of days.

  python3 tools/indexnow.py --since <git revision>   pages changed between that revision and HEAD
  python3 tools/indexnow.py --all                    every page in both sitemaps
  add --dry-run to print the URLs without sending them

The key file /94722b81db017090fb1ed4aea090dda0.txt must stay at the site root. The script waits until the
key file, and any newly added page, is live before it sends anything, so it can
run straight after a push while Cloudflare Pages is still deploying.
Python 3.9+, standard library only.
"""
import json, re, subprocess, sys, time, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://alice-rentals.com"
HOST = "alice-rentals.com"
KEY = "94722b81db017090fb1ed4aea090dda0"
KEY_URL = SITE + "/" + KEY + ".txt"
ENDPOINT = "https://api.indexnow.org/indexnow"
SKIP = re.compile(r"^(404\.html|google[0-9a-f]+\.html|research_notes/|reports/|tools/|\.github/)")


def url_for(path):
    """Site address of an HTML file, in the extensionless form the site uses."""
    if not path.endswith(".html") or SKIP.match(path):
        return None
    if path == "index.html":
        return SITE + "/"
    if path.endswith("/index.html"):
        return SITE + "/" + path[: -len("index.html")]
    return SITE + "/" + path[: -len(".html")]


def changed_since(rev):
    out = subprocess.run(["git", "diff", "--name-status", "--no-renames", rev, "HEAD"], cwd=ROOT,
                         capture_output=True, text=True, check=True).stdout
    urls, added = [], []
    for line in out.splitlines():
        status, path = line.split("\t", 1)
        u = url_for(path)
        if u:
            urls.append(u)
            if status == "A":
                added.append(u)
    return urls, added


def all_pages():
    urls = []
    for sm in ("sitemap.xml", "sitemap-rentals.xml"):
        f = ROOT / sm
        if f.exists():
            urls += re.findall(r"<loc>([^<]+)</loc>", f.read_text(encoding="utf-8"))
    return urls, []


def status_of(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "alice-indexnow/1.0"}), timeout=20) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception:
        return 0, ""


def wait_until_live(urls, tries=20, pause=15):
    for url in urls:
        for i in range(tries):
            code, body = status_of(url)
            if code == 200 and (url != KEY_URL or body.strip() == KEY):
                break
            time.sleep(pause)
        else:
            sys.exit("Not live after %d s: %s" % (tries * pause, url))


def send(urls):
    for i in range(0, len(urls), 10000):
        payload = json.dumps({"host": HOST, "key": KEY, "keyLocation": KEY_URL, "urlList": urls[i:i + 10000]}).encode()
        req = urllib.request.Request(ENDPOINT, data=payload, method="POST",
                                     headers={"Content-Type": "application/json; charset=utf-8"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                print("IndexNow answered %d for %d URLs" % (r.status, len(urls[i:i + 10000])))
        except urllib.error.HTTPError as e:
            sys.exit("IndexNow refused the list: %d %s" % (e.code, e.read().decode("utf-8", "replace")[:300]))


def main(argv):
    dry = "--dry-run" in argv
    if "--all" in argv:
        urls, added = all_pages()
    elif "--since" in argv:
        urls, added = changed_since(argv[argv.index("--since") + 1])
    else:
        sys.exit(__doc__)
    urls = sorted(set(urls))
    if not urls:
        print("No page changed, nothing to send.")
        return
    print("%d URL%s:" % (len(urls), "" if len(urls) == 1 else "s"))
    for u in urls:
        print("  " + u)
    if dry:
        return
    wait_until_live([KEY_URL] + sorted(set(added))[:1])
    send(urls)


if __name__ == "__main__":
    main(sys.argv[1:])
