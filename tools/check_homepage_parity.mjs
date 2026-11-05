// Proves script.js and tools/build_listings.py agree on the live sheet: the same
// listing codes for every row, the same first homepage cards in the same order,
// and identical card markup (so the page keeps the prerendered cards).
//   node tools/check_homepage_parity.mjs        (Node 18+, no packages)
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const src = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
function grab(name) {            // the source of `function name(...) {...}`
  const i = src.indexOf('function ' + name + '(');
  if (i < 0) throw new Error('script.js has no function ' + name);
  let depth = 0, j = src.indexOf('{', i);
  for (let k = j; k < src.length; k++) {
    if (src[k] === '{') depth++;
    else if (src[k] === '}' && --depth === 0) return src.slice(i, k + 1);
  }
}
function grabVar(name) {
  const m = new RegExp('var ' + name + ' = ([\\s\\S]*?);\\n').exec(src);
  if (!m) throw new Error('script.js has no var ' + name);
  return 'var ' + name + ' = ' + m[1] + ';';
}
const names = ['parseCSV', 'resetCodes', 'generateCode', 'normalizeCategory', 'mapRow', 'slugPart',
               'listingPagePath', 'slugify', 'cldUrl', 'buildListingCard'];
const js = new Function(
  [grabVar('SHEET_CSV_URL'), grabVar('CLD_CARD'), grabVar('LOCATION_NAMES'), grabVar('INITIAL_COUNT'), 'var usedCodes = {};']
    .concat(names.map(grab)).join('\n') +
  '\nreturn {SHEET_CSV_URL, INITIAL_COUNT, ' + names.join(', ') + '};')();

const text = await (await fetch(js.SHEET_CSV_URL)).text();
const rows = js.parseCSV(text); rows.shift();
js.resetCodes();
const all = rows.map(js.mapRow);
const first = all.filter(l => l.status === 'active')
  .sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || '')).slice(0, js.INITIAL_COUNT);

const py = JSON.parse(execFileSync('python3', [fileURLToPath(new URL('./build_listings.py', import.meta.url)), '--homepage-json'], { encoding: 'utf8' }));
const unescape = s => s.replace(/ data-prerendered=""/g, '').replace(/&quot;/g, '"').replace(/&#x27;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
let bad = 0;
const fail = msg => { bad++; console.log('MISMATCH', msg); };
if (all.length !== py.codes.length) fail(`row count: js ${all.length}, py ${py.codes.length}`);
all.forEach((l, i) => { if (l.code !== py.codes[i]) fail(`row ${i + 2} code: js ${l.code}, py ${py.codes[i]}`); });
if (first.length !== py.cards.length) fail(`card count: js ${first.length}, py ${py.cards.length}`);
first.forEach((l, i) => {
  const p = py.cards[i] || {};
  if (l.code !== p.code) fail(`card ${i + 1} code: js ${l.code}, py ${p.code}`);
  if (js.listingPagePath(l) !== '/rentals/' + p.slug) fail(`card ${i + 1} page: js ${js.listingPagePath(l)}, py /rentals/${p.slug}`);
  if (js.slugify(l.title) !== p.id) fail(`card ${i + 1} id: js ${js.slugify(l.title)}, py ${p.id}`);
  if (unescape(js.buildListingCard(l)) !== unescape(p.html || '')) fail(`card ${i + 1} markup differs\n js: ${js.buildListingCard(l)}\n py: ${p.html}`);
});
console.log(bad ? `${bad} mismatch(es)` : `OK: ${all.length} codes and ${first.length} homepage cards match`);
process.exit(bad ? 1 : 0);
