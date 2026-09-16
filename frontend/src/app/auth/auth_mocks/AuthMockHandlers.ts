import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post('*/auth/login', async ({ request }) => {
    const { email } = await request.json() as any;
    
    let role = 'MEMBER';
    if (email.includes('superadmin')) role = 'SUPERADMIN';
    else if (email.includes('admin')) role = 'ADMIN';
    else if (email.includes('manager')) role = 'MANAGER';
    else if (email.includes('trainer')) role = 'TRAINER';

    return HttpResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        user: {
          id: 'usr_mock_123',
          name: 'Demo User',
          email,
          role,
          tenantId: role !== 'SUPERADMIN' ? 't1' : undefined,
        }
      }
    });
  }),
  
  http.post('*/auth/refresh', () => {
    return HttpResponse.json({
      success: true,
      message: 'Token refreshed',
      data: {
        accessToken: 'mock_access_token_refreshed',
        refreshToken: 'mock_refresh_token_refreshed'
      }
    });
  }),
  
  http.post('*/auth/logout', () => {
    return HttpResponse.json({
      success: true,
      message: 'Logged out successfully',
      data: null
    });
  })
];
