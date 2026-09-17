// RESPONSIBILITY: Owns typed HTTP access for payout summaries, P&L rows, and KPI data.
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";
import type { AdminSortDirection } from '@/app/admin/admin_types/AdminSortTypes';
import { AdminPayoutsUrlConfig } from "@/app/admin/payouts/admin_payouts_url_config";
import { gymPayoutSchema, pnLEntrySchema, payoutsKpiDataSchema } from "@/app/admin/payouts/payouts_types/AdminPayoutsSchemas";
import type { GymPayout, PnLEntry, PayoutsKPIData } from "@/app/admin/payouts/payouts_types/AdminPayoutsTypes";

export interface AdminPayoutsQueryParams {
  month?: string;
  gymId?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortKey?: string;
  sortDir?: AdminSortDirection;
}

function buildQuery(params?: AdminPayoutsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value && value !== "all") query.set(key, value);
  });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : "";
}

export const payoutsApi = {
  fetchPayouts: async (params?: AdminPayoutsQueryParams) =>
    apiFetch<ApiResponse<GymPayout[]>>(`${AdminPayoutsUrlConfig.api.base}/fetchPayouts${buildQuery(params)}`, { method: "GET", dataSchema: z.array(gymPayoutSchema) }),
  fetchPnL: async (params?: AdminPayoutsQueryParams) =>
    apiFetch<ApiResponse<PnLEntry[]>>(`${AdminPayoutsUrlConfig.api.base}/fetchPnL${buildQuery(params)}`, { method: "GET", dataSchema: z.array(pnLEntrySchema) }),
  fetchKPIs: async (params?: AdminPayoutsQueryParams) =>
    apiFetch<ApiResponse<PayoutsKPIData>>(`${AdminPayoutsUrlConfig.api.base}/fetchKPIs${buildQuery(params)}`, { method: "GET", dataSchema: payoutsKpiDataSchema })
};
