/**
 * RESPONSIBILITY: Refreshes the secure Auth session without returning access or refresh tokens to browser JavaScript.
 * DATA FLOW: HTTP-only refresh cookie -> backend refresh endpoint -> validated response -> refreshed HTTP-only cookies.
 */
import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { AuthSessionConstants } from '@/app/auth/auth_constants/AuthSessionConstants';
import { AuthErrorConstants } from '@/app/auth/auth_constants/AuthErrorConstants';
import { AuthBackendRefreshResponseSchema } from '@/app/auth/auth_types/AuthContracts';
import { AuthBackendTransport } from '@/app/auth/auth_api/AuthBackendTransport';
import { AuthApiResponseUtils } from '@/app/auth/auth_utils/AuthApiResponseUtils';
import { AuthCookieUtils } from '@/app/auth/auth_utils/AuthCookieUtils';

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

  try {
    const { response: backendResponse, payload } = await AuthBackendTransport.post(
      AuthUrlConfig.BACKEND_API.REFRESH,
      undefined,
      { Authorization: `Bearer ${refreshToken}` },
    );

    const parsedBackend = AuthBackendRefreshResponseSchema.safeParse(payload);

    if (!backendResponse.ok || !parsedBackend.success || !parsedBackend.data.success || !parsedBackend.data.data) {
      const response = AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
        StatusCodes.UNAUTHORIZED,
        AuthErrorConstants.NAME.UNAUTHORIZED,
        AuthErrorConstants.CODE.REFRESH_REJECTED,
      );
      AuthCookieUtils.clearSession(response);
      return response;
    }

    const response = AuthApiResponseUtils.success('Session refreshed', null);
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
