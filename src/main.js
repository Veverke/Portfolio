import './style.css';

/* ============================================================
   DESIGN TOKEN MAP
   Keys match the CSS custom property names (without '--').
   applyTheme writes each key to :root as --color-<key>.
   'primary' and 'secondary' also drive the sidebar gradient.
   ============================================================ */
const TOKEN_MAP = {
  primary:   '--color-primary',
  secondary: '--color-secondary',
  accent:    '--color-accent',
  bg:        '--color-bg',
  surface:   '--color-surface',
  text:      '--color-text',
  textMuted: '--color-text-muted',
  border:    '--color-border',
};

/* ============================================================
   PRESET THEMES  (5 presets sourced from style-sampler.html)
   Theme 0 = Creative & Expressive (default, chosen in Phase 2-pre)
   ============================================================ */
const THEMES = [
  {
    id:        'creative',
    name:      'Creative & Expressive',
    swatch:    '#0d9488',
    primary:   '#0d9488',
    secondary: '#0369a1',
    accent:    '#38bdf8',
    bg:        '#f0fdfa',
    surface:   '#ffffff',
    text:      '#134e4a',
    textMuted: '#516a74',
    border:    '#99f6e4',
  },
  {
    id:        'professional',
    name:      'Professional & Clean',
    swatch:    '#0369a1',
    primary:   '#0369a1',
    secondary: '#0f172a',
    accent:    '#0891b2',
    bg:        '#f8fafc',
    surface:   '#ffffff',
    text:      '#0f172a',
    textMuted: '#5a6d7e',
    border:    '#e2e8f0',
  },
  {
    id:        'bold',
    name:      'Bold & Editorial',
    swatch:    '#065f46',
    primary:   '#065f46',
    secondary: '#022c22',
    accent:    '#10b981',
    bg:        '#ecfdf5',
    surface:   '#ffffff',
    text:      '#022c22',
    textMuted: '#516a60',
    border:    '#d1fae5',
  },
  {
    id:        'minimal',
    name:      'Minimal & Understated',
    swatch:    '#2563eb',
    primary:   '#2563eb',
    secondary: '#1e3a8a',
    accent:    '#60a5fa',
    bg:        '#ffffff',
    surface:   '#f8fafc',
    text:      '#1e293b',
    textMuted: '#64748b',
    border:    '#e2e8f0',
  },
  {
    id:        'technical',
    name:      'Technical Precision',
    swatch:    '#1e40af',
    primary:   '#1e40af',
    secondary: '#0c4a6e',
    accent:    '#38bdf8',
    bg:        '#f0f9ff',
    surface:   '#ffffff',
    text:      '#0c4a6e',
    textMuted: '#516a7a',
    border:    '#bae6fd',
  },
];

const LS_KEY = 'portfolio-theme-id';
const root   = document.documentElement;

/* ============================================================
   applyTheme — writes token values to :root custom properties
   and persists the choice in localStorage.
   ============================================================ */
function applyTheme(theme) {
  Object.entries(TOKEN_MAP).forEach(([key, cssVar]) => {
    if (theme[key] !== undefined) {
      root.style.setProperty(cssVar, theme[key]);
    }
  });

  localStorage.setItem(LS_KEY, theme.id);

  // Update active swatch indicator
  document.querySelectorAll('.picker-swatch').forEach((el) => {
    el.classList.toggle('is-active', el.dataset.themeId === theme.id);
    el.setAttribute('aria-pressed', String(el.dataset.themeId === theme.id));
  });
}

/* ============================================================
   fetchRandomTheme — fetches a 5-color palette from Colormind.io,
   maps it to design tokens, then calls applyTheme().
   On failure the current theme is left unchanged.
   ============================================================ */
async function fetchRandomTheme() {
  const btn = document.querySelector('.picker-random-btn');
  btn.classList.add('is-loading');
  btn.setAttribute('aria-busy', 'true');

  try {
    const res = await fetch('https://colormind.io/api/', {
      method: 'POST',
      body: JSON.stringify({ model: 'default' }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // Validate structure: expect { result: [[r,g,b], ...] } with 5 entries
    if (
      !Array.isArray(data?.result) ||
      data.result.length < 5 ||
      !data.result.every((c) => Array.isArray(c) && c.length === 3)
    ) {
      throw new Error('Unexpected Colormind response shape');
    }

    // Sort by perceived luminance so darkest → text, lightest → bg
    const sorted = [...data.result].sort(
      (a, b) =>
        (0.299 * a[0] + 0.587 * a[1] + 0.114 * a[2]) -
        (0.299 * b[0] + 0.587 * b[1] + 0.114 * b[2])
    );

    const hex = ([r, g, b]) =>
      '#' + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');

    const randomTheme = {
      id:        'random',
      name:      'Random',
      swatch:    hex(sorted[2]),
      primary:   hex(sorted[1]),   // mid-dark — used for links, labels, sidebar top
      secondary: hex(sorted[0]),   // darkest — sidebar gradient end & body text
      accent:    hex(sorted[3]),   // light-mid — underlines, highlights
      bg:        hex(sorted[4]),   // lightest — page background
      surface:   '#ffffff',        // always white for cards
      text:      hex(sorted[0]),   // darkest — maximum contrast on bg
      textMuted: '#64748b',        // neutral muted (avoids unreadable random muted)
      border:    hex(sorted[3]),   // light-mid — subtle borders
    };

    applyTheme(randomTheme);
  } catch (err) {
    console.error('[theme-picker] Colormind fetch failed:', err);
    // Previous theme stays — no visual change, no error shown to user
  } finally {
    btn.classList.remove('is-loading');
    btn.removeAttribute('aria-busy');
  }
}

/* ============================================================
   buildPicker — populates swatch buttons and wires events.
   Called once on DOM-ready.
   ============================================================ */
function buildPicker() {
  const swatchContainer = document.querySelector('.picker-swatches');
  const panel = document.getElementById('theme-picker-panel');
  const toggle = document.querySelector('.theme-picker-toggle');
  const randomBtn = document.querySelector('.picker-random-btn');

  if (!swatchContainer || !panel || !toggle || !randomBtn) return;

  // Build one swatch per preset
  THEMES.forEach((theme) => {
    const btn = document.createElement('button');
    btn.className = 'picker-swatch';
    btn.style.background = theme.swatch;
    btn.dataset.themeId = theme.id;
    btn.setAttribute('aria-label', `Apply theme: ${theme.name}`);
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('tabindex', '0');

    btn.addEventListener('click', () => applyTheme(theme));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        applyTheme(theme);
      }
    });

    swatchContainer.appendChild(btn);
  });

  // Panel open / close toggle
  let panelOpen = true;
  toggle.addEventListener('click', () => {
    panelOpen = !panelOpen;
    panel.classList.toggle('is-hidden', !panelOpen);
    toggle.setAttribute('aria-expanded', String(panelOpen));
    toggle.textContent = panelOpen ? '›' : '‹';
  });

  // Random palette button
  randomBtn.addEventListener('click', fetchRandomTheme);
  randomBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fetchRandomTheme();
    }
  });
}

/* ============================================================
   restoreTheme — re-applies the last saved preset on page load.
   ============================================================ */
function restoreTheme() {
  const savedId = localStorage.getItem(LS_KEY);
  if (!savedId) return;
  const theme = THEMES.find((t) => t.id === savedId);
  if (theme) applyTheme(theme);
  // 'random' themes are not re-applied (id won't match THEMES array) — falls back to CSS default
}

/* ============================================================
   Scroll-spy — highlight the active nav item as the user scrolls.
   ============================================================ */
const sections = document.querySelectorAll('section[id], div[id="hero"]');
const navItems = document.querySelectorAll('.nav-item');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => item.classList.remove('active'));
        const active = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px' }
);

sections.forEach((section) => observer.observe(section));

/* ============================================================
   fetchGitHubStats — populates stars & primary language for
   project cards carrying a data-repo="owner/name" attribute.
   Unauthenticated GitHub API: 60 req/hr, public repos only.
   ============================================================ */
async function fetchGitHubStats() {
  const cards = document.querySelectorAll('.featured-proj[data-repo]');
  await Promise.allSettled(
    [...cards].map(async (card) => {
      const repo = card.dataset.repo;
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`);
        if (!res.ok) return;
        const data = await res.json();

        const starsEl = card.querySelector('.proj-stars');
        if (starsEl && data.stargazers_count > 0) {
          starsEl.textContent = ` ★ ${data.stargazers_count.toLocaleString()}`;
        }

        const langEl = card.querySelector('.proj-lang-tag');
        if (langEl && data.language) {
          langEl.textContent = data.language;
          langEl.removeAttribute('hidden');
        }
      } catch {
        // Silently ignore — card still renders with hardcoded content
      }
    })
  );
}

/* ============================================================
   fetchGitHubProfileStats — populates the Stars and Badges
   stat chips in the hero section.

   Stars: sums stargazers_count across ALL public repos owned by
   the user (paginates the /repos endpoint, 100 per page).

   Badges: GitHub does not expose profile achievements via its
   public REST or unauthenticated GraphQL API. Update
   GITHUB_BADGES_COUNT manually whenever you earn a new badge.
   ============================================================ */
const GITHUB_USER         = 'veverke';
const GITHUB_BADGES_COUNT = 4; // update manually — no public API for achievements

async function fetchGitHubProfileStats() {
  // --- Stars ---
  const starsEl = document.getElementById('stat-stars');
  if (starsEl) {
    try {
      let total = 0;
      let page  = 1;
      while (true) {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&type=owner`
        );
        if (!res.ok) break;
        const repos = await res.json();
        if (!repos.length) break;
        total += repos.reduce((sum, r) => sum + r.stargazers_count, 0);
        if (repos.length < 100) break;
        page++;
      }
      if (total > 0) starsEl.textContent = total.toLocaleString();
    } catch {
      // keep placeholder
    }
  }

  // --- Badges ---
  const badgesEl = document.getElementById('stat-badges');
  if (badgesEl) badgesEl.textContent = GITHUB_BADGES_COUNT;
}

/* ============================================================
   Init
   ============================================================ */
buildPicker();
restoreTheme();
fetchGitHubStats();
fetchGitHubProfileStats();

