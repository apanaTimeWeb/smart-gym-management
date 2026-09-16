// RESPONSIBILITY: Owns MSW handlers for the Admin gym-health-alerts feature.
// DATA FLOW: gym-health-alerts API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { MOCK_GYM_HEALTH_ALERTS } from '@/app/admin/gym-health-alerts/gym-health-alerts_mocks/fixtures/AdminGymHealthAlertsMockFixtures';

type JsonObject = Record<string, unknown>;

async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

function asRecord(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)) } });
};

import { MOCK_GYM_HEALTH_KPI } from '@/app/admin/gym-health-alerts/gym-health-alerts_mocks/fixtures/AdminGymHealthAlertsMockFixtures';
const healthAlertsState = structuredClone(MOCK_GYM_HEALTH_ALERTS);

export const adminGymHealthAlertsMockHandlers = [
  http.get('*/admin/gym-health-alerts/fetchAlerts', ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const severity=url.searchParams.get('severity'); const status=url.searchParams.get('status'); const all=healthAlertsState.filter(a => (!search || `${a.gymName} ${a.title} ${a.description}`.toLowerCase().includes(search)) && (!severity || severity==='all' || a.severity===severity) && (!status || status==='all' || (status==='resolved' ? a.isResolved : !a.isResolved))); const page=Math.max(1,Number(url.searchParams.get('page'))||1), limit=Math.max(1,Number(url.searchParams.get('limit'))||10); return paged(all,page,limit); }),
  http.get('*/admin/gym-health-alerts/fetchKPIs', () => ok({ ...MOCK_GYM_HEALTH_KPI, totalAlerts: healthAlertsState.length, criticalAlerts: healthAlertsState.filter(a => a.severity === 'critical' && !a.isResolved).length, warningAlerts: healthAlertsState.filter(a => a.severity === 'warning' && !a.isResolved).length, gymsAtRisk: new Set(healthAlertsState.filter(a => !a.isResolved).map(a => a.gymId)).size })),
  http.post('*/admin/gym-health-alerts/resolveAlert', async ({ request }) => { const body = asRecord(await parseRequestBody(request)); const id = String(body.id ?? body.alertId ?? ''); const item = healthAlertsState.find(a => a.id === id); if (item) Object.assign(item, { isResolved: true, resolvedAt: new Date().toISOString() }); return ok(item ?? null, 'Alert resolved'); }),
  http.post('*/admin/gym-health-alerts/dismissAlert', async ({ request }) => { const body = asRecord(await parseRequestBody(request)); const id = String(body.id ?? body.alertId ?? ''); const index = healthAlertsState.findIndex(a => a.id === id); if (index >= 0) healthAlertsState.splice(index, 1); return ok(null, 'Alert dismissed'); })
];
