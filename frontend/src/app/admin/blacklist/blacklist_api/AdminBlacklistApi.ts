// RESPONSIBILITY: Owns typed HTTP access for Admin blacklist queries and lifecycle mutations.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminBlacklistUrlConfig } from '@/app/admin/blacklist/admin_blacklist_url_config';
import type { AdminBlacklistQueryParams, BlacklistFormValues, BlacklistKPIData, BlacklistedMember } from '@/app/admin/blacklist/blacklist_types/AdminBlacklistTypes';
import { blacklistKpiDataSchema, blacklistedMemberSchema } from '@/app/admin/blacklist/blacklist_types/AdminBlacklistSchemas';

function buildQuery(params?: AdminBlacklistQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const blacklistApi = {
  fetchBlacklist: async (params?: AdminBlacklistQueryParams) => apiFetch<ApiResponse<BlacklistedMember[]>>(`${AdminBlacklistUrlConfig.api.base}/fetchBlacklist${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(blacklistedMemberSchema) }),
  fetchKPIs: async () => apiFetch<ApiResponse<BlacklistKPIData>>(`${AdminBlacklistUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: blacklistKpiDataSchema }),
  addToBlacklist: async (payload: BlacklistFormValues, idempotencyKey?: string) => apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/addToBlacklist`, { method: 'POST', body: JSON.stringify(payload), dataSchema: blacklistedMemberSchema,
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
}),
  removeFromBlacklist: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${AdminBlacklistUrlConfig.api.base}/removeFromBlacklist`, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  toggleBlacklist: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/toggleBlacklist`, { method: 'POST', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: blacklistedMemberSchema }),
  propagateToAllBranches: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BlacklistedMember>>(`${AdminBlacklistUrlConfig.api.base}/propagateToAllBranches`, { method: 'POST', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: blacklistedMemberSchema }),
};
