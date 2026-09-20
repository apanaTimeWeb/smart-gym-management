/**
 * RESPONSIBILITY: Provides module-owned MSW handlers for deterministic Auth contract testing without browser token exposure.
 * DATA FLOW: Test request -> backend-shaped Auth response -> server Auth boundary -> UI behavior assertion.
 */
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { AuthErrorConstants } from '@/app/auth/auth_constants/AuthErrorConstants';
import { AuthLoginCredentialsSchema } from '@/app/auth/auth_types/AuthContracts';
import { AuthMockFixturesApi } from '@/app/auth/auth_mocks/AuthMockFixtures';
import { env } from '@/config/env';

const BASE = env.NEXT_PUBLIC_API_URL;

export const AuthMockHandlers = [
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const parsedPayload = AuthLoginCredentialsSchema.safeParse(await request.json());
    if (!parsedPayload.success) {
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

    const user = AuthMockFixturesApi.findByCredentials(parsedPayload.data.email, parsedPayload.data.password);
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
          data: null,
          error: AuthErrorConstants.NAME.UNAUTHORIZED,
          errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    return HttpResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        accessToken: `mock_access_${crypto.randomUUID()}`,
        refreshToken: `mock_refresh_${crypto.randomUUID()}`,
        user,
      },
    });
  }),

  http.post(`${BASE}/auth/refresh`, ({ request }) => {
    if (request.headers.get('x-auth-simulate-error') === 'true') {
      return HttpResponse.json({
        success: false,
        message: AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
        data: null,
        error: AuthErrorConstants.NAME.UNAUTHORIZED,
        errorCode: AuthErrorConstants.CODE.REFRESH_REJECTED,
        statusCode: StatusCodes.UNAUTHORIZED,
      }, { status: StatusCodes.UNAUTHORIZED });
    }
    return HttpResponse.json({ success: true, message: 'Session refreshed', data: null });
  }),

  http.post(`${BASE}/auth/logout`, () => HttpResponse.json({
    success: true,
    message: 'Logged out successfully',
    data: null,
  })),
];
