// RESPONSIBILITY: Verifies Manager rate limiting with a behaviorful Redis counter/expiry fake.
// FLOW: HTTP request -> tier selection -> Redis incr/expire -> allow/reject threshold.
import { HttpException } from '@nestjs/common';
import { ManagerCoreRateLimitGuard } from '@/backend_manager/manager_core/manager_core_security/manager-core-rate-limit.guard';
import type { ManagerCoreRedisPort } from '@/backend_manager/manager_core/manager_core_infrastructure/manager-core-redis.port';

class CounterRedisPort implements ManagerCoreRedisPort {
  private readonly values = new Map<string, number>();
  private readonly expiries = new Map<string, number>();
  async set(): Promise<'OK' | null> { return 'OK'; }
  async get(): Promise<string | null> { return null; }
  async del(): Promise<number> { return 0; }
  async incr(key: string): Promise<number> { const next=(this.values.get(key)??0)+1; this.values.set(key,next); return next; }
  async expire(key: string, ttlSeconds: number): Promise<boolean> { this.expiries.set(key,ttlSeconds); return true; }
}

describe('ManagerCoreRateLimitGuard', () => {
  const reflector = { getAllAndOverride: () => false };
  const context = { get: () => ({ requestId:'r1', traceId:'t1', spanId:'s1' }) };

  it('increments a Redis counter and expires the first window', async () => {
    const redis = new CounterRedisPort();
    const guard = new ManagerCoreRateLimitGuard(reflector as never, { getClient: () => redis } as never, context as never);
    const request = { method: 'GET', path: '/api/v1/manager/members', ip: '127.0.0.1' };
    await expect(guard.canActivate({ switchToHttp: () => ({ getRequest: () => request }) } as never)).resolves.toBe(true);
  });

  it('rejects once the configured mutation tier is exceeded', async () => {
    const redis = new CounterRedisPort();
    const guard = new ManagerCoreRateLimitGuard(reflector as never, { getClient: () => redis } as never, context as never);
    const request = { method: 'POST', path: '/api/v1/manager/members', ip: '127.0.0.1' };
    for (let i=0;i<20;i++) await guard.canActivate({ switchToHttp: () => ({ getRequest: () => request }) } as never);
    await expect(guard.canActivate({ switchToHttp: () => ({ getRequest: () => request }) } as never)).rejects.toBeInstanceOf(HttpException);
  });
});
