# Project Notes — Evgeny Merzalov Portfolio

Personal portfolio site for Evgeny Merzalov — interface designer, former
professional footballer, based in Orel. Next.js 16 (App Router) + Tailwind
CSS v4 + TypeScript. Single-page-ish site: homepage with bio + case grid,
plus individual case-study pages.

Dev server: `npm run dev` (Turbopack), localhost:3000.
Repo: https://github.com/evg1nn-eth/portfolio (public, pushed).

**Always verify visual changes with a headless Chrome screenshot before
claiming something is fixed** — this user has caught several wrong/stale
claims. Command pattern:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu \
  --screenshot="/path/to/out.png" --window-size=1280,1100 \
  http://localhost:3000/
```

## Structure

- `src/app/page.tsx` — homepage: bio + masonry case-study grid
- `src/app/personal-finance-tracker/page.tsx` — first case study page
- `src/app/components/CaseCard.tsx` — reusable case-preview card
- `src/app/components/PayButton.tsx` — interactive "Pay" demo button
- `src/app/images/` — real site assets (ghost-vpn.png,
  personal-finance-tracker.png, `pft/` subfolder with 5 case screens)
- `design-refs/` — **gitignored** scratch folder. User drops Figma
  screenshots here for reference; rebuild in code unless told a screenshot
  IS the final asset to display directly.
- `public/cv.pdf` — **does not exist yet**, user needs to add it (CV link
  on homepage points here already).

## Hard style rules (repeatedly enforced, don't deviate without asking)

- **No typographic hierarchy anywhere.** No H1/H2 size jumps, no bold
  headings. Every bit of text — name, body, section labels on case pages —
  is the same size/weight: `text-[20px] leading-[24px] font-normal`.
  Tried `font-semibold` for case-page section labels once → rejected hard
  ("в чём проблема сделать нормально??"). Always match homepage exactly.
- Text color: `text-zinc-800` (not pure black — tried `text-black` once,
  reverted). Secondary/less-important text: `text-zinc-400`.
- **No max-width constraint on body text** — it spans the full inner
  container (~1140px on desktop). Tried constraining to 680px on the case
  page → user said to match homepage width exactly instead.
- Font: **Helvetica Neue**, plain CSS system-font stack (`"Helvetica Neue",
  Helvetica, Arial, sans-serif`) in `globals.css` — no webfont files
  loaded. History: tried Neue Haas Grotesk Display Pro (files still sit
  unused in git history/local, license never confirmed), tried Suisse
  Int'l (rejected — the font file's own embedded metadata said "commercial,
  refer to purchased license", not actually free despite what user
  believed), tried Switzer (legit free Fontshare alt, downloaded but
  unused). Landed on Helvetica Neue as a system font. If asked to change
  fonts again, check licensing before wiring anything up.
- Emojis in bio text: currently only 🔗 before the "CV" link and 👀 after
  the name. User removed the others (⚽️, 🛠️, ✍️) — don't re-add without
  being asked.

## Homepage case grid

Masonry layout, NOT a synced grid — two independent columns
(`grid-cols-2`, each column is its own `flex flex-col`):

- **Column 1**: Ghost VPN card only (tall, `aspectRatio: "628 / 400"`).
  Real screenshot. **Not clickable** — not shipped to prod yet, plain
  `<div>` with `cursor-default`, no link. Badge on hover: "Ghost VPN" +
  "Telegram Mini App" (not a date).
- **Column 2**: Personal Finance Tracker card (short, `"628 / 300"`,
  clickable, links to `/personal-finance-tracker`, badge "Personal Finance
  Tracker" + "Concept") stacked above a third card: the interactive
  PayButton demo (badge "Action Button" on hover, same tall aspect ratio
  as Ghost VPN for visual rhythm).

Card hover effect: `pointer-fine:hover:scale-[0.97]` directly on the
element (NOT `group-hover` on the element that also has the `group`
class — that was a real bug we hit: `group-hover:` only affects
*descendants* of a hovered `.group`, never the group element itself).
Badges reveal via `opacity` only on hover — no `translate-y`, because
combining a translating badge with the parent's scale-shrink looked like
the badge was "sinking."

## PayButton (`src/app/components/PayButton.tsx`)

Fully interactive demo, not tied to a real payment: click → button
**morphs width** per state (discrete Tailwind width classes, not
JS-measured) → "Pay $4,99" → spinner + "Processing" → checkmark (spring
overshoot pop, `cubic-bezier(0.34,1.56,0.64,1)`) + "Paid" → auto-resets to
idle after 2s. Blue gradient pill (`from-blue-500 to-blue-600`) with a
faint inset top-highlight border for a glossy look; success state flips to
emerald green. All three status `<span>`s stay in the DOM simultaneously
(only opacity toggles) — user was told this could confuse screen readers
and explicitly said leave it, don't fix.

Sound: **synthesized via Web Audio API, never audio files.** Click = short
filtered-noise burst + low sine thump (dull "click", not a bright tone).
Success = ascending 3-note major triad (C5-E5-G5). User repeatedly asked
to "just extract the sound/font from that site" for various references —
always declined to download actual copyrighted assets (fonts with
non-free licenses, produced sound-effect files); only ever reused generic
technical facts (hex colors, layout proportions, generic UI/animation
patterns) or exact values the user supplied directly.

## Personal Finance Tracker case page

Content (text + all screenshots) is the user's own original work from
their previous portfolio — safe to reuse verbatim, they're the author.
Styled to exactly match the homepage (see hard style rules above): no
bold, no width cap, "← Back" link to `/` at the top. An earlier pass added
emoji "stickers" before section labels (💰/🤔/🎯/🧭) copying a style the
user liked elsewhere — reverted; user is redesigning this page in Figma
and will send new screenshots to rebuild from later. Don't reintroduce the
emoji-sticker treatment unless asked again.

## Animations / interaction notes

7 Emil Kowalski animation/design skills are installed in `.agents/skills/`
(symlinked into `.claude/skills/`), gitignored — they're tooling, not site
content. Relevant standards applied throughout: only animate
`transform`/`opacity` where possible (the PayButton's width/shape morph is
a known, accepted exception), `ease-out` for entrances, custom
cubic-beziers (built-in CSS easings read as "weak"), `prefers-reduced-motion`
handled via `motion-reduce:` on every custom transition, hover-only
effects gated with the `pointer-fine:` variant (Tailwind maps this to
`@media (hover:hover) and (pointer:fine)` automatically) so touch taps
don't trigger sticky hover states.

A full-page top-to-bottom staggered entrance reveal (fade + translate-y
via CSS `@starting-style`, inspired by brek.design) was built, tuned
smoother once, then **removed entirely** per user request — homepage now
renders instantly with no load animation. Don't re-add without being
asked.

## Known open items (low priority — user said fix later)

- No `<h2>`/landmark heading for the case-studies section (a11y nicety).
- No Open Graph/Twitter meta tags on the site.
- Some Tailwind class-string duplication between `CaseCard` and the
  inline third-card wrapper in `page.tsx` — candidate for `/simplify`.
- `public/cv.pdf` missing — CV link on homepage will 404 until added.
- Git commit author email is an auto-generated `.local` placeholder;
  user hasn't decided whether to fix it.
- Vercel deploy was the implied end goal of pushing to GitHub but hasn't
  been set up yet.

## Working-style notes

- User writes garbled voice-to-text Russian, is very direct, and gets
  frustrated fast with wrong guesses — bias toward doing the obvious next
  thing rather than asking clarifying questions, but when they give exact
  values (hex codes, pixel sizes, copy) apply them exactly, don't
  approximate.
- When they drop a screenshot in `design-refs/`, ask/confirm whether it's
  (a) a style reference to rebuild in code, or (b) a final asset to embed
  directly — this has gone wrong both ways before.
