import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsGymDetailMockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsGymDetailMockHandlers owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, http-status-codes, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsGymDetailMockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for the route-specific Superadmin Gym 360 workspace.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';


export const superadminGymDetailHandlers = [
    http.get('*' + MODULE_URLS.GYM_DETAIL.BACKEND_API.BASE, ({ request }) => {
        const gymId = new URL(request.url).searchParams.get('gymId');
        const fixture = gymId ? SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES[gymId] : undefined;
        if (!fixture) {
            return HttpResponse.json({ success: false, message: 'Gym details were not found.', data: null, statusCode: StatusCodes.NOT_FOUND }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json({ success: true, message: 'Gym data loaded.', data: fixture });
    }),
];
