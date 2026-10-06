import { StatusCodes } from 'http-status-codes';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthBackendTransport } from '@/app/frontend_auth/auth/auth_api/AuthBackendTransport';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth/auth_mocks/auth_mock_fixtures/AuthMockFixturesApi';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import { AuthSessionServerUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthSessionServerUtilities';



const authTestEnv = vi.hoisted(() => ({
  NODE_ENV: 'test' as 'development' | 'test' | 'production',
  NEXT_PUBLIC_AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  NEXT_PUBLIC_API_URL: 'http://localhost:4000',
}));

vi.mock('@/config/env', () => ({ env: authTestEnv }));
vi.mock('@/app/frontend_auth/auth/auth_api/AuthBackendTransport', () => ({
  AuthBackendTransport: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('AuthSessionServerUtilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    AuthMockFixturesApi.resetMockSessions();
    authTestEnv.NODE_ENV = 'test';
    authTestEnv.AUTH_DEMO_MODE = 'false';
    authTestEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'false';
  });

  it('resolves production identity from the authoritative backend session endpoint', async () => {
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

    const user = await AuthSessionServerUtilities.resolveUser('valid-access');

    expect(AuthBackendTransport.get).toHaveBeenCalledWith(AuthUrlConfig.BACKEND_API.ME, { Authorization: `${AuthSessionConstants.AUTHORIZATION_PREFIX}valid-access` });
    expect(user?.id).toBe('u1');
    expect(user?.role).toBe('ADMIN');
  });

  it('resolves development demo identity only from the module-owned access-token session registry', async () => {
    authTestEnv.AUTH_DEMO_MODE = 'true';
    const issued = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole('ADMIN').user);

    const user = await AuthSessionServerUtilities.resolveUser(issued.accessToken);
    const forged = await AuthSessionServerUtilities.resolveUser('forged-access');

    expect(user?.id).toBe('mock-admin');
    expect(forged).toBeNull();
    expect(AuthBackendTransport.get).not.toHaveBeenCalled();
  });
});
