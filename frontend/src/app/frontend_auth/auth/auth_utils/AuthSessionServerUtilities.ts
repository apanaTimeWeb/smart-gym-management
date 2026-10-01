import { logger } from '@/lib/logger';

import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';

import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockFixturesApi';

import { AuthBackendUserResponseSchema } from '@/app/frontend_auth/auth/auth_schemas/AuthSchema';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import type { AuthUser } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

// RESPONSIBILITY: Owns authoritative server-side Auth session resolution from HTTP-only access-token state.
// DATA FLOW: Auth Login route -> access-token cookie -> AuthSessionServerUtilities -> backend/mock session source -> sanitized AuthUser.

export const AuthSessionServerUtilities = {
  /**
   * Resolves the authenticated user through the authoritative backend session endpoint, or through the feature-owned mock session registry in explicitly enabled demo mode.
   * @param accessToken Token read only from the HTTP-only session cookie.
   * @returns Validated AuthUser or null when the session is absent, invalid, expired, or upstream verification fails.
   */
  async resolveUser(accessToken: string | undefined): Promise<AuthUser | null> {
    if (!accessToken) return null;

    if (AuthServerRuntimeConfig.isLoginDemoEnabled()) {
      return AuthMockFixturesApi.resolveUserByAccessToken(accessToken);
    }

    try {
      const { response, payload } = await AuthBackendTransport.get(
        AuthUrlConfig.BACKEND_API.ME,
        { [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${accessToken}` },
      );
      const parsed = AuthBackendUserResponseSchema.safeParse(payload);
      if (!response.ok || !parsed.success || !parsed.data.success || !parsed.data.data) {
        logger.error('Auth session verification contract rejected', {
          route: AuthUrlConfig.BACKEND_API.ME,
          module: 'auth/session',
          statusCode: response.status,
          timestamp: new Date().toISOString(),
        });
        return null;
      }
      return parsed.data.data;
    } catch {
      logger.error('Auth session verification request failed', {
        route: AuthUrlConfig.BACKEND_API.ME,
        module: 'auth/session',
        timestamp: new Date().toISOString(),
      });
      return null;
    }
  },
};
