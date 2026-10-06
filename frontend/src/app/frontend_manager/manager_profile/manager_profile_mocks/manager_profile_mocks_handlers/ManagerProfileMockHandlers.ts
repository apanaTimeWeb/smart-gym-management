import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MOCK_PROFILE } from '@/app/frontend_manager/manager_profile/manager_profile_mocks/manager_profile_mocks_fixtures/ManagerProfileMockData';
import { ManagerProfileUrlConfig } from '@/app/frontend_manager/manager_profile/manager_profile_url_config';
import type { UpdateManagerProfilePayload } from '@/app/frontend_manager/manager_profile/manager_profile_types/ManagerProfileTypes';


let profileDb = { ...MOCK_PROFILE };

/**
 * @description Provides the ManagerProfileMockHandlers implementation for the profile module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_profile/manager_profile_mocks/manager_profile_mocks_fixtures/ManagerProfileMockData; @/app/frontend_manager/manager_profile/manager_profile_url_config; @/app/frontend_manager/manager_profile/manager_profile_types/ManagerProfileTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerProfileMockState(): void {
  profileDb = structuredClone(MOCK_PROFILE);
}

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
