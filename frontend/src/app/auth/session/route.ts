/**
 * RESPONSIBILITY: Secure server-side login gateway. Validates credentials, calls the backend, validates the backend contract, and writes HTTP-only cookies.
 * DATA FLOW: Browser credentials -> Auth session route -> backend/mock contract -> secure cookies -> canonical user-only response.
 */
import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { AuthErrorConstants } from '@/app/auth/auth_constants/AuthErrorConstants';
import { AuthBackendTransport } from '@/app/auth/auth_api/AuthBackendTransport';
import { AuthBackendLoginResponseSchema, AuthLoginCredentialsSchema } from '@/app/auth/auth_types/AuthContracts';
import { AuthApiResponseUtils } from '@/app/auth/auth_utils/AuthApiResponseUtils';
import { AuthCookieUtils } from '@/app/auth/auth_utils/AuthCookieUtils';
import { AuthValidationUtils } from '@/app/auth/auth_utils/AuthValidationUtils';
import { AuthMockFixturesApi } from '@/app/auth/auth_mocks/AuthMockFixtures';

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
  const demoEnabled = process.env.NODE_ENV !== 'production' && process.env.AUTH_DEMO_MODE === 'true';

  if (demoEnabled) {
    const demoUser = AuthMockFixturesApi.findByCredentials(email, password);
    if (demoUser) {
      const mockAccessToken = `mock_access_${crypto.randomUUID()}`;
      const mockRefreshToken = `mock_refresh_${crypto.randomUUID()}`;
      const response = AuthApiResponseUtils.success('Login successful', demoUser);
      AuthCookieUtils.setSession(response, mockAccessToken, mockRefreshToken, demoUser);
      return response;
    }
  }

  try {
    const { response: backendResponse, payload } = await AuthBackendTransport.post(AuthUrlConfig.BACKEND_API.LOGIN, {
      email,
      password,
    });

    const parsedBackend = AuthBackendLoginResponseSchema.safeParse(payload);

    if (!backendResponse.ok || !parsedBackend.success || !parsedBackend.data.success || !parsedBackend.data.data) {
      const safeMessage = !backendResponse.ok && (backendResponse.status === StatusCodes.BAD_REQUEST || backendResponse.status === StatusCodes.UNAUTHORIZED) && parsedBackend.success
        ? parsedBackend.data.message
        : AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS;
      const responseStatus = backendResponse.status >= StatusCodes.BAD_REQUEST ? backendResponse.status : StatusCodes.BAD_GATEWAY;
      return AuthApiResponseUtils.failure(
        safeMessage,
        responseStatus,
        AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
        AuthErrorConstants.CODE.BACKEND_REJECTED,
      );
    }

    const response = AuthApiResponseUtils.success('Login successful', parsedBackend.data.data.user);
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
