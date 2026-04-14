/**
 * Phase 5 Unit Tests — Projects
 * Asserts that the Projects section is populated with real content,
 * every entry has a title, description, and valid link(s), and no
 * placeholder text remains.
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

beforeAll(() => {
  document.documentElement.innerHTML = html;
});

// ---------------------------------------------------------------------------
// Structure
// ---------------------------------------------------------------------------
test('projects section exists', () => {
  const section = document.querySelector('#projects-section');
  expect(section).not.toBeNull();
});

test('projects section contains at least 2 project entries', () => {
  const entries = document.querySelectorAll('#projects-section .featured-proj');
  expect(entries.length).toBeGreaterThanOrEqual(2);
});

// ---------------------------------------------------------------------------
// Per-entry content
// ---------------------------------------------------------------------------
test('each project entry has a non-empty title', () => {
  const entries = document.querySelectorAll('#projects-section .featured-proj');
  entries.forEach(entry => {
    const heading = entry.querySelector('.proj-main h3');
    expect(heading).not.toBeNull();
    // Strip any nested span text (e.g. star count meta) before checking
    const titleText = heading.childNodes[0].textContent.trim();
    expect(titleText.length).toBeGreaterThan(0);
  });
});

test('each project entry has a non-empty description', () => {
  const entries = document.querySelectorAll('#projects-section .featured-proj');
  entries.forEach(entry => {
    const desc = entry.querySelector('.proj-main p');
    expect(desc).not.toBeNull();
    expect(desc.textContent.trim().length).toBeGreaterThan(0);
  });
});

test('each project entry has at least one link with a non-empty, non-placeholder href', () => {
  const entries = document.querySelectorAll('#projects-section .featured-proj');
  entries.forEach(entry => {
    const links = entry.querySelectorAll('a[href]');
    expect(links.length).toBeGreaterThanOrEqual(1);
    links.forEach(a => {
      const href = a.getAttribute('href').trim();
      expect(href.length).toBeGreaterThan(0);
      expect(href).not.toMatch(/^#$|placeholder|example\.com|your-repo/i);
    });
  });
});

// ---------------------------------------------------------------------------
// No placeholder text
// ---------------------------------------------------------------------------
test('no placeholder text in #projects-section', () => {
  const section = document.querySelector('#projects-section');
  expect(section.textContent).not.toMatch(/project \d+|lorem|your project name/i);
});
