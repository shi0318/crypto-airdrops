import test from 'node:test';
import assert from 'node:assert/strict';
import { AIRDROPS } from '../src/data/airdrops.generated.js';
import { buildAirdropPageContent } from '../src/data/content-rewriter.js';

const sourceDetails = (item) => item.claimSteps.flatMap((step) => step.details);
const outputDetails = (item) => buildAirdropPageContent(item).claimSteps.flatMap((step) => step.details);

test('rewrites campaign instructions instead of copying source sentences', () => {
  for (const item of AIRDROPS) {
    const original = new Set(sourceDetails(item).map((detail) => detail.trim()));
    const rewritten = outputDetails(item);
    assert.ok(rewritten.length > 0, `${item.slug} has no rewritten instructions`);
    for (const detail of rewritten) {
      assert.equal(original.has(detail.trim()), false, `${item.slug} copied: ${detail}`);
      assert.doesNotMatch(detail, /AirdropAlert|AirdropAlertcom|^\s*[>→•]/i, `${item.slug} kept source residue`);
      assert.doesNotMatch(detail, /the participant (?:continue|proceed)|\bfor for\b|and begin and/i, `${item.slug} has broken rewrite grammar`);
    }
  }
});

test('creates project-specific About copy from campaign facts and workflow', () => {
  const bonk = AIRDROPS.find((item) => item.slug === 'bonkplay-crypto-casino');
  const offTheGrid = AIRDROPS.find((item) => item.slug === 'off-the-grid-game');
  const bonkContent = buildAirdropPageContent(bonk);
  const offTheGridContent = buildAirdropPageContent(offTheGrid);

  assert.equal(bonkContent.about.length, 2);
  assert.equal(offTheGridContent.about.length, 2);
  assert.notEqual(bonkContent.about.join(' '), offTheGridContent.about.join(' '));
  assert.match(bonkContent.about.join(' '), /Solana|casino|BONK/i);
  assert.match(offTheGridContent.about.join(' '), /Other|game|Off The Grid/i);
  assert.doesNotMatch(bonkContent.about.join(' '), /The project record is separated from the reward claim/);
  assert.doesNotMatch(offTheGridContent.about.join(' '), /The project record is separated from the reward claim/);
});

test('rewritten BONK copy changes the sentence structure materially', () => {
  const item = AIRDROPS.find((entry) => entry.slug === 'bonkplay-crypto-casino');
  const content = buildAirdropPageContent(item);
  const text = content.claimSteps.flatMap((step) => step.details).join(' ');
  assert.doesNotMatch(text, /Go to the verified BONKplay website/i);
  assert.doesNotMatch(text, /Register with Google, email, Phantom/i);
  assert.match(text, /official|domain|current|terms|verify/i);
});
