import { StatusCodes } from 'http-status-codes';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthApi } from '@/app/frontend_auth/auth/auth_api/AuthApi';

import { AuthResponseMessages } from '@/app/frontend_auth/auth/auth_constants/AuthResponseMessages';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';



const apiFetchMock = vi.fn();

vi.mock('@/lib/api', () => ({
  apiFetch: apiFetchMock,
}));

describe('AuthApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends Login credentials with one stable idempotency key and returns sanitized user data', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: true,
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' },
    }), { status: StatusCodes.OK }));

    const user = await AuthApi.login({ email: 'admin@example.com', password: 'demo123' }, 'intent-1');

    expect(apiFetchMock).toHaveBeenCalledWith(AuthUrlConfig.PROXY_API.SESSION, {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'intent-1',
      },
      body: JSON.stringify({ email: 'admin@example.com', password: 'demo123' }),
    });
    expect(user).toEqual({ id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' });
  });

  it('sends a role-only demo Login request with the caller idempotency key', async () => {
    apiFetchMock.mockResolvedValueOnce(new Response(JSON.stringify({
      success: true,
      message: AuthResponseMessages.LOGIN_SUCCESS,
      data: { id: 'u2', name: 'Manager', email: 'manager@example.com', role: 'MANAGER' },
    }), { status: StatusCodes.OK }));

    const user = await AuthApi.loginDemo('MANAGER', 'intent-demo-1');

    expect(apiFetchMock).toHaveBeenCalledWith(AuthUrlConfig.PROXY_API.DEMO_LOGIN, {
      method: 'POST',
      headers: {
        [AuthSessionConstants.HEADERS.CONTENT_TYPE]: AuthSessionConstants.HEADERS.CONTENT_TYPE_JSON,
        [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: 'intent-demo-1',
      },
      body: JSON.stringify({ role: 'MANAGER' }),
    });
    expect(user.role).toBe('MANAGER');
  });

});
