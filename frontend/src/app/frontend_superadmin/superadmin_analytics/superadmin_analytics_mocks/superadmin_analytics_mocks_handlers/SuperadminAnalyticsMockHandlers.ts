import { http, HttpResponse, delay } from 'msw';

import { MOCK_SUPERADMIN_ANALYTICS } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_mocks/superadmin_analytics_mocks_fixtures/SuperadminAnalyticsMockFixtures';
import { SuperadminAnalyticsUrlConfig } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config';

import type { AnalyticsApiData } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_types/SuperadminAnalyticsTypes';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = `*${SuperadminAnalyticsUrlConfig.BACKEND_API.BASE}`;
export const superadminAnalyticsHandlers = [
    http.get(BASE_URL, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<AnalyticsApiData>>({
            success: true,
            message: 'Success',
            data: MOCK_SUPERADMIN_ANALYTICS,
        });
    }),
];
