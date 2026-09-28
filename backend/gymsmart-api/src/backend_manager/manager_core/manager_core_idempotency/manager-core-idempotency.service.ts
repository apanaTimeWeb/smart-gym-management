// RESPONSIBILITY: Owns backend core business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { ConflictException, Injectable } from '@nestjs/common';

import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { ManagerCoreRedisService } from '@/backend_manager/manager_core/manager_core_database/manager-core-redis.service';

@Injectable()
export class ManagerCoreIdempotencyService {
  constructor(private readonly redis: ManagerCoreRedisService, private readonly context: ManagerCoreRequestContextService) {}

  /** @description Returns a cached result or atomically reserves a scoped key for first execution. @param key - Client key. @param scope - HTTP method and route scope. @returns Cached JSON or null. @throws ConflictException when another request owns the key. */
  async reserveOrReplay(key: string, scope: string, fingerprint: string): Promise<string | null> {
    const client = this.redis.getClient();
    const cached = await client.get(this.resultKey(key, scope));
    if (cached) {
      const record = JSON.parse(cached) as { fingerprint: string; payload: string };
      if (record.fingerprint !== fingerprint) {
        throw new ConflictException({ errorCode: 'CORE.IDEMPOTENCY.KEY_REUSED', message: 'The Idempotency-Key was already used with a different request.' });
      }
      return record.payload;
    }
    const lock = await client.set(this.lockKey(key, scope), '1', 'EX', 30, 'NX');
    if (!lock) throw new ConflictException({ errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS', message: 'A request with this Idempotency-Key is already processing.' });
    return null;
  }

  /** @description Stores a first response for 24 hours and releases its lock. @param key - Client key. @param scope - HTTP method and route scope. @param payload - Serialized result. @returns Nothing. */
  async store(key: string, scope: string, fingerprint: string, payload: string): Promise<void> {
    const client = this.redis.getClient();
    await client.set(this.resultKey(key, scope), JSON.stringify({ fingerprint, payload }), 'EX', 86_400);
    await client.del(this.lockKey(key, scope));
  }

  /** @description Releases a failed reservation so a safe retry can execute. @param key - Client key. @param scope - HTTP method and route scope. @returns Nothing. */
  async release(key: string, scope: string): Promise<void> {
    await this.redis.getClient().del(this.lockKey(key, scope));
  }

  /** @description Creates the cached result key from trusted tenant, actor, method and route scope. @param key - Client idempotency key. @param scope - HTTP route scope. @returns Redis key. */
  private resultKey(key: string, scope: string): string {
    return `idempotency:${this.scopedScope(scope)}:${key}`;
  }

  /** @description Creates the in-progress reservation key from trusted tenant, actor, method and route scope. @param key - Client idempotency key. @param scope - HTTP route scope. @returns Redis key. */
  private lockKey(key: string, scope: string): string {
    return `idempotency:${this.scopedScope(scope)}:${key}:lock`;
  }

  /** @description Binds idempotency state to the trusted request context to prevent cross-tenant or cross-user key collisions. @param scope - HTTP route scope. @returns Tenant/actor-scoped route scope. */
  private scopedScope(scope: string): string {
    const current = this.context.get();
    return `${current.tenantId ?? 'unknown-tenant'}:${current.actorId ?? 'unknown-actor'}:${scope}`;
  }
}
