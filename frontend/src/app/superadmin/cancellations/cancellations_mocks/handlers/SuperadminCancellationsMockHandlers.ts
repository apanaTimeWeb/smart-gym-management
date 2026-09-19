import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import type { CancellationsAlert, CancellationsKpiData, CancellationsActionPayload } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsTypes';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SUPERADMIN_CANCELLATIONS } from '@/app/superadmin/cancellations/cancellations_mocks/fixtures/SuperadminCancellationsMockFixtures';
const BASE_URL = '*/api/v1/superadmin/cancellations';
let mockAlerts: CancellationsAlert[] = [...MOCK_SUPERADMIN_CANCELLATIONS];

export function resetSuperadminCancellationsMockState(): void {
  mockAlerts = [...MOCK_SUPERADMIN_CANCELLATIONS];
}
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
        mockAlerts = mockAlerts.map((a) => { if (a.id !== alertId)
            return a; updated = { ...a, actionStatus: payload.status, notes: payload.notes || a.notes }; return updated; });
        if (!updated)
            return HttpResponse.json<ApiResponse<CancellationsAlert>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<CancellationsAlert>>({ success: true, message: 'Updated', data: updated });
    }),
    http.delete(`${BASE_URL}/:alertId`, async ({ params }) => { const id = String(params.alertId); mockAlerts = mockAlerts.filter((a) => a.id !== id); return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Dismissed', data: null }); }),
    http.post(`${BASE_URL}/outreach`, async () => HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Outreach sent', data: null })),
];
