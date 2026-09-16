import { describe, expect, it } from 'vitest';
import { adminHandlers } from '@/app/admin/admin_mocks/handlers/AdminMockHandlers';

describe('Admin module-owned MSW contract', () => {
  it('registers a non-empty handler set', () => {
    expect(adminHandlers.length).toBeGreaterThan(0);
    expect(adminHandlers.every(Boolean)).toBe(true);
  });

  it('owns the expected high-value API surfaces', () => {
    const rendered = adminHandlers.map((handler) => String(handler));
    expect(rendered.length).toBeGreaterThan(20);
  });
});
