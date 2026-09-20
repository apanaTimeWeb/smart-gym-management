import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import { NextRequest } from 'next/server';
import { AuthSessionConstants } from '@/app/auth/auth_constants/AuthSessionConstants';
import { AuthCookieUtils } from '@/app/auth/auth_utils/AuthCookieUtils';

vi.mock('@/app/auth/auth_api/AuthBackendTransport', () => ({
  AuthBackendTransport: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

import { AuthBackendTransport } from '@/app/auth/auth_api/AuthBackendTransport';
import { GET as tokenStatus } from '@/app/auth/token/route';
import { POST as restoreGhostSession } from '@/app/auth/exit-ghost-login/route';
import { POST as setCookie } from '@/app/auth/set-cookie/route';
import { POST as refreshSession } from '@/app/auth/refresh/route';
import { POST as logoutSession } from '@/app/auth/logout/route';
import { POST as createSession } from '@/app/auth/session/route';

describe('Auth security routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('never returns access or refresh tokens from session status', async () => {
    vi.mocked(AuthBackendTransport.get).mockResolvedValue({
      response: new Response(JSON.stringify({
        success: true,
        message: 'Session identity',
        data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN', tenantId: 'tenant-demo' },
      }), { status: StatusCodes.OK }),
      payload: {
        success: true,
        message: 'Session identity',
        data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN', tenantId: 'tenant-demo' },
      },
    });
    const request = new NextRequest('http://localhost/auth/token', {
      headers: {
        cookie: `${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=secret-access; ${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=secret-refresh`,
      },
    });
    const response = await tokenStatus(request);
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.OK);
    expect(JSON.stringify(body)).not.toContain('secret-access');
    expect(JSON.stringify(body)).not.toContain('secret-refresh');
    expect(body.data.authenticated).toBe(true);
  });

  it('rejects ghost restoration when no original secure session exists', async () => {
    const request = new NextRequest('http://localhost/auth/exit-ghost-login');
    const response = await restoreGhostSession(request);
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(body.data).toBeNull();
  });

  it('never accepts client-provided token payloads through the retired cookie bridge', async () => {
    const request = new NextRequest('http://localhost/auth/set-cookie', {
      method: 'POST',
      body: JSON.stringify({ token: 'attacker-token', refreshToken: 'attacker-refresh' }),
      headers: { 'content-type': 'application/json' },
    });
    const response = await setCookie(request);
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.GONE);
    expect(body.data).toBeNull();
    expect(response.headers.get('set-cookie')).toBeNull();
  });

  it('creates a development demo session through the secure server boundary without exposing tokens', async () => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('AUTH_DEMO_MODE', 'true');
    const request = new NextRequest('http://localhost/auth/session', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@gymsmart.com', password: 'demo123' }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await createSession(request);
    const body = await response.json();
    const setCookieHeader = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(StatusCodes.OK);
    expect(body.data.role).toBe('ADMIN');
    expect(JSON.stringify(body)).not.toContain('mock_access_');
    expect(JSON.stringify(body)).not.toContain('mock_refresh_');
    expect(setCookieHeader).toContain(AuthSessionConstants.COOKIES.ACCESS_TOKEN);
    expect(setCookieHeader).toContain('HttpOnly');
  });

  it('refreshes tokens only into HTTP-only cookies and never the JSON body', async () => {
    vi.mocked(AuthBackendTransport.post).mockResolvedValueOnce({
      response: new Response(JSON.stringify({
        success: true,
        message: 'Session refreshed',
        data: { accessToken: 'new-access', refreshToken: 'new-refresh' },
      }), { status: StatusCodes.OK }),
      payload: { success: true, message: 'Session refreshed', data: { accessToken: 'new-access', refreshToken: 'new-refresh' } },
    });
    const request = new NextRequest('http://localhost/auth/refresh', {
      method: 'POST',
      headers: { cookie: `${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=old-refresh` },
    });

    const response = await refreshSession(request);
    const body = await response.json();
    const setCookieHeader = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(StatusCodes.OK);
    expect(body.data).toBeNull();
    expect(JSON.stringify(body)).not.toContain('new-access');
    expect(JSON.stringify(body)).not.toContain('new-refresh');
    expect(setCookieHeader).toContain('HttpOnly');
  });

  it('always clears local session cookies during logout', async () => {
    vi.mocked(AuthBackendTransport.post).mockRejectedValueOnce(new Error('backend unavailable'));
    const request = new NextRequest('http://localhost/auth/logout', {
      method: 'POST',
      headers: { cookie: `${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=access-token` },
    });

    const response = await logoutSession(request);
    const body = await response.json();
    const setCookieHeader = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(StatusCodes.OK);
    expect(body.data).toBeNull();
    expect(setCookieHeader).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=`);
    expect(setCookieHeader).toContain(`${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=`);
  });

  it('keeps logout-side transport injectable while cookie utilities own cookie behavior', async () => {
    expect(AuthBackendTransport.post).toBeDefined();
    expect(AuthCookieUtils.clearSession).toBeDefined();
  });
});
