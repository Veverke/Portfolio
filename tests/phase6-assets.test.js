/**
 * Phase 6 Unit Tests — Assets & Images
 * Asserts that the headshot and favicon are wired up correctly, every <img>
 * has a non-empty alt attribute, no <img src> contains a placeholder value,
 * and the files referenced by local paths exist on disk.
 */

const fs   = require('fs');
const path = require('path');

// Vite serves the `public/` directory at the site root – map /foo → public/foo
const PUBLIC_DIR = path.resolve(__dirname, '../public');
function publicPath(href) {
  // Strip leading slash, then resolve under public/
  return path.join(PUBLIC_DIR, href.replace(/^\//, ''));
}

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

beforeAll(() => {
  document.documentElement.innerHTML = html;
});

// ---------------------------------------------------------------------------
// Headshot
// ---------------------------------------------------------------------------
test('headshot <img> exists in the page', () => {
  const avatar = document.querySelector('.avatar img, .avatar-img');
  expect(avatar).not.toBeNull();
});

test('headshot <img src> points to a file that exists on disk', () => {
  const avatar = document.querySelector('.avatar img, .avatar-img');
  expect(avatar).not.toBeNull();
  const src = avatar.getAttribute('src');
  // Only validate local paths (starts with /)
  if (src && src.startsWith('/')) {
    expect(fs.existsSync(publicPath(src))).toBe(true);
  }
});

// ---------------------------------------------------------------------------
// Favicon
// ---------------------------------------------------------------------------
test('<link rel="icon"> exists in the document', () => {
  const favicon = document.querySelector('link[rel="icon"]');
  expect(favicon).not.toBeNull();
});

test('favicon <link href> points to a file that exists on disk', () => {
  const favicon = document.querySelector('link[rel="icon"]');
  expect(favicon).not.toBeNull();
  const href = favicon.getAttribute('href');
  if (href && href.startsWith('/')) {
    expect(fs.existsSync(publicPath(href))).toBe(true);
  }
});

// ---------------------------------------------------------------------------
// All <img> elements have alt text
// ---------------------------------------------------------------------------
test('every <img> element has a non-empty alt attribute', () => {
  const images = document.querySelectorAll('img');
  expect(images.length).toBeGreaterThan(0);
  images.forEach(img => {
    const alt = img.getAttribute('alt');
    expect(alt).not.toBeNull();
    expect(alt.trim().length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// No placeholder <img src> values
// ---------------------------------------------------------------------------
test('no <img src> contains a placeholder value', () => {
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    const src = img.getAttribute('src');
    expect(src).not.toMatch(/^#$|placeholder|via\.placeholder\.com/i);
  });
});
