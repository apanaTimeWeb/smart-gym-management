import { http, HttpResponse } from 'msw';
import { SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_fixtures/SuperadminMessagingV1MockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminMessagingV1MockHandlers owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_fixtures/SuperadminMessagingV1MockFixtures, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';



export const superadminMessagingV1Handlers = [
    http.get('*' + MODULE_URLS.TEMPLATE_INSIGHTS.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE })),
];
