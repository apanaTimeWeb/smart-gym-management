/**
 * RESPONSIBILITY: Encapsulates secure Auth cookie creation, session restoration, refresh, and cookie clearing.
 * DATA FLOW: Auth route receives validated session data -> secure HTTP-only cookies -> server-side session consumption.
 */
import type { NextResponse } from 'next/server';
import { AuthSessionConstants } from '@/app/auth/auth_constants/AuthSessionConstants';
import type { AuthUser } from '@/app/auth/auth_types/AuthContracts';

const secureCookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

function setAccessAndRefreshCookies(response: NextResponse, accessToken: string, refreshToken: string) {
  response.cookies.set(AuthSessionConstants.COOKIES.ACCESS_TOKEN, accessToken, {
    ...secureCookieBase,
    maxAge: AuthSessionConstants.MAX_AGE_SECONDS.ACCESS_TOKEN,
  });
  response.cookies.set(AuthSessionConstants.COOKIES.REFRESH_TOKEN, refreshToken, {
    ...secureCookieBase,
    maxAge: AuthSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN,
  });
}

export const AuthCookieUtils = {
  setSession(response: NextResponse, accessToken: string, refreshToken: string, user: AuthUser) {
    setAccessAndRefreshCookies(response, accessToken, refreshToken);
    response.cookies.set(AuthSessionConstants.COOKIES.USER, JSON.stringify(user), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: AuthSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN,
    });
  },

  refreshSession(response: NextResponse, accessToken: string, refreshToken: string) {
    setAccessAndRefreshCookies(response, accessToken, refreshToken);
  },

  clearSession(response: NextResponse) {
    for (const cookieName of [
      AuthSessionConstants.COOKIES.ACCESS_TOKEN,
      AuthSessionConstants.COOKIES.REFRESH_TOKEN,
    ]) {
      response.cookies.set(cookieName, '', { ...secureCookieBase, maxAge: 0 });
    }
    // Clear user cookie without httpOnly
    response.cookies.set(AuthSessionConstants.COOKIES.USER, '', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 0,
    });
  },

  restoreOriginalGhostSession(response: NextResponse, accessToken: string, refreshToken: string, userJson?: string) {
    setAccessAndRefreshCookies(response, accessToken, refreshToken);
    if (userJson) {
      response.cookies.set(AuthSessionConstants.COOKIES.USER, userJson, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
        maxAge: AuthSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN,
      });
    }
    response.cookies.set(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN, '', { ...secureCookieBase, maxAge: 0 });
    response.cookies.set(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN, '', { ...secureCookieBase, maxAge: 0 });
    response.cookies.set(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER, '', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 0,
    });
  },
};
