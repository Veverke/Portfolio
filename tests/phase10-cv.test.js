/**
 * Phase 10 Unit Tests — CV Generation
 * Asserts that cv.html contains the required CV sections and content,
 * and that cv-print.css exists and contains @page rules.
 */

const fs   = require('fs');
const path = require('path');

const cvHtml      = fs.readFileSync(path.resolve(__dirname, '../cv.html'), 'utf8');
const cvPrintPath = path.resolve(__dirname, '../cv-print.css');

beforeAll(() => {
  document.documentElement.innerHTML = cvHtml;
});

// ---------------------------------------------------------------------------
// Page structure
// ---------------------------------------------------------------------------
test('cv.html contains exactly one <h1>', () => {
  const h1s = document.querySelectorAll('h1');
  expect(h1s.length).toBe(1);
});

test('<h1> text is the person\'s name (not a placeholder)', () => {
  const h1 = document.querySelector('h1');
  expect(h1).not.toBeNull();
  const text = h1.textContent.trim();
  expect(text).not.toMatch(/your name|lorem ipsum|placeholder/i);
  expect(text.length).toBeGreaterThan(3);
});

// ---------------------------------------------------------------------------
// Contact block
// ---------------------------------------------------------------------------
test('cv.html has a mailto: link in the header contact block', () => {
  const mailto = document.querySelector('a[href^="mailto:"]');
  expect(mailto).not.toBeNull();
  expect(mailto.getAttribute('href')).not.toBe('mailto:');
  expect(mailto.getAttribute('href')).not.toMatch(/your@email|example@|placeholder/i);
});

test('cv.html has a LinkedIn link', () => {
  const li = document.querySelector('a[href*="linkedin"]');
  expect(li).not.toBeNull();
  expect(li.getAttribute('href')).not.toMatch(/placeholder|username/i);
});

test('cv.html has a GitHub link', () => {
  const gh = document.querySelector('a[href*="github.com"]');
  expect(gh).not.toBeNull();
  expect(gh.getAttribute('href')).not.toMatch(/placeholder|username/i);
});

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------
test('cv.html skills list has at least 5 items', () => {
  const tags = document.querySelectorAll('.cv-skill-tag');
  expect(tags.length).toBeGreaterThanOrEqual(5);
  tags.forEach(tag => {
    expect(tag.textContent.trim().length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------
test('cv.html has at least one experience entry', () => {
  const entries = document.querySelectorAll('.cv-entry');
  expect(entries.length).toBeGreaterThanOrEqual(1);
});

test('at least one experience entry contains a <time> element', () => {
  const times = document.querySelectorAll('.cv-entry time');
  expect(times.length).toBeGreaterThanOrEqual(1);
});

test('each experience entry has a non-empty role title', () => {
  const roles = document.querySelectorAll('.cv-role');
  expect(roles.length).toBeGreaterThanOrEqual(1);
  roles.forEach(role => {
    expect(role.textContent.trim().length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------
test('cv.html has at least one education entry', () => {
  // Education section is the one containing "Education" title + cv-entry
  const sections = document.querySelectorAll('.cv-section');
  let educationSection = null;
  sections.forEach(s => {
    const title = s.querySelector('.cv-section-title');
    if (title && /education/i.test(title.textContent)) {
      educationSection = s;
    }
  });
  expect(educationSection).not.toBeNull();
  const entry = educationSection.querySelector('.cv-entry');
  expect(entry).not.toBeNull();
});

// ---------------------------------------------------------------------------
// No placeholder text anywhere
// ---------------------------------------------------------------------------
test('no element text matches /lorem ipsum|your name|placeholder/i', () => {
  const all = document.querySelectorAll('body *');
  all.forEach(el => {
    // Only check leaf text nodes to avoid false positives from concatenated children
    const ownText = Array.from(el.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE)
      .map(n => n.textContent)
      .join('');
    expect(ownText).not.toMatch(/lorem ipsum|your name|placeholder/i);
  });
});

// ---------------------------------------------------------------------------
// Export PDF button
// ---------------------------------------------------------------------------
test('"Export PDF" button exists with a non-empty aria-label', () => {
  const btn = document.querySelector('.export-btn');
  expect(btn).not.toBeNull();
  const label = btn.getAttribute('aria-label');
  expect(label).not.toBeNull();
  expect(label.trim().length).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// cv-print.css — Node fs check
// ---------------------------------------------------------------------------
test('cv-print.css exists on disk', () => {
  expect(fs.existsSync(cvPrintPath)).toBe(true);
});

test('cv-print.css contains an @page rule', () => {
  const css = fs.readFileSync(cvPrintPath, 'utf8');
  expect(css).toMatch(/@page/);
});
