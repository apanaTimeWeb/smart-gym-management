import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import { AuthBackendTransport } from '@/app/auth/auth_api/AuthBackendTransport';
import { AuthSessionServerUtils } from '@/app/auth/auth_utils/AuthSessionServerUtils';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';

afterEach(() => {
  vi.unstubAllEnvs();
});

vi.mock('@/app/auth/auth_api/AuthBackendTransport', () => ({
  AuthBackendTransport: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('AuthSessionServerUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resolves production identity from the authoritative backend session endpoint', async () => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('AUTH_DEMO_MODE', 'false');
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

    const user = await AuthSessionServerUtils.resolveUser('valid-access', JSON.stringify({
      id: 'spoofed', name: 'Spoofed', email: 'spoofed@example.com', role: 'SUPERADMIN', tenantId: 'tenant-other',
    }));

    expect(AuthBackendTransport.get).toHaveBeenCalledWith(AuthUrlConfig.BACKEND_API.ME, { Authorization: 'Bearer valid-access' });
    expect(user?.id).toBe('u1');
    expect(user?.role).toBe('ADMIN');
  });
});
