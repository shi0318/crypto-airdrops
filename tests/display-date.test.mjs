import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDisplayDate } from '../src/utils/date.js';

test('formats ISO dates in the site-wide English display format', () => {
  assert.equal(formatDisplayDate('2026-08-05'), 'August 5, 2026');
  assert.equal(formatDisplayDate('2026-08-05T11:41:25.226Z'), 'August 5, 2026');
});
