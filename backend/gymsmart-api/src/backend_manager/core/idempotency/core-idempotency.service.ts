// RESPONSIBILITY: Redis-backed idempotency reservation and response replay keyed by route scope.
// FLOW: HTTP mutation -> Idempotency-Key + route scope -> shared Redis reservation/replay -> mutation -> response cache.
import { ConflictException, Injectable } from '@nestjs/common';

import { CoreRedisService } from '@/backend_manager/core/database/core-redis.service';

@Injectable()
export class CoreIdempotencyService {
  constructor(private readonly redis: CoreRedisService) {}

  /** @description Returns a cached result or atomically reserves a scoped key for first execution. @param key - Client key. @param scope - HTTP method and route scope. @returns Cached JSON or null. @throws ConflictException when another request owns the key. */
  async reserveOrReplay(key: string, scope: string): Promise<string | null> {
    const client = this.redis.getClient();
    const cached = await client.get(this.resultKey(key, scope));
    if (cached) return cached;
    const lock = await client.set(this.lockKey(key, scope), '1', 'EX', 30, 'NX');
    if (!lock) throw new ConflictException({ errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS', message: 'A request with this Idempotency-Key is already processing.' });
    return null;
  }

  /** @description Stores a first response for 24 hours and releases its lock. @param key - Client key. @param scope - Route scope. @param payload - Serialized result. @returns Nothing. */
  async store(key: string, scope: string, payload: string): Promise<void> {
    const client = this.redis.getClient();
    await client.set(this.resultKey(key, scope), payload, 'EX', 86_400);
    await client.del(this.lockKey(key, scope));
  }

  /** @description Releases a failed reservation so a safe retry can execute. @param key - Client key. @param scope - Route scope. @returns Nothing. */
  async release(key: string, scope: string): Promise<void> { await this.redis.getClient().del(this.lockKey(key, scope)); }

  /** @description Creates the replay key. @param key - Client key. @param scope - Route scope. @returns Redis key. */
  private resultKey(key: string, scope: string): string { return `idempotency:${scope}:${key}`; }
  /** @description Creates the in-progress reservation key. @param key - Client key. @param scope - Route scope. @returns Redis key. */
  private lockKey(key: string, scope: string): string { return `idempotency:${scope}:${key}:lock`; }
}
