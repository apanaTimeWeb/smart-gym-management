
/**
 * RESPONSIBILITY: Secure server-side login gateway. Validates credentials, calls the backend, validates the backend contract, and writes HTTP-only cookies.
 * DATA FLOW: Browser credentials -> Auth session route -> backend/mock contract -> secure cookies -> canonical user-only response.
 */
import { StatusCodes } from 'http-status-codes';
import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';
import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/fixtures/AuthMockFixtures';
import { AuthBackendLoginResponseSchema, AuthLoginCredentialsSchema } from '@/app/frontend_auth/auth/auth_types/AuthContracts';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthApiResponseUtils } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtils';
import { AuthCookieUtils } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtils';
import { AuthIdempotencyFingerprintUtils } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtils';
import { AuthRequestHeaderUtils } from '@/app/frontend_auth/auth/auth_utils/AuthRequestHeaderUtils';
import { AuthValidationUtils } from '@/app/frontend_auth/auth/auth_utils/AuthValidationUtils';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
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

  const parsedPayload = AuthLoginCredentialsSchema.safeParse(rawPayload);
  if (!parsedPayload.success) {
    return AuthApiResponseUtils.failure(
      AuthErrorConstants.MESSAGE.INVALID_INPUT,
      StatusCodes.BAD_REQUEST,
      AuthErrorConstants.NAME.VALIDATION,
      AuthErrorConstants.CODE.INVALID_INPUT,
      AuthValidationUtils.toValidationErrors(parsedPayload.error.issues),
    );
  }

  const { email, password } = parsedPayload.data;

  if (AuthServerRuntimeConfig.isLoginDemoEnabled()) {
    const demoUser = AuthMockFixturesApi.findByCredentials(email, password);
    if (demoUser) {
      const idempotencyKey = AuthRequestHeaderUtils.getIdempotencyKey(request);
      const sessionFingerprint = await AuthIdempotencyFingerprintUtils.forLogin({ email, password });
      const session = idempotencyKey
        ? AuthMockFixturesApi.issueSessionForIntent(demoUser, idempotencyKey, sessionFingerprint)
        : AuthMockFixturesApi.issueSession(demoUser);
      if (!session) {
        return AuthApiResponseUtils.failure(
          AuthErrorConstants.MESSAGE.IDEMPOTENCY_CONFLICT,
          StatusCodes.CONFLICT,
          AuthErrorConstants.NAME.CONFLICT,
          AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT,
        );
      }
      const { accessToken, refreshToken } = session;
      const response = AuthApiResponseUtils.success(AuthResponseMessages.LOGIN_SUCCESS, demoUser);
      AuthCookieUtils.setSession(response, accessToken, refreshToken, demoUser);
      return response;
    }
  }

  try {
    const idempotencyKey = AuthRequestHeaderUtils.getIdempotencyKey(request);
    const backendHeaders = idempotencyKey ? { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey } : undefined;
    const { response: backendResponse, payload } = await AuthBackendTransport.post(
      AuthUrlConfig.BACKEND_API.LOGIN,
      { email, password },
      backendHeaders,
    );

    const parsedBackend = AuthBackendLoginResponseSchema.safeParse(payload);

    if (!parsedBackend.success) {
      return AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    if (parsedBackend.data.success !== backendResponse.ok) {
      return AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    if (!backendResponse.ok && parsedBackend.data.statusCode !== backendResponse.status) {
      return AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    if (!backendResponse.ok) {
      const responseStatus = backendResponse.status >= StatusCodes.BAD_REQUEST && backendResponse.status < 500
        ? backendResponse.status
        : StatusCodes.BAD_GATEWAY;
      return AuthApiResponseUtils.failure(
        parsedBackend.data.message,
        responseStatus,
        parsedBackend.data.error ?? AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
        parsedBackend.data.errorCode ?? AuthErrorConstants.CODE.BACKEND_REJECTED,
        parsedBackend.data.validationErrors,
      );
    }

    if (!parsedBackend.data.data) {
      return AuthApiResponseUtils.failure(
        AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
        StatusCodes.BAD_GATEWAY,
        AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
        AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      );
    }

    const response = AuthApiResponseUtils.success(parsedBackend.data.message, parsedBackend.data.data.user);
    AuthCookieUtils.setSession(
      response,
      parsedBackend.data.data.accessToken,
      parsedBackend.data.data.refreshToken,
      parsedBackend.data.data.user,
    );
    return response;
  } catch {
    return AuthApiResponseUtils.failure(
      AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
      StatusCodes.BAD_GATEWAY,
      AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
      AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
    );
  }
}
