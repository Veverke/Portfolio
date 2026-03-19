/**
 * Phase 3 Unit Tests — Identity & About
 * Asserts that all identity fields in index.html contain real content
 * (no placeholders) and that required links are correctly wired.
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

beforeAll(() => {
  document.documentElement.innerHTML = html;
});

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------
test('document title does not contain placeholder text', () => {
  // jsdom sets document.title from the <title> element
  expect(document.title).not.toMatch(/your name|portfolio template/i);
  expect(document.title.trim().length).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// No Lorem Ipsum anywhere on the page
// ---------------------------------------------------------------------------
test('no element contains "Lorem ipsum" text', () => {
  const allText = document.body.textContent;
  expect(allText).not.toMatch(/lorem ipsum/i);
});

// ---------------------------------------------------------------------------
// mailto link
// ---------------------------------------------------------------------------
test('a mailto: link exists and is not a placeholder address', () => {
  const mailtoLink = document.querySelector('a[href^="mailto:"]');
  expect(mailtoLink).not.toBeNull();
  const href = mailtoLink.getAttribute('href');
  expect(href).not.toMatch(/example\.com|your@|placeholder/i);
  // Must contain a real @ address
  expect(href).toMatch(/^mailto:.+@.+\..+$/i);
});

// ---------------------------------------------------------------------------
// LinkedIn link
// ---------------------------------------------------------------------------
test('a LinkedIn link exists and is not a placeholder URL', () => {
  const linkedinLink = document.querySelector('a[href*="linkedin"]');
  expect(linkedinLink).not.toBeNull();
  const href = linkedinLink.getAttribute('href');
  // Placeholder URLs end at just "linkedin.com/" with no path
  expect(href).not.toMatch(/^https?:\/\/(?:www\.)?linkedin\.com\/?$/i);
  // Must have an actual profile path segment
  expect(href).toMatch(/linkedin\.com\/in\/.+/i);
});

// ---------------------------------------------------------------------------
// GitHub link
// ---------------------------------------------------------------------------
test('a GitHub link exists and is not a placeholder URL', () => {
  const githubLink = document.querySelector('a[href*="github"]');
  expect(githubLink).not.toBeNull();
  const href = githubLink.getAttribute('href');
  // Placeholder URLs end at just "github.com/" with no path
  expect(href).not.toMatch(/^https?:\/\/(?:www\.)?github\.com\/?$/i);
  // Must have a username path segment
  expect(href).toMatch(/github\.com\/.+/i);
});
