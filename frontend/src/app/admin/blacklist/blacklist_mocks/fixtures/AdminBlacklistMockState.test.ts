import { describe, expect, it } from 'vitest';
import { getAdminBlacklistMockState, resetAdminBlacklistMockState } from '@/app/admin/blacklist/blacklist_mocks/fixtures/AdminBlacklistMockState';
import { MOCK_BLACKLIST_EXPANDED } from '@/app/admin/blacklist/blacklist_mocks/fixtures/AdminBlacklistMockFixtures';

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
