import { StatusCodes } from 'http-status-codes';

import { NextRequest } from 'next/server';

import { describe, expect, it, vi } from 'vitest';

import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthRoleConstants } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockFixturesApi';

import { AuthTestEnvironmentConstants } from '@/app/frontend_auth/auth/auth_tests/AuthTestEnvironmentConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import { AuthCookieUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtilities';

import { POST as logoutSession } from '@/app/frontend_auth/auth/logout/route';

import { POST as refreshSession } from '@/app/frontend_auth/auth/refresh/route';

import { POST as createSession } from '@/app/frontend_auth/auth/session/route';



vi.mock('@/app/frontend_auth/auth/auth_api/AuthBackendTransport', () => ({
  AuthBackendTransport: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

const authEnv = vi.hoisted(() => ({
  NODE_ENV: 'test',
  NEXT_PUBLIC_AUTH_DEMO_MODE: 'false',
  AUTH_DEMO_MODE: 'false',
  NEXT_PUBLIC_API_URL: 'http://localhost:4000',
}));

vi.mock('@/config/env', () => ({ env: authEnv }));

const authRouteUrl = (path: string): string => new URL(path, AuthTestEnvironmentConstants.ORIGIN).toString();

describe('Auth security routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authEnv.NODE_ENV = 'test';
    authEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'false';
    authEnv.AUTH_DEMO_MODE = 'false';
  });


  it('creates a development demo session through the secure server boundary without exposing tokens', async () => {
    authEnv.NODE_ENV = 'test';
    authEnv.AUTH_DEMO_MODE = 'true';
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.SESSION), {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@gymsmart.com', password: 'demo123' }),
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON },
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

  it('uses mutable mock state for a development refresh and changes the active access session', async () => {
    authEnv.NODE_ENV = 'test';
    authEnv.AUTH_DEMO_MODE = 'true';
    AuthMockFixturesApi.resetMockSessions();
    const issued = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole(AuthRoleConstants.ADMIN).user);
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.REFRESH), {
      method: 'POST',
      headers: { cookie: `${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=${issued.refreshToken}` },
    });

    const response = await refreshSession(request);
    const setCookieHeader = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(StatusCodes.OK);
    expect(setCookieHeader).not.toContain(issued.accessToken);
    expect(setCookieHeader).toContain(AuthSessionConstants.COOKIES.ACCESS_TOKEN);
  });

  it('rejects a refresh idempotency key reused for a different refresh-token intent', async () => {
    authEnv.NODE_ENV = 'test';
    authEnv.AUTH_DEMO_MODE = 'true';
    AuthMockFixturesApi.resetMockSessions();
    const first = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole(AuthRoleConstants.ADMIN).user);
    const firstRequest = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.REFRESH), {
      method: 'POST',
      headers: { cookie: `${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=${first.refreshToken}`, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'refresh-intent' },
    });
    const firstResponse = await refreshSession(firstRequest);
    expect(firstResponse.status).toBe(StatusCodes.OK);

    const second = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole(AuthRoleConstants.MANAGER).user);
    const secondRequest = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.REFRESH), {
      method: 'POST',
      headers: { cookie: `${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=${second.refreshToken}`, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'refresh-intent' },
    });
    const secondResponse = await refreshSession(secondRequest);
    expect(secondResponse.status).toBe(StatusCodes.CONFLICT);
  });

  it('revokes development mock sessions during logout', async () => {
    authEnv.NODE_ENV = 'test';
    authEnv.AUTH_DEMO_MODE = 'true';
    AuthMockFixturesApi.resetMockSessions();
    const issued = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole(AuthRoleConstants.ADMIN).user);
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.LOGOUT), {
      method: 'POST',
      headers: { cookie: `${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=${issued.accessToken}; ${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=${issued.refreshToken}` },
    });

    const response = await logoutSession(request);
    expect(response.status).toBe(StatusCodes.OK);
    expect(AuthMockFixturesApi.resolveUserByAccessToken(issued.accessToken)).toBeNull();
  });

  it('rejects a refresh backend error response whose declared status code disagrees with the HTTP status', async () => {
    vi.mocked(AuthBackendTransport.post).mockResolvedValueOnce({
      response: new Response(JSON.stringify({
        success: false,
        message: AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
        data: null,
        error: AuthErrorConstants.NAME.UNAUTHORIZED,
        errorCode: AuthErrorConstants.CODE.REFRESH_REJECTED,
        statusCode: StatusCodes.UNAUTHORIZED,
      }), { status: StatusCodes.INTERNAL_SERVER_ERROR }),
      payload: {
        success: false,
        message: AuthErrorConstants.MESSAGE.SESSION_EXPIRED,
        data: null,
        error: AuthErrorConstants.NAME.UNAUTHORIZED,
        errorCode: AuthErrorConstants.CODE.REFRESH_REJECTED,
        statusCode: StatusCodes.UNAUTHORIZED,
      },
    });
    authEnv.AUTH_DEMO_MODE = 'false';
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.REFRESH), {
      method: 'POST',
      headers: { cookie: `${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=old-refresh` },
    });

    const response = await refreshSession(request);

    expect(response.status).toBe(StatusCodes.BAD_GATEWAY);
  });

  it('refreshes tokens only into HTTP-only cookies and never the JSON body', async () => {
    vi.mocked(AuthBackendTransport.post).mockResolvedValueOnce({
      response: new Response(JSON.stringify({
        success: true,
        message: AuthResponseMessages.REFRESH_SUCCESS,
        data: { accessToken: 'new-access', refreshToken: 'new-refresh' },
      }), { status: StatusCodes.OK }),
      payload: { success: true, message: AuthResponseMessages.REFRESH_SUCCESS, data: { accessToken: 'new-access', refreshToken: 'new-refresh' } },
    });
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.REFRESH), {
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
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.LOGOUT), {
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
    expect(AuthCookieUtilities.clearSession).toBeDefined();
  });
  it('rejects changed credentials when the same login idempotency key is reused', async () => {
    authEnv.NODE_ENV = 'test';
    authEnv.AUTH_DEMO_MODE = 'true';
    const firstRequest = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.SESSION), {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@gymsmart.com', password: 'demo123' }),
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'same-intent' },
    });
    const firstResponse = await createSession(firstRequest);
    expect(firstResponse.status).toBe(StatusCodes.OK);

    const secondRequest = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.SESSION), {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@gymsmart.com', password: 'demo124' }),
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'same-intent' },
    });
    const secondResponse = await createSession(secondRequest);
    expect(secondResponse.status).toBe(StatusCodes.CONFLICT);
  });

});

