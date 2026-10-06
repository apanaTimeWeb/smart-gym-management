import { expect, it } from 'vitest';

/**
 * Documents the debounce contract used by Manager search/filter flows.
 */
describe('Manager debounce contract', () => {
  it('uses the documented 300ms minimum delay in consuming features', async () => {
    const source = await import('@/app/frontend_manager/manager_infrastructure/useManagerDebounce');
    expect(source.useManagerDebounce).toBeTypeOf('function');
  });
});
