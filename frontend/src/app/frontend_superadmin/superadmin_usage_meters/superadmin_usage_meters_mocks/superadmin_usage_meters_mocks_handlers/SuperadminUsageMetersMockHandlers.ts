import { http, HttpResponse, delay } from 'msw';
import { MOCK_SUPERADMIN_USAGE_METERS } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_mocks/superadmin_usage_meters_mocks_fixtures/SuperadminUsageMetersMockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminUsageMetersMockHandlers owned by the superadmin_usage_meters feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_types/SuperadminUsageMetersTypes, @/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_url_config, @/lib/api, @/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_mocks/superadmin_usage_meters_mocks_fixtures/SuperadminUsageMetersMockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_url_config';

import type { UsageMeter } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_types/SuperadminUsageMetersTypes';
import type { ApiResponse } from '@/lib/api';


const BASE_URL = `*${MODULE_URLS.BACKEND_API.BASE}`;
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
