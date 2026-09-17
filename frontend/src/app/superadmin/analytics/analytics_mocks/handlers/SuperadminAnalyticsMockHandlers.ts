import { http, HttpResponse, delay } from 'msw';
import type { AnalyticsApiData } from '@/app/superadmin/analytics/superadmin_analytics_types/superadmin_analytics_types';
import { MOCK_SUPERADMIN_ANALYTICS } from '@/app/superadmin/analytics/analytics_mocks/fixtures/SuperadminAnalyticsMockFixtures';
import type { ApiResponse } from '@/lib/api';
const BASE_URL = '*/api/v1/superadmin/analytics';
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
