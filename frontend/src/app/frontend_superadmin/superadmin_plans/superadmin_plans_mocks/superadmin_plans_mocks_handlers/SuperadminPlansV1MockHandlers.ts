import { http, HttpResponse } from 'msw';
import { SUPERADMIN_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_mocks/superadmin_plans_mocks_fixtures/SuperadminPlansV1MockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlansV1MockHandlers owned by the superadmin_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_url_config, @/app/frontend_superadmin/superadmin_plans/superadmin_plans_mocks/superadmin_plans_mocks_fixtures/SuperadminPlansV1MockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_url_config';


export const superadminPlansV1Handlers = [
    http.get('*' + MODULE_URLS.BUSINESS_CONTROLS.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE })),
];
