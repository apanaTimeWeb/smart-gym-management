import { http, HttpResponse, delay } from 'msw';
import type { UsageMeter } from '@/app/superadmin/usage-meters/usage-meters_types/SuperadminUsageMetersTypes';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SUPERADMIN_USAGE_METERS } from '@/app/superadmin/usage-meters/usage-meters_mocks/fixtures/SuperadminUsageMetersMockFixtures';
const BASE_URL = '*/api/v1/superadmin/usage-meters';
export const superadminUsageMetersHandlers = [
    http.get(BASE_URL, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<UsageMeter[]>>({
            success: true,
            message: 'Success',
            data: MOCK_SUPERADMIN_USAGE_METERS,
        });
    }),
];
