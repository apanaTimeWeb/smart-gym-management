// RESPONSIBILITY: Encapsulates logic, UI, or types for this module.
// RESPONSIBILITY: Encapsulates logic, UI, or types for this module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Centralized API client exclusively for the Auth module. Encapsulates network calls to backend authentication routes.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';

export const authApi = {
  login: async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 600));

    // Determine role based on email for demo purposes
    let role = 'MEMBER';
    if (email.includes('superadmin')) role = 'SUPERADMIN';
    else if (email.includes('admin')) role = 'ADMIN';
    else if (email.includes('manager')) role = 'MANAGER';
    else if (email.includes('trainer')) role = 'TRAINER';

    const mockResponse: import('@/app/auth/login/login_types/login_types').AuthResponse = {
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
      user: {
        id: 'usr_mock_123',
        name: 'Demo User',
        email,
        role,
        tenantId: role !== 'SUPERADMIN' ? 't1' : undefined,
      }
    };

    return {
      success: true,
      message: 'Login successful',
      data: mockResponse
    } as ApiResponse<import('@/app/auth/login/login_types/login_types').AuthResponse>;
  },
};
