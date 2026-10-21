
(function () {
  'use strict';
  const D = window.MFF_DATA;
  const app = document.getElementById('app');
  const $ = (s, root = document) => root.querySelector(s);
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const href = (route, text, cls = 'text-link') => '<a class="' + cls + '" href="#/' + route + '">' + text + '</a>';
  const pill = (text, cls = '') => '<span class="pill ' + cls + '">' + esc(text) + '</span>';
  const sectionHead = (eyebrow, title, text, centered = false) => '<div class="section-head' + (centered ? ' center' : '') + '"><span class="eyebrow">' + eyebrow + '</span><h2>' + title + '</h2><p>' + text + '</p></div>';
  const hero = (tag, title, desc) => '<section class="page-hero"><div class="container"><span class="eyebrow">' + tag + '</span><h1>' + title + '</h1><p class="lede">' + desc + '</p></div></section>';
  const notice = (title, body, neutral = false) => '<div class="notice ' + (neutral ? 'notice-neutral' : '') + '"><strong>' + title + '</strong><p>' + body + '</p></div>';
  const rarityColor = r => (D.rarity.find(x => x.name === r) || {}).theme || '#ddd9e9';
  const countBy = r => D.frogs.filter(f => f.rarity === r).length;
  const opts = (values, selected) => values.map(v => '<option value="' + esc(v.value) + '"' + (String(v.value) === String(selected) ? ' selected' : '') + '>' + esc(v.label) + '</option>').join('');
  const field = (id, label, choices, value) => '<div class="field"><label for="' + id + '">' + label + '</label><select class="select" id="' + id + '">' + opts(choices, value) + '</select></div>';
  const pondOptions = D.rarity.map(x => ({value:x.pond,label:'Pond ' + x.pond + ' · ' + x.name}));
  const state = {search:'', rarity:'all', pond:'all', order:'pond', calcPond:'9', calcNet:'Transcendent', calcClass:'Farmer', calcFavourite:'none'};
  const netNames = D.rarity.map(x => x.name);
  const section = (body, tint = false) => '<section class="section' + (tint ? ' section-tint' : '') + '"><div class="container">' + body + '</div></section>';
  function toast(msg) {
    const node = document.createElement('div');
    node.className = 'toast';
    node.textContent = msg;
    $('#toast-region').appendChild(node);
    setTimeout(() => node.remove(), 4500);
  }
  function home() {
    const featured = D.frogs.find(f => f.id === 'MushroomFrog') || D.frogs[0];
    const latest = D.news[0];
    return '<section class="hero hero-editorial"><div class="container hero-grid"><div class="hero-copy">' +
      '<div class="editorial-tag"><span class="tag-sprout">✳</span> A VERY SMALL GAME ABOUT VERY MANY FROGS</div>' +
      '<h1>GET<br><span class="hero-heading-accent">FROGGY.</span></h1>' +
      '<p class="hero-lead">Find strange frogs. Make them a home. Watch your little pond turn into a very big deal.</p>' +
      '<div class="hero-actions"><button class="btn btn-dark play-action"><span class="roblox-diamond" aria-hidden="true"></span> Play on Roblox <span aria-hidden="true">↗</span></button><button class="btn btn-outline discord-action">Join the pond <span aria-hidden="true">↗</span></button></div>' +
      '<div class="hero-footnote"><span class="status-light" aria-hidden="true"></span> IN DEVELOPMENT <span class="hero-rule"></span> NO RELEASE DATE ANNOUNCED</div>' +
      '</div><div class="hero-stage"><div class="hero-stage-inner"><span class="stage-overline">FIELD NOTES // 001</span>' +
      '<img class="hero-illustration" src="./assets/pond-character.svg" alt="An original illustrated smiling frog resting on a lily pad, not a screenshot of the game" width="800" height="740" fetchpriority="high">' +
      '<div class="hero-stamp" aria-hidden="true">100%<span>FROG<br>ENERGY</span></div><span class="stage-caption">NOT AN IN-GAME MODEL · ORIGINAL SITE ART</span></div></div></div>' +
      '<div class="hero-wave" aria-hidden="true"></div></section>' +
      '<section class="field-intro section"><div class="container field-intro-grid"><div><span class="eyebrow">WHAT IS MY FROG FARM?</span><h2>Like collecting things?<br><em>Good. We made 81.</em></h2></div><div class="field-intro-copy"><p>Start with a net and a pond. Catch frogs you never knew existed. Give them a home, upgrade your farm and keep searching for the next one.</p><p class="footnote">81 species are planned for launch. 69 named ordinary frogs have been reported integrated in Studio Edit so far.</p>' + href('game','Take a look around <span aria-hidden="true">↗</span>','underlined-link') + '</div></div>' +
      '<div class="container"><div class="journey-rows"><a href="#/game" class="journey-row"><span class="journey-index">01</span><div><h3>Find your frog.</h3><p>Pick a pond, cast a net, and nail the catching minigame.</p></div><span class="journey-arrow" aria-hidden="true">↗</span></a>' +
      '<a href="#/game" class="journey-row"><span class="journey-index">02</span><div><h3>Build their little kingdom.</h3><p>Your habitat frogs earn Coins when they hop. They really do the work.</p></div><span class="journey-arrow" aria-hidden="true">↗</span></a>' +
      '<a href="#/frogdex" class="journey-row"><span class="journey-index">03</span><div><h3>Get extremely attached.</h3><p>Discover new species, chase rarities, fill your Frogdex.</p></div><span class="journey-arrow" aria-hidden="true">↗</span></a></div></div></section>' +
      '<section class="section section-showcase"><div class="container showcase-grid"><div class="showcase-visual"><span class="showcase-topline">THE FIELD GUIDE / SPECIMEN 01</span><img src="./assets/frog-portrait.svg" alt="Decorative frog illustration; actual Mushroomfrog model not yet supplied" width="240" height="200" loading="lazy"><span class="showcase-corner">POND 4 <span aria-hidden="true">✳</span></span></div><div class="showcase-copy"><span class="eyebrow">FEATURED FROG</span><h2>' + esc(featured.name) + '.</h2><p>Yes, this one exists in the development roster. No, we cannot show you Sam’s actual model here just yet. The Frogdex is being built around the real collection.</p>' +
      '<div class="showcase-tags"><span>EPIC</span><span>STUDIO ROSTER</span><span>ARTWORK TO COME</span></div>' + href('frogdex','Go frog spotting <span aria-hidden="true">↗</span>','btn btn-outline') + '</div></div></section>' +
      '<section class="section section-odds"><div class="container odds-feature"><div><span class="eyebrow">A LITTLE SCIENCE</span><h2>How lucky<br>are you, <em>really?</em></h2><p>Compare ponds, nets, classes and favourites in the catch-odds lab. We’re keeping the real percentages hidden until they match the Roblox server exactly.</p>' + href('odds','Open the odds lab <span aria-hidden="true">↗</span>','btn btn-dark') + '</div>' +
      '<div class="odds-receipt" aria-label="Preview of the interactive catch odds tool"><div class="receipt-title"><span>MY FROG FARM</span><span>LUCK DEPARTMENT</span></div><div class="receipt-header">YOUR CATCH SETUP<span>↗</span></div><div class="receipt-line"><span>Pond</span><strong>Choose 1–11</strong></div><div class="receipt-line"><span>Net</span><strong>Choose a tier</strong></div><div class="receipt-line"><span>Class luck</span><strong>17 classes</strong></div><div class="receipt-line"><span>Favourite</span><strong>Your pick</strong></div><div class="receipt-total"><span>VERIFIED PROBABILITIES</span><strong>COMING WHEN PROVEN</strong></div><div class="receipt-footer">NO MADE-UP ODDS. EVER.</div></div></div></section>' +
      '<section class="section section-community"><div class="container"><div class="community-lockup"><div><span class="eyebrow">GOT ROOM FOR ONE MORE?</span><h2>The pond has<br><em>good company.</em></h2><p>Come chat frogs, follow the build, and get the actual announcements when we have news worth sharing.</p><button class="btn btn-light discord-action">Join the Discord <span aria-hidden="true">↗</span></button></div><div class="community-note"><span class="community-note-top">PINNED ON THE NOTICE BOARD</span><strong>' + esc(latest.title) + '</strong><p>' + esc(latest.detail) + '</p>' + href('updates','Read the dev notes <span aria-hidden="true">↗</span>','underlined-link') + '</div></div></div></section>';
  }
  function game() {
    return hero('The game','A little farm. A lot of frogs.','Collect a growing family of curious creatures, upgrade your world and work your way through 11 planned pond tiers.') +
      section(sectionHead('The core loop','Catch. Collect. Grow. Repeat.','An easy loop to learn, with a whole lot to master.') +
      '<div class="steps"><div class="step"><span class="step-number">01</span><h3>Find a pond</h3><p>Choose an unlocked pond and prepare your net.</p></div><div class="step"><span class="step-number">02</span><h3>Catch a frog</h3><p>React in the minigame to land your next catch.</p></div><div class="step"><span class="step-number">03</span><h3>Grow your farm</h3><p>Place frogs in your habitat to earn Coins and Frogspawn through activity.</p></div><div class="step"><span class="step-number">04</span><h3>Unlock more</h3><p>Upgrade, discover new frogs and reach higher ponds.</p></div></div>') +
      section(sectionHead('The ponds','Eleven levels of discovery.','Every new pond introduces a new rarity tier. The later tiers are still being prepared for launch.') +
      '<div class="frog-grid">' + D.rarity.map(r => '<div class="card" style="padding:21px"><div class="card-emoji" style="background:' + r.theme + '66">🌿</div>' + pill('Pond ' + r.pond) + '<h3 style="margin:12px 0 4px">' + r.name + '</h3><p>' + countBy(r.name) + ' species ' + (r.pond <= 9 ? 'listed' : 'planned') + '</p></div>').join('') + '</div>',true) +
      section(sectionHead('Farm life','Every hop counts.','Place frogs to generate Coins on successful jumps. Frogspawn is a separate currency from frog activity. Upgrade designs are evolving before launch.') +
      '<div class="cards"><div class="card"><div class="card-emoji">🪙</div><h3>Coins</h3><p>Earned from placed frogs jumping; used for progression and improvements.</p></div><div class="card"><div class="card-emoji">🫧</div><h3>Frogspawn</h3><p>Automatically earned through frog jump progress. Planned uses include Scientist experiments.</p></div><div class="card"><div class="card-emoji">🔬</div><h3>The Scientist</h3><p>A designed pre-launch NPC with risk/reward mutation experiments. Not yet implemented.</p></div></div>');
  }
  function frogCard(f) {
    const color = rarityColor(f.rarity);
    const label = f.confirmed ? esc(f.name.slice(0,2).toUpperCase()) : '??';
    return '<button class="frog-card" data-frog="' + esc(f.id) + '" aria-label="View ' + esc(f.name) + '"><div class="frog-art" style="--frog-bg:' + color + '"><span class="specimen-number">SPECIMEN / ' + String(D.frogs.indexOf(f)+1).padStart(3,'0') + '</span>' +
      '<img class="frog-illustration" src="./assets/frog-portrait.svg" alt="" loading="lazy" width="240" height="200"><span class="frog-stamp" aria-hidden="true">' + label + '</span></div>' +
      '<div class="frog-meta"><span class="frog-rarity-line"><span class="rarity-dot" style="background:' + color + '"></span>' + esc(f.rarity) + '</span><h3>' + esc(f.name) + '</h3><p>' + (f.isSecret ? 'Hidden discovery' : 'Pond ' + f.pond) + ' <span aria-hidden="true">·</span> ' + (f.confirmed ? 'Studio roster' : 'Planned') + '</p><span class="frog-more">Meet this frog <span aria-hidden="true">↗</span></span></div></button>';
  }
  function frogdex() {
    return hero('Your field guide','The Frogdex.','Meet the wonderfully weird residents of My Frog Farm. Search the collection and explore every rarity tier.') +
      section(notice('Catalogue transparency','69 named species are sourced from the game’s development records. The 11 upcoming regular species and secret are intentionally shown as unrevealed slots. Website illustrations are placeholders, not actual Roblox frog models.',true) +
      '<div class="toolbar"><div class="field"><label for="frog-search">Search frogs</label><input id="frog-search" class="input" type="search" placeholder="Try “Mushroom” or “Dragon”..." value="' + esc(state.search) + '"></div>' +
      field('rarity-filter','Rarity',[{value:'all',label:'All rarities'},...D.rarity.map(r=>({value:r.name,label:r.name})),{value:'Secret',label:'Secret'}],state.rarity) +
      field('pond-filter','Pond',[{value:'all',label:'All ponds'},...pondOptions],state.pond) +
      field('sort-filter','Sort by',[{value:'pond',label:'Pond (low to high)'},{value:'name',label:'Name (A–Z)'},{value:'reverse',label:'Pond (high to low)'}],state.order) + '</div><div id="frog-results"></div>');
  }
  function updateFrogdex() {
    const result = $('#frog-results');
    if (!result) return;
    let items = D.frogs.filter(f => (state.rarity === 'all' || f.rarity === state.rarity) &&
      (state.pond === 'all' || String(f.pond) === state.pond) &&
      (f.name.toLowerCase().includes(state.search.toLowerCase()) || f.rarity.toLowerCase().includes(state.search.toLowerCase())));
    items = items.slice().sort((a,b) => state.order === 'name' ? a.name.localeCompare(b.name) : state.order === 'reverse' ? b.pond-a.pond || a.name.localeCompare(b.name) : a.pond-b.pond || a.name.localeCompare(b.name));
    result.innerHTML = '<p class="result-count">Showing ' + items.length + ' of ' + D.frogs.length + ' planned entries</p>' +
      (items.length ? '<div class="frog-grid">' + items.map(frogCard).join('') + '</div>' : '<div class="empty-state">No frogs match those filters. Try another search! 🐸</div>');
  }
  function odds() {
    const classChoices = D.classes.map(c => ({value:c.name,label:c.name + ' · ' + c.generalLuck + '× planned luck'}));
    const netChoices = netNames.map(n => ({value:n,label:n + ' net (tier label)'}));
    const favouriteChoices = [{value:'none',label:'No favourite'},...D.frogs.filter(f=>f.confirmed).map(f=>({value:f.id,label:f.id}))];
    return hero('The catch odds lab','How lucky are you? 🍀','Explore pond, net, class and favourite selections. Exact probabilities will be unlocked only when they can be verified against the Roblox game.') +
      section(notice('Exact odds unavailable — intentionally','The approved v0.8 class mapping is available, but the complete server-side encounter weights, net modifiers, eligibility logic and parity tests are not. v0.8 is also not yet active in the game. We will not present invented percentages as real chances.') +
      '<div class="calculator"><div class="control-panel"><h3>🎯 Your setup</h3>' +
      field('calc-pond','Your pond',pondOptions,state.calcPond) +
      field('calc-net','Equipped net',netChoices,state.calcNet) +
      field('calc-class','Player class',classChoices,state.calcClass) +
      field('calc-favourite','Favourite frog',favouriteChoices,state.calcFavourite) +
      '<button id="reset-odds" class="btn btn-outline" style="width:100%">Reset selections</button></div>' +
      '<div id="odds-results" class="result-panel"></div></div>') +
      section(sectionHead('Behind the numbers','How catching odds work.','A selection can change the encounter distribution, but no single multiplier is itself a final percentage.') +
      '<div class="info-list"><div class="info-row"><span class="number">1</span><div><h3>Base odds</h3><p>Each frog has a game-defined base encounter weight. The full source weights are not currently published in the website data.</p></div></div><div class="info-row"><span class="number">2</span><div><h3>Pond & net</h3><p>Your pond determines the available rarity ladder. Net rarity luck adjusts the weighting. Higher rarity is never automatically guaranteed.</p></div></div><div class="info-row"><span class="number">3</span><div><h3>Class & favourite</h3><p>Planned class-based General Luck and favourite targeting affect encounters. The 3× favourite encounter-weight design is not the same as tripling the final chance.</p></div></div><div class="info-row"><span class="number">4</span><div><h3>Normalisation</h3><p>The server compares all eligible weighted candidates and normalises them into a distribution totalling 100%. Until we import the exact server code and fixtures, effective probabilities cannot be faithfully reproduced.</p></div></div></div>',true);
  }
  function updateOdds() {
    const node = $('#odds-results');
    if (!node) return;
    const pond = Number(state.calcPond);
    const c = D.classes.find(x=>x.name===state.calcClass) || D.classes[0];
    const eligible = D.frogs.filter(f => f.confirmed && !f.isSecret && f.pond <= pond);
    const fav = D.frogs.find(f=>f.id===state.calcFavourite);
    node.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><h3>Encounter breakdown</h3>' + pill('Unverified engine','pill-warning') + '</div><p class="muted">Your selections update the eligible roster and known design inputs. Probabilities remain locked until verified.</p>' +
      '<div class="metric-grid"><div class="metric"><strong>' + eligible.length + '</strong><span>Named ordinary species through Pond ' + pond + '</span></div><div class="metric"><strong>' + c.generalLuck + '×</strong><span>Planned class General Luck</span></div><div class="metric"><strong>—</strong><span>Exact catch odds (not verified)</span></div></div>' +
      '<div class="callout"><strong>Current setup</strong><p class="small" style="margin:7px 0">Pond ' + pond + ' · ' + esc(state.calcNet) + ' net · ' + esc(c.name) + (fav ? ' · Favourite: ' + esc(fav.id) : ' · No favourite') + '</p><p class="small" style="margin:0">The class multiplier is an approved design value, not proof of the currently running Roblox luck calculation.</p></div>' +
      '<h3 style="margin-top:26px">Eligible rarity overview</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>Rarity</th><th>Named species</th><th>Effective share</th></tr></thead><tbody>' +
      D.rarity.filter(r=>r.pond<=pond).map(r=>'<tr><td>' + pill(r.name,'rarity" style="--pill-bg:' + r.theme + '55') + '</td><td>' + countBy(r.name) + (r.pond>9?' planned':'') + '</td><td class="locked-value">Not verified</td></tr>').join('') +
      '</tbody></table></div><p class="small" style="margin-top:16px">This eligibility overview is informational, not a replica of the server’s full candidate-selection logic. Secret encounter logic is not included.</p>';
  }
  function guides() {
    return hero('The field manual','Learn the ropes.','Everything a future frog farmer needs to know about catching, equipment, classes and progression.') +
      section('<div class="anchor-tabs"><button type="button" data-scroll-to="catching-guide">Catching</button><button type="button" data-scroll-to="net-guide">Nets & luck</button><button type="button" data-scroll-to="class-guide">Classes</button><button type="button" data-scroll-to="progression-guide">Progression</button></div>' +
      '<div id="catching-guide">' + sectionHead('01 / Getting started','Your first catch.','Start at a pond, cast your net and complete the catching minigame. A successful catch joins your inventory and contributes to your Frogdex discoveries.') +
      '<div class="cards"><div class="card"><div class="card-emoji">🎣</div><h3>Try a pond</h3><p>Higher ponds add new rarity tiers, while lower-tier species can still be relevant.</p></div><div class="card"><div class="card-emoji">⭐</div><h3>Pick a favourite</h3><p>The designed favourite system targets one species, with free switching and a 3× encounter-weight boost where eligible.</p></div><div class="card"><div class="card-emoji">📗</div><h3>Fill the Frogdex</h3><p>Discoveries are independent of current ownership. You can catch duplicates and set frogs free.</p></div></div></div>') +
      section('<div id="net-guide">' + sectionHead('02 / Equipment','A net for every adventure.','The planned rarity ladder runs from Basic to Transcendent. Net rarity luck and class luck are distinct sources; exact effective outcomes require the server algorithm.') +
      '<div class="frog-grid">' + D.rarity.map(r=>'<div class="card" style="padding:18px"><div class="card-emoji" style="background:' + r.theme + '55">🎣</div><h3>' + r.name + '</h3><p>Tier ' + r.pond + ' · precise net modifier not verified</p></div>').join('') + '</div>' +
      notice('Equipment figures are deliberately withheld','The net names shown here follow the rarity ladder as interface labels; they are not a verified export of equipment IDs, prices or modifiers. Check the game before treating these as purchasable items.',true) + '</div>',true) +
      section('<div id="class-guide">' + sectionHead('03 / Class guide','Choose your own advantage.','The approved v0.8 design maps 17 classes into six General Luck bands. These are proposed values, not active game effects.') +
      '<div class="table-wrap"><table class="data-table"><thead><tr><th>General Luck</th><th>Classes</th><th>Status</th></tr></thead><tbody>' +
      D.bands.map(b=>'<tr><td><strong>' + b.multiplier + '×</strong></td><td>' + esc(b.classes.join(' · ')) + '</td><td>Design only</td></tr>').join('') +
      '</tbody></table></div>' + notice('Mutations do not provide General Luck','The agreed mutation direction is visual changes and Coin bonuses. Class luck is separate from mutation-acquisition luck.',true) + '</div>') +
      section('<div id="progression-guide">' + sectionHead('04 / Progression','Grow at your own pace.','Explore the 11-pond ladder and build your farm as you discover more species.') +
      '<div class="info-list">' +
      D.rarity.map(r=>'<div class="info-row"><span class="number">' + r.pond + '</span><div><h3>' + r.name + ' pond</h3><p>' + countBy(r.name) + ' planned regular species at this tier. ' + (r.pond<=9?'Names listed in the Studio development catalogue.':'Names not yet verified for the website.') + '</p></div></div>').join('') +
      '</div><p class="small">Exact pond upgrade costs, discovery requirements and the proposed five-branch farm economy may change before release.</p></div>',true);
  }
  function mutations() {
    return hero('A little bit magical','Mutations & mysteries. ✨','Some frogs are more unusual than others. Meet the mutation system being built for launch.') +
      section(notice('Mutation visuals are not final','Sam owns mutation art and initial implementation. This page shows conceptual visual treatments, not official mutation models, rates, multipliers or a verified full mutation list.',true) +
      '<div class="mutant-grid"><div class="mutant-card"><div class="mutant-preview" style="background:radial-gradient(circle,#f9e3fa,#e3e0ff)">✨🐸</div><h3>Shimmering possibilities</h3><p class="muted">Visual concept preview only. Official variant names and models will be imported after sign-off.</p>' + pill('Concept art direction','pill-muted') + '</div><div class="mutant-card"><div class="mutant-preview" style="background:radial-gradient(circle,#ffeed3,#f5d9cc)">🔥🐸</div><h3>Strange new colours</h3><p class="muted">Mutations can alter appearance and movement. Their bonuses affect Coins, not catching luck.</p>' + pill('Coin-only effects','pill-muted') + '</div><div class="mutant-card"><div class="mutant-preview" style="background:radial-gradient(circle,#d7f7ed,#bcdfe5)">🌟🐸</div><h3>Rare surprises</h3><p class="muted">The Scientist experiment system is designed for launch but is not yet active in Roblox.</p>' + pill('In development','pill-muted') + '</div></div>') +
      section(sectionHead('The rules','What is actually decided.','The website will never present a placeholder mutation as a confirmed in-game item.') +
      '<div class="info-list"><div class="info-row"><span class="number">✓</span><div><h3>Coin bonuses, not catch luck</h3><p>Mutations can boost Coin generation and include distinctive visual or movement effects.</p></div></div><div class="info-row"><span class="number">✓</span><div><h3>Sam-led creative work</h3><p>Sam is developing mutation content. The final website gallery will use approved real models and data.</p></div></div><div class="info-row"><span class="number">…</span><div><h3>Exact chances pending</h3><p>Acquisition probabilities, full catalogue, appearance assets and Coin multipliers will only be published once sourced.</p></div></div></div>',true);
  }
  function updates() {
    return hero('From our lily pad','Latest development.','A peek behind the scenes as we work towards the first public release.') +
      section('<div class="timeline">' + D.news.map(n=>'<article class="timeline-item"><span class="mini-label">' + esc(n.date) + ' · ' + esc(n.category) + '</span><h3>' + esc(n.title) + '</h3><p>' + esc(n.detail) + '</p></article>').join('') + '</div>') +
      section(sectionHead('On the horizon','What we are working towards.','These are project milestones, not promises of release dates.') +
      '<div class="cards">' + D.roadmap.map(r=>'<article class="card">' + pill(r.status,'pill-muted') + '<h3 style="margin-top:15px">' + esc(r.title) + '</h3><p>' + esc(r.text) + '</p></article>').join('') + '</div>',true);
  }
  function about() {
    return hero('Our story','Made with a lot of love. 💚','My Frog Farm is an independently developed Roblox game by Seb and Sam, built around collecting frogs, growing a farm and chasing the next exciting discovery.') +
      section(sectionHead('The team','Two humans. So many frogs.','Seb works on systems, progression and implementation direction. Sam leads the frog and world designs, including the mutation visuals.') +
      '<div class="two-column"><div class="card"><div class="card-emoji">💻</div><h3>Seb</h3><p>Logic, game progression, systems and development planning.</p></div><div class="card"><div class="card-emoji">🎨</div><h3>Sam</h3><p>Frog design, map visuals, creative direction and mutations.</p></div></div>') +
      section(sectionHead('Good questions','Frequently asked.','The important stuff, answered without any frog business.') +
      D.faqs.map((f,i)=>'<details class="accordion"' + (i===0?' open':'') + '><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>').join(''),true) +
      section('<div class="cta-band"><div><h2>See you at the pond.</h2><p>We will share an official Roblox game link when public launch is confirmed.</p></div><button class="btn btn-light discord-action">Community updates ↗</button></div>');
  }
  function showFrog(id) {
    const f = D.frogs.find(x=>x.id===id);
    if (!f) return;
    const dialog = $('#frog-modal');
    dialog.innerHTML = '<button class="dialog-close" aria-label="Close details" id="close-frog">×</button>' +
      '<div class="dialog-art" aria-hidden="true"><img src="./assets/frog-portrait.svg" alt="" width="240" height="200"></div>' +
      pill(f.rarity) + '<h2 style="font-size:34px;margin:14px 0">' + esc(f.name) + '</h2>' +
      '<p>' + (f.isSecret?'Secret discovery; details withheld.': 'Pond ' + f.pond + ' · ' + (f.confirmed?'Named in Studio development records.':'Planned species slot, not yet revealed.')) + '</p>' +
      '<p class="small">Base odds: Not verified<br>Effective odds: Not verified<br>Visual: Placeholder illustration, not a Roblox model<br>Description: Awaiting approved lore and species details</p>' +
      '<button class="btn btn-dark" id="modal-odds">View odds setup →</button>';
    dialog.showModal();
    $('#close-frog').addEventListener('click',()=>dialog.close());
    $('#modal-odds').addEventListener('click',()=>{dialog.close();state.calcPond=String(f.pond);if(f.confirmed)state.calcFavourite=f.id;location.hash='#/odds';});
  }
  function handleLink(type) {
    const url = D.urls[type];
    if (url && /^https:\/\/[^\s]+$/i.test(url)) {
      window.open(url,'_blank','noopener,noreferrer');
    } else {
      toast(type === 'roblox' ? 'The official Roblox game link will appear here when launch is confirmed.' : 'The official ' + type + ' link has not been added yet.');
    }
  }
  const routes = {home,game,frogdex,odds,guides,mutations,updates,about};
  function render() {
    let route = location.hash.replace(/^#\/?/,'').split(/[/?]/)[0] || 'home';
    if (!routes[route]) route='home';
    app.innerHTML = routes[route]();
    document.querySelectorAll('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===route);if(a.dataset.nav===route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title = (route==='home'?'Catch something wonderful':route.charAt(0).toUpperCase()+route.slice(1)) + ' | My Frog Farm';
    $('#mobile-menu').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false');
    if(route==='frogdex')updateFrogdex();
    if(route==='odds')updateOdds();
    window.scrollTo({top:0,behavior:'instant'});
  }
  document.addEventListener('click', e=>{
    const jump=e.target.closest('[data-scroll-to]');
    if(jump){const dest=document.getElementById(jump.dataset.scrollTo);if(dest)dest.scrollIntoView({behavior:'smooth',block:'start'});return;}
    const frog = e.target.closest('[data-frog]');
    if(frog){showFrog(frog.dataset.frog);return;}
    if(e.target.closest('.play-action')){handleLink('roblox');return;}
    if(e.target.closest('.discord-action')){handleLink('discord');return;}
    const social=e.target.closest('[data-social]');
    if(social){handleLink(social.dataset.social);return;}
    if(e.target.closest('#reset-odds')){Object.assign(state,{calcPond:'9',calcNet:'Transcendent',calcClass:'Farmer',calcFavourite:'none'});render();return;}
    if(e.target.closest('#menu-toggle')){const menu=$('#mobile-menu');menu.hidden=!menu.hidden;$('#menu-toggle').setAttribute('aria-expanded',String(!menu.hidden));}
  });
  document.addEventListener('input', e=>{
    if(e.target.id==='frog-search'){state.search=e.target.value;updateFrogdex();}
  });
  document.addEventListener('change',e=>{
    const map={'rarity-filter':'rarity','pond-filter':'pond','sort-filter':'order','calc-pond':'calcPond','calc-net':'calcNet','calc-class':'calcClass','calc-favourite':'calcFavourite'};
    if(map[e.target.id]){state[map[e.target.id]]=e.target.value;if(e.target.id.startsWith('calc-'))updateOdds();else updateFrogdex();}
  });
  $('#frog-modal').addEventListener('click',e=>{if(e.target===$('#frog-modal'))$('#frog-modal').close();});
  $('#current-year').textContent=String(new Date().getFullYear());
  window.addEventListener('hashchange',render);
  render();
})();
