// RESPONSIBILITY: API client for the Payouts module.
import type { GymPayout, PnLEntry, PayoutsKPIData } from '@/app/admin/payouts/payouts_types/payouts_types';
import { MOCK_PAYOUTS, MOCK_PNL, MOCK_PAYOUTS_KPI } from '@/app/admin/payouts/payouts_utils/AdminPayoutsSharedConstants';
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";

export const payoutsApi = {
  fetchPayouts: async () => {
            return apiFetch('/api/admin/payouts/fetchPayouts', { method: 'GET', dataSchema: z.unknown() });
        },
  fetchPnL: async () => {
            return apiFetch('/api/admin/payouts/fetchPnL', { method: 'GET', dataSchema: z.unknown() });
        },
  fetchKPIs: async () => {
          return apiFetch('/api/admin/payouts/fetchKPIs', { method: 'GET', dataSchema: z.unknown() });
      },
  markPaid: async (gymId: string, month: string) => {
          return apiFetch('/api/admin/payouts/markPaid', { method: 'POST', body: JSON.stringify(gymId), dataSchema: z.unknown() });
      },
};
