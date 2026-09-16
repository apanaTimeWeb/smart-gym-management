// RESPONSIBILITY: API client for the Blacklist module.
import { AdminBlacklistUrlConfig } from '@/app/admin/blacklist/admin_blacklist_url_config';
import type { BlacklistedMember, BlacklistFormValues, BlacklistKPIData } from '@/app/admin/blacklist/blacklist_types/blacklist_types';
import { MOCK_BLACKLIST, MOCK_BLACKLIST_KPI, BLACKLIST_GYM_OPTIONS } from '@/app/admin/blacklist/blacklist_utils/AdminBlacklistSharedConstants';
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";
export const blacklistApi = {
  fetchBlacklist: async () => {
            return apiFetch<ApiResponse<BlacklistedMember[]>>(`${AdminBlacklistUrlConfig.api.base}/fetchBlacklist`, { method: 'GET', dataSchema: z.unknown() });
        },
  fetchKPIs: async () => {
            return apiFetch<ApiResponse<BlacklistKPIData>>(`${AdminBlacklistUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: z.unknown() });
        },
  addToBlacklist: async (payload: BlacklistFormValues) => {
          return apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/addToBlacklist`, { method: 'POST', body: JSON.stringify(payload), dataSchema: z.unknown() });
      },
  removeFromBlacklist: async (id: string) => {
          return apiFetch<ApiResponse<void>>(`${AdminBlacklistUrlConfig.api.base}/removeFromBlacklist`, { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  toggleBlacklist: async (id: string) => {
          return apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/toggleBlacklist`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  /** Upgrades a gym-specific ban to a global ban across all branches. */
  propagateToAllBranches: async (id: string) => {
          return apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/propagateToAllBranches`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
};
