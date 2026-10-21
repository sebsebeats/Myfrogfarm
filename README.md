# My Frog Farm — Website v0.1

Static, dependency-free public website prototype for **My Frog Farm**.

## Preview locally
Open `index.html` in a browser or run `python3 -m http.server 8000` and visit `http://localhost:8000`. No build process or paid service is required.

## Pages
- Home, The Game, Frogdex, Odds Calculator, Guides, Mutations, Updates, About.
- Working responsive navigation, mobile menu, species search, rarity/pond filters, sort controls, frog details, calculator controls, guide navigation, FAQ accordions and official-link fallbacks.
- 81 catalogue slots: 69 named ordinary frogs from project records, 11 unrevealed regular slots and 1 unrevealed secret. Emoji art is **placeholder**, not exported frog imagery.
- Six approved **design-only** General Luck bands across 17 classes. The current Roblox game is not using v0.8.

## Deliberate parity gate (important)
**Exact catch percentages are NOT implemented or shown.** We lack the authoritative Roblox v0.8 server algorithm, 81 frog encounter weights, eligibility logic, net/class/favourite interaction details and golden parity fixtures. Notion's original 53-species Base Odds fields are unsynchronised/blank. The calculator updates its selection summary and known roster only, and labels everything unverified. **Do not substitute a plausible formula or fabricate numbers.**

To enable probabilities later:
1. Read the current Roblox Studio server source via **Roblox Studio MCP**. Export the exact v0.8 luck/encounter logic, complete 81 species weights and any relevant equipment/class/favourite constants.
2. Build a versioned, independently runnable pure probability function and a fixture generator from the **same** server logic.
3. Compare a broad cross-product of ponds 1–11, all net tiers, all 17 classes, favourites/none, secret eligibility and corner cases to deterministic server fixtures; assert normalisation, excluded candidates and rounding.
4. Display calculated percentages only when the parity suite passes against a pinned source revision. Recheck after any game balance changes. Mark the live flag accurately.

## Content status
- 69 named ordinary species are supported by Oct 2026 project development notes; no verified art URLs, per-frog lore, odds or public launch link were available.
- Pond 10/11 names remain unrevealed on the website rather than invented.
- Mutation gallery uses explicitly labelled visual concepts, not Sam's real models.
- Social and Roblox buttons deliberately show a message until **verified official URLs** are set in `data.js`.
- No fake player counts, fabricated updates, promises of launch dates, fake signup forms or placeholder Roblox destination.

## Future content integration
Replace emoji with real approved frog assets, add genuine per-frog descriptions and actual game stats, configure official social URLs, then implement and verify luck parity. This prototype intentionally uses no backend or tracking.

## Sources
Internal My Frog Farm Notion project hub, 20–21 October 2026; Frog Catalogue (53 named species, blank Base Odds); Divine/Celestial integration reports (16 named species); v0.8 General Luck design; website feature-picker. Some Notion pages retain superseded historical wording: current decisions supersede them (ElderFrog is a direct pond catch; cave is for enchantments; mutation effects are Coin-only).
