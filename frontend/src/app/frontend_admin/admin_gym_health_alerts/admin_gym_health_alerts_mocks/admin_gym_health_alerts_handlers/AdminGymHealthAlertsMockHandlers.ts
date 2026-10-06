import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { MOCK_ADMIN_GYM_HEALTH_ALERTS } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_mocks/admin_gym_health_alerts_fixtures/AdminGymHealthAlertsMockFixtures';

let healthAlertsState = structuredClone(MOCK_ADMIN_GYM_HEALTH_ALERTS);
const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data });

export const adminGymHealthAlertsMockHandlers = [
  http.get('*/admin/gym-health-alerts', ({ request }) => {
    const url = new URL(request.url);
    const severity = url.searchParams.get('severity');
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';
    const alerts = healthAlertsState.filter((item) => (!severity || item.severity === severity) && (!search || `${item.title} ${item.description} ${item.gymName}`.toLowerCase().includes(search)));
    return ok(alerts);
  }),
  http.get('*/admin/gym-health-alerts/summary', () => ok({
    totalAlerts: healthAlertsState.length,
    criticalAlerts: healthAlertsState.filter((item) => item.severity === 'critical').length,
    warningAlerts: healthAlertsState.filter((item) => item.severity === 'warning').length,
    infoAlerts: healthAlertsState.filter((item) => item.severity === 'info').length,
  })),
  http.post('*/admin/gym-health-alerts/:id/dismiss', ({ params }) => {
    const id = String(params.id ?? '');
    const exists = healthAlertsState.some((item) => item.id === id);
    if (!exists) return HttpResponse.json({ success: false, message: 'Alert not found', data: null }, { status: StatusCodes.NOT_FOUND });
    healthAlertsState = healthAlertsState.filter((item) => item.id !== id);
    return ok(null, 'Alert dismissed');
  }),
];
