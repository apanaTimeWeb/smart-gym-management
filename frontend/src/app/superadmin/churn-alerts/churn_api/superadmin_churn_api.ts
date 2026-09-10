// RESPONSIBILITY: API client for the Churn Alerts module.
// All endpoints sourced from SuperadminUrlConfig — no hardcoded strings.

import { apiFetch, ApiResponse } from '@/lib/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { ChurnAlert, ChurnKpiData, ChurnActionPayload } from '@/app/superadmin/churn-alerts/churn_types/churn_types';

export const churnAlertsApi = {
  fetchAlerts: () =>
    apiFetch<ApiResponse<ChurnAlert[]>>(SuperadminUrlConfig.BACKEND_API.CHURN_ALERTS_BASE),

  fetchKpis: () =>
    apiFetch<ApiResponse<ChurnKpiData>>(`${SuperadminUrlConfig.BACKEND_API.CHURN_ALERTS_BASE}/kpis`),

  updateAction: (payload: ChurnActionPayload) =>
    apiFetch<ApiResponse<ChurnAlert>>(`${SuperadminUrlConfig.BACKEND_API.CHURN_ALERTS_BASE}/${payload.alertId}/action`, {
      method: 'PATCH',
      body: JSON.stringify({ status: payload.status, notes: payload.notes }),
    }),

  dismissAlert: (alertId: string) =>
    apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.CHURN_ALERTS_BASE}/${alertId}`, {
      method: 'DELETE',
    }),

  bulkOutreach: (tenantIds: string[]) =>
    apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.CHURN_ALERTS_BASE}/bulk-outreach`, {
      method: 'POST',
      body: JSON.stringify({ tenantIds }),
    }),
};
