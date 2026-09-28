// RESPONSIBILITY: Verifies idempotency reserve, replay, and release behavior against a behaviorful Redis port fake.
// FLOW: Typed Redis port fake -> idempotency service -> reserve/replay/release -> observable stored state.
import { ConflictException } from '@nestjs/common';

import { ManagerCoreIdempotencyService } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-idempotency.service';
import type { ManagerCoreRedisPort } from '@/backend_manager/manager_core/manager_core_infrastructure/manager-core-redis.port';

class InMemoryRedisPort implements ManagerCoreRedisPort {
  private readonly values = new Map<string, string>();
  async set(key: string, value: string, _mode?: 'EX', _ttlSeconds?: number, condition?: 'NX'): Promise<'OK' | null> {
    if (condition === 'NX' && this.values.has(key)) return null;
    this.values.set(key, value); return 'OK';
  }
  async get(key: string): Promise<string | null> { return this.values.get(key) ?? null; }
  async del(key: string): Promise<number> { return this.values.delete(key) ? 1 : 0; }
  async incr(key: string): Promise<number> { const value = Number(this.values.get(key) ?? '0') + 1; this.values.set(key, String(value)); return value; }
  async expire(_key: string, _ttlSeconds: number): Promise<boolean> { return true; }
}

describe('ManagerCoreIdempotencyService', () => {
  it('reserves once, stores a result, replays it, and releases the reservation', async () => {
    const redis = new InMemoryRedisPort();
    const context = { get: () => ({ tenantId: 'tenant-a', actorId: 'actor-a', requestId: 'r1', traceId: 't1', spanId: 's1' }) };
    const service = new ManagerCoreIdempotencyService({ getClient: () => redis } as never, context as never);
    expect(await service.reserveOrReplay('same-key', 'POST /manager/members', 'fp')).toBeNull();
    await service.store('same-key', 'POST /manager/members', 'fp', '{"ok":true}');
    expect(await service.reserveOrReplay('same-key', 'POST /manager/members', 'fp')).toBe('{"ok":true}');
    await service.release('other-key', 'POST /manager/members');
  });

  it('rejects reuse of the same key with a different request fingerprint', async () => {
    const redis = new InMemoryRedisPort();
    const context = { get: () => ({ tenantId: 'tenant-a', actorId: 'actor-a', requestId: 'r1', traceId: 't1', spanId: 's1' }) };
    const service = new ManagerCoreIdempotencyService({ getClient: () => redis } as never, context as never);

    await service.reserveOrReplay('same-key', 'POST /manager/members', 'fingerprint-a');
    await service.store('same-key', 'POST /manager/members', 'fingerprint-a', '{"ok":true}');

    await expect(service.reserveOrReplay('same-key', 'POST /manager/members', 'fingerprint-b')).rejects.toBeInstanceOf(ConflictException);
  });
});
