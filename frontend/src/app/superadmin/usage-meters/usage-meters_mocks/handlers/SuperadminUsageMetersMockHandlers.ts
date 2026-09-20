import { http, HttpResponse, delay } from 'msw';
import type { UsageMeter } from '@/app/superadmin/usage-meters/usage-meters_types/SuperadminUsageMetersTypes';
import { UsageMetersUrlConfig } from '@/app/superadmin/usage-meters/superadmin_usage_meters_url_config';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SUPERADMIN_USAGE_METERS } from '@/app/superadmin/usage-meters/usage-meters_mocks/fixtures/SuperadminUsageMetersMockFixtures';
const BASE_URL = `*${UsageMetersUrlConfig.BACKEND_API.BASE}`;
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
