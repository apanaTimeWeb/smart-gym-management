// RESPONSIBILITY: API client for the Payouts module.
import { AdminPayoutsUrlConfig } from '@/app/admin/payouts/admin_payouts_url_config';
import type { GymPayout, PnLEntry, PayoutsKPIData } from '@/app/admin/payouts/payouts_types/payouts_types';
import { MOCK_PAYOUTS, MOCK_PNL, MOCK_PAYOUTS_KPI } from '@/app/admin/payouts/payouts_utils/AdminPayoutsSharedConstants';
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";

export const payoutsApi = {
  fetchPayouts: async () => {
            return apiFetch(`${AdminPayoutsUrlConfig.BACKEND_API.BASE}/fetchPayouts`, { method: 'GET', dataSchema: z.any() });
        },
  fetchPnL: async () => {
            return apiFetch(`${AdminPayoutsUrlConfig.BACKEND_API.BASE}/fetchPnL`, { method: 'GET', dataSchema: z.any() });
        },
  fetchKPIs: async () => {
          return apiFetch(`${AdminPayoutsUrlConfig.BACKEND_API.BASE}/fetchKPIs`, { method: 'GET', dataSchema: z.any() });
      },
  markPaid: async (gymId: string, month: string) => {
          return apiFetch(`${AdminPayoutsUrlConfig.BACKEND_API.BASE}/markPaid`, { method: 'POST', body: JSON.stringify(gymId), dataSchema: z.any() });
      },
};
