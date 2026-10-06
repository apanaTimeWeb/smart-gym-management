// RESPONSIBILITY: Owns the development-only role demo-login gateway and server-side demo-session issuance.
import { StatusCodes } from 'http-status-codes';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockFixturesApi';

import { AuthDemoLoginRequestSchema } from '@/app/frontend_auth/auth/auth_schemas/AuthSchema';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtilities';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtilities';

import { AuthIdempotencyFingerprintUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtilities';

import { AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtilities';

import type { NextRequest } from 'next/server';



/**
 * Handles the development-only role demo session flow through the same secure cookie boundary used by Login.
 * @description Validates the role payload, enforces the server-side demo gate, applies idempotency, and returns only the sanitized user identity.
 * @dependencies AuthServerRuntimeConfig, AuthMockFixturesApi, AuthDemoLoginRequestSchema, AuthCookieUtilities, AuthApiResponseUtilities.
 * @edge-case Reusing an idempotency key with a different role is rejected instead of creating a second session.
 */
export async function POST(request: NextRequest) {
  if (!AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    return AuthApiResponseUtilities.failure(
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
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.INVALID_REQUEST,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_REQUEST,
    );
  }

  const parsed = AuthDemoLoginRequestSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.INVALID_INPUT,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_INPUT,
    );
  }

  const demoEntry = AuthMockFixturesApi.findByRole(parsed.data.role);
  const idempotencyKey = AuthRequestHeaderUtilities.getIdempotencyKey(request);
  const session = idempotencyKey
    ? AuthMockFixturesApi.issueSessionForIntent(demoEntry.user, idempotencyKey, AuthIdempotencyFingerprintUtilities.forDemoRole(parsed.data.role))
    : AuthMockFixturesApi.issueSession(demoEntry.user);

  if (!session) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
      StatusCodes.CONFLICT,
      AuthErrorConstants.NAME.CONFLICT,
      AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
    );
  }

  const response = AuthApiResponseUtilities.success(AuthResponseMessages.LOGIN_SUCCESS, session.user);
  AuthCookieUtilities.setSession(response, session.accessToken, session.refreshToken, session.user);
  return response;
}
