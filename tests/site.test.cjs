/* node --test tests/site.test.cjs
   No browser dependency; these checks exercise the real route functions
   with minimal DOM stubs. Visual and actual-device testing remains separate.
*/
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const dataCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
const appCode = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

function site(route) {
  const ids = ['app', 'mobile-menu', 'menu-toggle', 'frog-modal', 'current-year', 'frog-results', 'odds-results', 'toast-region'];
  const nodes = new Map(ids.map(id => [id, {
    innerHTML: '', textContent: '', hidden: true, style: {},
    setAttribute() {}, addEventListener() {}, appendChild() {}
  }]));
  const listeners = {};
  const document = {
    getElementById(id) { return nodes.get(id) || null; },
    querySelector(selector) { return selector.startsWith('#') ? nodes.get(selector.slice(1)) || null : null; },
    querySelectorAll() { return []; },
    addEventListener(event, callback) { listeners[event] = callback; },
    createElement() { return { className: '', textContent: '', remove() {} }; }
  };
  const window = { addEventListener() {}, scrollTo() {}, setTimeout() {}, MFF_DATA: null, opened: [], open(url) { this.opened.push(url); } };
  const location = { hash: '#/' + route };
  new Function('window', dataCode)(window);
  new Function('window', 'document', 'location', 'setTimeout', appCode)(window, document, location, () => {});
  return { window, document, nodes, listeners, location, app: nodes.get('app') };
}

test('parses both scripts and loads the exact 81-slot public catalogue', () => {
  assert.doesNotThrow(() => new Function(dataCode));
  assert.doesNotThrow(() => new Function(appCode));
  const { window: w } = site('home');
  const f = w.MFF_DATA.frogs;
  assert.equal(f.length, 81);
  assert.equal(f.filter(x => x.confirmed).length, 69);
  assert.equal(f.filter(x => x.isSecret).length, 1);
  assert.equal(f.filter(x => x.pond === 10).length, 8);
  assert.equal(f.filter(x => x.pond === 11).length, 3);
  assert.equal(f.filter(x => x.pond <= 7 && x.confirmed).length, 53);
  assert.equal(f.filter(x => x.pond >= 8 && x.pond <= 9 && x.confirmed).length, 16);
});
test('17 class names map to the six approved design General Luck bands', () => {
  const c = site('guides').window.MFF_DATA.classes;
  assert.equal(c.length, 17);
  assert.deepEqual([...new Set(c.map(x => x.generalLuck))].sort((a,b)=>a-b), [1,1.25,1.6,2.25,3.25,5]);
  assert.equal(c.find(x => x.name === 'Frog God').generalLuck, 5);
  assert.equal(c.find(x => x.name === 'Scientist').generalLuck, 3.25);
});
for (const route of ['home','game','frogdex','odds','guides','mutations','updates','about']) {
  test(route + ' renders without throwing', () => assert.ok(site(route).app.innerHTML.length > 500));
}
test('Frogdex filters actually alter rendered results', () => {
  const s = site('frogdex');
  const results = s.nodes.get('frog-results');
  assert.equal((results.innerHTML.match(/data-frog=/g) || []).length, 81);
  s.listeners.input({ target: { id: 'frog-search', value: 'Comet' } });
  assert.match(results.innerHTML, /Comet Frog/);
  assert.equal((results.innerHTML.match(/data-frog=/g) || []).length, 1);
});
test('Odds selectors respond but refuse to fabricate per-species percentages', () => {
  const s = site('odds'), results = s.nodes.get('odds-results');
  assert.match(results.innerHTML, /Not verified/);
  s.listeners.change({ target: { id: 'calc-class', value: 'Frog God' } });
  assert.match(results.innerHTML, /5×/);
  s.listeners.change({ target: { id: 'calc-pond', value: '11' } });
  assert.match(results.innerHTML, /Pond 11/);
  assert.doesNotMatch(results.innerHTML, /chance:\s*\d+(\.\d+)?%/i);
});
test('Unconfigured official links cannot accidentally open a made-up URL', () => {
  const s = site('home');
  const action = { target: { closest(selector) { return selector === '.play-action' ? {} : null; } } };
  s.listeners.click(action);
  assert.equal(s.window.opened.length, 0);
});
test('Release status, roadmap, announcements and public patch-note boundaries show', () => {
  const source = site('updates').app.innerHTML.toLowerCase();
  for (const name of ['launch status','live stats','events & announcements','patch notes','roadmap','not connected']) assert.ok(source.includes(name), name);
});
test('Static file references and responsive CSS exist', () => {
  assert.match(html, /src="\.\/data\.js"/);
  assert.match(html, /src="\.\/app\.js"/);
  assert.match(css, /@media\(max-width:670px\)/);
  assert.ok(fs.existsSync(path.join(root,'assets','frog-hero.svg')));
  assert.ok(fs.existsSync(path.join(root,'assets','favicon.svg')));
});
