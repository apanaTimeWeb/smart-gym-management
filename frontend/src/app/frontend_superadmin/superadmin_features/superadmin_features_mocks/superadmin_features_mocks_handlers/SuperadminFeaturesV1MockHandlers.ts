import { http, HttpResponse } from 'msw';
import { SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_mocks/superadmin_features_mocks_fixtures/SuperadminFeaturesV1MockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminFeaturesV1MockHandlers owned by the superadmin_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_features/superadmin_features_mocks/superadmin_features_mocks_fixtures/SuperadminFeaturesV1MockFixtures, @/app/frontend_superadmin/superadmin_features/superadmin_features_url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_url_config';



export const superadminFeaturesV1Handlers = [
    http.get('*' + MODULE_URLS.ROLLOUT_INSIGHTS.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE })),
];
