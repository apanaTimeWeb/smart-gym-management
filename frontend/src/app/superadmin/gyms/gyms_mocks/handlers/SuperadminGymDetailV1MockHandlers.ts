// RESPONSIBILITY: Owns MSW handlers for the route-specific Superadmin Gym 360 workspace.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { SuperadminGymDetailV1UrlConfig } from '@/app/superadmin/gyms/superadmin_gym_detail_business_overview_url_config';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymDetailV1MockFixtures';
export const superadminGymDetailV1Handlers = [
    http.get('*' + SuperadminGymDetailV1UrlConfig.BACKEND_API.BASE, ({ request }) => {
        const gymId = new URL(request.url).searchParams.get('gymId');
        const fixture = gymId ? SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES[gymId] : undefined;
        if (!fixture) {
            return HttpResponse.json({ success: false, message: 'Gym details were not found.', data: null, statusCode: StatusCodes.NOT_FOUND }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json({ success: true, message: 'Gym data loaded.', data: fixture });
    }),
];
