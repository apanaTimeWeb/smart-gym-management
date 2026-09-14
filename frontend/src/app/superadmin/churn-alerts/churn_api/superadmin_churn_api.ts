import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { ChurnAlert, ChurnKpiData, ChurnActionPayload } from '@/app/superadmin/churn-alerts/churn_types/churn_types';
import { ChurnUrlConfig } from '@/app/superadmin/churn-alerts/churn_url_config';
import { z } from "zod";

export const churnAlertsApi = {
  fetchAlerts: () =>
    apiFetch<ApiResponse<ChurnAlert[]>>(ChurnUrlConfig.BACKEND_API.BASE, { dataSchema: z.unknown() }),

  fetchKpis: () =>
    apiFetch<ApiResponse<ChurnKpiData>>(`${ChurnUrlConfig.BACKEND_API.BASE}/kpi`, { dataSchema: z.unknown() }),

  updateAction: (payload: ChurnActionPayload) =>
    apiFetch<ApiResponse<ChurnAlert>>(`${ChurnUrlConfig.BACKEND_API.BASE}/${payload.alertId}/action`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
        dataSchema: z.unknown()
    }),

  dismissAlert: (alertId: string) =>
    apiFetch<ApiResponse<void>>(`${ChurnUrlConfig.BACKEND_API.BASE}/${alertId}`, {
      method: 'DELETE',
        dataSchema: z.unknown()
    }),

  bulkOutreach: (tenantIds: string[]) =>
    apiFetch<ApiResponse<void>>(`${ChurnUrlConfig.BACKEND_API.BASE}/outreach`, {
      method: 'POST',
      body: JSON.stringify({ tenantIds }),
        dataSchema: z.unknown()
    }),
};
