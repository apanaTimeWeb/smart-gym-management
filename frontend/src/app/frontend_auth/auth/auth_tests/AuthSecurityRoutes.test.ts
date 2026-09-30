import { StatusCodes } from 'http-status-codes';
import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';
import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/fixtures/AuthMockFixtures';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthCookieUtils } from '@/app/frontend_auth/auth/auth_utils/AuthCookieUtils';
import { GET as tokenStatus } from '@/app/frontend_auth/auth/token/route';
import { POST as restoreGhostSession } from '@/app/frontend_auth/auth/exit-ghost-login/route';
import { POST as setCookie } from '@/app/frontend_auth/auth/set-cookie/route';
import { POST as refreshSession } from '@/app/frontend_auth/auth/refresh/route';
import { POST as logoutSession } from '@/app/frontend_auth/auth/logout/route';
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

describe('Auth security routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authEnv.NODE_ENV = 'test';
    authEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'false';
    authEnv.AUTH_DEMO_MODE = 'false';
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
    expect(body.data).toEqual({ authenticated: true, user: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN', tenantId: 'tenant-demo' } });
  });

  it('does not trust the unsigned user identity cookie as an authentication authority', async () => {
    vi.mocked(AuthBackendTransport.get).mockResolvedValue({
      response: new Response(JSON.stringify({
        success: false,
        message: 'Session expired',
        data: null,
      }), { status: StatusCodes.UNAUTHORIZED }),
      payload: { success: false, message: 'Session expired', data: null },
    });
    const request = new NextRequest('http://localhost/auth/token', {
      headers: {
        cookie: `${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=expired-access; ${AuthSessionConstants.COOKIES.USER}=\"forged-user\"`,
      },
    });
    const response = await tokenStatus(request);
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.OK);
    expect(body.data).toEqual({ authenticated: false, user: null });
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
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON },
    });
    const response = await setCookie(request);
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.GONE);
    expect(body.data).toBeNull();
    expect(response.headers.get('set-cookie')).toBeNull();
  });

  it('creates a development demo session through the secure server boundary without exposing tokens', async () => {
    authEnv.NODE_ENV = 'test';
    authEnv.AUTH_DEMO_MODE = 'true';
    const request = new NextRequest('http://localhost/auth/session', {
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

  it('rejects a backend error response whose declared status code disagrees with the HTTP status', async () => {
    vi.mocked(AuthBackendTransport.post).mockResolvedValueOnce({
      response: new Response(JSON.stringify({
        success: false,
        message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
        data: null,
        error: AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
        errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
        statusCode: StatusCodes.BAD_REQUEST,
      }), { status: StatusCodes.INTERNAL_SERVER_ERROR }),
      payload: {
        success: false,
        message: AuthErrorConstants.MESSAGE.INVALID_CREDENTIALS,
        data: null,
        error: AuthErrorConstants.NAME.AUTHENTICATION_FAILED,
        errorCode: AuthErrorConstants.CODE.BACKEND_REJECTED,
        statusCode: StatusCodes.BAD_REQUEST,
      },
    });
    authEnv.AUTH_DEMO_MODE = 'false';
    const request = new NextRequest('http://localhost/auth/session', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@example.com', password: 'demo123' }),
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON },
    });

    const response = await createSession(request);
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.BAD_GATEWAY);
    expect(body.errorCode).toBe(AuthErrorConstants.CODE.UPSTREAM_UNAVAILABLE);
  });

  it('forwards the caller idempotency key to the backend login mutation', async () => {
    vi.mocked(AuthBackendTransport.post).mockResolvedValueOnce({
      response: new Response(JSON.stringify({
        success: true,
        message: AuthResponseMessages.LOGIN_SUCCESS,
        data: { accessToken: 'backend-access', refreshToken: 'backend-refresh', user: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' } },
      }), { status: StatusCodes.OK }),
      payload: {
        success: true,
        message: AuthResponseMessages.LOGIN_SUCCESS,
        data: { accessToken: 'backend-access', refreshToken: 'backend-refresh', user: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' } },
      },
    });
    authEnv.AUTH_DEMO_MODE = 'false';
    const request = new NextRequest('http://localhost/auth/session', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@example.com', password: 'demo123' }),
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'intent-login-1' },
    });

    const response = await createSession(request);
    expect(response.status).toBe(StatusCodes.OK);
    expect(AuthBackendTransport.post).toHaveBeenCalledWith(
      AuthUrlConfig.BACKEND_API.LOGIN,
      { email: 'admin@example.com', password: 'demo123' },
      { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'intent-login-1' },
    );
    expect(JSON.stringify(await response.json())).not.toContain('backend-access');
  });

  it('uses mutable mock state for a development refresh and changes the active access session', async () => {
    authEnv.NODE_ENV = 'test';
    authEnv.AUTH_DEMO_MODE = 'true';
    AuthMockFixturesApi.resetMockSessions();
    const issued = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole('ADMIN').user);
    const request = new NextRequest('http://localhost/auth/refresh', {
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
    const first = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole('ADMIN').user);
    const firstRequest = new NextRequest('http://localhost/auth/refresh', {
      method: 'POST',
      headers: { cookie: `${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=${first.refreshToken}`, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'refresh-intent' },
    });
    const firstResponse = await refreshSession(firstRequest);
    expect(firstResponse.status).toBe(StatusCodes.OK);

    const second = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole('MANAGER').user);
    const secondRequest = new NextRequest('http://localhost/auth/refresh', {
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
    const issued = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole('ADMIN').user);
    const request = new NextRequest('http://localhost/auth/logout', {
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
    const request = new NextRequest('http://localhost/auth/refresh', {
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
  it('rejects changed credentials when the same login idempotency key is reused', async () => {
    authEnv.NODE_ENV = 'test';
    authEnv.AUTH_DEMO_MODE = 'true';
    const firstRequest = new NextRequest('http://localhost/auth/session', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@gymsmart.com', password: 'demo123' }),
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'same-intent' },
    });
    const firstResponse = await createSession(firstRequest);
    expect(firstResponse.status).toBe(StatusCodes.OK);

    const secondRequest = new NextRequest('http://localhost/auth/session', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@gymsmart.com', password: 'demo124' }),
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'same-intent' },
    });
    const secondResponse = await createSession(secondRequest);
    expect(secondResponse.status).toBe(StatusCodes.CONFLICT);
  });

});
