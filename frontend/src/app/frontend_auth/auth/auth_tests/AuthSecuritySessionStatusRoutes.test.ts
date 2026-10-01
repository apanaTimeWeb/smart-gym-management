import { StatusCodes } from 'http-status-codes';

import { NextRequest } from 'next/server';

import { describe, expect, it, vi } from 'vitest';

import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthRoleConstants } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthTestEnvironmentConstants } from '@/app/frontend_auth/auth/auth_tests/AuthTestEnvironmentConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import { POST as createSession } from '@/app/frontend_auth/auth/session/route';

import { GET as tokenStatus } from '@/app/frontend_auth/auth/token/route';



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


  it('never returns access or refresh tokens from session status', async () => {
    vi.mocked(AuthBackendTransport.get).mockResolvedValue({
      response: new Response(JSON.stringify({
        success: true,
        message: 'Session identity',
        data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: AuthRoleConstants.ADMIN, tenantId: 'tenant-demo' },
      }), { status: StatusCodes.OK }),
      payload: {
        success: true,
        message: 'Session identity',
        data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: AuthRoleConstants.ADMIN, tenantId: 'tenant-demo' },
      },
    });
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.TOKEN), {
      headers: {
        cookie: `${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=secret-access; ${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=secret-refresh`,
      },
    });
    const response = await tokenStatus(request);
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.OK);
    expect(JSON.stringify(body)).not.toContain('secret-access');
    expect(JSON.stringify(body)).not.toContain('secret-refresh');
    expect(body.data).toEqual({ authenticated: true, user: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: AuthRoleConstants.ADMIN, tenantId: 'tenant-demo' } });
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
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.TOKEN), {
      headers: {
        cookie: `${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=expired-access; ${AuthSessionConstants.COOKIES.USER}=\"forged-user\"`,
      },
    });
    const response = await tokenStatus(request);
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.OK);
    expect(body.data).toEqual({ authenticated: false, user: null });
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
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.SESSION), {
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
        data: { accessToken: 'backend-access', refreshToken: 'backend-refresh', user: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: AuthRoleConstants.ADMIN } },
      }), { status: StatusCodes.OK }),
      payload: {
        success: true,
        message: AuthResponseMessages.LOGIN_SUCCESS,
        data: { accessToken: 'backend-access', refreshToken: 'backend-refresh', user: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: AuthRoleConstants.ADMIN } },
      },
    });
    authEnv.AUTH_DEMO_MODE = 'false';
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.SESSION), {
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

});
