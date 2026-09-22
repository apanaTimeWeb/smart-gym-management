// RESPONSIBILITY: Owns typed HTTP access for Admin gym-health alerts and alert mutations.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminGymHealthAlertsUrlConfig } from '@/app/admin/gym-health-alerts/admin_gym_health_alerts_url_config';
import type { AdminGymHealthAlertsQueryParams, GymHealthAlert, GymHealthKPIData } from '@/app/admin/gym-health-alerts/gym_health_alerts_types/AdminGymHealthAlertsTypes';
import { gymHealthAlertSchema, gymHealthKpiDataSchema } from '@/app/admin/gym-health-alerts/gym_health_alerts_types/AdminGymHealthAlertsSchemas';

function buildQuery(params?: AdminGymHealthAlertsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const gymHealthAlertsApi = {
  fetchAlerts: async (params?: AdminGymHealthAlertsQueryParams) => apiFetch<ApiResponse<GymHealthAlert[]>>(`${AdminGymHealthAlertsUrlConfig.api.base}/fetchAlerts${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(gymHealthAlertSchema) }),
  fetchKPIs: async () => apiFetch<ApiResponse<GymHealthKPIData>>(`${AdminGymHealthAlertsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: gymHealthKpiDataSchema }),
  resolveAlert: async (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<null>>(`${AdminGymHealthAlertsUrlConfig.api.base}/resolveAlert`, { method: 'POST', body: JSON.stringify({ id }), dataSchema: z.null(),
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
}),
  dismissAlert: async (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<null>>(`${AdminGymHealthAlertsUrlConfig.api.base}/dismissAlert`, { method: 'POST', body: JSON.stringify({ id }), dataSchema: z.null(),
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
}),
};
