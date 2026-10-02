// DATA FLOW: API / URL state / module client state → useSuperadminMessagingMainViewModel → superadmin_messaging view components.
import { describe, expect, it, vi } from 'vitest';

describe('useSuperadminMessagingMainViewModel', () => {
  it('keeps the view-model module owned and exposes the documented UI orchestration surface', async () => {
    const source = await import('@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingMainViewModel');
    expect(source.useSuperadminMessagingMainViewModel).toBeTypeOf('function');
    expect(vi.isMockFunction(source.useSuperadminMessagingMainViewModel)).toBe(false);
  });
});
