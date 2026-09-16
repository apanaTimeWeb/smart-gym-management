import { http, HttpResponse, delay } from 'msw';
import type { CancellationsAlert, CancellationsKpiData, CancellationsActionPayload } from '@/app/superadmin/cancellations/cancellations_types/superadmin_cancellations_types';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/cancellations';

let mockAlerts: CancellationsAlert[] = [
  { id: 'ca1', tenantId: 't1', gymName: 'Iron Paradise', ownerName: 'Alice', adminEmail: 'alice@iron.com', phone: '9876543210', plan: 'Pro', riskLevel: 'CRITICAL', actionStatus: 'PENDING', riskScore: 92, lastLoginDays: 30, memberDrop: 18, paymentFailures: 3, renewalDaysLeft: 5, mrrAtRisk: 5000, notes: 'High churn risk after payment failures', flaggedAt: '2026-09-15T10:00:00Z' },
  { id: 'ca2', tenantId: 't2', gymName: 'Fit Life Studio', ownerName: 'Bob', adminEmail: 'bob@fitlife.com', phone: '9876543211', plan: 'Basic', riskLevel: 'HIGH', actionStatus: 'CONTACTED', riskScore: 78, lastLoginDays: 15, memberDrop: 9, paymentFailures: 1, renewalDaysLeft: 10, mrrAtRisk: 2400, notes: 'Owner requested pricing review', flaggedAt: '2026-09-14T09:20:00Z' },
  { id: 'ca3', tenantId: 't3', gymName: 'CrossFit Box', ownerName: 'Cara', adminEmail: 'cara@crossfitbox.com', phone: '9876543212', plan: 'Enterprise', riskLevel: 'MEDIUM', actionStatus: 'PENDING', riskScore: 61, lastLoginDays: 9, memberDrop: 6, paymentFailures: 0, renewalDaysLeft: 25, mrrAtRisk: 1800, notes: 'Member count softening', flaggedAt: '2026-09-13T11:15:00Z' },
  { id: 'ca4', tenantId: 't4', gymName: 'Powerhouse Gym', ownerName: 'David', adminEmail: 'david@powerhouse.com', phone: '9876543213', plan: 'Pro', riskLevel: 'LOW', actionStatus: 'CONTACTED', riskScore: 38, lastLoginDays: 4, memberDrop: 2, paymentFailures: 0, renewalDaysLeft: 40, mrrAtRisk: 900, notes: 'Low risk; monitor engagement', flaggedAt: '2026-09-12T07:40:00Z' },
  { id: 'ca5', tenantId: 't5', gymName: 'Pulse Fitness', ownerName: 'Eva', adminEmail: 'eva@pulsefit.com', phone: '9876543214', plan: 'Basic', riskLevel: 'HIGH', actionStatus: 'RESOLVED', riskScore: 74, lastLoginDays: 18, memberDrop: 12, paymentFailures: 2, renewalDaysLeft: 7, mrrAtRisk: 2200, notes: 'Resolved after payment method update', flaggedAt: '2026-09-10T16:25:00Z' },
  { id: 'ca6', tenantId: 't6', gymName: 'Urban Strength', ownerName: 'Farhan', adminEmail: 'farhan@urbanstrength.com', phone: '9876543215', plan: 'Enterprise', riskLevel: 'CRITICAL', actionStatus: 'CONTACTED', riskScore: 95, lastLoginDays: 45, memberDrop: 22, paymentFailures: 4, renewalDaysLeft: 3, mrrAtRisk: 7600, notes: 'Escalated to retention team', flaggedAt: '2026-09-09T05:55:00Z' },
  { id: 'ca7', tenantId: 't7', gymName: 'Core Studio', ownerName: 'Grace', adminEmail: 'grace@corestudio.com', phone: '9876543216', plan: 'Pro', riskLevel: 'MEDIUM', actionStatus: 'CANCELLED', riskScore: 58, lastLoginDays: 11, memberDrop: 7, paymentFailures: 1, renewalDaysLeft: 20, mrrAtRisk: 1500, notes: 'Tenant confirmed cancellation', flaggedAt: '2026-08-28T12:00:00Z' },
  { id: 'ca8', tenantId: 't8', gymName: 'Zen Athletics', ownerName: 'Hina', adminEmail: 'hina@zenathletics.com', phone: '9876543217', plan: 'Basic', riskLevel: 'LOW', actionStatus: 'PENDING', riskScore: 31, lastLoginDays: 2, memberDrop: 1, paymentFailures: 0, renewalDaysLeft: 55, mrrAtRisk: 700, notes: 'Automated engagement alert', flaggedAt: '2026-08-20T18:30:00Z' },
];

const kpis = (): CancellationsKpiData => ({
  totalAtRisk: mockAlerts.filter((a) => a.actionStatus !== 'CANCELLED').length,
  criticalCount: mockAlerts.filter((a) => a.riskLevel === 'CRITICAL' && a.actionStatus !== 'CANCELLED').length,
  highCount: mockAlerts.filter((a) => a.riskLevel === 'HIGH' && a.actionStatus !== 'CANCELLED').length,
  estimatedMrrAtRisk: mockAlerts.filter((a) => a.actionStatus !== 'CANCELLED').reduce((sum, a) => sum + a.mrrAtRisk, 0),
});

export const superadminCancellationsHandlers = [
  http.get(BASE_URL, async ({ request }) => {
    await delay(120);
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const risk = url.searchParams.get('riskLevel');
    const actionStatus = url.searchParams.get('actionStatus');
    const page = Math.max(Number(url.searchParams.get('page')) || 1, 1);
    const limit = Math.max(Number(url.searchParams.get('limit')) || 20, 1);
    let rows = mockAlerts.filter((alert) => {
      const matchesSearch = !search || [alert.gymName, alert.ownerName, alert.adminEmail, alert.plan].some((v) => v.toLowerCase().includes(search));
      const matchesRisk = !risk || risk === 'ALL' || alert.riskLevel === risk;
      const matchesAction = !actionStatus || actionStatus === 'ALL' || alert.actionStatus === actionStatus;
      return matchesSearch && matchesRisk && matchesAction;
    });
    const total = rows.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    rows = rows.slice((page - 1) * limit, page * limit);
    return HttpResponse.json<ApiResponse<CancellationsAlert[]>>({ success: true, message: 'Success', data: rows, meta: { total, page, limit, totalPages } });
  }),
  http.get(`${BASE_URL}/kpi`, async () => { await delay(80); return HttpResponse.json<ApiResponse<CancellationsKpiData>>({ success: true, message: 'Success', data: kpis() }); }),
  http.patch(`${BASE_URL}/:alertId/action`, async ({ params, request }) => {
    await delay(120);
    const alertId = String(params.alertId);
    const payload = await request.json() as CancellationsActionPayload;
    let updated: CancellationsAlert | null = null;
    mockAlerts = mockAlerts.map((a) => { if (a.id !== alertId) return a; updated = { ...a, actionStatus: payload.status, notes: payload.notes || a.notes }; return updated; });
    if (!updated) return HttpResponse.json<ApiResponse<CancellationsAlert>>({ success: false, message: 'Not found', data: null }, { status: 404 });
    return HttpResponse.json<ApiResponse<CancellationsAlert>>({ success: true, message: 'Updated', data: updated });
  }),
  http.delete(`${BASE_URL}/:alertId`, async ({ params }) => { const id = String(params.alertId); mockAlerts = mockAlerts.filter((a) => a.id !== id); return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Dismissed', data: null }); }),
  http.post(`${BASE_URL}/outreach`, async () => HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Outreach sent', data: null })),
];
