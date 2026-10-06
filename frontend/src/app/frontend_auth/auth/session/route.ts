// RESPONSIBILITY: Owns the secure credential-login gateway, backend/mock authentication contract, and HTTP-only session cookie issuance.
import { StatusCodes } from 'http-status-codes';

import { logger } from '@/lib/logger';

import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockFixturesApi';

import { AuthBackendLoginResponseSchema, AuthLoginCredentialsSchema } from '@/app/frontend_auth/auth/auth_schemas/AuthSchema';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtilities';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtilities';

import { AuthIdempotencyFingerprintUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtilities';

import { AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtilities';

import { AuthValidationUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthValidationUtilities';

import type { NextRequest } from 'next/server';



export async function POST(request: NextRequest) {
  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    logger.error('Auth backend session request failed', {
      route: AuthUrlConfig.PROXY_API.SESSION,
      module: 'auth/session',
      timestamp: new Date().toISOString(),
    });
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.INVALID_REQUEST,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_REQUEST,
    );
  }

  const parsedPayload = AuthLoginCredentialsSchema.safeParse(rawPayload);
  if (!parsedPayload.success) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.INVALID_INPUT,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_INPUT,
      AuthValidationUtilities.toValidationErrors(parsedPayload.error.issues),
    );
  }

  const { email, password } = parsedPayload.data;

  if (AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    const demoUser = AuthMockFixturesApi.findByCredentials(email, password);
    if (demoUser) {
      const idempotencyKey = AuthRequestHeaderUtilities.getIdempotencyKey(request);
      const sessionFingerprint = await AuthIdempotencyFingerprintUtilities.forLogin({ email, password });
      const session = idempotencyKey
        ? AuthMockFixturesApi.issueSessionForIntent(demoUser, idempotencyKey, sessionFingerprint)
        : AuthMockFixturesApi.issueSession(demoUser);
      if (!session) {
        return AuthApiResponseUtilities.failure(
          AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
          StatusCodes.CONFLICT,
          AuthErrorConstants.NAME.CONFLICT,
          AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
        );
      }
      const { accessToken, refreshToken } = session;
      const response = AuthApiResponseUtilities.success(AuthResponseMessages.LOGIN_SUCCESS, demoUser);
      AuthCookieUtilities.setSession(response, accessToken, refreshToken, demoUser);
      return response;
    }
  }

  try {
    const idempotencyKey = AuthRequestHeaderUtilities.getIdempotencyKey(request);
    const backendHeaders = idempotencyKey ? { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey } : undefined;
    const { response: backendResponse, payload } = await AuthBackendTransport.post(
      AuthUrlConfig.BACKEND_API.LOGIN,
      { email, password },
      backendHeaders,
    );

    const parsedBackend = AuthBackendLoginResponseSchema.safeParse(payload);

    if (!parsedBackend.success) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    if (parsedBackend.data.success !== backendResponse.ok) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    if (!backendResponse.ok && parsedBackend.data.statusCode !== backendResponse.status) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    if (!backendResponse.ok) {
      const responseStatus = backendResponse.status >= StatusCodes.BAD_REQUEST && backendResponse.status < StatusCodes.INTERNAL_SERVER_ERROR
        ? backendResponse.status
        : StatusCodes.BAD_GATEWAY;
      return AuthApiResponseUtilities.failure(
        parsedBackend.data.message,
        responseStatus,
        parsedBackend.data.error ?? AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
        parsedBackend.data.errorCode ?? AuthErrorConstants.CODE.BACKEND_REJECTED,
        parsedBackend.data.validationErrors,
      );
    }

    if (!parsedBackend.data.data) {
      return AuthApiResponseUtilities.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    const response = AuthApiResponseUtilities.success(parsedBackend.data.message, parsedBackend.data.data.user);
    AuthCookieUtilities.setSession(
      response,
      parsedBackend.data.data.accessToken,
      parsedBackend.data.data.refreshToken,
      parsedBackend.data.data.user,
    );
    return response;
  } catch {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
      StatusCodes.BAD_GATEWAY,
      AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
      AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
    );
  }
}
