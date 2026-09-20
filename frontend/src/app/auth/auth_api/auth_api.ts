/**
 * RESPONSIBILITY: Encapsulates browser-facing Auth API calls. No Auth token is returned to browser JavaScript.
 * DATA FLOW: LoginForm -> AuthApi -> internal Auth session route -> secure HTTP-only cookies.
 */
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { AuthUserSchema } from '@/app/auth/auth_types/AuthContracts';
import { AuthApiError } from '@/app/auth/auth_api/AuthApiError';
import type { AuthLoginCredentials, AuthUser } from '@/app/auth/auth_types/AuthContracts';
import type { ApiResponse } from '@/lib/api';

export const AuthApi = {
  async login(credentials: AuthLoginCredentials): Promise<AuthUser> {
    const res = await fetch(AuthUrlConfig.PROXY_API.SESSION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const json = await res.json();
    const response = json as ApiResponse<AuthUser>;

    if (!res.ok || !response.success || !response.data) {
      throw new AuthApiError(response.message || 'Authentication failed', response.errorCode);
    }

    const parsed = AuthUserSchema.safeParse(response.data);
    if (!parsed.success) {
      throw new AuthApiError('Invalid response from server');
    }

    return parsed.data;
  },
};
