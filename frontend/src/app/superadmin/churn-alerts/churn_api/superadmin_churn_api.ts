import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { ChurnAlert, ChurnKpiData, ChurnActionPayload } from '@/app/superadmin/churn-alerts/churn_types/churn_types';
import { ChurnUrlConfig } from '@/app/superadmin/churn-alerts/churn_url_config';
import { z } from "zod";

export const churnAlertsApi = {
  fetchAlerts: () =>
    apiFetch<ApiResponse<ChurnAlert[]>>(ChurnUrlConfig.BACKEND_API.BASE, { dataSchema: z.any() }),

  fetchKpis: () =>
    apiFetch<ApiResponse<ChurnKpiData>>(`${ChurnUrlConfig.BACKEND_API.BASE}/kpi`, { dataSchema: z.any() }),

  updateAction: (payload: ChurnActionPayload) =>
    apiFetch<ApiResponse<ChurnAlert>>(`${ChurnUrlConfig.BACKEND_API.BASE}/${payload.alertId}/action`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
        dataSchema: z.any()
    }),

  dismissAlert: (alertId: string) =>
    apiFetch<ApiResponse<void>>(`${ChurnUrlConfig.BACKEND_API.BASE}/${alertId}`, {
      method: 'DELETE',
        dataSchema: z.any()
    }),

  bulkOutreach: (tenantIds: string[]) =>
    apiFetch<ApiResponse<void>>(`${ChurnUrlConfig.BACKEND_API.BASE}/outreach`, {
      method: 'POST',
      body: JSON.stringify({ tenantIds }),
        dataSchema: z.any()
    }),
};
