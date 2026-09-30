/**
 * RESPONSIBILITY: Mocks upstream Auth backend endpoints used by server-side Auth route tests and frontend-first backend contract checks.
 * DATA FLOW: Auth server route -> backend-shaped request -> module-owned AuthMockFixturesApi -> backend-shaped response.
 * @description Server/test-only handler set; it must never be registered with the browser MSW worker because it imports host runtime configuration and credential-bearing mock fixtures indirectly.
 * @dependencies AuthMockFixturesApi, Auth contracts, Auth URL/session constants, and the approved host API-base configuration.
 * @edge-case Reused login/refresh intents remain idempotent through the shared module-owned fixture state.
 */
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { env } from '@/config/env';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/fixtures/AuthMockFixtures';
import { AuthLoginCredentialsSchema } from '@/app/frontend_auth/auth/auth_types/AuthContracts';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthIdempotencyFingerprintUtils } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtils';
import type { AuthRole } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';

function getBearerToken(request: Request): string | null {
  const authorization = request.headers.get(AuthSessionConstants.HEADERS.AUTHORIZATION);
  const prefix = AuthSessionConstants.AUTHORIZATION_PREFIX;
  if (!authorization?.startsWith(prefix)) return null;
  return authorization.slice(prefix.length).trim() || null;
}

export const AuthMockBackendHandlers = [
  http.post(`${env.NEXT_PUBLIC_API_URL}${AuthUrlConfig.BACKEND_API.LOGIN}`, async ({ request }) => {
    const rawPayload: unknown = await request.json().catch(() => null);
    const parsed = AuthLoginCredentialsSchema.safeParse(rawPayload);
    if (!parsed.success) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.INVALID_INPUT,
          data: null,
          error: AuthErrorConstants.NAME.VALIDATION,
          errorCode: AuthErrorConstants.CODE.INVALID_INPUT,
          statusCode: StatusCodes.BAD_REQUEST,
        },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    const user = AuthMockFixturesApi.findByCredentials(parsed.data.email, parsed.data.password);
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
          data: null,
          error: AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
          errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    const idempotencyKey = request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim() || null;
    const fingerprint = await AuthIdempotencyFingerprintUtils.forLogin(parsed.data);
    if (idempotencyKey) {
      const session = AuthMockFixturesApi.issueSessionForIntent(user, idempotencyKey, fingerprint);
      if (!session) {
        return HttpResponse.json(
          {
            success: false,
            message: AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
            data: null,
            error: AuthErrorConstants.NAME.CONFLICT,
            errorCode: AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
            statusCode: StatusCodes.CONFLICT,
          },
          { status: StatusCodes.CONFLICT },
        );
      }
      return HttpResponse.json({ success: true, message: AuthResponseMessages.LOGIN_SUCCESS, data: session });
    }

    return HttpResponse.json({
      success: true,
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: AuthMockFixturesApi.issueSession(user),
    });
  }),

  http.get(`${env.NEXT_PUBLIC_API_URL}${AuthUrlConfig.BACKEND_API.ME}`, ({ request }) => {
    const token = getBearerToken(request);
    const user = token ? AuthMockFixturesApi.resolveUserByAccessToken(token) : null;
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
          data: null,
          error: AuthErrorConstants.NAME.UNAUTHORIZED,
          errorCode: AuthErrorConstants.CODE.REFRESH_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }
    return HttpResponse.json({ success: true, message: AuthResponseMessages.SESSION_IDENTITY, data: user });
  }),

  http.post(`${env.NEXT_PUBLIC_API_URL}${AuthUrlConfig.BACKEND_API.REFRESH}`, ({ request }) => {
    const refreshToken = getBearerToken(request);
    if (!refreshToken) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
          data: null,
          error: AuthErrorConstants.NAME.UNAUTHORIZED,
          errorCode: AuthErrorConstants.CODE.REFRESH_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    const idempotencyKey = request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim() || undefined;
    if (idempotencyKey && AuthMockFixturesApi.isRefreshIdempotencyConflict(idempotencyKey, refreshToken)) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
          data: null,
          error: AuthErrorConstants.NAME.CONFLICT,
          errorCode: AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
          statusCode: StatusCodes.CONFLICT,
        },
        { status: StatusCodes.CONFLICT },
      );
    }
    const tokens = AuthMockFixturesApi.refreshSession(refreshToken, idempotencyKey);
    if (!tokens) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
          data: null,
          error: AuthErrorConstants.NAME.UNAUTHORIZED,
          errorCode: AuthErrorConstants.CODE.REFRESH_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }
    return HttpResponse.json({ success: true, message: AuthResponseMessages.REFRESH_SUCCESS, data: tokens });
  }),

  http.post(`${env.NEXT_PUBLIC_API_URL}${AuthUrlConfig.BACKEND_API.LOGOUT}`, ({ request }) => {
    const accessToken = getBearerToken(request);
    AuthMockFixturesApi.revokeSession(accessToken ?? undefined, undefined);
    return HttpResponse.json({ success: true, message: AuthResponseMessages.LOGOUT_SUCCESS, data: null });
  }),
];

export const AuthMockBackendHandlersTestApi = {
  reset(): void {
    AuthMockFixturesApi.resetMockSessions();
  },
  seed(role: AuthRole) {
    return AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole(role).user);
  },
} as const;
