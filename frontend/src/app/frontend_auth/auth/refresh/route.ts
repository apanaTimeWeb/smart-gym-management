
/**
 * RESPONSIBILITY: Refreshes the secure Auth session without returning access or refresh tokens to browser JavaScript.
 * DATA FLOW: HTTP-only refresh cookie -> backend/demo refresh -> validated response -> refreshed HTTP-only cookies.
 */
import { StatusCodes } from 'http-status-codes';
import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';
import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/fixtures/AuthMockFixtures';
import { AuthBackendRefreshResponseSchema } from '@/app/frontend_auth/auth/auth_types/AuthContracts';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthApiResponseUtils } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtils';
import { AuthCookieUtils } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtils';
import { AuthRequestHeaderUtils } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtils';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(AuthSessionConstants.COOKIES.REFRESH_TOKEN)?.value;
  if (!refreshToken) {
    return AuthApiResponseUtils.failure(
      AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
      StatusCodes.UNAUTHORIZED,
      AuthErrorConstants.NAME.UNAUTHORIZED,
      AuthErrorConstants.CODE.REFRESH_MISSING_TOKEN,
    );
  }

  if (AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    const idempotencyKey = AuthRequestHeaderUtils.getIdempotencyKey(request) ?? undefined;
    if (idempotencyKey && AuthMockFixturesApi.isRefreshIdempotencyConflict(idempotencyKey, refreshToken)) {
      return AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
        StatusCodes.CONFLICT,
        AuthErrorConstants.NAME.CONFLICT,
        AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
      );
    }
    const refreshed = AuthMockFixturesApi.refreshSession(refreshToken, idempotencyKey);
    if (!refreshed) {
      const response = AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
        StatusCodes.UNAUTHORIZED,
        AuthErrorConstants.NAME.UNAUTHORIZED,
        AuthErrorConstants.CODE.REFRESH_REJECTED,
      );
      AuthCookieUtils.clearSession(response);
      return response;
    }

    const response = AuthApiResponseUtils.success(AuthResponseMessages.REFRESH_SUCCESS, null);
    AuthCookieUtils.refreshSession(response, refreshed.accessToken, refreshed.refreshToken);
    return response;
  }

  try {
    const idempotencyKey = AuthRequestHeaderUtils.getIdempotencyKey(request);
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
      const response = AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      AuthCookieUtils.clearSession(response);
      return response;
    }

    if (!backendResponse.ok && parsedBackend.data.statusCode !== backendResponse.status) {
      const response = AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      AuthCookieUtils.clearSession(response);
      return response;
    }

    if (!backendResponse.ok) {
      const responseStatus = backendResponse.status >= StatusCodes.BAD_REQUEST && backendResponse.status < 500
        ? backendResponse.status
        : StatusCodes.BAD_GATEWAY;
      const response = AuthApiResponseUtils.failure(
        parsedBackend.data.message,
        responseStatus,
        parsedBackend.data.error ?? AuthErrorConstants.NAME.UNAUTHORIZED,
        parsedBackend.data.errorCode ?? AuthErrorConstants.CODE.REFRESH_REJECTED,
        parsedBackend.data.validationErrors,
      );
      AuthCookieUtils.clearSession(response);
      return response;
    }

    if (!parsedBackend.data.data) {
      const response = AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
      );
      AuthCookieUtils.clearSession(response);
      return response;
    }

    const response = AuthApiResponseUtils.success(parsedBackend.data.message, null);
    const newRefreshToken = parsedBackend.data.data.refreshToken ?? refreshToken;
    AuthCookieUtils.refreshSession(
      response,
      parsedBackend.data.data.accessToken,
      newRefreshToken,
    );
    return response;
  } catch {
    return AuthApiResponseUtils.failure(
      AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
      StatusCodes.BAD_GATEWAY,
      AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
      AuthErrorConstants.CODE.REFRESH_UPSTREAM_UNAVAILABLE,
    );
  }
}
