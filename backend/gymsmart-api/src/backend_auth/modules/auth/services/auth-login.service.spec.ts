// RESPONSIBILITY: Verifies one focused Auth behavior without testing implementation details outside its micro-feature.
// FLOW: Jest -> focused Auth unit -> mocked boundary -> observable behavior assertion.

import { ConfigService } from '@nestjs/config';

import { AuthRole } from '@/backend_auth/modules/auth/auth.roles.constants';
import { AuthLoginService } from '@/backend_auth/modules/auth/services/auth-login.service';
import { AuthPasswordUtils } from '@/backend_auth/modules/auth/utils/auth-password.utils';
const config = new ConfigService({
  environment: {
    JWT_ACCESS_SECRET: 'access-secret-for-tests',
    JWT_REFRESH_SECRET: 'refresh-secret-for-tests',
    JWT_ACCESS_TTL_SECONDS: 900,
    JWT_REFRESH_TTL_SECONDS: 604800,
    AUTH_LOCKOUT_MAX_ATTEMPTS: 5,
    AUTH_LOCKOUT_WINDOW_SECONDS: 900,
  },
});

describe('AuthLoginService', () => {
  it('creates a persisted refresh session after valid credentials', async () => {
    const passwordHash = await AuthPasswordUtils.hash('Secret123');
    const userRepository = {
      findCredentialsByEmail: jest.fn().mockResolvedValue({
        id: 'user-1',
        name: 'Super Admin',
        email: 'superadmin@example.com',
        passwordHash,
        role: AuthRole.SUPERADMIN,
      }),
    };
    const sessionRepository = { createRefreshSession: jest.fn().mockResolvedValue({}) };
    const redis = { get: jest.fn().mockResolvedValue(null), delete: jest.fn().mockResolvedValue(0) };
    const audit = {
      record: jest.fn().mockResolvedValue(undefined),
      getRequestMetadata: jest.fn().mockReturnValue({ ipAddress: '127.0.0.1' }),
    };
    const service = new AuthLoginService(userRepository as never, sessionRepository as never, redis as never, audit as never, config);

    const result = await service.login('SUPERADMIN@example.com', 'Secret123');

    expect(result.user.email).toBe('superadmin@example.com');
    expect(result.user.role).toBe(AuthRole.SUPERADMIN);
    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toEqual(expect.any(String));
    expect(sessionRepository.createRefreshSession).toHaveBeenCalledWith(
      'user-1',
      expect.any(String),
      expect.any(String),
      expect.any(Date),
    );
    expect(audit.record).toHaveBeenCalledWith(expect.objectContaining({ action: 'AUTH.LOGIN.SUCCESS' }));
  });

  it('locks the account after the fifth failed attempt', async () => {
    const userRepository = { findCredentialsByEmail: jest.fn().mockResolvedValue(null) };
    const sessionRepository = { createRefreshSession: jest.fn() };
    const redis = {
      get: jest.fn().mockResolvedValue(null),
      incrementWithExpiry: jest.fn().mockResolvedValue(5),
      set: jest.fn().mockResolvedValue('OK'),
      delete: jest.fn().mockResolvedValue(0),
    };
    const audit = {
      record: jest.fn(),
      getRequestMetadata: jest.fn().mockReturnValue({ ipAddress: null }),
    };
    const service = new AuthLoginService(userRepository as never, sessionRepository as never, redis as never, audit as never, config);

    await expect(service.login('locked@example.com', 'wrong')).rejects.toMatchObject({ errorCode: 'AUTH.ACCOUNT.LOCKED' });
    expect(redis.set).toHaveBeenCalledWith(expect.stringContaining('auth:lockout:'), '1', 900);
  });
});
