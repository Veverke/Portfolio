# Portfolio Project — Work Plan

> **Conventions:**
> - Each task is atomic and independently completable.
> - Every phase ends with **Deliverables**, **Tests**, and **Unit Tests** sections.
> - Unit test coverage is required for every phase that produces application code or markup.
> - When a phase is fully complete: check all its boxes, add ✅ to the phase heading, and record the completion date.
> - **Update this file at the end of each phase** to reflect current status before starting the next.

---

## Phase 1: Layout Selection ✅

> **Note:** Non-chosen templates are kept for reference. Chosen template was copied to `index.html` rather than renamed.

### Tasks
- [x] Open `portfolio_bold_dark.html` in browser — note pros/cons
- [x] Open `portfolio_clean_classic.html` in browser — note pros/cons
- [x] Open `portfolio_modern_cards.html` in browser — note pros/cons
- [x] Open `portfolio_onepage_scroll.html` in browser — note pros/cons
- [x] Open `portfolio_sidebar_nav.html` in browser — note pros/cons
- [x] Open `portfolio_split_screen.html` in browser — note pros/cons
- [x] Select one layout and record decision here: **Chosen layout: `portfolio_sidebar_nav.html`**
- [x] Copy chosen file to `index.html` (original kept for reference alongside other templates)

### Deliverables
- `index.html` exists and is a copy of `portfolio_sidebar_nav.html`
- All `portfolio_*.html` files are retained for reference

### Tests
- [ ] Open `index.html` in browser — page renders without visual errors
- [ ] Browser console shows zero JavaScript errors on load
- [ ] Network tab shows zero 404 errors (no broken resource references)

### Unit Tests
- [ ] Install `htmlhint` (`npm install --save-dev htmlhint`)
- [ ] Write an htmlhint config (`.htmlhintrc`) enforcing: one `<title>`, doctype present, no duplicate IDs
- [ ] Write a Jest + jsdom test asserting:
  - Exactly one `<h1>` on the page
  - A `<nav>` element is present
  - At least one `<section>` or `<main>` landmark exists

### Phase Completion
- [x] All tasks checked off
- [ ] All tests passing
- [ ] All unit tests passing
- [x] Work-plan updated — mark heading ✅ with completion date: 2026-03-11

---

## Phase 2: Style & Visual Identity

> **Goal:** Define and apply a cohesive visual language that reflects the personality and profession of the individual — color palette, typography, iconography, and micro-details — building on top of the chosen sidebar-nav layout structure.

### Tasks
- [ ] Define a color palette: pick 1–2 primary colors, 1 accent, and neutral background/text tones
- [ ] Record the palette in `index.html` as CSS custom properties (`--color-primary`, `--color-accent`, etc.) in `:root`
- [ ] Choose a heading font and a body font (Google Fonts or system stack) — document the choice here: **Fonts: `___________`**
- [ ] Apply heading font to all `<h1>`–`<h3>` elements via CSS
- [ ] Apply body font to the base `body` selector
- [ ] Style the sidebar: background color, width, padding, and link hover states
- [ ] Style the navigation links: color, active indicator, and hover transition
- [ ] Style the hero / header section: background treatment (solid, gradient, or subtle texture), text color, and spacing
- [ ] Style section headings with the accent color or a decorative underline
- [ ] Style skill tags / badges (background pill, border radius, font size)
- [ ] Style project cards: border, shadow, hover lift effect
- [ ] Style the primary action buttons / CTA links
- [ ] Choose and integrate an icon set (e.g. Font Awesome, Lucide, or inline SVGs) for nav and social links
- [ ] Apply icons to all navigation items and social links
- [ ] Set a consistent spacing scale (e.g. 4 px base unit) as CSS custom properties
- [ ] Verify the chosen palette passes WCAG AA contrast for body text on all backgrounds
- [ ] Export / document final color hex values and font names in a comment block at the top of the `<style>` section

### Deliverables
- CSS custom properties for the full color palette defined in `:root`
- Heading and body fonts applied consistently across all sections
- Sidebar, nav, hero, section headings, cards, and buttons all visually styled
- Icons integrated for nav and social links
- Color palette documented in a comment block in the stylesheet

### Tests
- [ ] Open `index.html` in browser — overall look reflects the intended personal brand
- [ ] Sidebar and nav links have clearly distinct hover / active states
- [ ] Project cards show hover lift or highlight effect
- [ ] Page is readable on a bright display (no illegible low-contrast text)
- [ ] Fonts load correctly (no fallback system font flashing on repeat visits)
- [ ] Icons render at all tested viewport widths (375 px, 768 px, 1280 px)

### Unit Tests
- [ ] Write Jest + jsdom tests asserting:
  - `:root` style block defines `--color-primary` and `--color-accent`
  - At least one `<link rel="stylesheet">` or `<style>` block is present in `<head>`
  - All navigation `<a>` elements contain either an `<svg>` child or an icon `<i>` element
  - No inline `style` attributes set color or font values (all styling via CSS classes)

### Phase Completion
- [ ] All tasks checked off
- [ ] All tests passing
- [ ] All unit tests passing
- [ ] Work-plan updated — mark heading ✅ with completion date: ___________

---

## Phase 3: Content — Identity & About

### Tasks
- [ ] Replace placeholder text in `<title>` tag with real name + role
- [ ] Replace placeholder name in the hero / header section
- [ ] Replace placeholder job title / tagline in the hero section
- [ ] Write a 3–5 sentence bio and insert into the About section
- [ ] Replace placeholder email with real contact email
- [ ] Replace placeholder LinkedIn URL with real profile URL
- [ ] Replace placeholder GitHub URL with real profile URL

### Deliverables
- All identity and About fields contain real, final content
- No placeholder text (e.g. "Lorem ipsum", "Your Name", "your@email.com") remains in these sections

### Tests
- [ ] Manually scan rendered page — no visible placeholder text in hero or About
- [ ] Click LinkedIn link — opens correct profile in a new tab
- [ ] Click GitHub link — opens correct profile in a new tab
- [ ] Click email link — opens mail client with correct address pre-filled

### Unit Tests
- [ ] Write Jest + jsdom tests asserting:
  - `document.title` does not match `/your name|portfolio template/i`
  - No element `textContent` matches `/lorem ipsum/i`
  - `<a[href^="mailto:"]>` exists and `href` is not a placeholder value
  - `<a[href*="linkedin"]>` exists and `href` is not a placeholder value
  - `<a[href*="github"]>` exists and `href` is not a placeholder value

### Phase Completion
- [ ] All tasks checked off
- [ ] All tests passing
- [ ] All unit tests passing
- [ ] Work-plan updated — mark heading ✅ with completion date: ___________

---

## Phase 4: Content — Skills & Experience

### Tasks
- [ ] List all technical skills (languages, frameworks, tools, platforms)
- [ ] Insert skills into the Skills section of `index.html`
- [ ] Add Job #1: company, role, start/end dates, 3–5 bullet achievement points
- [ ] Add Job #2 (if applicable): company, role, dates, bullets
- [ ] Add Job #3 (if applicable): company, role, dates, bullets
- [ ] Add education entry: institution, degree, graduation year
- [ ] Verify experience entries are in reverse-chronological order (newest first)
- [ ] Remove any leftover placeholder experience or skill entries

### Deliverables
- Skills section populated with ≥ 5 real skills
- Experience section has ≥ 1 real job entry with dates and achievements
- Education section has ≥ 1 real entry
- All entries in reverse-chronological order

### Tests
- [ ] Rendered Skills section shows ≥ 5 items visually
- [ ] Each experience entry displays: company name, role title, date range
- [ ] Education entry shows institution and degree
- [ ] No placeholder text visible in these sections

### Unit Tests
- [ ] Write Jest + jsdom tests asserting:
  - Skills list contains ≥ 5 non-empty items
  - Experience section contains ≥ 1 entry with a non-empty date range element
  - Education section contains ≥ 1 entry
  - No element within `#skills`, `#experience`, `#education` matches `/lorem|placeholder|example company/i`

### Phase Completion
- [ ] All tasks checked off
- [ ] All tests passing
- [ ] All unit tests passing
- [ ] Work-plan updated — mark heading ✅ with completion date: ___________

---

## Phase 5: Content — Projects

### Tasks
- [ ] Identify 2–4 projects to feature
- [ ] Write name, 2–3 sentence description, and tech stack for Project #1
- [ ] Write name, 2–3 sentence description, and tech stack for Project #2
- [ ] Write name, 2–3 sentence description, and tech stack for Project #3 (if applicable)
- [ ] Write name, 2–3 sentence description, and tech stack for Project #4 (if applicable)
- [ ] Insert Project #1 into the Projects section with live/repo link(s)
- [ ] Insert Project #2 into the Projects section with live/repo link(s)
- [ ] Insert Project #3 (if applicable) with live/repo link(s)
- [ ] Insert Project #4 (if applicable) with live/repo link(s)
- [ ] Remove any unused placeholder project cards from the HTML

### Deliverables
- Projects section contains 2–4 real project entries
- Each entry has: title, description, tech stack, and ≥ 1 link
- No placeholder project cards remain

### Tests
- [ ] Each project card is fully visible and readable at desktop width
- [ ] Each project link opens the correct URL in a new tab
- [ ] No placeholder project text is visible on the rendered page

### Unit Tests
- [ ] Write Jest + jsdom tests asserting:
  - Projects section contains ≥ 2 project entries
  - Each entry contains ≥ 1 `<a>` with a non-empty, non-placeholder `href`
  - Each entry contains a non-empty title string
  - Each entry contains a non-empty description string
  - No entry text matches `/project \d+|lorem|your project name/i`

### Phase Completion
- [ ] All tasks checked off
- [ ] All tests passing
- [ ] All unit tests passing
- [ ] Work-plan updated — mark heading ✅ with completion date: ___________

---

## Phase 6: Assets & Folder Structure

### Tasks
- [ ] Create `assets/images/` directory
- [ ] Create `assets/icons/` directory
- [ ] Source or take a professional headshot / avatar image
- [ ] Compress headshot to ≤ 200 KB (use squoosh.app)
- [ ] Place compressed headshot in `assets/images/`
- [ ] Update headshot `<img src>` in `index.html` to the new relative path
- [ ] Generate a favicon at favicon.io — export `favicon.ico` + 192px and 512px PNGs
- [ ] Place favicon files in `assets/icons/`
- [ ] Add `<link rel="icon">` tag(s) referencing the favicon in `<head>` of `index.html`
- [ ] Collect project screenshots (one per featured project)
- [ ] Compress each screenshot to ≤ 300 KB
- [ ] Place project screenshots in `assets/images/`
- [ ] Update each project entry in `index.html` to reference its screenshot

### Deliverables
- Folder structure:
  ```
  /
  ├── index.html
  ├── assets/
  │   ├── images/   (headshot + project screenshots)
  │   └── icons/    (favicon.ico + PNG sizes)
  ```
- All `<img src>` and `<link href>` attributes point to valid relative paths
- Favicon wired up in `<head>`

### Tests
- [ ] Headshot renders correctly in-browser (no broken image icon)
- [ ] Favicon is visible in the browser tab
- [ ] Network tab shows zero 404 errors for images and icons
- [ ] Each image file on disk is within its size limit

### Unit Tests
- [ ] Write Jest + jsdom + Node `fs` tests asserting:
  - Headshot `<img>` exists and its `src` resolves to a file that exists on disk
  - `<link rel="icon">` exists in `<head>` and its `href` resolves to a file on disk
  - All `<img>` elements have a non-empty `alt` attribute
  - No `<img src>` contains a placeholder value (`#`, `placeholder`, `via.placeholder.com`)

### Phase Completion
- [ ] All tasks checked off
- [ ] All tests passing
- [ ] All unit tests passing
- [ ] Work-plan updated — mark heading ✅ with completion date: ___________

---

## Phase 7: Polish & Accessibility

### Tasks
- [ ] Proofread hero / About text — fix grammar and spelling
- [ ] Proofread experience entries — fix grammar and spelling
- [ ] Proofread project descriptions — fix grammar and spelling
- [ ] Verify heading hierarchy: one `<h1>`, logical `<h2>` → `<h3>` flow, no levels skipped
- [ ] Verify all `<img>` tags have descriptive (not generic) `alt` text
- [ ] Check body text vs background color contrast (use WebAIM Contrast Checker — must pass AA)
- [ ] Check link text vs background color contrast (must pass AA)
- [ ] Add `aria-label` to any icon-only links (e.g. social icon buttons without visible text)
- [ ] Test keyboard navigation: Tab through every link and interactive element
- [ ] Run Lighthouse audit (Chrome DevTools) — record baseline scores
- [ ] Fix any issues flagged by Lighthouse until all four scores ≥ 90

### Deliverables
- Zero visible placeholder or lorem ipsum text
- Lighthouse: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
- WCAG AA color contrast met for all text elements

### Tests
- [ ] Lighthouse audit shows all four scores ≥ 90 (screenshot the result)
- [ ] Manual keyboard-only navigation successfully reaches every link and button
- [ ] WebAIM Contrast Checker passes for primary text and link colors
- [ ] Layout correct at 375 px (mobile), 768 px (tablet), 1280 px (desktop) — use DevTools
- [ ] Cross-browser: Chrome, Firefox, Edge — no layout breakage

### Unit Tests
- [ ] Install `jest-axe` (`npm install --save-dev jest-axe`)
- [ ] Write axe-core / jest-axe tests asserting:
  - No critical or serious axe violations on the full rendered page
  - All `<img>` have non-empty `alt` attributes
  - All `<a>` have discernible accessible text (text content or `aria-label`)
  - No heading levels are skipped (h1 → h2 → h3, not h1 → h3)

### Phase Completion
- [ ] All tasks checked off
- [ ] All tests passing
- [ ] All unit tests passing
- [ ] Work-plan updated — mark heading ✅ with completion date: ___________

---

## Phase 8: GitHub Repository Setup

### Tasks
- [ ] Confirm GitHub account exists (create at github.com if needed)
- [ ] Create a new **public** repository named exactly `username.github.io`
- [ ] Leave it empty (no README, no .gitignore added via UI) for a clean first push
- [ ] Copy the remote HTTPS URL shown by GitHub
- [ ] In the local Portfolio folder: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial portfolio launch"`
- [ ] Run: `git remote add origin <copied-url>`
- [ ] Run: `git branch -M main`
- [ ] Run: `git push -u origin main`
- [ ] Confirm all files appear in the GitHub repository web UI

### Deliverables
- Remote repo `username/username.github.io` exists and is public
- All local files pushed to the `main` branch
- `index.html` visible at the root of the repo on GitHub

### Tests
- [ ] Visit `https://github.com/username/username.github.io` — repo is public and `index.html` present
- [ ] `git status` locally shows a clean working tree
- [ ] `git log --oneline` shows the initial commit

### Unit Tests
> Git / repository setup is infrastructure — no application unit tests apply here.
> Correctness is verified through the manual tests above.

### Phase Completion
- [ ] All tasks checked off
- [ ] All tests passing
- [ ] Work-plan updated — mark heading ✅ with completion date: ___________

---

## Phase 9: GitHub Pages Deployment

### Tasks
- [ ] In the GitHub repo, open Settings → Pages
- [ ] Set Source to: `Deploy from a branch` → Branch: `main` → Folder: `/ (root)`
- [ ] Click Save
- [ ] Wait ~60 seconds for the initial build
- [ ] Visit `https://username.github.io` and confirm the site loads

### Deliverables
- Site is publicly accessible at `https://username.github.io`
- Live page content matches local `index.html`

### Tests
- [ ] `https://username.github.io` returns HTTP 200 (not 404)
- [ ] Headshot image loads correctly on the live site
- [ ] Favicon appears in the browser tab on the live site
- [ ] All external links work correctly on the live site
- [ ] Page is correctly styled on the live site (CSS loaded, no unstyled content)
- [ ] Browser console on the live site shows no errors

### Unit Tests
> Deployment is infrastructure. Functional correctness is verified by the manual tests above.
> **Future improvement:** add a GitHub Actions workflow that runs the Phase 6 jest-axe tests against the live URL on every push to `main`.

### Phase Completion
- [ ] All tasks checked off
- [ ] All tests passing
- [ ] Work-plan updated — mark heading ✅ with completion date: ___________

---

## Phase 9: Ongoing Maintenance

### Tasks (recurring — check off each time performed)
- [ ] New project completed → add to Projects section and push
- [ ] New role started → update Experience section and push
- [ ] New skills acquired → update Skills section and push
- [ ] Re-run Lighthouse audit periodically — fix any regressions
- [ ] Re-run jest-axe tests periodically — fix any accessibility regressions
- [ ] Keep npm dev dependencies (jest, jest-axe, htmlhint, etc.) up to date

### Redeploy workflow (every update)
```bash
git add .
git commit -m "Update: <describe what changed>"
git push
```
GitHub Pages rebuilds automatically within ~60 seconds of each push.

### Future Upgrades (optional)
- [ ] Purchase a custom domain (e.g. `yourname.com`) and configure it in GitHub Pages Settings
- [ ] Add a contact form using Formspree (free tier) to receive messages without a backend
- [ ] Add Plausible or Fathom for privacy-friendly visitor analytics

---

## Quick Reference

| Item | Detail |
|---|---|
| Hosting | GitHub Pages (free) |
| Live URL | `https://username.github.io` |
| Entry file | `index.html` (must be this exact name) |
| Branch | `main` |
| Monthly cost | $0 |
| Test framework | Jest + jsdom + jest-axe |
| HTML linting | htmlhint |
