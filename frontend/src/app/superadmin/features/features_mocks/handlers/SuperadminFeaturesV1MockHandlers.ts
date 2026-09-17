// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminFeaturesV1UrlConfig } from '@/app/superadmin/features/superadmin_features_rollout_insights_url_config';
import { SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/features/features_mocks/fixtures/SuperadminFeaturesV1MockFixtures';
export const superadminFeaturesV1Handlers = [
    http.get(SuperadminFeaturesV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE })),
];
