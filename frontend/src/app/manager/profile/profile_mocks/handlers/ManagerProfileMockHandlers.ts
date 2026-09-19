import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import { ManagerProfileUrlConfig } from '@/app/manager/profile/profile_url_config';
import { MOCK_PROFILE } from '@/app/manager/profile/profile_fixtures/ManagerProfileMockData';
import type { UpdateManagerProfilePayload } from '@/app/manager/profile/profile_types/ManagerProfileTypes';

let profileDb = { ...MOCK_PROFILE };

export const managerProfileHandlers = [
  http.get(managerMockApiUrl(ManagerProfileUrlConfig.BACKEND_API.BASE), () => {
    return HttpResponse.json({
      success: true,
      message: 'Profile fetched',
      data: profileDb
    });
  }),

  http.patch(managerMockApiUrl(ManagerProfileUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    const body = await request.json() as UpdateManagerProfilePayload;
    profileDb = { ...profileDb, ...body };
    return HttpResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: profileDb
    });
  }),

  http.patch(managerMockApiUrl(ManagerProfileUrlConfig.BACKEND_API.PASSWORD), () => {
    return HttpResponse.json({
      success: true,
      message: 'Password updated successfully'
    });
  })
];
