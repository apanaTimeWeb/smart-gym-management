import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * Contract test: proves the source artifact keeps its documented responsibility/data-flow marker.
 * This protects the AI-isolation contract without mocking away feature behavior.
 */
describe('AdminSearchableDropdown contract', () => {
  it('contains the required responsibility/data-flow contract', () => {
    const source = fs.readFileSync(new URL('AdminSearchableDropdown.tsx', import.meta.url), 'utf8');
    expect(source).toMatch(/(RESPONSIBILITY:|DATA FLOW:)/);
  });
});
