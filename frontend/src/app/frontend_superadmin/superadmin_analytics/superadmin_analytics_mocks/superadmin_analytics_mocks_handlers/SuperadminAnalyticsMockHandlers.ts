import { http, HttpResponse, delay } from 'msw';
import { MOCK_SUPERADMIN_ANALYTICS } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_mocks/superadmin_analytics_mocks_fixtures/SuperadminAnalyticsMockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsMockHandlers owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_mocks/superadmin_analytics_mocks_fixtures/SuperadminAnalyticsMockFixtures, @/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config, @/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config';

import type { AnalyticsApiData } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsTypes';
import type { ApiResponse } from '@/lib/api';



const BASE_URL = `*${MODULE_URLS.BACKEND_API.BASE}`;
export const superadminAnalyticsHandlers = [
    http.get('*' + BASE_URL, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<AnalyticsApiData>>({
            success: true,
            message: 'Success',
            data: MOCK_SUPERADMIN_ANALYTICS,
        });
    }),
];
