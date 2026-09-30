
// RESPONSIBILITY: Handles development-only demo login using server-owned fixture identities and secure HTTP-only session cookies.
// DATA FLOW: Browser role selection -> validated role request -> private demo gate -> module fixture -> secure session cookie -> sanitized AuthUser.
import { StatusCodes } from 'http-status-codes';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';
import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';
import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/fixtures/AuthMockFixtures';
import { AuthDemoLoginRequestSchema } from '@/app/frontend_auth/auth/auth_types/AuthContracts';
import { AuthApiResponseUtils } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtils';
import { AuthCookieUtils } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtils';
import { AuthIdempotencyFingerprintUtils } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtils';
import { AuthRequestHeaderUtils } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtils';
import type { NextRequest } from 'next/server';

/**
 * Handles the development-only role demo session flow through the same secure cookie boundary used by Login.
 * @description Validates the role payload, enforces the server-side demo gate, applies idempotency, and returns only the sanitized user identity.
 * @dependencies AuthServerRuntimeConfig, AuthMockFixturesApi, AuthDemoLoginRequestSchema, AuthCookieUtils, AuthApiResponseUtils.
 * @edge-case Reusing an idempotency key with a different role is rejected instead of creating a second session.
 */
export async function POST(request: NextRequest) {
  if (!AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    return AuthApiResponseUtils.failure(
      AuthErrorConstants.MESSAGE.DEMO_DISABLED,
      StatusCodes.NOT_FOUND,
      AuthErrorConstants.NAME.NOT_FOUND,
      AuthErrorConstants.CODE.DEMO_DISABLED,
    );
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    return AuthApiResponseUtils.failure(
      AuthErrorConstants.MESSAGE.INVALID_REQUEST,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_REQUEST,
    );
  }

  const parsed = AuthDemoLoginRequestSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return AuthApiResponseUtils.failure(
      AuthErrorConstants.MESSAGE.INVALID_INPUT,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_INPUT,
    );
  }

  const demoEntry = AuthMockFixturesApi.findByRole(parsed.data.role);
  const idempotencyKey = AuthRequestHeaderUtils.getIdempotencyKey(request);
  const session = idempotencyKey
    ? AuthMockFixturesApi.issueSessionForIntent(demoEntry.user, idempotencyKey, AuthIdempotencyFingerprintUtils.forDemoRole(parsed.data.role))
    : AuthMockFixturesApi.issueSession(demoEntry.user);

  if (!session) {
    return AuthApiResponseUtils.failure(
      AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
      StatusCodes.CONFLICT,
      AuthErrorConstants.NAME.CONFLICT,
      AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
    );
  }

  const response = AuthApiResponseUtils.success(AuthResponseMessages.LOGIN_SUCCESS, session.user);
  AuthCookieUtils.setSession(response, session.accessToken, session.refreshToken, session.user);
  return response;
}
