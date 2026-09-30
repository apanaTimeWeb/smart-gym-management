
/**
 * RESPONSIBILITY: Ends the current Auth session, revokes a demo/backend session best-effort, and always clears local HTTP-only cookies.
 * DATA FLOW: Access/refresh cookies -> demo or backend logout attempt -> cookie clearing -> canonical logged-out response.
 */
import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';
import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/fixtures/AuthMockFixtures';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthApiResponseUtils } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtils';
import { AuthCookieUtils } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtils';
import { AuthRequestHeaderUtils } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtils';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AuthSessionConstants.COOKIES.REFRESH_TOKEN)?.value;

  if (AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    AuthMockFixturesApi.revokeSession(accessToken, refreshToken);
  } else if (accessToken) {
    try {
      const idempotencyKey = AuthRequestHeaderUtils.getIdempotencyKey(request);
      await AuthBackendTransport.post(
        AuthUrlConfig.BACKEND_API.LOGOUT,
        undefined,
        {
          [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${accessToken}`,
          ...(idempotencyKey ? { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey } : {}),
        },
      );
    } catch {
      // Local session cleanup remains authoritative for logout UX.
    }
  }

  const response = AuthApiResponseUtils.success(AuthResponseMessages.LOGOUT_SUCCESS, null);
  AuthCookieUtils.clearSession(response);
  return response;
}
