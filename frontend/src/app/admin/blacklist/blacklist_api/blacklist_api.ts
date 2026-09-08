// RESPONSIBILITY: API client for the Blacklist module.
import type { BlacklistedMember, BlacklistFormValues, BlacklistKPIData } from '@/app/admin/blacklist/blacklist_types/blacklist_types';
import { MOCK_BLACKLIST, MOCK_BLACKLIST_KPI, BLACKLIST_GYM_OPTIONS } from '@/app/admin/blacklist/blacklist_utils/AdminBlacklistSharedConstants';

let mockList = [...MOCK_BLACKLIST];

export const blacklistApi = {
  fetchBlacklist: async (): Promise<BlacklistedMember[]> => mockList,
  fetchKPIs: async (): Promise<BlacklistKPIData> => MOCK_BLACKLIST_KPI,
  addToBlacklist: async (payload: BlacklistFormValues): Promise<BlacklistedMember> => {
    const gymNames = BLACKLIST_GYM_OPTIONS
      .filter(o => payload.assignedGyms.includes(o.value) && o.value !== 'all')
      .map(o => o.label);
    const entry: BlacklistedMember = {
      ...payload,
      id: `bl${Date.now()}`,
      blacklistedBy: 'Admin',
      blacklistedAt: new Date().toISOString().slice(0, 10),
      assignedGymNames: payload.assignedGyms.includes('all') ? ['All Gyms'] : gymNames,
      isActive: true,
    };
    mockList = [entry, ...mockList];
    return entry;
  },
  removeFromBlacklist: async (id: string): Promise<void> => {
    mockList = mockList.filter(m => m.id !== id);
  },
  toggleBlacklist: async (id: string): Promise<BlacklistedMember> => {
    mockList = mockList.map(m => m.id === id ? { ...m, isActive: !m.isActive } : m);
    return mockList.find(m => m.id === id)!;
  },
  /** Upgrades a gym-specific ban to a global ban across all branches. */
  propagateToAllBranches: async (id: string): Promise<BlacklistedMember> => {
    await new Promise(r => setTimeout(r, 400));
    mockList = mockList.map(m =>
      m.id === id ? { ...m, scope: 'global' as const, assignedGyms: ['all'], assignedGymNames: ['All Gyms'] } : m
    );
    return mockList.find(m => m.id === id)!;
  },
};
