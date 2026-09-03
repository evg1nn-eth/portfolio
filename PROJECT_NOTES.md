# Project Notes — Evgeny Merzalov Portfolio

Personal portfolio site for Evgeny Merzalov — product designer, former
professional footballer, based in Orel. Next.js (App Router) + Tailwind
CSS v4 + TypeScript. Homepage, resume-row style (name/role, bio,
Проекты/Работы/Контакты sections — note the labels were swapped
2026-09-03, see below), Russian copy, targeting the Russian job market.
`/personal-finance-tracker`, `/crypto-swap`, and `/subscription-tracker`
are all rebuilt to the new look (the latter two embed real standalone
apps live via iframe — see the 2026-09-03 embed entry near the end of
this file); `/ghost-vpn` is still the older English jakub.kr-styled page
and is currently unlinked from the homepage on purpose.

Dev server: `npm run dev` (Turbopack), localhost:3000.
Repo: https://github.com/evg1nn-eth/portfolio (public, pushed) —
see "Known open items" at the end of this file for the exact commit
`main` is caught up to; this file gets a stale push-status note
corrected after every commit, so trust that section over this one.

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
- The list originally had **three** items, only one of which was real at
  the time (Personal Finance Tracker); the other two (then "Artist
  Subscription" and "Subscription Tracker") were placeholder rows with no
  `href`. **Since superseded** — "Artist Subscription" became "Crypto
  Swap" and both it and Subscription Tracker got real case pages the same
  day; see the dedicated 2026-09-03 embed entry further down this file.
  All three project rows are real/linked as of that entry.
- A copy-to-clipboard icon (dom.fyi's copy⇄check morph SVG, sound
  removed) was added next to the Email row specifically, per explicit
  request — not the whole dom.fyi inline-paragraph contact block, which
  wasn't asked for and doesn't match this project's row-based Контакты
  layout from Figma.

**Labels swapped 2026-09-03, later same day** — the two section labels
above were backwards from what the user actually wanted: it's now
**"Проекты"** for the single Ghost VPN row and **"Работы"** for the
three-item list (Personal Finance Tracker etc.). Everything else in the
two bullets above — behavior, tooltip, links, hover — is unchanged, only
the label text moved. If reading the bullets above, mentally swap the
label name.

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

Initially kept two things from the *old* case page that aren't in the
Figma mockup at all (the Figma frame is content-only, no header chrome):
a circular back-to-home button and an "open in Figma" button, both
recolored to the new token set. **Removed again same day, per explicit
request** — see the lightbox entry right below; turns out dom.fyi's own
`case.html` has no back-navigation chrome either (checked directly), so
removing it isn't a deviation from the reference, it's actually a closer
match to it.

Verified the same way as the homepage: Puppeteer against the real dev
server (`puppeteer-core` via `npm install --no-save`, uninstalled after),
`scrollWidth === clientWidth` at 390px/320px, zero console/page errors,
back-button navigation, and the Figma-link `href`. Screenshotted and
visually diffed against the Figma frame before calling it done.

### Image lightbox added same day, header buttons removed

User asked to drop the back/Figma header buttons and add dom.fyi's
"open a photo and view it" interaction on this page's images. dom.fyi's
homepage links each Work row to its own `case.html?p=<name>`, a page not
previously looked at — fetched it directly (`curl`) to read its actual
lightbox implementation rather than guessing from the homepage's modal
(which the user had explicitly rejected during the homepage build, and
is a different feature anyway — that one's a click-to-open project
*card*; this is click-to-*expand-the-image-itself*).

`case.html`'s lightbox is a FLIP animation: on click, clone the clicked
image into a `position:fixed` element starting at the thumbnail's exact
`getBoundingClientRect()`, then on the next frame animate `top/left/
width/height` to a centered rect scaled to fit 67.5% of the viewport —
CSS `transition`, not a canned library. Frosted-white backdrop
(`rgba(255,255,255,.6)` + `backdrop-filter: blur(28px)`), prev/next
buttons that reposition to flank the image (`left ± (image edge + 32px
gap)`, clamped to an 8px screen margin) and crossfade the image on
navigation, Escape/backdrop-click to close (closing re-runs the same FLIP
in reverse, back down to the source thumbnail's current rect — not just
a fade), arrow keys to navigate while open, and a `prefers-reduced-
motion` fallback that skips straight to the end state. Ported all of it
faithfully — timings, easing (`cubic-bezier(0.22,1,0.36,1)`), the 32px/
8px nav-button math, the 67.5% viewport cap — all as literal values from
the reference, not re-derived.

**Did not** port dom.fyi's wider two-column `case.html` page shell
(480px text / 840px gallery, object-fit: cover on a fixed 520px row
height) — that's a different, wider layout than this page's actual
content, which is Figma-sourced at a flat 480px throughout (see above).
Only the *lightbox interaction* was in scope; the surrounding page layout
stays exactly as the Figma frame specified it, unchanged. Also skipped
the border-radius bump the reference uses on its expanded image (8px
there) — kept it at this page's own 4px throughout, source and expanded,
since a FLIP that changes corner radius mid-flight looks like a glitch
and 4px is already this page's established radius from Figma, not a
number worth deviating from just to match the reference more literally
on a detail this project doesn't otherwise use.

New component: `src/app/components/CaseGallery.tsx` — `CaseGallery`
(client component, holds open/closed + current-index state via React
context, portals the lightbox overlay to `document.body`) and
`GalleryImage` (the clickable thumbnail, registers its own DOM ref for
the FLIP source rect). Split this way — rather than one flat array
render — because the five images aren't contiguous in the page (the
hero sits before the three text sections, the other four after), but
still need to share one prev/next index so navigating from the hero
image cycles into the trailing four, matching how dom.fyi's own
`document.querySelectorAll('.work-gallery .shot')` spans the whole page
regardless of what's between the shots.

Verified via Puppeteer: open/close/next, image `src` and `.lb-item` rect
at each step, Escape and backdrop-click both close, header buttons
confirmed absent, zero console errors, no mobile overflow at 390px.

### Lightbox image quality fixed same day — two separate bugs, not one

User reported the enlarged lightbox photo looked "мыльное" (soft/
blurry) and pointed out the Figma file has these same five screens laid
out again, larger, further down the canvas — check there first before
assuming the fix is code-only.

They were right: five top-level frames sit directly below the
`Personal Finance Tracker` frame on the canvas, each 1920×1080 (vs the
480×270-point card groups embedded in the case page) — `94:8824`
(shares the literal name `Frame 2131329513` with the embedded hero
group, confirming it's the same source scaled up), `93:7926`,
`93:8042`, `93:8140`, `93:8198`. Matched each to onboarding/home-flow/
stats/settings/ui-kit by screenshotting and comparing content (the
names don't correspond 1:1, had to eyeball it) — same `ui-kit` overflow
noted earlier is visible here too, confirming again it's a genuine
Figma-source imperfection, not an export artifact. Re-exported all five
via `download_assets` at `defaultScale: 2` (3840×2160 each, ~1.8MB
total) over the old 1440×810 files.

**That alone would not have fixed it.** The actual bug was in
`CaseGallery.tsx`: the lightbox cloned the *thumbnail's* `currentSrc` —
next/image had already picked a small variant sized for the 480px-wide
thumbnail slot (per its own `sizes="480px"`), so no matter how large the
source file was, the lightbox was stuck re-displaying that same small
variant stretched to ~70% of the viewport. Fixed by rendering a
*separate* `next/image` (`fill`, `sizes="70vw"`, `quality={100}`) inside
`.lb-item` sourced from the original `StaticImageData`, so Next
generates and requests its own appropriately-large variant for the
enlarged display size instead of reusing the thumbnail's. Confirmed
pixel-level sharpness via a cropped Puppeteer screenshot, not just
eyeballing the full frame.

## 2026-09-03 (later) — Crypto Swap and Subscription Tracker embeds

User replaced the placeholder "Artist Subscription / Исследование" row
with **"Crypto Swap / Вайб-код"** (Personal Finance Tracker and
Subscription Tracker unchanged), and asked for real, working, interactive
case pages for both Crypto Swap and Subscription Tracker — not
screenshots this time. Both apps already existed as separate, finished
side projects the user had built in earlier sessions, sitting in sibling
folders next to this repo: `/Users/evgenymerzalov/Desktop/Main/Tracker`
(Subscription Tracker — Vite + React + TS + Tailwind + `motion`) and
`/Users/evgenymerzalov/Desktop/Main/aero-swap` (Crypto Swap — plain
static HTML/CSS/JS, a token-swap widget UI). Explicit instruction: don't
invent anything new, just get the existing apps running inside the
portfolio.

**Approach: build each as a static bundle, embed via `<iframe>`, don't
touch either source app's own code/config.** Neither app calls any
external API (confirmed by grep — aero-swap simulates the exchange rate
client-side, no `fetch`/`XHR` in either project beyond Tracker's own
in-memory state), so nothing about them depends on being served from a
particular origin — safe to iframe. Rewriting either into native
Next.js/React components in this app was deliberately rejected: Tracker's
own Tailwind classes and aero-swap's global CSS class names (`.field`,
`.tab`, etc.) would collide with this project's own styles if inlined
into the same DOM/page, and reimplementing either app's logic natively
risks introducing subtle behavior differences — exactly what "don't
invent, just port" was warning against. An iframe guarantees byte-for-
byte the same DOM, CSS, and JS execution as the standalone app, with zero
adaptation risk.

Used a background `Workflow` (ultracode was on for the session) with two
parallel agents — one per project, since they're independent tech stacks
touching disjoint output directories, a clean fit for real parallelism
rather than a barrier:
- **aero-swap → `public/demos/crypto-swap/`**: no build step, copied
  index.html/style.css/script.js/assets/ as-is (excluding `.claude/`,
  `.agents/`, `skills-lock.json` — Claude Code project metadata, not part
  of the running app). Agent verified every asset reference in the
  markup/CSS/JS is a relative path (so it survives being served from a
  subpath instead of a site root) and confirmed via `python3 -m
  http.server` + `curl` that the copied files actually serve correctly.
- **Tracker → `public/demos/subscription-tracker/`**: built with `npx
  vite build --base=./` (relative base, required since this is served
  from `/demos/subscription-tracker/`, not site root — Vite's default
  `base: '/'` would have produced absolute asset paths that 404 under a
  subpath) run directly from the *original* project folder — never
  modified `vite.config.ts` or any other source file there, so the
  standalone project still works exactly as before at its own localhost.
  `dist/` output was then copied into the portfolio's `public/demos/`.
  Typecheck (`tsc -b`, normally part of `npm run build`) was skipped in
  favor of `vite build` alone — not needed to route around a failure,
  `vite build` just doesn't require it and this is a straight port of
  already-working code, not a place to introduce a new typecheck gate.

Both verified end-to-end afterward (not just "it built"): actually typed
an amount into the Crypto Swap sell field and confirmed the buy amount
computed correctly and the submit button went from disabled/"Enter
amount to swap" to enabled/"Swap"; opened its token-select view; clicked
several service chips in Subscription Tracker and confirmed the running
total and subscription list updated. All via Puppeteer driving the real
iframe's `contentFrame()`, not just a static screenshot — this is
JS-driven UI, a screenshot alone can't prove it's interactive.

**Page layout**: title + description (styled like a lighter/muted label
above darker body text — read directly off the two screenshots the user
attached of the intended header, since there was no Figma source this
time) then a divider then the iframe, reusing this project's established
`#5c5c5c`/`#999`/`#f5f5f5` tokens and the `.content` reveal-animation
class. **Deliberately different container widths per page** — Crypto
Swap's demo fits its own natural `max-width: 433px` card comfortably
inside this site's usual 480px column, so `/crypto-swap` stayed at the
standard 480px throughout. Subscription Tracker's own layout is built for
a 620px column (`max-w-[620px]` in its `App.tsx`) — forcing that into
480px would have visibly cramped a grid of category chips for no reason,
so `/subscription-tracker` uses a wider 700px outer container for the
iframe specifically, while keeping its title/description text nested in
its own 480px-wide block for reading-width consistency with the rest of
the site. This is the same narrow-text/wide-media split dom.fyi itself
uses (480px text column vs 840px image gallery, referenced repeatedly
earlier in this file) — not a new pattern invented for this page.

**Iframe heights were measured, not guessed.** Initial guesses (760px /
1000px) left visibly excessive empty space — the embedded pages
vertically center their content and don't report a useful `scrollHeight`
from JS (both use `min-height: 100vh`, and Tracker's outer flex container
stretches its child via default `align-items: stretch` in a row-direction
parent, so naive height reads returned the viewport height right back).
Had to measure the actual leaf-content bounding box span instead (min
`top` to max `bottom` across every childless element on the page) to get
real numbers: Crypto Swap's card is ~410px by default, ~490px with the
token-select view open, plus the page's own 40px top/bottom padding →
settled on **600px**. Subscription Tracker's content span is ~542px
empty, ~784px with 4 subscriptions selected, plus 64px top/bottom padding
→ settled on **900px** (comfortably fits a handful of selections; a user
who selects most/all of a category may need to scroll within the frame —
accepted trade-off rather than an enormous mostly-empty default frame).

**Micro-tweaks same day, right after**: dropped `.page`'s `background:
#f5f5f5` in the copied `public/demos/crypto-swap/style.css` (only the
copy — the original `/Users/evgenymerzalov/Desktop/Main/aero-swap`
project was left untouched, per the same rule as everywhere else in this
entry) so the swap card sits directly on the site's white background
instead of showing a separate gray panel; forced a `<br />` in the Crypto
Swap description so it wraps at the exact word the user specified
(natural reflow broke one word later than wanted); dropped "стриминги"
from the Subscription Tracker description (both the visible paragraph
and its `metadata.description`) per the user's updated reference
screenshot.

Verified no horizontal overflow at 390px mobile width on all three
touched pages (home, `/crypto-swap`, `/subscription-tracker`), zero
console/page errors, full production build clean across all 7 routes.

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

- **Pushed to GitHub 2026-09-03 through commit `fb037e2`** ("Micro-tweak
  Crypto Swap and Subscription Tracker case pages") — this covers the
  whole day: homepage, `/personal-finance-tracker`, the lightbox and its
  quality fix, the Проекты/Работы label swap, the Crypto Swap /
  Subscription Tracker embeds, and their same-day micro-tweaks (dropped
  demo background, forced line break, description text edit). `main` is
  up to date with
  `origin/main`.
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
