import { http, HttpResponse } from 'msw';
import { SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_mocks/superadmin_analytics_mocks_fixtures/SuperadminAnalyticsV1MockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsV1MockHandlers owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_mocks/superadmin_analytics_mocks_fixtures/SuperadminAnalyticsV1MockFixtures, @/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config';



export const superadminAnalyticsV1Handlers = [
    http.get('*' + MODULE_URLS.RETENTION_INSIGHTS.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE })),
];
