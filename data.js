/* My Frog Farm public website catalogue snapshot.
 * Verified against Notion Project Hub + Frog Catalogue, 21 October 2026.
 * Studio Edit content is NOT evidence of a public Roblox launch.
 * This is NOT a probability table; do not invent CatchWeight/BaseOdds.
 */
(function () {
  'use strict';
  var rarity = [
    { name: 'Basic', pond: 1, theme: '#91c878' },
    { name: 'Uncommon', pond: 2, theme: '#7bbba7' },
    { name: 'Rare', pond: 3, theme: '#85a9df' },
    { name: 'Epic', pond: 4, theme: '#b69bdd' },
    { name: 'Legendary', pond: 5, theme: '#e1ae60' },
    { name: 'Mythic', pond: 6, theme: '#e0a0c5' },
    { name: 'Exotic', pond: 7, theme: '#80caca' },
    { name: 'Divine', pond: 8, theme: '#edc778' },
    { name: 'Celestial', pond: 9, theme: '#a1b9e9' },
    { name: 'Cosmic', pond: 10, theme: '#b4a9e9' },
    { name: 'Transcendent', pond: 11, theme: '#e2b4cd' }
  ];
  var lists = [
    'BlockyFrog,Bluefrog,Fatfrog,Redfrog,Tallfrog',
    'BigeyeFrog,LongbackFrog,MudbellyFrog,PebbleFrog,RidgebackFrog,ShovelheadFrog,StripelegFrog,WidefootFrog',
    'BullheadFrog,FlatleafFrog,GoldstripeFrog,LonglegFrog,MaskeyeFrog,SaddlebackFrog,SpadefootFrog,StonejawFrog',
    'BroadshieldFrog,EmberbackFrog,FrillbackFrog,GorgejawFrog,MosscloakFrog,MushroomFrog,PaddletoeFrog,TigerstripeFrog',
    'CrestbackFrog,CubejawFrog,EmberpadFrog,KnobtoeFrog,MawbackFrog,PillarbackFrog,PlatebackFrog,RibbonfaceFrog',
    'Bubblegumfrog,CoilbodyFrog,CrownheadFrog,Eyesfrog,Frogipedefrog,RingbackFrog,SplitbackFrog,TowerEyeFrog',
    'CrystalbackFrog,MagmaChimneyFrog,MonolithFrog,NautilusFrog,PorcelainFrog,ScarabbackFrog,SharkjawFrog,StagrootFrog',
    'Triplefrog,Wizardfrog,Glassfrog,Jellyfrog,Pandafrog,Treefrog,Frogfrog,Bellfrog',
    'Volcanofrog,Dragonfrog,Moonfrog,Eclipsefrog,Cometfrog,Pegasusfrog,Horsefrog,Lanternfrog'
  ];
  var frogs = [];
  lists.forEach(function (list, i) {
    list.split(',').forEach(function (id) {
      frogs.push({
        id: id, name: id.replace(/frog$/i, ' Frog').replace(/([a-z])([A-Z])/g, '$1 $2').trim(),
        rarity: rarity[i].name, pond: i + 1,
        state: 'studio-edit', confirmed: true, isSecret: false,
        baseOdds: null, catchWeight: null, artUrl: null
      });
    });
  });
  for (var tier = 10; tier <= 11; tier++) {
    for (var number = 1; number <= (tier === 10 ? 8 : 3); number++) {
      frogs.push({
        id: 'pending-' + tier + '-' + number,
        name: 'Unrevealed frog ' + number,
        rarity: rarity[tier - 1].name, pond: tier,
        state: 'planned', confirmed: false, isSecret: false,
        baseOdds: null, catchWeight: null, artUrl: null
      });
    }
  }
  frogs.push({
    id: 'hidden-slot', name: 'Secret discovery',
    rarity: 'Secret', pond: 1, state: 'planned', confirmed: false, isSecret: true,
    baseOdds: null, catchWeight: null, artUrl: null
  });
  var bands = [
    { multiplier: 1, classes: ['Farmer', 'Caretaker', 'Breeder'] },
    { multiplier: 1.25, classes: ['Energiser', 'Pond Keeper', 'Merchant'] },
    { multiplier: 1.6, classes: ['Frog Hunter', 'Architect', 'Enchanter'] },
    { multiplier: 2.25, classes: ['Collector', 'Mutant', 'Treasure Hunter'] },
    { multiplier: 3.25, classes: ['Lucky One', 'Royal Keeper', 'Scientist', 'Divine Keeper'] },
    { multiplier: 5, classes: ['Frog God'] }
  ];
  var classes = bands.flatMap(function (band) {
    return band.classes.map(function (name) { return { name: name, generalLuck: band.multiplier }; });
  });
  window.MFF_DATA = Object.freeze({
    catalogueVersion: '2026-10-21-notion-snapshot',
    classDesignVersion: 'v0.8 design only — not active',
    rarity: rarity,
    frogs: frogs,
    classes: classes,
    bands: bands,
    playablePubliclyConfirmed: false,
    reportedStudioSpecies: 69,
    plannedTotalSpecies: 81,
    confirmedOddsEngine: false,
    // Only fill with genuine official URLs when supplied. NEVER guess.
    urls: { roblox: null, discord: null, instagram: null, tiktok: null },
    releaseDate: null,
    liveStats: null,
    news: [
      { date: '21 Oct 2026', category: 'Development note', title: 'Designing the next chapter', detail: 'Our planned 11-pond launch includes 81 species in total. The remaining content and final playtests are still underway. This is not a released update.' },
      { date: '19 Oct 2026', category: 'Studio progress', title: 'Divine & Celestial ponds integrated', detail: 'Eight Divine and eight Celestial species were reported integrated in Roblox Studio Edit, bringing the ordinary roster to 69. Public release is still ahead.' },
      { date: '20 Oct 2026', category: 'Design note', title: 'Class-based General Luck planned', detail: 'A new class-based v0.8 luck design was approved, but the feature flag remains OFF and the current game has not switched to it.' }
    ],
    roadmap: [
      { status: 'Studio Edit', title: 'The first nine ponds', text: '69 ordinary frogs integrated, including Divine and Celestial. Save/rejoin and device QA still required.' },
      { status: 'In progress', title: 'Final pond tiers', text: 'Cosmic, Transcendent and the secret discovery are required before launch; not yet confirmed playable.' },
      { status: 'Design approved', title: 'Luck, farm upgrades & Scientist', text: 'Approved as design targets, not yet active in the game. Mutations boost Coins, not General Luck.' },
      { status: 'Next milestone', title: 'Test, polish, launch', text: 'Complete the content, run independent player/device tests, then make a release decision. No date has been announced.' }
    ],
    faqs: [
      { q: 'Is My Frog Farm released?', a: 'A public release has not been confirmed. This website describes development progress, not a live public game.' },
      { q: 'What do you do in the game?', a: 'Catch frogs at ponds, complete a catching minigame, grow your Frogdex, place frogs on your farm and earn Coins from their jumps. Frogspawn is a separate currency earned from frog activity.' },
      { q: 'Do mutations improve catching luck?', a: 'No. The approved mutation direction is visual effects and Coin production bonuses. Class-based General Luck is being designed separately.' },
      { q: 'Are the calculator percentages the same as Roblox?', a: 'Not yet. The exact v0.8 server implementation and its full 81-species reference weights have not been imported and parity-tested here, so this site does not display made-up percentages.' },
      { q: 'How many frogs will there be?', a: '81 species are planned for first public launch: 80 ordinary across 11 pond tiers plus one secret. A progress report confirmed 69 ordinary species in Studio Edit on 19 October.' },
      { q: 'Where can I get updates?', a: 'Discord is intended as the main community channel. Once an official invitation is configured, the Join Discord buttons here will open it.' }
    ]
  });
})();
