/**
 * RESPONSIBILITY: Encapsulates browser-facing Auth API calls. No Auth token is returned to browser JavaScript.
 * DATA FLOW: LoginForm -> AuthApi -> internal Auth session route -> secure HTTP-only cookies.
 */
import { apiFetch } from '@/lib/api';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { AuthSessionResponseSchema } from '@/app/auth/auth_types/AuthContracts';
import { AuthApiError } from '@/app/auth/auth_api/AuthApiError';
import type { AuthLoginCredentials, AuthUser } from '@/app/auth/auth_types/AuthContracts';
import type { ApiResponse } from '@/lib/api';

export const AuthApi = {
  async login(credentials: AuthLoginCredentials): Promise<AuthUser> {
    const response = await apiFetch<ApiResponse<AuthUser>>(AuthUrlConfig.PROXY_API.SESSION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      dataSchema: AuthSessionResponseSchema.shape.data,
    });

    if (!response.success || !response.data) {
      throw new AuthApiError(response.message || 'Authentication failed', response.errorCode);
    }

    return response.data;
  },
};
