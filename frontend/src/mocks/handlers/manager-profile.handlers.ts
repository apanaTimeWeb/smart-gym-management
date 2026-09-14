import { http, HttpResponse } from 'msw';
import { MOCK_PROFILE } from '@/app/manager/profile/profile_fixtures/ManagerProfileMockData';
import type { UpdateManagerProfilePayload } from '@/app/manager/profile/profile_types/ManagerProfileTypes';

let profileDb = { ...MOCK_PROFILE };

export const managerProfileHandlers = [
  http.get('http://localhost:5000/api/v1/manager/profile', () => {
    return HttpResponse.json({
      success: true,
      message: 'Profile fetched',
      data: profileDb
    });
  }),

  http.patch('http://localhost:5000/api/v1/manager/profile', async ({ request }) => {
    const body = await request.json() as UpdateManagerProfilePayload;
    profileDb = { ...profileDb, ...body };
    return HttpResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: profileDb
    });
  }),

  http.patch('http://localhost:5000/api/v1/manager/profile/password', () => {
    return HttpResponse.json({
      success: true,
      message: 'Password updated successfully'
    });
  })
];
