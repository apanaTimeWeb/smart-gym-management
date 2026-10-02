import { http, HttpResponse } from 'msw';
import { SUPERADMIN_BROADCASTS_AUDIENCE_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_mocks/superadmin_broadcasts_mocks_fixtures/SuperadminBroadcastsV1MockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBroadcastsV1MockHandlers owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_url_config, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_mocks/superadmin_broadcasts_mocks_fixtures/SuperadminBroadcastsV1MockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_url_config';


export const superadminBroadcastsV1Handlers = [
    http.get('*' + MODULE_URLS.AUDIENCE_INSIGHTS.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_BROADCASTS_AUDIENCE_INSIGHTS_MOCK_FIXTURE })),
];
