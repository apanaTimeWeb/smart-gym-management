/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminDashboardMockHandlers owned by the superadmin_dashboard feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_mocks/superadmin_dashboard_mocks_fixtures/SuperadminDashboardMockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { http, HttpResponse, delay } from 'msw';

import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_mocks/superadmin_dashboard_mocks_fixtures/SuperadminDashboardMockFixtures';



const BASE_URL = '*/superadmin/dashboard';
export const superadminDashboardHandlers = [
    http.get(`${BASE_URL}/metrics`, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_DASHBOARD_DATA });
    }),
    http.get(BASE_URL, async () => {
        await delay(600);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUPERADMIN_DASHBOARD_DATA });
    }),
];
