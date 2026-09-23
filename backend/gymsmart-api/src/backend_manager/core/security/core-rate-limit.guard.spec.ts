// RESPONSIBILITY: Owns backend core co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { HttpException } from '@nestjs/common';

import { CoreRateLimitGuard } from '@/backend_manager/core/security/core-rate-limit.guard';

describe('CoreRateLimitGuard', () => {
  const reflector = { getAllAndOverride: jest.fn().mockReturnValue(false) };
  const contextStore = { get: jest.fn().mockReturnValue({ requestId: 'r1', traceId: 't1', spanId: 's1' }) };

  it('allows an authenticated GET using the authenticated-read tier', async () => {
    const incr = jest.fn().mockResolvedValue(1);
    const expire = jest.fn().mockResolvedValue(1);
    const guard = new CoreRateLimitGuard(reflector as never, { getClient: () => ({ incr, expire }) } as never, contextStore as never);
    const execution = { switchToHttp: () => ({ getRequest: () => ({ method: 'GET', path: '/api/v1/manager/members', ip: '127.0.0.1' }) }) } as never;

    await expect(guard.canActivate(execution)).resolves.toBe(true);
    expect(incr).toHaveBeenCalledTimes(1);
    expect(expire).toHaveBeenCalledWith(expect.any(String), 60);
  });

  it('throws the canonical rate-limit exception when a tier exceeds its configured limit', async () => {
    const incr = jest.fn().mockResolvedValue(61);
    const guard = new CoreRateLimitGuard(reflector as never, { getClient: () => ({ incr, expire: jest.fn() }) } as never, contextStore as never);
    const execution = { switchToHttp: () => ({ getRequest: () => ({ method: 'POST', path: '/api/v1/manager/members', ip: '127.0.0.1' }) }) } as never;

    await expect(guard.canActivate(execution)).rejects.toBeInstanceOf(HttpException);
  });
});
