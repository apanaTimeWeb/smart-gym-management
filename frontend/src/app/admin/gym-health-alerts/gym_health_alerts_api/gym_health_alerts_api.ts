// RESPONSIBILITY: API client for the Gym Health Alerts module.
import type { GymHealthAlert, GymHealthKPIData } from '@/app/admin/gym-health-alerts/gym_health_alerts_types/gym_health_alerts_types';
import { MOCK_GYM_HEALTH_ALERTS, MOCK_GYM_HEALTH_KPI } from '@/app/admin/gym-health-alerts/gym_health_alerts_utils/AdminGymHealthAlertsSharedConstants';
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";
export const gymHealthAlertsApi = {
  fetchAlerts: async () => {
            return apiFetch('/api/admin/gymHealthAlerts/fetchAlerts', { method: 'GET', dataSchema: z.any() });
        },
  fetchKPIs: async () => {
            return apiFetch('/api/admin/gymHealthAlerts/fetchKPIs', { method: 'GET', dataSchema: z.any() });
        },
  resolveAlert: async (id: string) => {
          return apiFetch('/api/admin/gymHealthAlerts/resolveAlert', { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
      },
  dismissAlert: async (id: string) => {
          return apiFetch('/api/admin/gymHealthAlerts/dismissAlert', { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
      },
};
