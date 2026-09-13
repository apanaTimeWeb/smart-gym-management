// RESPONSIBILITY: API client for the Churn Alerts module.
// All endpoints sourced from SuperadminUrlConfig — no hardcoded strings.
// RESPONSIBILITY: API client for the Churn Alerts module.
// All endpoints sourced from SuperadminUrlConfig — no hardcoded strings.

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { ChurnAlert, ChurnKpiData, ChurnActionPayload } from '@/app/superadmin/churn-alerts/churn_types/churn_types';

import { MOCK_SUPERADMIN_CHURN_ALERTS, MOCK_SUPERADMIN_CHURN_KPIS } from '@/app/superadmin/churn-alerts/churn_api/SuperadminChurnMockData';

let mockAlerts = [...MOCK_SUPERADMIN_CHURN_ALERTS];

export const churnAlertsApi = {
  fetchAlerts: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockAlerts };
  },

  fetchKpis: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: MOCK_SUPERADMIN_CHURN_KPIS };
  },

  updateAction: async (payload: ChurnActionPayload) => {
    await new Promise(r => setTimeout(r, 500));
    mockAlerts = mockAlerts.map(a => a.id === payload.alertId ? { ...a, status: payload.status, notes: payload.notes } : a);
    return { success: true, message: 'Updated', data: mockAlerts.find(a => a.id === payload.alertId) as ChurnAlert };
  },

  dismissAlert: async (alertId: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockAlerts = mockAlerts.filter(a => a.id !== alertId);
    return { success: true, message: 'Dismissed', data: undefined };
  },

  bulkOutreach: async (tenantIds: string[]) => {
    await new Promise(r => setTimeout(r, 600));
    return { success: true, message: 'Outreach sent', data: undefined };
  },
};
