import { http, HttpResponse, delay } from 'msw';
import type { AnalyticsApiData } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsTypes';
import { AnalyticsUrlConfig } from '@/app/superadmin/analytics/superadmin_analytics_url_config';
import { MOCK_SUPERADMIN_ANALYTICS } from '@/app/superadmin/analytics/analytics_mocks/fixtures/SuperadminAnalyticsMockFixtures';
import type { ApiResponse } from '@/lib/api';
const BASE_URL = `*${AnalyticsUrlConfig.BACKEND_API.BASE}`;
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
