import test from 'node:test';
import assert from 'node:assert/strict';
import { AIRDROPS, IMPORT_META } from '../src/data/airdrops.generated.js';

test('imports the complete featured open newest dataset', () => {
  assert.equal(IMPORT_META.status, 'open');
  assert.equal(IMPORT_META.category, 'featured');
  assert.equal(IMPORT_META.sort, 'newest');
  assert.equal(IMPORT_META.pages, 24);
  assert.equal(AIRDROPS.length, 286);
  assert.equal(new Set(AIRDROPS.map((item) => item.sourceUrl)).size, 286);
});

test('every imported record has crawlable local identity and factual fields', () => {
  for (const item of AIRDROPS) {
    assert.match(item.name, /\S/);
    assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(item.sourceUrl, /^https:\/\/airdropalert\.com\/airdrops\//);
    assert.match(item.blockchain, /\S/);
    assert.ok(Array.isArray(item.values) && item.values.length > 0);
    assert.ok(Array.isArray(item.requirements));
    assert.ok(['ready', 'needs-review', 'unverified'].includes(item.quality));
    assert.match(item.capturedAt, /^\d{4}-\d{2}-\d{2}T/);
  }
});

test('every imported record exposes a usable project logo', () => {
  for (const item of AIRDROPS) {
    assert.match(item.logoUrl, /^https:\/\//);
  }
});

test('every record includes a direct campaign destination and rewritten participation steps', () => {
  for (const item of AIRDROPS) {
    assert.match(item.campaignUrl, /^https:\/\//);
    assert.doesNotMatch(item.campaignUrl, /^https:\/\/(?:www\.)?airdropalert\.com\//);
    assert.ok(Array.isArray(item.claimSteps) && item.claimSteps.length > 0);
    for (const step of item.claimSteps) {
      assert.match(step.title, /\S/);
      assert.ok(Array.isArray(step.details) && step.details.length > 0);
    }
  }
});
