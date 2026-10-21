
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
      '<section class="field-intro section"><div class="container field-intro-grid"><div><span class="eyebrow">WHAT IS MY FROG FARM?</span><h2>Like collecting things?<br><em>Good. We’re making 81.</em></h2></div><div class="field-intro-copy"><p>Start with a net and a pond. Catch frogs you never knew existed. Give them a home, upgrade your farm and keep searching for the next one.</p><p class="footnote">81 species are planned for launch. 69 named ordinary frogs have been reported integrated in Studio Edit so far.</p>' + href('game','Take a look around <span aria-hidden="true">↗</span>','underlined-link') + '</div></div>' +
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
    return hero('THE POND GUIDE','So, what do you actually do?','Catch frogs. Give them a home. Convince yourself you only need one more.') +
      '<section class="section howto-section"><div class="container howto-layout"><div class="howto-intro"><span class="eyebrow">THE VERY IMPORTANT BASICS</span><h2>One pond.<br>A lot to do.</h2><p>There’s no huge instruction manual. Start small, get curious, and keep seeing what turns up.</p><div class="pond-sketch" aria-hidden="true"><div class="pond-ring pond-ring-one"></div><div class="pond-ring pond-ring-two"></div><img src="./assets/brand-frog.svg" alt="" width="120" height="120"></div></div>' +
      '<div class="howto-list"><div class="howto-row"><span>01</span><div><h3>Grab your net.</h3><p>Pick a pond you have unlocked. Watch for a bite and react in the catching minigame.</p></div></div><div class="howto-row"><span>02</span><div><h3>Meet your new frog.</h3><p>Every new species is a permanent Frogdex discovery—even if you later set it free.</p></div></div><div class="howto-row"><span>03</span><div><h3>Give it a place to hop.</h3><p>Placed frogs earn Coins on successful jumps and progress towards Frogspawn rewards.</p></div></div><div class="howto-row"><span>04</span><div><h3>See what’s next.</h3><p>Improve your farm, collect discoveries and unlock the next pond tier.</p></div></div></div></div></section>' +
      '<section class="section pond-ledger-section"><div class="container"><div class="pond-ledger-head">' + sectionHead('THE RARITY LADDER','Eleven ponds. Eleven kinds of trouble.','Every pond introduces the next rarity tier. Higher tiers are planned for the full launch.') + '<span class="ledger-side-note">A FIELD GUIDE TO<br>WHAT IS PLANNED</span></div><div class="pond-ledger">' +
      D.rarity.map(r=>'<div class="pond-ledger-row"><span class="pond-ledger-number">' + String(r.pond).padStart(2,'0') + '</span><span class="pond-ledger-swatch" style="background:' + r.theme + '"></span><span class="pond-ledger-name">' + esc(r.name) + '</span><span class="pond-ledger-species">' + countBy(r.name) + ' species</span><span class="pond-ledger-status">' + (r.pond<=9?'Studio roster':'Planned') + '</span></div>').join('') +
      '</div><p class="ledger-foot">Studio roster means recorded in the development build, not confirmation that the public game is live.</p></div></section>' +
      '<section class="section farm-economy-section"><div class="container"><div class="economy-intro"><span class="eyebrow">LIFE ON THE FARM</span><h2>Little hops.<br><em>Big improvements.</em></h2><p>The frogs do the hopping. You decide what to do with the rewards.</p></div><div class="economy-layout"><div class="economy-unit"><span class="economy-glyph" aria-hidden="true">C</span><div><span class="mini-label">COINS</span><h3>Every jump matters.</h3><p>Placed habitat frogs produce Coins as they land successful jumps.</p></div></div><div class="economy-unit"><span class="economy-glyph" aria-hidden="true">F</span><div><span class="mini-label">FROGSPAWN</span><h3>Patience pays off.</h3><p>Frog activity also builds up to automatic Frogspawn rewards.</p></div></div></div><div class="development-footnote"><span>COMING IN THE FULL GAME</span><p>A Scientist experiment system and more farm upgrades are in development. Design plans are not the same as shipped features.</p>' + href('updates','Read the development notes ↗','underlined-link') + '</div></div></section>';
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
    return hero('The catch odds lab','How lucky are you?','Explore pond, net, class and favourite selections. Exact probabilities will be unlocked only when they can be verified against the Roblox game.') +
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
      section('<div class="anchor-tabs"><button type="button" data-scroll-to="catching-guide">Catching</button><button type="button" data-scroll-to="net-guide">Nets & luck</button><button type="button" data-scroll-to="class-guide">Classes</button><button type="button" data-scroll-to="progression-guide">Progression</button><a href="#/mutations">Mutation showcase ↗</a></div>' +
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
    return hero('THE ODDITIES DEPARTMENT','Some frogs get... stranger.','Mutations change what your frogs look like, how they behave and how many Coins they can earn. They do not increase your catch luck.') +
      '<section class="section mutation-intro-section"><div class="container mutation-intro"><div><span class="eyebrow">FIELD OBSERVATION / 02</span><h2>Same frog.<br><em>Different story.</em></h2><p>We’re working on ways for familiar frogs to become something a little less familiar. This gallery shows website illustration treatments—not Sam’s actual mutant models.</p></div><div class="mutation-seal"><span>COIN<br>BOOSTS</span><small>NOT CATCH LUCK</small></div></div></section>' +
      '<section class="section mutation-gallery-section"><div class="container"><div class="mutation-gallery">' +
      '<article class="mutation-specimen mutation-specimen-a"><div class="mutation-image"><span class="mutation-index">VISUAL STUDY / 01</span><img src="./assets/frog-portrait.svg" alt="" width="240" height="200" loading="lazy"></div><div class="mutation-caption"><h3>Unusual colour.</h3><p>Appearance can change. Actual mutation looks are still sourced from the game.</p><span>CONCEPT DISPLAY</span></div></article>' +
      '<article class="mutation-specimen mutation-specimen-b"><div class="mutation-image"><span class="mutation-index">VISUAL STUDY / 02</span><img src="./assets/frog-portrait.svg" alt="" width="240" height="200" loading="lazy"></div><div class="mutation-caption"><h3>Unusual movement.</h3><p>Some variants can have their own behaviour alongside their Coin effects.</p><span>CONCEPT DISPLAY</span></div></article>' +
      '<article class="mutation-specimen mutation-specimen-c"><div class="mutation-image"><span class="mutation-index">VISUAL STUDY / 03</span><img src="./assets/frog-portrait.svg" alt="" width="240" height="200" loading="lazy"></div><div class="mutation-caption"><h3>Unusual rewards.</h3><p>The agreed mutation bonuses concern Coins. No General Luck is awarded.</p><span>DESIGN RULE</span></div></article>' +
      '</div></div></section>' +
      '<section class="section mutation-rule-section"><div class="container rule-split"><div><span class="eyebrow">ONE RULE TO REMEMBER</span><h2>Coins, yes.<br><em>Luck, no.</em></h2></div><div><p>Mutations and the planned class luck system are different parts of My Frog Farm. Mutation Coin multipliers will be shown here only when we have the verified game values and approved renders.</p>' +
      '<p class="small">The Scientist experiment experience is a separate development feature. This website does not claim that it is currently playable.</p>' +
      href('guides','Learn about classes & luck ↗','underlined-link') + '</div></div></section>';
  }
  function updates() {
    return hero('THE POND NOTICEBOARD','News from the reeds.','Development notes, release status and things we can actually confirm. No imaginary countdowns.') +
      '<section class="section news-editorial-section"><div class="container news-editorial-grid"><div><span class="eyebrow">DEVELOPMENT JOURNAL</span><h2>Notes from<br>behind the pond.</h2><p>We’ll distinguish work inside Roblox Studio from updates that players can actually use.</p></div><div class="timeline">' +
      D.news.map(n=>'<article class="timeline-item"><span class="mini-label">' + esc(n.date) + ' / ' + esc(n.category) + '</span><h3>' + esc(n.title) + '</h3><p>' + esc(n.detail) + '</p></article>').join('') +
      '</div></div></section>' +
      '<section class="section roadmap-section"><div class="container">' + sectionHead('LOOKING AHEAD','The to-do list is alive.','These are development milestones, not launch promises.') +
      '<div class="roadmap-list">' + D.roadmap.map((item,i)=>'<div class="roadmap-row"><span class="roadmap-number">' + String(i+1).padStart(2,'0') + '</span><div><span class="mini-label">' + esc(item.status) + '</span><h3>' + esc(item.title) + '</h3></div><p>' + esc(item.text) + '</p></div>').join('') + '</div></div></section>' +
      '<section class="section noticeboard-section"><div class="container"><span class="eyebrow">PUBLIC NOTICEBOARD</span><h2>Nothing invented.<br>Not even the numbers.</h2><div class="noticeboard-grid">' +
      '<div class="noticeboard-item"><span>LAUNCH COUNTDOWN</span><strong>Not announced</strong><p>A real countdown will appear if we announce a launch date.</p></div>' +
      '<div class="noticeboard-item"><span>ROBLOX PLAYER STATS</span><strong>Not connected</strong><p>Player counts and visits need a trustworthy official data source.</p></div>' +
      '<div class="noticeboard-item"><span>EVENTS & ANNOUNCEMENTS</span><strong>Nothing scheduled</strong><p>We’ll post real community events here when they are confirmed.</p></div>' +
      '<div class="noticeboard-item"><span>PUBLIC PATCH NOTES</span><strong>No public patch yet</strong><p>Studio development notes are not presented as released game updates.</p></div></div>' +
      '<div class="noticeboard-invite"><div><span class="eyebrow">WANT TO HEAR FIRST?</span><h3>Meet us on Discord.</h3></div><button class="btn btn-dark discord-action">Community updates ↗</button></div></div></section>';
  }
  function about() {
    return hero('BEHIND THE SCENES','Two people.<br>One very crowded pond.','My Frog Farm is a small independent Roblox project built by Seb and Sam. One part systems obsession, one part frogs with frankly ridiculous designs.') +
      '<section class="section creators-section"><div class="container creators-grid"><div class="creators-heading"><span class="eyebrow">WHO IS MAKING THIS?</span><h2>Small team.<br><em>Big frog plans.</em></h2><p>It started as a game about collecting frogs. That idea has grown into a whole little world.</p></div>' +
      '<div class="creator-ledger"><div class="creator-row"><span class="creator-letter">S.</span><div><span class="mini-label">SEB</span><h3>The systems side.</h3><p>Game logic, progression, implementation direction and the rather complicated catching odds.</p></div></div><div class="creator-row"><span class="creator-letter">S.</span><div><span class="mini-label">SAM</span><h3>The world side.</h3><p>Frog models, the farm and map, the visual identity of the world and mutation art.</p></div></div></div></div></section>' +
      '<section class="section about-world-section"><div class="container about-world"><div><span class="eyebrow">A LITTLE BIT OF THE WORLD</span><h2>Even a tiny pond has secrets.</h2><p>There are frogs hiding beyond your first pond, corners of the farm waiting to grow, and always something else worth finding. We want this to feel like a place you come back to—not a checklist you finish once.</p><p class="small">This is website flavour copy, not the final canonical game backstory.</p>' + href('game','Explore the game ↗','underlined-link') + '</div><div class="about-pond-art"><img src="./assets/pond-character.svg" alt="Decorative original frog artwork, not a game screenshot" loading="lazy" width="800" height="740"></div></div></section>' +
      '<section class="section faq-section"><div class="container faq-grid"><div><span class="eyebrow">GOOD QUESTIONS</span><h2>Before you<br>ask the frogs.</h2></div><div>' +
      D.faqs.map((faq,i)=>'<details class="accordion"' + (i===0?' open':'') + '><summary>' + esc(faq.q) + '</summary><p>' + esc(faq.a) + '</p></details>').join('') +
      '</div></div></section>' +
      '<section class="section about-end-section"><div class="container about-end"><h2>See you at the pond.</h2><button class="btn btn-light discord-action">Join the community ↗</button></div></section>';
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
