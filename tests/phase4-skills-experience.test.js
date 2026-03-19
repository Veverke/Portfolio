/**
 * Phase 4 Unit Tests — Skills & Experience
 * Asserts that the Skills, Experience, and Education sections are populated
 * with real content and that no placeholder text remains.
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

beforeAll(() => {
  document.documentElement.innerHTML = html;
});

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------
test('skills section contains at least 5 non-empty skill items', () => {
  const skillsSection = document.querySelector('#skills-section');
  expect(skillsSection).not.toBeNull();

  const skillNames = skillsSection.querySelectorAll('.skill-tile-name');
  const nonEmpty = Array.from(skillNames).filter(el => el.textContent.trim().length > 0);
  expect(nonEmpty.length).toBeGreaterThanOrEqual(5);
});

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------
test('experience section contains at least 1 entry with a non-empty date badge', () => {
  const expSection = document.querySelector('#experience-section');
  expect(expSection).not.toBeNull();

  const dateBadges = expSection.querySelectorAll('.exp-date-badge');
  const nonEmpty = Array.from(dateBadges).filter(el => el.textContent.trim().length > 0);
  expect(nonEmpty.length).toBeGreaterThanOrEqual(1);
});

test('each experience entry has a non-empty role title and company name', () => {
  const expSection = document.querySelector('#experience-section');
  const cards = expSection.querySelectorAll('.exp-card');
  expect(cards.length).toBeGreaterThanOrEqual(1);

  cards.forEach(card => {
    const role = card.querySelector('.exp-role-title');
    const company = card.querySelector('.exp-company-name');
    expect(role).not.toBeNull();
    expect(company).not.toBeNull();
    expect(role.textContent.trim().length).toBeGreaterThan(0);
    expect(company.textContent.trim().length).toBeGreaterThan(0);
  });
});

test('each experience entry has at least 3 bullet achievement points', () => {
  const expSection = document.querySelector('#experience-section');
  const cards = expSection.querySelectorAll('.exp-card');

  cards.forEach(card => {
    const bullets = card.querySelectorAll('.exp-bullets li');
    expect(bullets.length).toBeGreaterThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------
test('education section exists and contains at least 1 entry', () => {
  const eduSection = document.querySelector('#education-section');
  expect(eduSection).not.toBeNull();

  const cards = eduSection.querySelectorAll('.exp-card');
  expect(cards.length).toBeGreaterThanOrEqual(1);
});

test('education entry has a non-empty degree title and institution name', () => {
  const eduSection = document.querySelector('#education-section');
  const card = eduSection.querySelector('.exp-card');
  expect(card).not.toBeNull();

  const degree = card.querySelector('.exp-role-title');
  const institution = card.querySelector('.exp-company-name');
  const dateBadge = card.querySelector('.exp-date-badge');

  expect(degree.textContent.trim().length).toBeGreaterThan(0);
  expect(institution.textContent.trim().length).toBeGreaterThan(0);
  expect(dateBadge.textContent.trim().length).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// No placeholder / lorem text in any of the three sections
// ---------------------------------------------------------------------------
test('no placeholder text in #skills-section', () => {
  const section = document.querySelector('#skills-section');
  expect(section.textContent).not.toMatch(/lorem|placeholder|example company/i);
});

test('no placeholder text in #experience-section', () => {
  const section = document.querySelector('#experience-section');
  expect(section.textContent).not.toMatch(/lorem|placeholder|example company/i);
});

test('no placeholder text in #education-section', () => {
  const section = document.querySelector('#education-section');
  expect(section.textContent).not.toMatch(/lorem|placeholder|example company/i);
});
