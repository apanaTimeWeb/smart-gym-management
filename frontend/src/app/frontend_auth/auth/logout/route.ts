// RESPONSIBILITY: Owns Auth session termination, best-effort upstream/mock revocation, and unconditional local cookie clearing.
import { logger } from '@/lib/logger';

import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockFixturesApi';

import { AuthBackendLogoutResponseSchema } from '@/app/frontend_auth/auth/auth_schemas/AuthSchema';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtilities';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtilities';

import { AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtilities';

import type { NextRequest } from 'next/server';



export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AuthSessionConstants.COOKIES.REFRESH_TOKEN)?.value;

  if (AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    AuthMockFixturesApi.revokeSession(accessToken, refreshToken);
  } else if (accessToken) {
    try {
      const idempotencyKey = AuthRequestHeaderUtilities.getIdempotencyKey(request);
      const { response: backendResponse, payload } = await AuthBackendTransport.post(
        AuthUrlConfig.BACKEND_API.LOGOUT,
        undefined,
        {
          [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${accessToken}`,
          ...(idempotencyKey ? { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey } : {}),
        },
      );
      const parsedBackend = AuthBackendLogoutResponseSchema.safeParse(payload);
      if (!parsedBackend.success || parsedBackend.data.success !== backendResponse.ok || (!backendResponse.ok && parsedBackend.data.statusCode !== backendResponse.status)) {
        logger.error('Auth backend logout contract mismatch', {
          route: AuthUrlConfig.PROXY_API.LOGOUT,
          module: 'auth/logout',
          statusCode: backendResponse.status,
          timestamp: new Date().toISOString(),
        });
      }
    } catch {
      logger.error('Auth backend logout request failed', {
        route: AuthUrlConfig.PROXY_API.LOGOUT,
        module: 'auth/logout',
        timestamp: new Date().toISOString(),
      });
      // Local session cleanup remains authoritative for logout UX.
    }
  }

  const response = AuthApiResponseUtilities.success(AuthResponseMessages.LOGOUT_SUCCESS, null);
  AuthCookieUtilities.clearSession(response);
  return response;
}
