/**
 * RESPONSIBILITY: Provides deterministic browser-facing Auth failure scenarios for module tests without changing the production mock contract.
 * DATA FLOW: Login test scenario -> AuthMockBrowserScenarioHandlers -> canonical AuthApi error envelope -> Login error UI.
 * @description Scenario-only handlers are intentionally separate from the default browser mock handlers so normal demo data stays realistic and reusable.
 * @dependencies MSW, Auth error constants, Auth session URL configuration, and HTTP status constants.
 * @edge-case The handler returns a canonical 502 response with a safe message and no token material.
 */
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

export const AuthMockBrowserScenarioHandlers = {
  unavailableLogin: http.post(AuthUrlConfig.PROXY_API.SESSION, () => HttpResponse.json(
    {
      success: false,
      message: AuthErrorConstants.MESSAGE.UPSTREAM_UNAVAILABLE,
      data: null,
      error: AuthErrorConstants.NAME.UPSTREAM_UNAVAILABLE,
      errorCode: AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE,
      statusCode: StatusCodes.BAD_GATEWAY,
    },
    { status: StatusCodes.BAD_GATEWAY },
  )),
} as const;
