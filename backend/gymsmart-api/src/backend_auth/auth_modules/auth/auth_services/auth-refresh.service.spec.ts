// RESPONSIBILITY: Verifies one focused Auth behavior without testing implementation details outside its micro-feature.
// FLOW: Jest -> focused Auth unit -> mocked boundary -> observable behavior assertion.

import { ConfigService } from '@nestjs/config';

import { AuthRefreshReuseDetectedException } from '@/backend_auth/auth_modules/auth/auth.exceptions';
import { AuthRole } from '@/backend_auth/auth_modules/auth/auth.roles.constants';
import { AuthRefreshService } from '@/backend_auth/auth_modules/auth/auth_services/auth-refresh.service';
import { AuthTokenUtils } from '@/backend_auth/auth_modules/auth/auth_utils/auth-token.utils';
const secretConfig = {
  JWT_ACCESS_SECRET: 'access-secret-for-tests',
  JWT_REFRESH_SECRET: 'refresh-secret-for-tests',
  JWT_ACCESS_TTL_SECONDS: 900,
  JWT_REFRESH_TTL_SECONDS: 604800,
};

const config = new ConfigService({ environment: secretConfig });

describe('AuthRefreshService', () => {
  it('rotates the persisted session when the presented refresh token hash matches', async () => {
    const tokenUtils = new AuthTokenUtils({ accessSecret: secretConfig.JWT_ACCESS_SECRET, refreshSecret: secretConfig.JWT_REFRESH_SECRET, accessTtlSeconds: 900, refreshTtlSeconds: 604800 });
    const refreshToken = tokenUtils.createRefreshToken('user-1', 'session-1');
    const tokenHash = tokenUtils.hashRefreshToken(refreshToken);
    const sessionRepository = {
      findSessionByIdForUpdate: jest.fn().mockResolvedValue({ id: 'session-1', userId: 'user-1', refreshTokenHash: tokenHash, expiresAt: new Date(Date.now() + 60_000), revokedAt: null }),
      rotateRefreshSession: jest.fn().mockResolvedValue(undefined),
    };
    const userRepository = {
      findUserByIdOrThrow: jest.fn().mockResolvedValue({ id: 'user-1', name: 'Admin', email: 'admin@example.com', role: AuthRole.ADMIN }),
    };
    const audit = { record: jest.fn().mockResolvedValue(undefined) };
    const revocation = { isRefreshTokenRevoked: jest.fn().mockResolvedValue(false) };
    const service = new AuthRefreshService(sessionRepository as never, userRepository as never, audit as never, revocation as never, config);

    const result = await service.refresh(refreshToken);

    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toEqual(expect.any(String));
    expect(sessionRepository.rotateRefreshSession).toHaveBeenCalledWith('session-1', expect.any(String), expect.any(Date));
    expect(audit.record).toHaveBeenCalledWith(expect.objectContaining({ action: 'AUTH.REFRESH.ROTATED' }));
  });

  it('raises a replay exception when the persisted token hash no longer matches', async () => {
    const tokenUtils = new AuthTokenUtils({ accessSecret: secretConfig.JWT_ACCESS_SECRET, refreshSecret: secretConfig.JWT_REFRESH_SECRET, accessTtlSeconds: 900, refreshTtlSeconds: 604800 });
    const refreshToken = tokenUtils.createRefreshToken('user-1', 'session-1');
    const sessionRepository = {
      findSessionByIdForUpdate: jest.fn().mockResolvedValue({ id: 'session-1', userId: 'user-1', refreshTokenHash: 'rotated-hash', expiresAt: new Date(Date.now() + 60_000), revokedAt: null }),
    };
    const userRepository = { findUserByIdOrThrow: jest.fn() };
    const audit = { record: jest.fn() };
    const revocation = { isRefreshTokenRevoked: jest.fn().mockResolvedValue(false) };
    const service = new AuthRefreshService(sessionRepository as never, userRepository as never, audit as never, revocation as never, config);

    await expect(service.refresh(refreshToken)).rejects.toBeInstanceOf(AuthRefreshReuseDetectedException);
    expect(audit.record).not.toHaveBeenCalled();
  });
});
