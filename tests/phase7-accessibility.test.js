/**
 * Phase 7 Unit Tests — Polish & Accessibility
 * Asserts accessibility requirements for both index.html and cv.html:
 *   - No critical or serious axe violations
 *   - All <img> have non-empty alt attributes
 *   - All <a> have discernible accessible text (text content or aria-label)
 *   - No heading levels are skipped
 */

const fs   = require('fs');
const path = require('path');
const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns the heading level numbers (e.g. [1,2,3,2,3]) from the document,
 * in DOM order. Optionally excludes headings inside role="dialog" elements
 * (dialogs have their own landmark scope).
 */
function getHeadingLevels(doc, { excludeDialogs = false } = {}) {
  let headings = Array.from(doc.querySelectorAll('h1,h2,h3,h4,h5,h6'));
  if (excludeDialogs) {
    headings = headings.filter(el => !el.closest('[role="dialog"]'));
  }
  return headings.map(el => parseInt(el.tagName[1], 10));
}

/**
 * Returns true if a sequence of heading levels never jumps by more than 1.
 * (e.g. [1,2,3] → ok; [1,3] → skip)
 */
function noHeadingLevelSkipped(levels) {
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) return false;
  }
  return true;
}

/**
 * Returns true if the element has discernible accessible text:
 * non-empty textContent, aria-label, aria-labelledby, title, or a child
 * <img> with a non-empty alt attribute (which provides the accessible name).
 */
function hasAccessibleText(el) {
  const text = (el.textContent || '').trim();
  const ariaLabel = (el.getAttribute('aria-label') || '').trim();
  const ariaLabelledBy = (el.getAttribute('aria-labelledby') || '').trim();
  const title = (el.getAttribute('title') || '').trim();
  const imgAlt = Array.from(el.querySelectorAll('img')).some(
    img => (img.getAttribute('alt') || '').trim().length > 0
  );
  return text.length > 0 || ariaLabel.length > 0 || ariaLabelledBy.length > 0 || title.length > 0 || imgAlt;
}

// ---------------------------------------------------------------------------
// index.html
// ---------------------------------------------------------------------------
describe('index.html accessibility', () => {
  const htmlPath = path.resolve(__dirname, '../index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  test('no critical or serious axe violations', async () => {
    const results = await axe(document.documentElement, {
      rules: {
        // Color contrast can't be evaluated accurately in jsdom (no CSS rendering)
        'color-contrast': { enabled: false },
        // Skip rules that depend on real network/browser layout
        'scrollable-region-focusable': { enabled: false },
      },
    });
    const blockers = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );
    if (blockers.length > 0) {
      const details = blockers
        .map(v => `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map(n => n.html).join(', ')}`)
        .join('\n');
      throw new Error(`${blockers.length} critical/serious axe violation(s):\n${details}`);
    }
    expect(blockers).toHaveLength(0);
  }, 15000);

  test('all <img> elements have a non-empty alt attribute', () => {
    const imgs = document.querySelectorAll('img');
    expect(imgs.length).toBeGreaterThan(0);
    imgs.forEach(img => {
      const alt = img.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt.trim().length).toBeGreaterThan(0);
    });
  });

  test('all <a> elements have discernible accessible text', () => {
    const anchors = document.querySelectorAll('a');
    expect(anchors.length).toBeGreaterThan(0);
    anchors.forEach(anchor => {
      expect(hasAccessibleText(anchor)).toBe(true);
    });
  });

  test('heading levels are not skipped (h1 → h2 → h3 flow)', () => {
    const levels = getHeadingLevels(document);
    expect(levels.length).toBeGreaterThan(0);
    expect(levels[0]).toBe(1); // Must start with h1
    expect(noHeadingLevelSkipped(levels)).toBe(true);
  });

  test('exactly one <h1> exists', () => {
    const h1s = document.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  test('all section titles are h2 elements', () => {
    const sectionTitles = document.querySelectorAll('.section-title');
    expect(sectionTitles.length).toBeGreaterThan(0);
    sectionTitles.forEach(el => {
      expect(el.tagName).toBe('H2');
    });
  });
});

// ---------------------------------------------------------------------------
// cv.html
// ---------------------------------------------------------------------------
describe('cv.html accessibility', () => {
  const cvPath = path.resolve(__dirname, '../cv.html');
  const cvHtml = fs.readFileSync(cvPath, 'utf8');

  beforeEach(() => {
    document.documentElement.innerHTML = cvHtml;
  });

  test('no critical or serious axe violations', async () => {
    const results = await axe(document.documentElement, {
      rules: {
        'color-contrast': { enabled: false },
        'scrollable-region-focusable': { enabled: false },
      },
    });
    const blockers = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );
    if (blockers.length > 0) {
      const details = blockers
        .map(v => `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map(n => n.html).join(', ')}`)
        .join('\n');
      throw new Error(`${blockers.length} critical/serious axe violation(s):\n${details}`);
    }
    expect(blockers).toHaveLength(0);
  }, 15000);

  test('all <a> elements have discernible accessible text', () => {
    const anchors = document.querySelectorAll('a');
    expect(anchors.length).toBeGreaterThan(0);
    anchors.forEach(anchor => {
      expect(hasAccessibleText(anchor)).toBe(true);
    });
  });

  test('heading levels are not skipped', () => {
    // Exclude the PDF modal's <h2> — it is scoped to role="dialog" and rendered
    // before the main <h1> in the DOM, so it must be excluded from the page
    // outline check.
    const levels = getHeadingLevels(document, { excludeDialogs: true });
    expect(levels.length).toBeGreaterThan(0);
    expect(levels[0]).toBe(1);
    expect(noHeadingLevelSkipped(levels)).toBe(true);
  });

  test('exactly one <h1> exists', () => {
    const h1s = document.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  test('all CV section titles are h2 elements', () => {
    const sectionTitles = document.querySelectorAll('.cv-section-title');
    expect(sectionTitles.length).toBeGreaterThan(0);
    sectionTitles.forEach(el => {
      expect(el.tagName).toBe('H2');
    });
  });
});
