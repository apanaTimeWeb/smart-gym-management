/**
 * RESPONSIBILITY: Restores a previously stashed session from secure ghost-login cookies; never invents a privileged session.
 * DATA FLOW: Secure original-session cookies -> restore current session cookies -> clear stash -> canonical response.
 */
import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { AuthSessionConstants } from '@/app/auth/auth_constants/AuthSessionConstants';
import { AuthErrorConstants } from '@/app/auth/auth_constants/AuthErrorConstants';
import { AuthApiResponseUtils } from '@/app/auth/auth_utils/AuthApiResponseUtils';
import { AuthCookieUtils } from '@/app/auth/auth_utils/AuthCookieUtils';

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

  const response = AuthApiResponseUtils.success('Original session restored', null);
  AuthCookieUtils.restoreOriginalGhostSession(response, accessToken, refreshToken, userJson);
  return response;
}
