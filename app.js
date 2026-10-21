
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
  let featuredIndex = 0;
  const spotlightIds = ['BlockyFrog','MushroomFrog','CrystalbackFrog','Bellfrog','Cometfrog'];
  function featuredCard() {
    const f = D.frogs.find(x=>x.id===spotlightIds[featuredIndex]) || D.frogs[0];
    return '<div class="spotlight-figure"><img class="spotlight-frog-img" src="./assets/frog-hero.svg" alt="" loading="lazy" style="filter:hue-rotate(' + (f.pond * 24) + 'deg) drop-shadow(0 9px 10px #20462a5a)"><small>Illustrative artwork · game render pending</small></div>' +
      '<div><span class="mini-label">Featured frog · Studio roster</span><h3>' + esc(f.id) + '</h3><p>' + pill(f.rarity) + ' · First available tier: Pond ' + f.pond + '</p>' +
      '<p class="muted">A real species from our game catalogue. We will add its official model and description once its approved website artwork is ready.</p>' +
      '<div class="spotlight-buttons"><button class="btn btn-dark" data-frog="' + esc(f.id) + '">View details ↗</button><button class="btn btn-outline" id="next-featured">Another frog ↻</button></div></div>';
  }
  function home() {
    return '<section class="hero hero-refined"><div class="container hero-grid"><div><span class="eyebrow">Welcome to My Frog Farm</span><h1>Small ponds.<br><em>Big adventures.</em></h1>' +
      '<p>Catch wonderfully weird frogs, grow a cosy little farm, and see what is hiding around the next lily pad.</p>' +
      '<div class="hero-actions"><button class="btn btn-dark play-action"><span class="roblox-diamond"></span> Play on Roblox ↗</button><button class="btn btn-outline discord-action">Join our Discord ↗</button></div>' +
      '<p class="hero-note">🌱 In development · Official game link and launch date coming later</p></div>' +
      '<div class="hero-art"><div class="hero-orbit"></div><img class="hero-illustration" src="./assets/frog-hero.svg" alt="Original illustration of a happy green frog sitting on a lily pad"><span class="floating-note note-top">small pond,<br>big dreams!</span></div></div></section>' +
      section(sectionHead('The adventure','Simple to start.<br>Hard to put down.','Everything you need to explore the world without cluttering your screen.') +
      '<div class="cards"><div class="card"><div class="card-emoji">🐸</div><h3>Meet the frogs</h3><p>Explore 81 planned Frogdex slots across the entire rarity ladder.</p>' + href('frogdex','Browse the Frogdex ↗') + '</div>' +
      '<div class="card"><div class="card-emoji">🍀</div><h3>Find your luck</h3><p>Build a pond, net, class and favourite setup in our source-aware odds lab.</p>' + href('odds','Try the calculator ↗') + '</div>' +
      '<div class="card"><div class="card-emoji">🌱</div><h3>Grow your farm</h3><p>Catch, place and earn while you explore increasingly rare ponds.</p>' + href('game','How to play ↗') + '</div></div>',true) +
      section('<div class="home-spotlight"><div><span class="eyebrow">Every frog has a story</span><h2>Meet this little<br>legend.</h2><p class="lede">A peek at one of our actual named species. Say hello, then browse the rest of the Frogdex.</p><p>' + href('frogdex','Explore the Frogdex →') + '</p></div>' +
      '<div class="spotlight-display" id="featured-card">' + featuredCard() + '</div></div>') +
      section('<div class="home-calculator"><div><span class="eyebrow">A little bit of maths</span><h2>How lucky are <em>you?</em></h2><p class="lede">Explore the planned v0.8 system with real class General Luck bands and selectable pond, net and favourite settings.</p>' +
      '<p class="small muted">We do not show percentages until the website maths exactly matches the authoritative Roblox source and tests.</p>' +
      href('odds','Open catch-odds calculator ↗','btn btn-dark') + '</div>' +
      '<div class="home-calc-preview"><span class="mini-label">Your next tool · Interactive preview</span><div class="mini-preview-row"><span>Planned class General Luck</span><strong>1× – 5×</strong></div><div class="mini-preview-row"><span>Planned frog catalogue</span><strong>81 slots</strong></div><div class="mini-preview-row"><span>Effective encounter odds</span><strong>Verification required</strong></div><div class="mini-preview-row"><span>Current Roblox v0.8</span><strong>Feature flag OFF</strong></div></div></div>',true) +
      section('<div class="cta-band"><div><span class="mini-label" style="color:#c5edac">The community</span><h2>The pond is better together.</h2><p>Project announcements, discussions and occasional sneak peeks when available. Discord is where we want our frog people to gather.</p></div>' +
      '<button class="btn btn-light discord-action">Join our Discord ↗</button></div>' +
      '<div class="home-last-update"><span>Latest Studio Edit report: 69 ordinary species across 9 ponds, 19 October 2026.</span>' + href('updates','Developer notes →') + '</div>');
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
    const art = f.confirmed
      ? '<img class="frog-card-img" src="./assets/frog-hero.svg" alt="" loading="lazy" style="filter:hue-rotate(' + (f.pond * 28) + 'deg) drop-shadow(0 10px 8px #19462b60)">'
      : '<span class="frog-illustration frog-silhouette" aria-hidden="true">?</span>';
    return '<button class="frog-card" data-frog="' + esc(f.id) + '" aria-label="View ' + esc(f.isSecret ? 'hidden frog' : f.name) + '">' +
      '<div class="frog-art" style="--frog-bg:' + color + '70">' + art + '</div>' +
      '<div class="frog-meta"><span class="pill rarity" style="--pill-bg:' + color + '55">' + esc(f.rarity) + '</span>' +
      '<h3>' + esc(f.confirmed ? f.name : (f.isSecret ? '???' : 'Unrevealed Frog')) + '</h3>' +
      '<p>' + (f.isSecret ? 'Hidden discovery' : 'Pond ' + f.pond) + ' · ' + (f.confirmed ? 'Illustrative art, Studio roster' : 'Planned, not yet revealed') + '</p></div></button>';
  }
  function frogdex() {
    return hero('Your field guide','The Frogdex.','Meet the wonderfully weird residents of My Frog Farm. Search the collection and explore every rarity tier.') +
      section(notice('Catalogue transparency','69 named species are sourced from the game’s development records. The 11 upcoming regular species and secret are intentionally shown as unrevealed slots. Emoji are placeholders, not actual Roblox frog models.',true) +
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
      (f.name.toLowerCase().includes(state.search.toLowerCase()) || f.id.toLowerCase().includes(state.search.toLowerCase().replace(/\s+/g,'')) || f.rarity.toLowerCase().includes(state.search.toLowerCase())));
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

  // Per-species preview is complete as a browsing table; no invented percentages.
  // This must not be described as the verified server encounter candidate set.
  function addFrogOddsTable() {
    const container = $('#odds-results');
    if (!container) return;
    const pond = Number(state.calcPond);
    const introduced = D.frogs.filter(f => f.confirmed && !f.isSecret && f.pond <= pond);
    const rows = introduced.map(f => '<tr class="species-row" data-name="' + esc(f.id.toLowerCase()) + '"><td>' + esc(f.id) + '</td><td>' + esc(f.rarity) +
      '</td><td class="locked-value">Unverified</td><td class="locked-value">Unverified</td></tr>').join('');
    const box = document.createElement('div');
    box.className = 'species-breakdown';
    box.innerHTML = '<h3>All documented frog entries</h3>' +
      '<p class="small">This is the set of named species introduced through your selected pond, not a verified encounter pool. Earlier and later rarity eligibility is subject to game-specific rules.</p>' +
      '<label class="odds-label" for="calc-frog-search">Find a frog in this preview</label>' +
      '<input id="calc-frog-search" class="input" type="search" placeholder="Search frogs..." autocomplete="off">' +
      '<p class="small" id="species-count">' + introduced.length + ' documented species · no probabilities verified</p>' +
      '<div class="table-wrap"><table class="data-table"><thead><tr><th>Species</th><th>Rarity</th><th>Base odds</th><th>Effective odds</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="small">Best/worst odds, exact rarity shares and favourite-adjusted per-frog probabilities will appear only after source parity QA.</p>';
    container.appendChild(box);
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
    return hero('A little bit magical','Mutations & mysteries. ✨','Some frogs are more unusual than others. Meet the mutation system being built for launch.') +
      section(notice('Mutation visuals are not final','Sam owns mutation art and initial implementation. This page shows conceptual visual treatments, not official mutation models, rates, multipliers or a verified full mutation list.',true) +
      '<div class="mutant-grid"><div class="mutant-card"><div class="mutant-preview" style="background:radial-gradient(circle,#f9e3fa,#e3e0ff)">✨🐸</div><h3>Shimmering possibilities</h3><p class="muted">Visual concept preview only. Official variant names and models will be imported after sign-off.</p>' + pill('Concept art direction','pill-muted') + '</div><div class="mutant-card"><div class="mutant-preview" style="background:radial-gradient(circle,#ffeed3,#f5d9cc)">🔥🐸</div><h3>Strange new colours</h3><p class="muted">Mutations can alter appearance and movement. Their bonuses affect Coins, not catching luck.</p>' + pill('Coin-only effects','pill-muted') + '</div><div class="mutant-card"><div class="mutant-preview" style="background:radial-gradient(circle,#d7f7ed,#bcdfe5)">🌟🐸</div><h3>Rare surprises</h3><p class="muted">The Scientist experiment system is designed for launch but is not yet active in Roblox.</p>' + pill('In development','pill-muted') + '</div></div>') +
      section(sectionHead('The rules','What is actually decided.','The website will never present a placeholder mutation as a confirmed in-game item.') +
      '<div class="info-list"><div class="info-row"><span class="number">✓</span><div><h3>Coin bonuses, not catch luck</h3><p>Mutations can boost Coin generation and include distinctive visual or movement effects.</p></div></div><div class="info-row"><span class="number">✓</span><div><h3>Sam-led creative work</h3><p>Sam is developing mutation content. The final website gallery will use approved real models and data.</p></div></div><div class="info-row"><span class="number">…</span><div><h3>Exact chances pending</h3><p>Acquisition probabilities, full catalogue, appearance assets and Coin multipliers will only be published once sourced.</p></div></div></div>',true);
  }
  function updates() {
    return hero('From our lily pad','What’s happening?','Actual development notes, planned milestones and honest launch information. No fabricated dates, event announcements or live player counts.') +
      section(sectionHead('Developer notes','From the pond desk.','Development news is clearly separated from public Roblox patch notes.') +
      '<div class="timeline">' + D.news.map(n=>'<article class="timeline-item"><span class="mini-label">' + esc(n.date) + ' · ' + esc(n.category) + '</span><h3>' + esc(n.title) + '</h3><p>' + esc(n.detail) + '</p></article>').join('') + '</div>') +
      section(sectionHead('Where we are','Launch status & live stats.','Public launch depends on the whole 81-species scope, safety testing and a release decision.') +
      '<div class="status-row"><div class="status-tile"><span class="mini-label">Launch countdown</span><strong>Not announced</strong><p>A countdown will only start when an official launch date exists.</p></div>' +
      '<div class="status-tile"><span class="mini-label">Current players</span><strong>Not connected</strong><p>No trustworthy Roblox live player endpoint configured. We will never show invented counts.</p></div>' +
      '<div class="status-tile"><span class="mini-label">Total game visits</span><strong>Not connected</strong><p>Real statistics will appear only once available from an authorized reliable source.</p></div></div>',true) +
      section(sectionHead('The roadmap','What is next?','Public-facing development direction. Changes and priorities are not a release guarantee.') +
      '<div class="cards">' + D.roadmap.map(r=>'<article class="card">' + pill(r.status,'pill-muted') + '<h3 style="margin-top:15px">' + esc(r.title) + '</h3><p>' + esc(r.text) + '</p></article>').join('') + '</div>') +
      section(sectionHead('News & events','Nothing made up.','Announcements appear here only when we have something confirmed to share.') +
      '<div class="updates-lower"><div class="card"><span class="card-emoji">📣</span><h3>Events & announcements</h3><p>Nothing officially scheduled or announced yet. This is where we will publish genuine dates, activities and news.</p><button class="btn btn-outline discord-action">Community updates ↗</button></div>' +
      '<div class="card"><span class="card-emoji">📝</span><h3>Patch notes</h3><p>No public patch notes yet. Internal Studio edits are not advertised as shipped features.</p>' + href('game','Explore the game →') + '</div></div>',true) +
      section(sectionHead('Possibly later','Extra community features.','Keep launch focused, then add these only when they make sense.') +
      '<div class="cards"><div class="card"><span class="card-emoji">🎬</span><h3>Gameplay trailer</h3><p>Requires approved real gameplay footage; no fake video or release claims.</p></div>' +
      '<div class="card"><span class="card-emoji">🎨</span><h3>Community gallery</h3><p>Requires upload permissions, owner approval and ongoing moderation. Not running yet.</p></div>' +
      '<div class="card"><span class="card-emoji">✉️</span><h3>Email newsletter</h3><p>Not collecting addresses. Discord is our main community channel until a compliant mailing service is selected.</p></div></div>');
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
      '<div class="dialog-art" aria-hidden="true">' + (f.confirmed?'<img class="modal-frog-img" src="./assets/frog-hero.svg" alt="Illustrative frog art">':'❔') + '</div>' +
      pill(f.rarity) + '<h2 style="font-size:34px;margin:14px 0">' + esc(f.confirmed ? f.id : (f.isSecret ? '???' : 'Unrevealed Frog')) + '</h2>' +
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
    if(route==='odds'){updateOdds();addFrogOddsTable();}
    window.scrollTo({top:0,behavior:'instant'});
  }
  document.addEventListener('click', e=>{
    const pageAnchor = e.target.closest('a[href^="#"]');
    const local = pageAnchor && pageAnchor.getAttribute('href');
    if (local && /^#(?:catching-guide|net-guide|class-guide|progression-guide)$/.test(local)) {
      e.preventDefault();
      document.getElementById(local.slice(1))?.scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    const frog = e.target.closest('[data-frog]');
    if(frog){showFrog(frog.dataset.frog);return;}
    const scrollControl=e.target.closest('[data-scroll-to]');
    if(scrollControl){ const target=document.getElementById(scrollControl.dataset.scrollTo); if(target && target.scrollIntoView) target.scrollIntoView({behavior:'smooth',block:'start'}); return; }
    if(e.target.closest('#next-featured')){featuredIndex=(featuredIndex+1)%spotlightIds.length;const node=$('#featured-card');if(node)node.innerHTML=featuredCard();return;}
    if(e.target.closest('.play-action')){handleLink('roblox');return;}
    if(e.target.closest('.discord-action')){handleLink('discord');return;}
    const social=e.target.closest('[data-social]');
    if(social){handleLink(social.dataset.social);return;}
    if(e.target.closest('#reset-odds')){Object.assign(state,{calcPond:'9',calcNet:'Transcendent',calcClass:'Farmer',calcFavourite:'none'});render();return;}
    if(e.target.closest('#menu-toggle')){const menu=$('#mobile-menu');menu.hidden=!menu.hidden;$('#menu-toggle').setAttribute('aria-expanded',String(!menu.hidden));}
  });
  document.addEventListener('input', e=>{
    if(e.target.id==='calc-frog-search'){
      const q=e.target.value.trim().toLowerCase();
      let count=0;
      document.querySelectorAll('.species-row').forEach(row=>{const hit=row.dataset.name.includes(q);row.hidden=!hit;if(hit)count++;});
      const label=$('#species-count');if(label)label.textContent=count+' matching documented species · no probabilities verified';
    }
    if(e.target.id==='frog-search'){state.search=e.target.value;updateFrogdex();}
  });
  document.addEventListener('change',e=>{
    const map={'rarity-filter':'rarity','pond-filter':'pond','sort-filter':'order','calc-pond':'calcPond','calc-net':'calcNet','calc-class':'calcClass','calc-favourite':'calcFavourite'};
    if(map[e.target.id]){state[map[e.target.id]]=e.target.value;if(e.target.id.startsWith('calc-')){updateOdds();addFrogOddsTable();}else updateFrogdex();}
  });
  $('#frog-modal').addEventListener('click',e=>{if(e.target===$('#frog-modal'))$('#frog-modal').close();});
  $('#current-year').textContent=String(new Date().getFullYear());
  window.addEventListener('hashchange',render);
  render();
})();
