
/**
 * RESPONSIBILITY: Restores a previously stashed session from secure ghost-login cookies; never invents a privileged session.
 * DATA FLOW: Secure original-session cookies -> restore current session cookies -> clear stash -> canonical response.
 */
import { StatusCodes } from 'http-status-codes';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthApiResponseUtils } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtils';
import { AuthCookieUtils } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtils';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN)?.value;
  const userJson = request.cookies.get(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER)?.value;

  if (!accessToken || !refreshToken) {
    return AuthApiResponseUtils.failure(
      AuthErrorConstants.MESSAGE.GHOST_NO_SESSION,
      StatusCodes.UNAUTHORIZED,
      AuthErrorConstants.NAME.UNAUTHORIZED,
      AuthErrorConstants.CODE.GHOST_NO_ORIGINAL_SESSION,
    );
  }

  const response = AuthApiResponseUtils.success(AuthResponseMessages.GHOST_RESTORED, null);
  AuthCookieUtils.restoreOriginalGhostSession(response, accessToken, refreshToken, userJson);
  return response;
}
