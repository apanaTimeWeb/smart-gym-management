// RESPONSIBILITY: Owns the secure ghost-login restore action and consumes the stashed original session material.
import { StatusCodes } from 'http-status-codes';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthApiResponseUtilities';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtilities';

import type { NextRequest } from 'next/server';



export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN)?.value;
  const userJson = request.cookies.get(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER)?.value;

  if (!accessToken || !refreshToken) {
    return AuthApiResponseUtilities.failure(
      AuthErrorConstants.MESSAGE.GHOST_NO_SESSION,
      StatusCodes.UNAUTHORIZED,
      AuthErrorConstants.NAME.UNAUTHORIZED,
      AuthErrorConstants.CODE.GHOST_NO_ORIGINAL_SESSION,
    );
  }

  const response = AuthApiResponseUtilities.success(AuthResponseMessages.GHOST_RESTORED, null);
  AuthCookieUtilities.restoreOriginalGhostSession(response, accessToken, refreshToken, userJson);
  return response;
}
