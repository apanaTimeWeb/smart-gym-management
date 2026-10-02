import { http, HttpResponse } from 'msw';
import { SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_mocks/superadmin_dashboard_mocks_fixtures/SuperadminDashboardV1MockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminDashboardV1MockHandlers owned by the superadmin_dashboard feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_mocks/superadmin_dashboard_mocks_fixtures/SuperadminDashboardV1MockFixtures, @/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config';



export const superadminDashboardV1Handlers = [
    http.get('*' + MODULE_URLS.BUSINESS_OVERVIEW.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE })),
];
