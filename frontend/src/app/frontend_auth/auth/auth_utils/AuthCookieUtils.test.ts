import { NextResponse } from 'next/server';
import { describe, expect, it } from 'vitest';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthCookieUtils } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtils';

describe('AuthCookieUtils', () => {
  const user = { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' as const };

  it('writes access, refresh, and user cookies as HTTP-only', () => {
    const response = NextResponse.json({});
    AuthCookieUtils.setSession(response, 'access-1', 'refresh-1', user);
    const cookieHeader = response.headers.get('set-cookie') ?? '';

    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=access-1`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=refresh-1`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.USER}=`);
    expect(cookieHeader).toContain('HttpOnly');
  });

  it('does not restore malformed ghost user identity', () => {
    const response = NextResponse.json({});
    AuthCookieUtils.restoreOriginalGhostSession(response, 'access-2', 'refresh-2', '{"role":"SUPERADMIN"}');
    const cookieHeader = response.headers.get('set-cookie') ?? '';

    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=access-2`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=refresh-2`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.GHOST_ORIGINAL_ACCESS_TOKEN}=`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.GHOST_ORIGINAL_REFRESH_TOKEN}=`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.GHOST_ORIGINAL_USER}=`);
    expect(cookieHeader).not.toContain(`${AuthSessionConstants.COOKIES.USER}=%7B%22role%22%3A%22SUPERADMIN%22%7D`);
  });

  it('clears all locally owned Auth cookies', () => {
    const response = NextResponse.json({});
    AuthCookieUtils.clearSession(response);
    const cookieHeader = response.headers.get('set-cookie') ?? '';
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=`);
    expect(cookieHeader).toContain(`${AuthSessionConstants.COOKIES.USER}=`);
  });
  it('clears the active identity cookie when ghost user data is invalid', () => {
    const response = new NextResponse();
    AuthCookieUtils.restoreOriginalGhostSession(
      response,
      'restored-access',
      'restored-refresh',
      '{invalid-json',
    );

    const setCookieHeader = response.headers.get('set-cookie') ?? '';
    expect(setCookieHeader).toContain(`${AuthSessionConstants.COOKIES.USER}=;`);
  });
});
