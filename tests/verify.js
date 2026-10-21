// Dependency-free repository consistency and JS syntax checks.
// Run: node tests/verify.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const cp = require('node:child_process');
for (const f of ['app.js', 'data.js']) cp.execFileSync(process.execPath, ['--check', f], {stdio:'inherit'});
const context = {window:{}};
vm.runInNewContext(fs.readFileSync('data.js','utf8'),context);
const D = context.window.MFF_DATA;
assert.equal(D.frogs.length,81);
assert.equal(D.frogs.filter(x=>x.confirmed).length,69);
assert.equal(D.frogs.filter(x=>x.isSecret).length,1);
assert.equal(D.frogs.filter(x=>x.state==='planned').length,12);
assert.equal(new Set(D.frogs.map(x=>x.id)).size,81);
assert.equal(D.classes.length,17);
assert.equal(new Set(D.classes.map(x=>x.name)).size,17);
assert.equal(D.rarity.length,11);
assert.equal(D.confirmedOddsEngine,false);
assert.equal(D.playablePubliclyConfirmed,false);
assert.ok(D.frogs.every(x=>x.baseOdds===null && x.catchWeight===null));
assert.ok(D.frogs.every(x=>x.artUrl===null));
assert.ok(D.bands.reduce((sum,b)=>sum+b.classes.length,0)===17);
assert.equal(D.frogs.filter(x=>x.pond<=7).length,53);
assert.equal(D.frogs.filter(x=>x.pond===8).length,8);
assert.equal(D.frogs.filter(x=>x.pond===9).length,8);
assert.equal(D.frogs.filter(x=>x.pond===10).length,8);
assert.equal(D.frogs.filter(x=>x.pond===11).length,3);
assert.ok(!D.urls.roblox && !D.urls.discord);
const html=fs.readFileSync('index.html','utf8');
for(const asset of ['styles.css','data.js','app.js','assets/favicon.svg']) {
  assert.ok(html.includes(asset),'missing reference '+asset);
  assert.ok(fs.existsSync(asset),'missing asset '+asset);
}
for(const route of ['home','game','frogdex','odds','guides','updates','about'])assert.ok(html.includes('data-nav="'+route+'"'));
assert.ok(fs.readFileSync('app.js','utf8').includes('Unverified engine'));
console.log('PASS: JS syntax, 81-species catalogue, classes, explicit odds parity gate, local assets and navigation.');
