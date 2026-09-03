# Project Notes — Evgeny Merzalov Portfolio

Personal portfolio site for Evgeny Merzalov — product designer, former
professional footballer, based in Orel. Next.js (App Router) + Tailwind
CSS v4 + TypeScript. Homepage, resume-row style (name/role, bio,
Работы/Проекты/Контакты sections), Russian copy, targeting the Russian
job market. `/personal-finance-tracker` was rebuilt the same way
2026-09-03 (see below); `/ghost-vpn` is still the older English
jakub.kr-styled page and is currently unlinked from the homepage (see the
2026-09-03 homepage entry — the Работы row points nowhere on purpose).

Dev server: `npm run dev` (Turbopack), localhost:3000.
Repo: https://github.com/evg1nn-eth/portfolio (public, pushed) —
`main` is up to date with `origin/main` as of the 2026-09-03 rebuild
below (commit `7726494`).

**Always verify visual changes with a headless Chrome screenshot before
claiming something is fixed** — this user has caught several wrong/stale
claims. For desktop widths (≳600px) the plain CLI flag is fine:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu \
  --screenshot="/path/to/out.png" --window-size=1280,2400 \
  http://localhost:3000/
```

**For mobile/narrow widths, don't use that flag** — confirmed 2026-08-11
it lays the page out wide and just crops the canvas, which reads exactly
like a horizontal-overflow bug but isn't one (reproduced even on a
minimal test file with no real content). Use `puppeteer-core` against the
existing Chrome install instead: `puppeteer.launch({executablePath:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"})`, then
`page.setViewport({width, height, deviceScaleFactor:2, isMobile:true,
hasTouch:true})` before `goto` + `screenshot({fullPage:true})`. Cross-check
with `page.evaluate(() => [document.documentElement.scrollWidth,
document.documentElement.clientWidth])` — equal means no real overflow.
Full details in [[feedback-verify-before-claiming-done]].

## 2026-08-11 rebuild

The whole working tree was wiped (uncommitted deletion, user confirmed
intentional, old code still recoverable from git history) and rebuilt from
scratch, restyled after **jakub.kr** (Jakub Krehel's personal site) at the
user's request: "точно такая же структура шрифт отступы" — same structure,
font, spacing. Confirmed via a clarifying question: **light theme**, full
1:1 match to the reference's palette (previous 2 versions of this site were
dark, `#191919`).

Reference site's actual homepage font stack (read from its own served CSS):
**Inter** (variable, `font-feature-settings: "cv01"`) as the only body/UI
font, plus **Libre Baskerville italic** for single-word emphasis in body
text. Both free/open (Google Fonts, OFL) — used directly via
`next/font/google`, no licensing issue. The reference's `<head>` also
preloads Berkeley Mono and Heldane Text, but neither is actually applied
anywhere on the homepage markup (Berkeley Mono is a $75+ commercial font
from usgraphics.com, Heldane Text is $50–225 from Klim Type Foundry —
confirmed both paid via web search before deciding not to touch them; they
must only be used elsewhere on jakub.kr, e.g. blog/writing pages, which we
don't have). If a future request wants a monospace or serif-heavy look
beyond a single italic word, pick a free alternative and confirm licensing
first — don't assume a font is free because a reference site uses it. See
[[feedback-dont-scrape-copyrighted-assets]].

Design tokens taken from the reference (colors, spacing, radii — all just
hex values/proportions, not protected expression, safe to reuse per
[[feedback-dont-scrape-copyrighted-assets]]):
- Background `#fcfcfc`, primary text `#202020`, secondary text `#6f6f6f`.
- Card border `#e8e8e8` (`#e0e0e0` on hover), card fill `#ffffff`.
- Links: same color as body text, underlined (`decoration:#d9d9d9`,
  `underline-offset:3px`, darkens to `#202020` on hover) — **not** a blue
  link color like the old dark-theme version used.
- Card shadow: `0 0 0 1px #0000000f, 0 1px 2px -1px #0000000f,
  0 2px 4px 0 #0000000a`, intensifying on hover. Defined once as `.card-shadow`
  in `globals.css`.
- Container: `max-w-[43.25rem]` (~692px), `px-6 py-12 sm:py-24`.
- Project card cover/preview area: `aspect-[192/100]`.
- **No font-size hierarchy anywhere** on the reference — h1/h2 and body
  text are all the same base size, differentiated only by `font-weight`
  (400 / 450 via `font-[450]` / 500) and color. This independently matches
  this project's own pre-existing hard rule (see below) — nice
  confirmation, not a conflict.

Content carried over from the pre-wipe site (read from git history, this
is the user's own original writing/data, safe to reuse verbatim):
"Design Approach" section, project list (Ghost VPN / Personal Finance
Tracker / Playground), contact links (Telegram @evg1nn, LinkedIn, CV
Google Drive link, email). `avatar.jpg` was recovered from git history
(`git show HEAD:path > file`), not regenerated.

**Bio rewritten again same day, per user-supplied text (screenshot, not
typed):** dropped the "Hi there!" greeting and any mention of a specific
employer (New People / Kringga) entirely — now just football→design,
a design-philosophy paragraph, and the "exploring design engineering"
paragraph. Kept this project's own established text-styling pattern
(muted body color, underlined links, `font-serif-accent` italic on one
short phrase) applied to the new copy, per explicit instruction ("стиль
текста как ты и делал"). The **Experience section (New People / Digital
Agency Kringga list) was removed entirely**, also per explicit request —
if work history needs to come back later, ask what should be listed
rather than assuming the old New People/Kringga data is still current.

**Open question, not yet raised with user:** the new bio's second
paragraph ("I care about the balance of beauty and usability... whole
product, not just the interface... small details...") now covers very
similar ground to the "Design Approach" section right below it on the
page (also "whole product, not just the interface" / "attention to
detail"). Left both in since only the bio rewrite + Experience removal
were requested, but flagged to the user as likely worth trimming one of
them. If asked to address it, don't just pick one unilaterally without
checking which parts of Design Approach (if any) they still want kept.

**Case cards started with an empty cover/preview area** (faint
`bg-black/[0.02]` tint inside `aspect-[192/100]`), then same day the user
dropped real `.svg` marks into `src/app/images/` (`ghost.svg`,
`concept.svg`, `playground.svg` — filenames map to project by name/subtitle)
and asked to center them there instead, same treatment as jakub.kr's own
project cards (small vector logo centered on the card, not a screenshot).
Rendered via `next/image` pointed at the static import — Next serves local
SVG imports as a direct static file (`/_next/static/media/...svg`), it does
**not** route through the raster `/_next/image` optimizer or need
`dangerouslyAllowSVG`, so no next.config change was needed. Fixed height
`h-14 w-auto` on all three for consistent sizing since the source files
have different intrinsic dimensions (all coincidentally near-square).

User then asked to recolor all three to "цвета как у jakub" — jakub's own
icons are monochrome (gray/`currentColor`), not brand-colored, to stay
cohesive with the neutral palette. Flattened `ghost.svg` (was a two-tone
blue/green gradient ghost mascot, now solid `#202020`, duplicate
gradient-fill path removed) and `concept.svg` (was solid `#007EFF`, now
`#202020`) to match; `playground.svg` was already `#202020`. Edited the
files directly rather than using `currentColor` — these load via `<img>`-
equivalent (`next/image` → static file URL), which renders in its own
context and won't inherit the page's `color`, so `currentColor` would
just resolve to black anyway; a hardcoded hex matching the design token
is more honest than a CSS trick that happens to look right by accident.

**Avatar removed from the header** (just "as an experiment," user's words)
— deleted the `<Image>` + its circular wrapper, collapsed the header to a
plain `flex flex-col` of name + role. `avatar.jpg` file and the recovered
git-history copy are untouched on disk, just unused — trivial to bring
back if the user decides against the no-photo look.

**`/personal-finance-tracker` case page rebuilt** (user asked to "format
it like jakub" too), sourced from the pre-wipe git history at commit
`9d1e579` (last commit before the case page was dropped) — recovered both
the copy (intro + Problem/Case Goal/Approach sections, all original
writing) and the five real screenshots (`src/app/images/pft/*.png`, 2260×1200,
~85-200KB each) via `git show <commit>:<path>`. Deliberately did **not**
copy two things from jakub's real sub-page markup (checked both `/skills`
and a `/writing/...` article for the pattern):
- The h1 title there is `font-semibold text-2xl` — a real size jump. This
  project's homepage h1/h2 use no size class at all (same base size as
  body, weight/color only) per the hard rule below, and this exact
  distinction was already fought over once ("Tried `font-semibold` for
  case-page section labels once → rejected hard"). Case-page title kept
  at base size, `font-[450]`, to stay consistent — flagged to user as an
  intentional deviation from the literal reference, not an oversight.
- Skipped the fixed table-of-contents sidebar (`/writing` pages only,
  `2xl:` breakpoint, needs scroll-spy JS) and the header's "copy link"
  button (clipboard API + copied-state) — neither is core to "page
  formatting," both are extra interactive surface the user didn't ask for.
- Did keep: the circular "back to home" button in a `header` (arrow icon,
  `bg-[#f0f0f0] hover:bg-[#e8e8e8]`, same `size-9 rounded-full` jakub uses),
  same page container/spacing as the homepage, and the homepage's card ↔
  chevron-reveal-on-hover pattern now that this card is a real `<Link>`
  (Ghost VPN and Playground stay plain non-linked divs, no chevron — no
  case pages exist for them).

No "Writing"/blog section and no newsletter signup were built, even though
jakub.kr has both — this site has no CMS/blog and no email backend, and
the user didn't ask for either. If a blog (or a work-history list) is
added later, the reference's "Writing" section (plain hoverable row list,
`-mx-3.5 ... hover:bg-gray-300` equivalent) is the pattern to reuse — this
project used that exact row style for an Experience section once, but it
was removed same day at the user's request.

**Recurring gotcha, hit twice now: `next/image` defaults to `quality=70`
regardless of `next.config.ts`'s `images.qualities: [100]`** — that config
only restricts which values are *legal* to request, it does not change
the *default* when a component omits the `quality` prop. Screenshots
(dense text/UI edges) show this compression far more than photos do. Old
project history has a commit literally titled "Fix compressed screenshot
quality on case covers and case page" — and the `CaseImage` component on
the rebuilt `/personal-finance-tracker` page reintroduced the exact same
bug (avatar had `quality={100}`, the case screenshots didn't, purely an
oversight copying the pattern). Fixed 2026-08-11 by adding `quality={100}`
directly. **Always set `quality={100}` explicitly on every `next/image`
that displays a screenshot or design mockup on this project** — don't
rely on the config default. Confirmed via the served `srcSet` URL's `q=`
param, not just by eyeballing it (see [[feedback-verify-before-claiming-done]]).

Same day, right after that fix, the user also dropped 5 fresh Figma
exports directly into `src/app/personal-finance-tracker/` (raw
`Frame <id>.png` names, 7680×4320, ~4x the old 2260×1200 source) wanting
the case screenshots upgraded anyway — matched each to its section by
looking at the actual screen content (not filename) and moved+renamed
into `src/app/images/pft/` over the old files, same semantic names
(`onboarding.png`, `home-flow.png`, `stats.png`, `settings.png`,
`ui-kit.png`), so no import paths in `page.tsx` needed to change. At the
1920px width the site actually serves, file size/detail came out nearly
identical to the old 2260px source at `quality=100` — the compression fix
above was very likely the whole story already — but higher-res source is
strictly not worse and is what the user explicitly asked to use, so kept
it. If asked to drop the repo's image weight later, downscaling these
back toward ~2400px wide before import would lose nothing visible at the
`sizes="692px"` this page actually renders at.

## 2026-09-03 rebuild — Russian resume-style homepage

Full homepage rebuild, replacing the 2026-08-11 jakub.kr-styled English
version. Goal stated by the user: make the portfolio read as Russian-
market-oriented ("похожим на ру... чтобы я искал работу более в русском
секторе"). Source of truth was explicitly split in two: **layout/content/
grid pixel-for-pixel from a user-made Figma file** ("ничего не придумывать
своего... как макет есть, так ты его и переносишь"), **animation/
interaction from a reference site, dom.fyi**, transferred "almost
entirely, except a couple of changes" (changes specified by the user when
asked, see below) — not this project's own invention either way.

Figma file (`7yjmgxhviePniTBtHHnZ9G`) contained several historical Home
iterations on one page/canvas (`Home 3`/`Home 4`/`Home 6`, node ids
`57:2159`/`57:2225`/`57:2300` — English, structurally identical to the
2026-08-11 design, i.e. old work kept for reference) plus one plain
`Home` frame (node `82:7838`) with all-Russian copy — identified as the
actual target by content alone, confirmed by screenshot comparison before
building anything. `get_design_context` on `82:7838` gave exact copy,
colors (`#5c5c5c` body/value text, `#999` labels/meta, `#f5f5f5`
dividers) and spacing (480px-wide centered column, 24px section gaps,
16px internal gaps, 4px/8px micro-gaps) — carried over as literal Tailwind
arbitrary values, matching this project's existing convention.

dom.fyi (`DP™ — Brand & Visual Designer`, a Cloudflare-fronted **static
HTML/CSS/vanilla-JS** site, not a framework SPA) turned out to already use
the exact same three color tokens as rgba-on-white (`rgba(0,0,0,.64)` /
`.4` / `.04`, confirmed by computing the blended hex — they match `#5c5c5c`/
`#999`/`#f5f5f5` exactly) and the same 480px column and Geist font — strong
evidence the Figma design was itself built to match this reference, not a
coincidence. Its full CSS/JS was read directly (`curl` the page, no
rendering needed since nothing depends on client JS for markup). Ported:
Geist font (`ss03/ss04/ss05` feature settings, `-0.35px` letter-spacing,
`1.3` line-height, confirmed available via `next/font/google` incl. a
`cyrillic` subset), the animated-underline link (`.ulink`), the sibling-
dimming + arrow-reveal project-row hover (`.rows`/`.work`), the page-load
opacity-cascade reveal (`.content > *`, 1500ms, 80ms base + 30ms/item
stagger — no vertical translate, confirmed from the live site's own DEF
constants, not guessed), and the "under development" hover-tip pill
(`.tip`/`.tip-pill`/`.tip-tail`, positioned via `getBoundingClientRect`).

**Explicitly excluded from the port, per the user when asked directly**
(the "couple of changes" they'd flagged in advance): the Web Audio click
sound on copy, the live London clock in the footer (dom.fyi has no
footer content here anyway — none was invented), the click-to-open
project modal with image gallery, and the bottom-right hover thumbnail
preview box. The sibling-dim/arrow-reveal hover *behavior* on project
rows was explicitly kept even without the preview box.

Content/structure decisions, each confirmed with the user rather than
assumed (all via one round of `AskUserQuestion`, given the scope and
irreversibility of a full rebuild):
- The name renders as **"Евгений Мерцалов"**, exactly as typed in the
  Figma file — flagged to the user as a likely typo (real surname is
  Мерзалов, matching the email/LinkedIn), user explicitly chose to keep
  the Figma spelling as-is. Don't "fix" this without being asked again.
- **Ghost VPN** moved from the projects grid into a new "Работы" (Work)
  section as a single row (`Ghost VPN — Q3 2026`), mirroring dom.fyi's
  own single-row "Projects" section (used there for their own
  in-development project, Selah™). It is **not a link** to `/ghost-vpn`
  — hovering "Q3 2026" shows a "В разработке" tip pill instead, same
  pattern as dom.fyi's Selah™ tooltip, just Russian copy. `/ghost-vpn`
  itself still exists on disk and still works if visited directly, it's
  just unlinked from the homepage now.
- "Проекты" now lists **three** items, only one of which is real: Personal
  Finance Tracker (→ `/personal-finance-tracker`, existing case page,
  full hover interactivity + arrow), Artist Subscription and Subscription
  Tracker (no case pages exist for either — not invented — rendered as
  plain non-clickable rows that still participate in the sibling-dim
  hover group, just without the arrow/cursor-pointer, own judgment call
  not separately asked about since low-stakes/reversible). If real case
  pages get built for these two later, just add `href` to their entries
  in the `projects` array in `src/app/page.tsx`.
- A copy-to-clipboard icon (dom.fyi's copy⇄check morph SVG, sound
  removed) was added next to the Email row specifically, per explicit
  request — not the whole dom.fyi inline-paragraph contact block, which
  wasn't asked for and doesn't match this project's row-based Контакты
  layout from Figma.

New components: `src/app/components/WorkTooltip.tsx` (the hover-tip
pill, portaled to `document.body` via `createPortal` — required, not
optional: the reveal animation puts a non-`none` `transform` on its
`.content` ancestor for the life of the page since dom.fyi's own
`distance` config is `0` — `transform: translateY(0px)`, still a
containing block per spec — which would otherwise break `position:fixed`
positioning if the tip were nested inside `.content` like dom.fyi itself
avoids by placing its own equivalent overlay elements as siblings after
`</main>`) and `src/app/components/CopyEmailIcon.tsx` (replaces the old
text-toggle `EmailCopyButton.tsx`, deleted — was only ever used from
`page.tsx`, safe to remove outright).

**Not done, out of scope for this pass** (only the homepage was in
scope; user said as much — "Это будет главная страница"): `/ghost-vpn`
still used the old 2026-08-11 English jakub.kr styling (card layout,
`#6f6f6f`/`#202020` colors, Inter-adjacent feel) as of this rebuild —
`/personal-finance-tracker` got the same Figma/Geist/resume treatment
right after, same day, see the dedicated entry below. Root `<html lang>`
was deliberately left `"en"` rather than flipped to `"ru"` — `/ghost-vpn`
is still English; revisit once/if it gets rebuilt too. `.card-shadow`
was removed from `globals.css` as dead code (no longer referenced
anywhere after the homepage rewrite); `.font-serif-accent` was kept —
both case pages still use it.

Verified with Puppeteer (`puppeteer-core` installed via
`npm install --no-save`, then uninstalled again after — never added to
`package.json`/lockfile) rather than just screenshots, since this rebuild
is hover/interaction-heavy in a way static screenshots can't confirm:
tooltip show/hide, sibling-dim + arrow reveal (and that it's absent on
the two non-linkable project rows), underline-on-hover, copy-button
`copied` state toggling, click-through navigation to
`/personal-finance-tracker`, and — per this file's own standing mobile-
overflow warning below — `scrollWidth === clientWidth` confirmed at both
390px and 320px viewports despite the `white-space: nowrap` rows.

### `/personal-finance-tracker` rebuilt to match, same day

Same Figma file has a second frame, `Personal Finance Tracker` (node
`82:7881`), sitting next to the new `Home` frame — a case-study page
already restyled to this project's new look (same 480px column, same
`#5c5c5c`/`#999`/`#f5f5f5` tokens, no card borders). Rebuilt the route to
match, replacing the old jakub.kr-styled English version.

`get_design_context` on the whole frame (`82:7881`) came back as sparse
XML metadata rather than code — too large/complex for a full React
reconstruction — so per the design-to-code skill's guidance ("request
only the visible child regions needed"), split it: read copy directly out
of the metadata XML (text node `name` attributes carry the literal
string, same trick as the homepage), and got real code/assets only for
the five image blocks specifically.

Those five image blocks turned out to be **fully-composed vector phone
mockups** (Apple HIG components — iPhone frames, status bars, SF Pro
Rounded text — via Figma Code Connect), not raster screenshots like the
old page's `src/app/images/pft/*.png`. Reconstructing that as live HTML
would mean shipping SF Pro Rounded (an Apple system font, not freely
licensed for web embedding — would have violated this project's own font-
licensing rule above) and hand-rebuilding dozens of nested icons for
what's clearly meant to be a flat illustrative screenshot, not
interactive UI. Used `download_assets` (`defaultScale: 3`, i.e. 1440×810
for a 480×270-point frame — `get_screenshot`'s `maxDimension` does not
upscale past a node's native render size, confirmed by testing up to
4000 and getting 480×270 back every time) to export each of the five
groups as a flat PNG instead, and overwrote the old files in place
(`onboarding.png`, `home-flow.png`, `stats.png`, `settings.png`,
`ui-kit.png` — content order/composition changed but the five-screenshot
shape happened to match exactly, so no import-path changes needed).

**One of the five, `ui-kit.png`, is genuinely a bit messy** — its content
(533px) overflows its own 480px frame on both edges in the Figma source
itself (confirmed identically in both `get_screenshot` and
`download_assets` renders, so not a rendering bug on this end), giving a
few clipped component swatches at the left/right edges. Left it as-is
rather than cropping or re-composing it myself — the instruction was to
carry the Figma source over as-is, and this is a source imperfection, not
mine to unilaterally edit. Worth a quick look if the user notices it
looks rough.

Page structure/copy source of truth was 100% the Figma metadata — title,
intro paragraph, and three body sections (Контекст и роль / Проблема /
Результаты) all came out of the same node in one read, no invention.
Structurally much simpler than the old page: one hero image, then all
three text sections back-to-back, then the four remaining images
back-to-back (old page interleaved text and images section-by-section).
Spacing throughout the frame is a flat 24px between every top-level block
and 16px between a label/title and its body text — same numbers as the
homepage rebuild, extended the shared `.content > *` reveal-animation
stagger in `globals.css` from 4 to 9 `nth-child` steps (same dom.fyi
arithmetic — `80ms + (n-1)×30ms` — just carried one page's worth further,
not a new formula) since this page has 9 top-level content blocks vs the
homepage's 4.

Kept two things from the *old* case page that aren't in the Figma
mockup at all (the Figma frame is content-only, no header chrome): the
circular back-to-home button, and the "open in Figma" button (now
pointing at this same file/node, `82:7881`, not the old unrelated Figma
file the previous version linked to). Both recolored to the new token
set. This mirrors the exact same judgment call already made and noted for
this page during the 2026-08-11 rebuild — established precedent on this
specific page, not a fresh invention.

Verified the same way as the homepage: Puppeteer against the real dev
server (`puppeteer-core` via `npm install --no-save`, uninstalled after),
`scrollWidth === clientWidth` at 390px/320px, zero console/page errors,
back-button navigation, and the Figma-link `href`. Screenshotted and
visually diffed against the Figma frame before calling it done.

## Hard style rules (repeatedly enforced, don't deviate without asking)

- **No typographic hierarchy anywhere.** No H1/H2 size jumps, no bold
  headings. Differentiate only via `font-weight` and color. (Independently
  reinforced by both the jakub.kr rebuild and the 2026-09-03 Figma/dom.fyi
  rebuild above — three unrelated sources landing on the same rule now,
  not just a one-off preference.)
- Text color, current (2026-09-03 rebuild): primary `#5c5c5c`,
  secondary/labels `#999` — not pure black. Applies to the homepage and
  `/personal-finance-tracker`. `/ghost-vpn` is un-rebuilt and still uses
  the older jakub.kr palette, primary `#202020` / secondary `#6f6f6f` —
  don't assume one palette applies site-wide until/unless it gets redone
  too.
- **No max-width constraint on body text** — spans the full inner
  container.
- Fonts must be verified free/licensed before use — see the licensing
  paragraph above and [[feedback-dont-scrape-copyrighted-assets]]. History
  of rejected fonts on this project: Neue Haas Grotesk Display Pro
  (license never confirmed), Suisse Int'l (embedded metadata said
  "commercial, refer to purchased license" despite user believing it was
  free), iA Writer Quattro (used for one rebuild, since replaced).

## Known open items

- **Pushed to GitHub 2026-09-03** (commit `7726494`, "Rebuild homepage as
  Russian resume-style layout from Figma", plus `392e681` noting it) —
  `main` was up to date with `origin/main` as of the homepage rebuild.
  The same-day `/personal-finance-tracker` rebuild (see above) is a
  separate, later, **uncommitted** change as of this writing — ask before
  assuming it should be committed/pushed too.
- `ui-kit.png` under `/personal-finance-tracker` (see above) has a few
  component swatches clipped at its left/right edges — a genuine overflow
  in the Figma source frame itself (533px of content in a 480px frame),
  not a rendering bug here. Left as-is per "carry the source over as-is."
  If it ever gets fixed on the Figma side, re-export node `94:11283` at
  `defaultScale: 3` via `download_assets` and drop it in over the
  existing file — no code changes needed.
- `public/cv.pdf` still not added locally — CV link points straight to a
  Google Drive URL instead, so this isn't currently broken.
- `README.md` is gone (deleted in the 2026-08-11 wipe) and was never
  recreated during the rebuild — didn't restore it since nobody asked,
  but worth flagging since the repo is public.
- Git commit author email is still an auto-generated `.local` placeholder
  (`evgenymerzalov@MacBook-Air-Evgeny.local`) — confirmed still the case
  on the 2026-08-11 rebuild commit, git printed its usual warning. User
  still hasn't said whether to fix it.
- **Pushed to GitHub 2026-08-11** (commit `28870b1`, "Rebuild portfolio in
  jakub.kr-inspired light theme") — `main` is up to date with `origin/main`.
- `avatar.jpg` was deleted from disk that same cleanup pass (genuinely
  unused — the header photo was removed earlier and never asked back).
  Still recoverable from git history before `28870b1` if the photo header
  ever comes back.
- `playground.svg` was **kept** despite being unused right now — the
  Playground card was taken off the homepage with "уберем пока" (remove
  *for now*), a stated-temporary removal, not a "this is unused, delete
  it" situation. Don't delete this one in a future cleanup pass without
  checking first; it's different from the avatar case above.

## Working-style notes

- User writes garbled voice-to-text Russian, is very direct, and gets
  frustrated fast with wrong guesses — bias toward doing the obvious next
  thing rather than asking clarifying questions, but when they give exact
  values (hex codes, pixel sizes, copy) apply them exactly, don't
  approximate. Do ask when a choice is expensive to get wrong and genuinely
  ambiguous (e.g. the light/dark theme call above was asked, not guessed).
- When cloning the structure/spacing/typography of a reference site the
  user points at: colors, layout proportions, spacing, and generic UI
  patterns are fair game to extract directly from the reference's served
  CSS/HTML. Actual creative asset files (fonts, sound effects, images) are
  not — check licensing, substitute a free alternative, or ask the user to
  source it themselves. This has come up multiple times across this
  project; see [[feedback-dont-scrape-copyrighted-assets]].
