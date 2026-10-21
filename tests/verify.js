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
assert.equal(D.frogs.filter(x=>x.pond<=7 && !x.isSecret).length,53);
assert.equal(D.frogs.filter(x=>x.pond===8).length,8);
assert.equal(D.frogs.filter(x=>x.pond===9).length,8);
assert.equal(D.frogs.filter(x=>x.pond===10).length,8);
assert.equal(D.frogs.filter(x=>x.pond===11).length,3);
assert.ok(!D.urls.roblox && !D.urls.discord);
const html=fs.readFileSync('index.html','utf8');
for(const asset of ['styles.css','design-v02.css','data.js','app.js','assets/brand-frog.svg']) {
  assert.ok(html.includes(asset),'missing reference '+asset);
  assert.ok(fs.existsSync(asset),'missing asset '+asset);
}
for(const route of ['home','game','frogdex','odds','guides','updates','about'])assert.ok(html.includes('data-nav="'+route+'"'));
assert.ok(fs.readFileSync('app.js','utf8').includes('Unverified engine'));
console.log('PASS: JS syntax, 81-species catalogue, classes, explicit odds parity gate, local assets and navigation.');

for(const asset of ['assets/pond-character.svg','assets/frog-portrait.svg']){
  assert.ok(fs.existsSync(asset),'missing illustration '+asset);
  assert.ok(fs.readFileSync('app.js','utf8').includes(asset),'unused illustration '+asset);
}
assert.ok(fs.readFileSync('design-v02.css','utf8').includes('.hero-editorial'));
assert.ok(fs.readFileSync('design-v02.css','utf8').includes('.mutation-editorial'));
assert.ok(fs.readFileSync('app.js','utf8').includes('NO MADE-UP ODDS'));
assert.ok(fs.readFileSync('app.js','utf8').includes('Not verified'));

function smoke(route) {
  const domNodes = Object.fromEntries(['app','mobile-menu','menu-toggle','frog-modal','current-year','frog-results','odds-results','toast-region'].map(id => [id,{
    innerHTML:'',textContent:'',hidden:false,style:{},
    setAttribute(){},removeAttribute(){},addEventListener(){},appendChild(){},
    classList:{toggle(){}},
    scrollIntoView(){},showModal(){},close(){}
  }]));
  const events = {};
  const document = {
    getElementById(id){return domNodes[id]||null;},
    querySelector(selector){return selector.startsWith('#')?domNodes[selector.slice(1)]||null:null;},
    querySelectorAll(){return [];},
    addEventListener(event,callback){events[event]=callback;},
    createElement(){return {className:'',textContent:'',remove(){}};}
  };
  const window = {MFF_DATA:D,scrollTo(){},addEventListener(){},open(){throw Error('Unconfigured social URL opened');}};
  vm.runInNewContext(fs.readFileSync('app.js','utf8'),{window,document,location:{hash:'#/'+route},setTimeout(){}});
  assert.ok(domNodes.app.innerHTML.length>500,route+' failed to render');
  return {domNodes,events};
}
for(const route of ['home','game','frogdex','odds','guides','mutations','updates','about'])smoke(route);
const dex=smoke('frogdex');
assert.equal((dex.domNodes['frog-results'].innerHTML.match(/data-frog=/g)||[]).length,81);
dex.events.input({target:{id:'frog-search',value:'Mushroom'}});
assert.equal((dex.domNodes['frog-results'].innerHTML.match(/data-frog=/g)||[]).length,1);
const odds=smoke('odds');
assert.ok(odds.domNodes['odds-results'].innerHTML.includes('Not verified'));
assert.ok(!odds.domNodes['odds-results'].innerHTML.includes('Exact catch odds: 50%'));
console.log('PASS: all eight routes render, Frogdex search filters, odds remain fail-closed, v0.2 assets referenced.');
