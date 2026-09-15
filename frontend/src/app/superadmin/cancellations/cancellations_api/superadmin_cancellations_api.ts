import { CancellationsAlertSchema, CancellationsKpiDataSchema } from '@/app/superadmin/cancellations/cancellations_types/superadmin_cancellations_types';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { CancellationsAlert, CancellationsKpiData, CancellationsActionPayload } from '@/app/superadmin/cancellations/cancellations_types/superadmin_cancellations_types';
import { CancellationsUrlConfig } from '@/app/superadmin/cancellations/superadmin_cancellations_url_config';
import { z } from "zod";

export const cancellationsAlertsApi = {
  fetchAlerts: () =>
    apiFetch<ApiResponse<CancellationsAlert[]>>(CancellationsUrlConfig.BACKEND_API.BASE, { dataSchema: z.array(CancellationsAlertSchema) }),

  fetchKpis: () =>
    apiFetch<ApiResponse<CancellationsKpiData>>(`${CancellationsUrlConfig.BACKEND_API.BASE}/kpi`, { dataSchema: CancellationsKpiDataSchema }),

  updateAction: (payload: CancellationsActionPayload) =>
    apiFetch<ApiResponse<CancellationsAlert>>(`${CancellationsUrlConfig.BACKEND_API.BASE}/${payload.alertId}/action`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
        dataSchema: CancellationsAlertSchema
    }),

  dismissAlert: (alertId: string) =>
    apiFetch<ApiResponse<void>>(`${CancellationsUrlConfig.BACKEND_API.BASE}/${alertId}`, {
      method: 'DELETE',
        dataSchema: z.object({}).passthrough()
    }),

  bulkOutreach: (tenantIds: string[]) =>
    apiFetch<ApiResponse<void>>(`${CancellationsUrlConfig.BACKEND_API.BASE}/outreach`, {
      method: 'POST',
      body: JSON.stringify({ tenantIds }),
        dataSchema: z.object({}).passthrough()
    }),
};
