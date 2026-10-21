# My Frog Farm — Public website (v0.2 visual redesign)

Public companion site for **My Frog Farm**, developed by Seb and Sam. Static HTML/CSS/JS served from GitHub's main branch. No framework, paid services or collection of player data.

## Visual direction — 21 October 2026

A warm forest-green and parchment design with bold, bubbly Fredoka headings, custom original pond/frog artwork, considered whitespace and varied editorial compositions instead of repetitive dashboard cards. Homepage: strong illustrated hero, Play on Roblox and Discord CTAs, explanation of catching/farming, three-step game introduction, featured specimen, receipt-style luck preview and development notice. These illustrations are website concepts, NOT Sam's game models.

Supporting pages: searchable/filtered/sortable 81-slot Frogdex with specimen-ticket look; game progression and eleven-pond index; guides and class mapping; odds control interface; mutation journal; updates, roadmap, release/event/patch-note and stats status panels; developer story and FAQ. All eight routes remain supported, including responsive CSS, mobile navigation and reduced-motion handling.

New design sources: design-v02.css; assets/brand-frog.svg; assets/pond-character.svg; assets/frog-portrait.svg.

## Run and test

Run python3 -m http.server 8000 and browse to http://localhost:8000. No build process.

Run node tests/verify.js to verify syntax, catalogue, route rendering, Frogdex search, file references and odds integrity. The GitHub Actions workflow runs this check on pushes. GitHub Pages deployment is tracked separately; passing the tests does not prove browser/device appearance.

## Honesty about luck calculations

The v0.8 engine was last reported **feature-flag OFF** in Roblox. This repo has the exact planned 17-class/six General Luck band mapping, but **not** the complete source of truth for 81 frog weights, net strength, selection eligibility, discovery/favourite/secret handling, normalization, and golden parity cases. Consequently there are **no invented per-species numeric odds**: the controls work as an interface and clearly withhold unverified percentages. Planned class multipliers are not guaranteed current-game multipliers. Mutations affect Coins, not General Luck.

To complete calculations, perform a read-only Roblox Studio MCP export of the authorized canonical Luau modules and versioned weights; faithfully implement the selector with all conditions; generate server-side golden fixtures covering ponds 1–11, nets, classes, favourites, discovery and secrets; validate every frog and rounding/normalization; only then unlock and correctly label active-versus-planned probabilities.

## Content limits and remaining assets

The 81 planned slots contain 69 named ordinary frogs verified from Studio Edit reports, 11 future ordinary slots and one intentionally hidden secret. Studio Edit is not proof of public release. Actual frog models, environments, screenshots and videos require authorized game assets.

Official Roblox, Discord, TikTok and Instagram URLs are unset in data.js because none has been provided/verified. Buttons show an explanatory message rather than navigating to fabricated links. No invented player counts, dates, event schedules, real mutations or mutation multipliers, email signup, Roblox accounts or user gallery.

Next: acquire a few real game captures and frog portraits, configure official URLs, visually QA the website on real devices, and finish luck-engine parity when the server sources are available.

## Grounding

- [Website feature ratings and design brief](https://app.notion.com/p/400a6f9bca32813da9befe2a6d60236a)
- [My Frog Farm project hub](https://app.notion.com/p/3e8a6f9bca32813b81ddfdeab9093480)
