import { http, HttpResponse, delay } from 'msw';
import type { ChurnAlert, ChurnKpiData, ChurnActionPayload } from '@/app/superadmin/churn-alerts/churn_types/churn_types';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/churn-alerts';

let mockAlerts: ChurnAlert[] = [
  {
    id: 'ca1', tenantId: 't1', gymName: 'Iron Paradise', ownerName: 'Alice', adminEmail: 'alice@iron.com',
    phone: '9876543210', plan: 'Pro', riskLevel: 'CRITICAL', actionStatus: 'PENDING',
    riskScore: 90, lastLoginDays: 30, memberDrop: 15, paymentFailures: 2, renewalDaysLeft: 5,
    mrrAtRisk: 5000, notes: '', flaggedAt: '2023-11-20T10:00:00Z'
  },
  {
    id: 'ca2', tenantId: 't2', gymName: 'Fit Life Studio', ownerName: 'Bob', adminEmail: 'bob@fitlife.com',
    phone: '9876543211', plan: 'Basic', riskLevel: 'HIGH', actionStatus: 'CONTACTED',
    riskScore: 75, lastLoginDays: 15, memberDrop: 5, paymentFailures: 1, renewalDaysLeft: 10,
    mrrAtRisk: 2000, notes: 'Called them yesterday.', flaggedAt: '2023-11-18T10:00:00Z'
  }
];

const MOCK_SUPERADMIN_CHURN_KPIS: ChurnKpiData = {
  totalAtRisk: 2,
  criticalCount: 1,
  highCount: 1,
  estimatedMrrAtRisk: 7000
};

export const superadminChurnHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<ChurnAlert[]>>({
      success: true,
      message: 'Success',
      data: mockAlerts,
    });
  }),
  
  http.get(`${BASE_URL}/kpi`, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<ChurnKpiData>>({
      success: true,
      message: 'Success',
      data: MOCK_SUPERADMIN_CHURN_KPIS,
    });
  }),

  http.patch(`${BASE_URL}/:alertId/action`, async ({ params, request }) => {
    await delay(500);
    const alertId = params.alertId as string;
    const payload = await request.json() as ChurnActionPayload;
    
    let updated: ChurnAlert | null = null;
    mockAlerts = mockAlerts.map(a => {
      if (a.id === alertId) {
        updated = { ...a, actionStatus: payload.status, notes: payload.notes || a.notes };
        return updated;
      }
      return a;
    }) as ChurnAlert[];

    if (!updated) {
      return HttpResponse.json<ApiResponse<ChurnAlert>>({ success: false, message: 'Not found', data: null }, { status: 404 });
    }

    return HttpResponse.json<ApiResponse<ChurnAlert>>({
      success: true,
      message: 'Updated',
      data: updated,
    });
  }),

  http.delete(`${BASE_URL}/:alertId`, async ({ params }) => {
    await delay(400);
    const alertId = params.alertId as string;
    mockAlerts = mockAlerts.filter(a => a.id !== alertId);
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      message: 'Dismissed',
      data: null,
    });
  }),

  http.post(`${BASE_URL}/outreach`, async ({ request }) => {
    await delay(600);
    // Not strictly doing anything with tenantIds for the mock
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      message: 'Outreach sent',
      data: null,
    });
  }),
];
