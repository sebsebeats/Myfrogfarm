# My Frog Farm — Website v0.1

A responsive public companion website built with vanilla HTML, CSS and JavaScript. Visual direction: dark moss/forest-green backgrounds, cute original frog art, warm parchment-beige collectible cards, lime Roblox and Discord accents, chunky playful headings, and uncluttered layouts.

**Branch:** feature/website-v0.1-review  
**Roblox Studio:** not modified.  
**Deployment:** not configured or published.

## Run and test

From the repository root:

    python -m http.server 8000

Visit http://localhost:8000 in a browser. Hash-based navigation makes deployment on a static host straightforward; no npm or backend required.

Automated smoke checks: node --test tests/site.test.cjs

## Implemented v0.1 surfaces

- Dark cozy/playful responsive homepage: original SVG frog artwork, Roblox and Discord calls to action, featured frog rotation and odds preview.
- Browseable 81-slot Frogdex with 69 confirmed named Studio Edit species, 11 unrevealed future ordinary slots and one spoiler-safe secret slot; search, filters, sort and details.
- Interactive odds controls for pond, net, all 17 approved class-multiplier choices and favourite frog. Per-species percentages deliberately remain unavailable.
- Game/how-to-play, progression, 11 rarity tiers, Coins and Frogspawn.
- Guides for nets, classes, mutations and catching; mutation visual concepts are clearly placeholders.
- Development notes, public roadmap, announcements/events with no fabricated dates, empty public patch-note state, release countdown awaiting a real date, Roblox live-stats empty state.
- About Seb and Sam, lore introduction and FAQ; social links and mobile navigation.
- No Roblox account connection, user data collection, active mailing list or paid provider dependencies.

## Truthfulness gate — exact catch odds NOT complete

The approved class General Luck bands are **G1.00, G1.25, G1.60, G2.25, G3.25 and G5.00** across the actual 17 classes. But the full authoritative 81-species weights, Luau engine code, net modifiers, eligibility, discovery/favourite conditions and parity fixtures have not been imported.

The v0.8 engine was reported **feature-flag OFF in Roblox** as of 21 October 2026. Accordingly, the site never claims its numeric outputs match the active game and does not show invented per-frog probabilities. Its displayed nominal tier roster is not an authoritative eligibility list. No arithmetic shortcut based on the known Pond 11 reference examples would prove parity.

Before enabling numerical odds: use the Roblox Studio MCP read-only workflow to export the versioned canonical server configuration and module sources; verify correct 81 IDs (including protected secret logic); port the exact operation order; generate authoritative cross-product server test cases for ponds, nets, classes, favourites, discoveries and boundary cases; independently compare every species and normalized totals; then show correct labels for active-vs-proposed rules. Mutations never add General Luck and old class CatchLuck must not stack atop planned General Luck.

## Provenance and caveats

Project sources: https://app.notion.com/p/3e8a6f9bca32813b81ddfdeab9093480 and https://app.notion.com/p/400a6f9bca32813da9befe2a6d60236a

As reported in Studio Edit on 19 October: 69 named ordinary species in Ponds 1–9. The remaining 11 ordinary future species plus the secret are not confirmed integrated. The public game launch is not confirmed. Notion's original Frog Catalogue contains only the first 53 named species, with no synchronized base-odds field; later project records confirm 16 Divine/Celestial names.

All site frog drawings are original/generic placeholders, not Sam's canonical game frog models. Some copy is promotional draft, not canonical lore. All official URL values in data.js are null until the real Roblox, Discord, TikTok and Instagram URLs are provided. Buttons show a clear unavailable-link message rather than opening fabricated URLs.

## Next steps

1. Review the interface on desktop and mobile and give visual/UX feedback.
2. Add verified official links, approved logo, frog renders and lore copy.
3. Collect and parity-test the canonical v0.8 source and fixtures before computing chances.
4. Consider a review deployment only after authorisation; no live DNS or production change is part of this branch.

## 21 Oct refinement — dark cute visual review

The site now loads dark.css after styles.css. Dark backgrounds, warm parchment cards, lime highlight buttons, soft green glow and extra illustrated frog character are the requested default. The odds page additionally lists named frogs individually with unavailable base/effective probability columns; the list is explicitly not an authoritative eligible encounter pool. Frogdex cards use an original illustrative frog asset and concealed mystery silhouettes for future/secret entries. The Guides page in-page links now scroll correctly without confusing hash-based routing.
