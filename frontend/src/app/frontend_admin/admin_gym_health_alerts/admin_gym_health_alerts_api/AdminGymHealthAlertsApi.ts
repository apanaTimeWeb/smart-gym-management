// RESPONSIBILITY: Owns the documented Admin Gym Health Alerts HTTP contract.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_GYM_HEALTH_ALERTS_API } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_url_config';
import type { AdminGymHealthAlertsQueryParams, GymHealthAlert, GymHealthKPIData } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_types/AdminGymHealthAlertsTypes';
import { gymHealthAlertSchema, gymHealthKpiDataSchema } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_schemas/AdminGymHealthAlertsSchemas';

function buildQuery(params?: AdminGymHealthAlertsQueryParams): string {
  const query = new URLSearchParams();
  if (params?.severity) query.set('severity', params.severity);
  if (params?.search) query.set('search', params.search);
  const value = query.toString();
  return value ? `?${value}` : '';
}

export const AdminGymHealthAlertsApi = {
  fetchAlerts: async (params?: AdminGymHealthAlertsQueryParams) => apiFetch<ApiResponse<GymHealthAlert[]>>(`${ADMIN_GYM_HEALTH_ALERTS_API.alerts}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(gymHealthAlertSchema) }),
  fetchSummary: async () => apiFetch<ApiResponse<GymHealthKPIData>>(ADMIN_GYM_HEALTH_ALERTS_API.summary, { method: 'GET', dataSchema: gymHealthKpiDataSchema }),
  dismissAlert: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(ADMIN_GYM_HEALTH_ALERTS_API.dismiss(id), { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
};
