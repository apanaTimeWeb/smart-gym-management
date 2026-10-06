import { describe, expect, it } from 'vitest';
import { getAdminBlacklistMockState, resetAdminBlacklistMockState } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_mocks/admin_blacklist_fixtures/AdminBlacklistMockState';
import { MOCK_BLACKLIST_EXPANDED } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_mocks/admin_blacklist_fixtures/AdminBlacklistMockFixtures';

describe('Admin blacklist mock state', () => {
  it('starts from a cloned seed and can be reset deterministically', () => {
    resetAdminBlacklistMockState();
    const state = getAdminBlacklistMockState();
    expect(state).toHaveLength(MOCK_BLACKLIST_EXPANDED.length);
    state.splice(0, 1);
    expect(getAdminBlacklistMockState()).toHaveLength(MOCK_BLACKLIST_EXPANDED.length - 1);
    resetAdminBlacklistMockState();
    expect(getAdminBlacklistMockState()).toHaveLength(MOCK_BLACKLIST_EXPANDED.length);
  });
});
