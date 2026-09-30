/**
 * RESPONSIBILITY: Mocks the browser-facing Auth proxy endpoints used by Login when the real host routes/backend are unavailable.
 * DATA FLOW: Login AuthApi -> same-origin Auth route -> module-owned browser mock handler -> canonical Auth response -> Login UI.
 * @description Contains no credential-bearing fixture passwords, private tokens, or server environment imports.
 * @dependencies Auth public fixtures, Auth contracts, Auth URL configuration, idempotency utility, and semantic response/error constants.
 * @edge-case Reusing an idempotency key with a different login intent returns a deterministic conflict instead of replaying another user.
 */
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthMockPublicFixtures } from '@/app/frontend_auth/auth/auth_mocks/fixtures/AuthMockPublicFixtures';
import { AuthDemoLoginRequestSchema, AuthLoginCredentialsSchema } from '@/app/frontend_auth/auth/auth_types/AuthContracts';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthIdempotencyFingerprintUtils } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtils';
import type { AuthRole } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';

type AuthMockBrowserUser = (typeof AuthMockPublicFixtures.USERS)[AuthRole];
type AuthMockBrowserIdempotencyRecord = { fingerprint: string; user: AuthMockBrowserUser };

const mockBrowserIdempotency = new Map<string, AuthMockBrowserIdempotencyRecord>();

function resolveProxyUser(email: string): AuthMockBrowserUser | null {
  const normalized = email.trim().toLowerCase();
  return Object.values(AuthMockPublicFixtures.USERS).find((user) => user.email.toLowerCase() === normalized) ?? null;
}

function getRequestIdempotencyKey(request: Request): string | null {
  return request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim() || null;
}

function idempotencyConflictResponse() {
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

export const AuthMockBrowserHandlers = [
  http.post(AuthUrlConfig.PROXY_API.SESSION, async ({ request }) => {
    const rawPayload: unknown = await request.json().catch(() => null);
    const parsed = AuthLoginCredentialsSchema.safeParse(rawPayload);
    if (!parsed.success) {
      return HttpResponse.json(
        { success: false, message: AuthErrorConstants.MESSAGE.INVALID_INPUT, data: null, error: AuthErrorConstants.NAME.VALIDATION, errorCode: AuthErrorConstants.CODE.INVALID_INPUT, statusCode: StatusCodes.BAD_REQUEST },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    const user = resolveProxyUser(parsed.data.email);
    if (!user) {
      return HttpResponse.json(
        { success: false, message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS, data: null, error: AuthErrorConstants.NAME.AUTHENTICATION_FAILED, errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED, statusCode: StatusCodes.UNAUTHORIZED },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    const idempotencyKey = getRequestIdempotencyKey(request);
    const fingerprint = await AuthIdempotencyFingerprintUtils.forLogin(parsed.data);
    if (idempotencyKey) {
      const replay = mockBrowserIdempotency.get(idempotencyKey);
      if (replay) {
        if (replay.fingerprint !== fingerprint) return idempotencyConflictResponse();
        return HttpResponse.json({ success: true, message: AuthResponseMessages.LOGIN_SUCCESS, data: replay.user });
      }
      mockBrowserIdempotency.set(idempotencyKey, { fingerprint, user });
    }

    return HttpResponse.json({ success: true, message: AuthResponseMessages.LOGIN_SUCCESS, data: user });
  }),

  http.post(AuthUrlConfig.PROXY_API.DEMO_LOGIN, async ({ request }) => {
    const rawPayload: unknown = await request.json().catch(() => null);
    const parsed = AuthDemoLoginRequestSchema.safeParse(rawPayload);
    if (!parsed.success) {
      return HttpResponse.json(
        { success: false, message: AuthErrorConstants.MESSAGE.INVALID_INPUT, data: null, error: AuthErrorConstants.NAME.VALIDATION, errorCode: AuthErrorConstants.CODE.INVALID_INPUT, statusCode: StatusCodes.BAD_REQUEST },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    const idempotencyKey = getRequestIdempotencyKey(request);
    const user = AuthMockPublicFixtures.USERS[parsed.data.role];
    const fingerprint = AuthIdempotencyFingerprintUtils.forDemoRole(parsed.data.role);
    if (idempotencyKey) {
      const replay = mockBrowserIdempotency.get(idempotencyKey);
      if (replay) {
        if (replay.fingerprint !== fingerprint) return idempotencyConflictResponse();
        return HttpResponse.json({ success: true, message: AuthResponseMessages.LOGIN_SUCCESS, data: replay.user });
      }
      mockBrowserIdempotency.set(idempotencyKey, { fingerprint, user });
    }

    return HttpResponse.json({ success: true, message: AuthResponseMessages.LOGIN_SUCCESS, data: user });
  }),
];

export const AuthMockBrowserHandlersTestApi = {
  reset(): void {
    mockBrowserIdempotency.clear();
  },
};
