import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthServerRuntimeConfig';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthSessionUserCookieSchema } from '@/app/frontend_auth/auth/auth_schemas/AuthSchema';

import type { AuthUser } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

import type { NextResponse } from 'next/server';

// RESPONSIBILITY: Owns secure HTTP-only Auth session cookie creation, refresh, clearing, and ghost-session restoration.

const secureCookieBase = {
  httpOnly: true,
  secure: AuthServerRuntimeConfig.isProduction(),
  sameSite: 'strict' as const,
  path: '/',
};

/**
 * Writes the two server-owned session token cookies using one shared secure cookie policy.
 * @description Keeps token cookie security flags identical across Login and refresh flows.
 * @dependencies NextResponse and AuthSessionConstants.
 * @edge-case Development may disable the Secure flag so localhost HTTP can function; production keeps it enabled.
 */
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

/**
 * Safely parses the stashed user identity cookie against the canonical AuthUser schema.
 * @description Attempts both direct JSON and URI-decoded JSON representations without throwing into the route.
 * @dependencies AuthSessionUserCookieSchema.
 * @edge-case Malformed or schema-invalid values resolve to null.
 */
function parseStoredUser(rawUser: string): AuthUser | null {
  try {
    const direct = AuthSessionUserCookieSchema.safeParse(JSON.parse(rawUser));
    if (direct.success) return direct.data;
    const decoded = AuthSessionUserCookieSchema.safeParse(JSON.parse(decodeURIComponent(rawUser)));
    return decoded.success ? decoded.data : null;
  } catch {
    return null;
  }
}

export const AuthCookieUtilities = {
  /**
   * Writes a complete authenticated session using HTTP-only cookies only.
   * @param response Next.js response that receives the Set-Cookie headers.
   * @param accessToken Backend-issued access token kept server-readable only.
   * @param refreshToken Backend-issued refresh token kept server-readable only.
   * @param user Sanitized identity associated with the session.
   */
  setSession(response: NextResponse, accessToken: string, refreshToken: string, user: AuthUser) {
    setAccessAndRefreshCookies(response, accessToken, refreshToken);
    response.cookies.set(AuthSessionConstants.COOKIES.USER, JSON.stringify(user), {
      ...secureCookieBase,
      httpOnly: false, // The client needs to read this cookie to determine role permissions
      maxAge: AuthSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN,
    });
  },

  /**
   * Refreshes access/refresh tokens while preserving the existing user identity cookie.
   */
  refreshSession(response: NextResponse, accessToken: string, refreshToken: string) {
    setAccessAndRefreshCookies(response, accessToken, refreshToken);
  },

  /**
   * Clears every locally owned authentication session cookie regardless of upstream logout success.
   */
  clearSession(response: NextResponse) {
    for (const cookieName of [
      AuthSessionConstants.COOKIES.ACCESS_TOKEN,
      AuthSessionConstants.COOKIES.REFRESH_TOKEN,
      AuthSessionConstants.COOKIES.USER,
    ]) {
      response.cookies.set(cookieName, '', { ...secureCookieBase, maxAge: 0 });
    }
  },

  /**
   * Restores a previously stashed original session and consumes the ghost-session stash.
   * @param userJson Optional stashed user identity; it is validated before being restored.
   * @edge-case A malformed identity cookie is not copied into the active session.
   */
  restoreOriginalGhostSession(response: NextResponse, accessToken: string, refreshToken: string, userJson?: string) {
    setAccessAndRefreshCookies(response, accessToken, refreshToken);
    response.cookies.set(AuthSessionConstants.COOKIES.USER, '', { ...secureCookieBase, maxAge: 0 });

    if (userJson) {
      const validatedUser = parseStoredUser(userJson);
      if (validatedUser) {
        response.cookies.set(AuthSessionConstants.COOKIES.USER, JSON.stringify(validatedUser), {
          ...secureCookieBase,
          httpOnly: false, // The client needs to read this cookie to determine role permissions
          maxAge: AuthSessionConstants.MAX_AGE_SECONDS.REFRESH_TOKEN,
        });
      }
    }

    response.cookies.set(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN, '', { ...secureCookieBase, maxAge: 0 });
    response.cookies.set(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN, '', { ...secureCookieBase, maxAge: 0 });
    response.cookies.set(AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER, '', { ...secureCookieBase, maxAge: 0 });
  },
};
