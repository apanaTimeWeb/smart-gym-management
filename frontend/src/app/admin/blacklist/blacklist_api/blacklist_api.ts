// RESPONSIBILITY: API client for the Blacklist module.
import type { BlacklistedMember, BlacklistFormValues, BlacklistKPIData } from '@/app/admin/blacklist/blacklist_types/blacklist_types';
import { MOCK_BLACKLIST, MOCK_BLACKLIST_KPI, BLACKLIST_GYM_OPTIONS } from '@/app/admin/blacklist/blacklist_utils/AdminBlacklistSharedConstants';
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";
export const blacklistApi = {
  fetchBlacklist: async () => {
            return apiFetch('/api/admin/blacklist/fetchBlacklist', { method: 'GET', dataSchema: z.unknown() });
        },
  fetchKPIs: async () => {
            return apiFetch('/api/admin/blacklist/fetchKPIs', { method: 'GET', dataSchema: z.unknown() });
        },
  addToBlacklist: async (payload: BlacklistFormValues) => {
          return apiFetch('/api/admin/blacklist/addToBlacklist', { method: 'POST', body: JSON.stringify(payload), dataSchema: z.unknown() });
      },
  removeFromBlacklist: async (id: string) => {
          return apiFetch('/api/admin/blacklist/removeFromBlacklist', { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  toggleBlacklist: async (id: string) => {
          return apiFetch('/api/admin/blacklist/toggleBlacklist', { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  /** Upgrades a gym-specific ban to a global ban across all branches. */
  propagateToAllBranches: async (id: string) => {
          return apiFetch('/api/admin/blacklist/propagateToAllBranches', { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
};
