// RESPONSIBILITY: Owns secure refresh-token renewal and HTTP-only cookie rotation without returning token material to browser JavaScript.
import { StatusCodes } from 'http-status-codes';

import { logger } from '@/lib/logger';

import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockFixturesApi';

import { AuthBackendRefreshResponseSchema } from '@/app/frontend_auth/auth/auth_schemas/AuthSchema';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtilities';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtilities';

import { AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtilities';

import type { NextRequest } from 'next/server';



export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(AuthSessionConstants.COOKIES.REFRESH_TOKEN)?.value;
  if (!refreshToken) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
      StatusCodes.UNAUTHORIZED,
      AuthErrorConstants.NAME.UNAUTHORIZED,
      AuthErrorConstants.CODE.REFRESH_MISSING_TOKEN,
    );
  }

  if (AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    const idempotencyKey = AuthRequestHeaderUtilities.getIdempotencyKey(request) ?? undefined;
    if (idempotencyKey && AuthMockFixturesApi.isRefreshIdempotencyConflict(idempotencyKey, refreshToken)) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
        StatusCodes.CONFLICT,
        AuthErrorConstants.NAME.CONFLICT,
        AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
      );
    }
    const refreshed = AuthMockFixturesApi.refreshSession(refreshToken, idempotencyKey);
    if (!refreshed) {
      const response = AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
        StatusCodes.UNAUTHORIZED,
        AuthErrorConstants.NAME.UNAUTHORIZED,
        AuthErrorConstants.CODE.REFRESH_REJECTED,
      );
      AuthCookieUtilities.clearSession(response);
      return response;
    }

    const response = AuthApiResponseUtilities.success(AuthResponseMessages.REFRESH_SUCCESS, null);
    AuthCookieUtilities.refreshSession(response, refreshed.accessToken, refreshed.refreshToken);
    return response;
  }

  try {
    const idempotencyKey = AuthRequestHeaderUtilities.getIdempotencyKey(request);
    const headers = {
      [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${refreshToken}`,
      ...(idempotencyKey ? { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey } : {}),
    };
    const { response: backendResponse, payload } = await AuthBackendTransport.post(
      AuthUrlConfig.BACKEND_API.REFRESH,
      undefined,
      headers,
    );

    const parsedBackend = AuthBackendRefreshResponseSchema.safeParse(payload);

    if (!parsedBackend.success || parsedBackend.data.success !== backendResponse.ok) {
      const response = AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      AuthCookieUtilities.clearSession(response);
      return response;
    }

    if (!backendResponse.ok && parsedBackend.data.statusCode !== backendResponse.status) {
      const response = AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      AuthCookieUtilities.clearSession(response);
      return response;
    }

    if (!backendResponse.ok) {
      const responseStatus = backendResponse.status >= StatusCodes.BAD_REQUEST && backendResponse.status < StatusCodes.INTERNAL_SERVER_ERROR
        ? backendResponse.status
        : StatusCodes.BAD_GATEWAY;
      const response = AuthApiResponseUtilities.failure(
        parsedBackend.data.message,
        responseStatus,
        parsedBackend.data.error ?? AuthErrorConstants.NAME.UNAUTHORIZED,
        parsedBackend.data.errorCode ?? AuthErrorConstants.CODE.REFRESH_REJECTED,
        parsedBackend.data.validationErrors,
      );
      AuthCookieUtilities.clearSession(response);
      return response;
    }

    if (!parsedBackend.data.data) {
      const response = AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      AuthCookieUtilities.clearSession(response);
      return response;
    }

    const response = AuthApiResponseUtilities.success(parsedBackend.data.message, null);
    const newRefreshToken = parsedBackend.data.data.refreshToken ?? refreshToken;
    AuthCookieUtilities.refreshSession(
      response,
      parsedBackend.data.data.accessToken,
      newRefreshToken,
    );
    return response;
  } catch {
    logger.error('Auth backend refresh request failed', {
      route: AuthUrlConfig.PROXY_API.REFRESH,
      module: 'auth/refresh',
      timestamp: new Date().toISOString(),
    });
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
      StatusCodes.BAD_GATEWAY,
      AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
      AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
    );
  }
}
