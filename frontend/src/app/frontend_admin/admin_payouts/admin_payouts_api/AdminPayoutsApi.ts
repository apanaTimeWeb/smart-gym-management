import type { AdminPayoutsQueryParams } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsQueryTypes';
// RESPONSIBILITY: Owns typed HTTP access for payout summaries, P&L rows, and KPI data.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { AdminPayoutsSortDirection } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsSortTypes';
import { ADMIN_PAYOUTS_API } from '@/app/frontend_admin/admin_payouts/admin_payouts_url_config';
import { gymPayoutSchema, pnLEntrySchema, payoutsKpiDataSchema } from '@/app/frontend_admin/admin_payouts/admin_payouts_schemas/AdminPayoutsSchemas';
import type { GymPayout, PnLEntry, PayoutsKPIData } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsTypes';


/** Builds stable query parameters for the payout list and report contracts. */
function buildQuery(params?: AdminPayoutsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== 'all') query.set(key, String(value)); });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}

export const AdminPayoutsApi = {
  fetchPayouts: async (params?: AdminPayoutsQueryParams) => apiFetch<ApiResponse<GymPayout[]>>(`${ADMIN_PAYOUTS_API.base}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(gymPayoutSchema) }),
  fetchPnL: async (params?: AdminPayoutsQueryParams) => apiFetch<ApiResponse<PnLEntry[]>>(`${ADMIN_PAYOUTS_API.pnl}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(pnLEntrySchema) }),
  fetchKPIs: async (params?: AdminPayoutsQueryParams) => apiFetch<ApiResponse<PayoutsKPIData>>(`${ADMIN_PAYOUTS_API.kpis}${buildQuery(params)}`, { method: 'GET', dataSchema: payoutsKpiDataSchema }),
  fetchPayoutById: async (id: string) => apiFetch<ApiResponse<GymPayout>>(ADMIN_PAYOUTS_API.detail(id), { method: 'GET', dataSchema: gymPayoutSchema }),
};
