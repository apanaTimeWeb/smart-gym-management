// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_mocks/superadmin_features_mocks_fixtures/SuperadminFeaturesV1MockFixtures';
import { SuperadminFeaturesV1UrlConfig } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_url_config';

export const superadminFeaturesV1Handlers = [
    http.get('*' + SuperadminFeaturesV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE })),
];
