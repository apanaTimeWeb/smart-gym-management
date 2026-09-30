/**
 * RESPONSIBILITY: Resolves an authenticated Auth user on the server without trusting browser-provided identity data.
 * DATA FLOW: HTTP-only access cookie -> authoritative backend `/auth/me` verification (or gated mock session) -> safe AuthUser.
 * @description Production-like mode verifies the access token against the backend session endpoint; development demo mode resolves the same token through the module-owned mutable mock session registry.
 * @dependencies AuthBackendTransport, AuthServerRuntimeConfig, AuthUrlConfig, AuthMockFixturesApi, and AuthUser Zod schemas.
 * @edge-case A forged or stale access token resolves to null even when a user identity cookie exists.
 */
import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';
import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/fixtures/AuthMockFixtures';
import { AuthBackendUserResponseSchema } from '@/app/frontend_auth/auth/auth_types/AuthContracts';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import type { AuthUser } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

export const AuthSessionServerUtils = {
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
      if (!response.ok || !parsed.success || !parsed.data.success || !parsed.data.data) return null;
      return parsed.data.data;
    } catch {
      return null;
    }
  },
};
