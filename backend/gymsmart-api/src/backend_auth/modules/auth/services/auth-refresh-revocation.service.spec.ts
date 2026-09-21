// RESPONSIBILITY: Verifies refresh-token Redis denylist behavior and privacy-preserving key derivation.
// FLOW: Test JWT string -> SHA-256 Redis key -> revoke/check operations.

import { AuthRefreshRevocationService } from '@/backend_auth/modules/auth/services/auth-refresh-revocation.service';

describe('AuthRefreshRevocationService', () => {
  it('writes a hashed denylist key with the configured TTL', async () => {
    const redis = { set: jest.fn().mockResolvedValue('OK'), get: jest.fn() };
    const config = { getOrThrow: jest.fn().mockReturnValue(604800) };
    const logger = { warn: jest.fn() };
    const service = new AuthRefreshRevocationService(redis as never, config as never, logger as never);

    await service.revokeRefreshToken('refresh-token-example');

    expect(redis.set).toHaveBeenCalledTimes(1);
    const [key, value, ttl] = redis.set.mock.calls[0];
    expect(key).toMatch(/^auth:refresh-revoked:[0-9a-f]{64}$/);
    expect(value).toBe('1');
    expect(ttl).toBe(604800);
  });

  it('reports denylist membership from Redis', async () => {
    const redis = { set: jest.fn(), get: jest.fn().mockResolvedValue('1') };
    const config = { getOrThrow: jest.fn().mockReturnValue(604800) };
    const logger = { warn: jest.fn() };
    const service = new AuthRefreshRevocationService(redis as never, config as never, logger as never);

    await expect(service.isRefreshTokenRevoked('refresh-token-example')).resolves.toBe(true);
    expect(redis.get).toHaveBeenCalledWith(expect.stringMatching(/^auth:refresh-revoked:[0-9a-f]{64}$/));
  });
});
