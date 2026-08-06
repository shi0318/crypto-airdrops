import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DIST = resolve('dist');
const read = (file) => readFileSync(resolve(DIST, file), 'utf8');
const sourceStyles = readFileSync(resolve('src/styles/global.css'), 'utf8');

test('build emits the homepage and representative detail routes', () => {
  assert.equal(existsSync(resolve(DIST, 'index.html')), true);
  assert.equal(existsSync(resolve(DIST, 'airdrop/bitunix-trading-rewards/index.html')), true);
  assert.equal(existsSync(resolve(DIST, 'airdrop/solana/index.html')), true);
  assert.equal(existsSync(resolve(DIST, 'guides/index.html')), true);
  assert.equal(existsSync(resolve(DIST, 'guides/crypto-airdrop-safety-checklist/index.html')), true);
  assert.equal(existsSync(resolve(DIST, 'news/index.html')), true);
  assert.equal(existsSync(resolve(DIST, 'testnet/index.html')), true);
});

test('homepage has original metadata and crawlable local detail links', () => {
  const html = read('index.html');
  assert.match(html, /<link rel="canonical"/);
  assert.match(html, /href="\/airdrop\/bitunix-trading-rewards\/"/);
  assert.match(html, /Top Crypto Airdrops/);
});

test('site metadata uses cryptvews.com as the canonical origin', () => {
  const homepage = read('index.html');
  const robots = read('robots.txt');

  assert.match(homepage, /<link rel="canonical" href="https:\/\/cryptvews\.com\/">/);
  assert.match(homepage, /"url":"https:\/\/cryptvews\.com\/airdrop\/bitunix-trading-rewards\//);
  assert.doesNotMatch(homepage, /topcryptoairdrops[.]com/);
  assert.match(robots, /Sitemap: https:\/\/cryptvews\.com\/sitemap-index\.xml/);
});

test('contact page uses the official cryptvews.com editorial address', () => {
  const contact = read('contact/index.html');

  assert.match(contact, /mailto:editorial@cryptvews\.com/);
  assert.doesNotMatch(contact, /editorial@topcryptoairdrops[.]com/);
});

test('homepage hero renders a data-driven chain overview', () => {
  const html = read('index.html');
  assert.match(html, /class="hero-data-visual"/);
  assert.match(html, /Chain distribution/);
  assert.match(html, /Ethereum/);
  assert.match(html, /67 records/);
  assert.match(html, /Solana/);
  assert.match(html, /aria-label="Ethereum: 67 of 286 records"/);
});

test('listing and detail pages render project logos with accessible fallback markup', () => {
  const homepage = read('index.html');
  const detail = read('airdrop/bitunix-trading-rewards/index.html');
  assert.match(homepage, /class="project-logo"/);
  assert.match(homepage, /alt="Bitunix logo"/);
  assert.match(homepage, /class="logo-fallback"/);
  assert.match(detail, /class="detail-logo"/);
  assert.match(detail, /alt="Bitunix logo"/);
});

test('pages include the ambient particle canvas without changing navigation markup', () => {
  const html = read('index.html');
  assert.match(html, /id="ambient-particles"/);
  assert.match(sourceStyles, /#ambient-particles[^}]*pointer-events:\s*none/);
});

test('editorial sections create crawlable internal links from the homepage and detail pages', () => {
  const homepage = read('index.html');
  const detail = read('airdrop/bitunix-trading-rewards/index.html');
  const guide = read('guides/crypto-airdrop-safety-checklist/index.html');
  assert.match(homepage, /href="\/guides\/"/);
  assert.match(homepage, /href="\/news\/"/);
  assert.match(detail, /href="\/guides\/crypto-airdrop-safety-checklist\/"/);
  assert.match(detail, /href="\/testnet\/"/);
  assert.match(detail, /Research Bitunix before acting/);
  assert.match(detail, /Captured August 5, 2026/);
  assert.match(homepage, /captured August 5, 2026/i);
  assert.match(guide, /Published August 6, 2026/);
  assert.doesNotMatch(homepage, />2026-08-05</);
  assert.doesNotMatch(guide, />Published 2026-08-06</);
});

test('detail pages add project background with natural crawlable internal links', () => {
  const detail = read('airdrop/bonkplay-crypto-casino/index.html');
  assert.match(detail, /<section class="content-block project-background">/);
  assert.match(detail, /<h2>About BONK/);
  assert.match(detail, /project-background[\s\S]*href="\/guides\/crypto-airdrop-safety-checklist\/"/);
  assert.match(detail, /project-background[\s\S]*href="\/airdrop\/[a-z0-9-]+\/"/);
  assert.doesNotMatch(detail, /project-background[\s\S]*href="\/guides\/crypto-airdrop-safety-checklist\/"[^>]*nofollow/);
});

test('detail pages expose the campaign website and project-specific participation steps', () => {
  const detail = read('airdrop/bitunix-trading-rewards/index.html');
  assert.match(detail, /Step-by-step Bitunix airdrop guide/);
  assert.match(detail, /Prepare access to Bitunix/);
  assert.match(detail, /class="official-link"/);
  assert.match(detail, /href="https:\/\/www\.bitunix\.com\/register"/);
  assert.match(detail, /Open official campaign/);
  assert.doesNotMatch(detail, /href="https:\/\/airdropalert\.com\//);
});

test('outbound links carry the nofollow policy', () => {
  const html = read('airdrop/bitunix-trading-rewards/index.html');
  assert.match(html, /rel="nofollow noopener noreferrer"/);
  assert.match(html, /Never share your private key or seed phrase/);
});

test('homepage footer identifies cryptvews.com as the site owner', () => {
  const html = read('index.html');

  assert.match(html, /class="footer-bottom"[\s\S]*cryptvews\.com\. All rights reserved\./);
});

test('category navigation exposes crawlable topic pages', () => {
  const homepage = read('index.html');
  const slugs = ['defi', 'blockchain', 'ai', 'meme', 'gaming'];

  assert.equal(existsSync(resolve(DIST, 'categories/index.html')), true);
  assert.match(homepage, /<summary>Categories/);
  assert.match(homepage, /href="\/categories\/"/);

  for (const slug of slugs) {
    assert.equal(existsSync(resolve(DIST, `category/${slug}/index.html`)), true);
    assert.match(homepage, new RegExp(`href="/category/${slug}/"`));
  }
});

test('category pages contain original metadata, schema, and local records', () => {
  assert.equal(existsSync(resolve(DIST, 'categories/index.html')), true);
  assert.equal(existsSync(resolve(DIST, 'category/defi/index.html')), true);
  const index = read('categories/index.html');
  const defi = read('category/defi/index.html');

  assert.match(index, /"@type":"CollectionPage"/);
  assert.match(index, /Explore airdrops by category/);
  assert.match(defi, /"@type":"ItemList"/);
  assert.match(defi, /DeFi airdrop records/);
  assert.match(defi, /href="\/airdrop\/[a-z0-9-]+\/"/);
});

test('detail pages use the shortened campaign instructions label', () => {
  const detail = read('airdrop/bitunix-trading-rewards/index.html');

  assert.match(detail, />CAMPAIGN INSTRUCTIONS</);
  assert.doesNotMatch(detail, /CAMPAIGN INSTRUCTIONS \/ REWRITTEN/);
});

test('source typography keeps all declared font sizes at twelve pixels or larger', () => {
  const pixelSizes = [...sourceStyles.matchAll(/font-size:\s*([\d.]+)px/g)].map((match) => Number(match[1]));

  assert.ok(pixelSizes.length > 0);
  assert.deepEqual(pixelSizes.filter((size) => size < 12), []);
});
