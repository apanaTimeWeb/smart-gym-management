import { StatusCodes } from 'http-status-codes';

import { setupServer } from 'msw/node';

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthErrorConstants } from '@/app/frontend_auth/auth/auth_constants/AuthErrorConstants';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthMockPublicFixtures } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockPublicFixtures';

import { AuthMockHandlers, AuthMockHandlersTestApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_handlers/AuthMockHandlers';

import { AuthTestEnvironmentConstants } from '@/app/frontend_auth/auth/auth_tests/AuthTestEnvironmentConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';



vi.mock('@/config/env', () => ({ env: { NEXT_PUBLIC_API_URL: 'http://localhost:4000' } }));

const server = setupServer(...AuthMockHandlers);

describe('AuthMockHandlers', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  beforeEach(() => AuthMockHandlersTestApi.reset());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('supports the real frontend credential Login request through module-owned MSW and returns a complete AuthUser', async () => {
    const response = await fetch(new URL(AuthUrlConfig.PROXY_API.SESSION, AuthTestEnvironmentConstants.ORIGIN), {
      method: 'POST',
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'intent-1' },
      body: JSON.stringify({ email: AuthMockPublicFixtures.USERS.ADMIN.email, password: 'demo123' }),
    });
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.OK);
    expect(body).toEqual({
      success: true,
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: {
        id: 'mock-admin',
        name: 'Demo Admin',
        email: 'admin@gymsmart.com',
        role: 'ADMIN',
        tenantId: 'tenant-demo',
      },
    });
  });


  it('rejects browser Login mutations without the required idempotency key', async () => {
    const response = await fetch(new URL(AuthUrlConfig.PROXY_API.SESSION, AuthTestEnvironmentConstants.ORIGIN), {
      method: 'POST',
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON },
      body: JSON.stringify({ email: AuthMockPublicFixtures.USERS.ADMIN.email, password: 'demo123' }),
    });
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(body.errorCode).toBe(AuthErrorConstants.CODE.IDEMPOTENCY_REQUIRED);
  });

  it('rejects a changed credential intent before resolving a new user when the idempotency key is reused', async () => {
    const first = await fetch(new URL(AuthUrlConfig.PROXY_API.SESSION, AuthTestEnvironmentConstants.ORIGIN), {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'collision-intent',
      },
      body: JSON.stringify({ email: AuthMockPublicFixtures.USERS.ADMIN.email, password: 'demo123' }),
    });
    expect(first.status).toBe(StatusCodes.OK);

    const second = await fetch(new URL(AuthUrlConfig.PROXY_API.SESSION, AuthTestEnvironmentConstants.ORIGIN), {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'collision-intent',
      },
      body: JSON.stringify({ email: 'unknown@example.com', password: 'different123' }),
    });
    const body = await second.json();

    expect(second.status).toBe(StatusCodes.CONFLICT);
    expect(body.errorCode).toBe(AuthErrorConstants.CODE.IDEMPOTENCY_CONFLICT);
  });

  it('supports the real frontend demo-login request through role-only payloads', async () => {
    const response = await fetch(new URL(AuthUrlConfig.PROXY_API.DEMO_LOGIN, AuthTestEnvironmentConstants.ORIGIN), {
      method: 'POST',
      headers: { [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON, [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'demo-intent-1' },
      body: JSON.stringify({ role: 'MANAGER' }),
    });
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.OK);
    expect(body.data).toMatchObject({ id: 'mock-manager', role: 'MANAGER', tenantId: 'tenant-demo' });
  });

  it('supports me -> refresh -> logout with mutable safe mock sessions', async () => {
    const issued = AuthMockHandlersTestApi.seed('ADMIN');
    const meResponse = await fetch(new URL(AuthUrlConfig.BACKEND_API.ME, AuthTestEnvironmentConstants.ORIGIN), { headers: { [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${issued.accessToken}` } });
    expect(meResponse.status).toBe(StatusCodes.OK);
    expect((await meResponse.json()).data.role).toBe('ADMIN');

    const refreshResponse = await fetch(new URL(AuthUrlConfig.BACKEND_API.REFRESH, AuthTestEnvironmentConstants.ORIGIN), { method: 'POST', headers: { [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${issued.refreshToken}` } });
    const refreshBody = await refreshResponse.json();
    expect(refreshResponse.status).toBe(StatusCodes.OK);
    expect(refreshBody.data.accessToken).not.toBe(issued.accessToken);

    const staleMe = await fetch(new URL(AuthUrlConfig.BACKEND_API.ME, AuthTestEnvironmentConstants.ORIGIN), { headers: { [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${issued.accessToken}` } });
    expect(staleMe.status).toBe(StatusCodes.UNAUTHORIZED);

    const logoutResponse = await fetch(new URL(AuthUrlConfig.BACKEND_API.LOGOUT, AuthTestEnvironmentConstants.ORIGIN), { method: 'POST', headers: { [AuthSessionConstants.HEADERS.AUTHORIZATION]: `${AuthSessionConstants.AUTHORIZATION_PREFIX}${refreshBody.data.accessToken}` } });
    expect(logoutResponse.status).toBe(StatusCodes.OK);
  });

  it('rejects unauthenticated session lookup without exposing secret material', async () => {
    const response = await fetch(new URL(AuthUrlConfig.BACKEND_API.ME, AuthTestEnvironmentConstants.ORIGIN));
    const body = await response.json();
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(body.data).toBeNull();
  });
});
