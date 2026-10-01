import { StatusCodes } from 'http-status-codes';

import { NextRequest } from 'next/server';

import { describe, expect, it, vi } from 'vitest';

import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthTestEnvironmentConstants } from '@/app/frontend_auth/auth/auth_tests/AuthTestEnvironmentConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import { POST as restoreGhostSession } from '@/app/frontend_auth/auth/exit-ghost-login/route';

import { POST as setCookie } from '@/app/frontend_auth/auth/set-cookie/route';



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


  it('rejects ghost restoration when no original secure session exists', async () => {
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.EXIT_GHOST_LOGIN));
    const response = await restoreGhostSession(request);
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(body.data).toBeNull();
  });

  it('never accepts client-provided token payloads through the retired cookie bridge', async () => {
    const request = new NextRequest(authRouteUrl(AuthUrlConfig.PROXY_API.SET_COOKIE), {
      method: 'POST',
      body: JSON.stringify({ token: 'attacker-token', refreshToken: 'attacker-refresh' }),
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON },
    });
    const response = await setCookie();
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.GONE);
    expect(body.data).toBeNull();
    expect(response.headers.get('set-cookie')).toBeNull();
  });

});
