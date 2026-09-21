// RESPONSIBILITY: Prevents duplicate critical mutations using an atomic Redis reservation followed by cached response replay.
// FLOW: Command controller → CoreIdempotencyService → Redis atomic key → feature service → cached result.

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { CoreRequestContextService } from '@/backend_admin/core/context/core-request-context.service';
import { CoreRedisService } from '@/backend_admin/core/redis/core-redis.service';

@Injectable()
export class CoreIdempotencyService {
  constructor(private readonly redis: CoreRedisService, private readonly context: CoreRequestContextService) {}

  /** @description Returns a prior response or atomically reserves execution for the first request using the same key. @param idempotencyKey Client-provided unique key. @param operation Mutation callback. @returns Cached or newly produced response. @throws ConflictException when another request is actively processing the same key. */
  async executeOnce<T>(idempotencyKey: string | undefined, operation: () => Promise<T>): Promise<T> {
    if (!idempotencyKey) throw new BadRequestException('Idempotency-Key header is required for this mutation.');
    const key = this.key(idempotencyKey);
    const cached = await this.redis.get(key);
    if (cached && cached !== '__IN_FLIGHT__') return JSON.parse(cached) as T;
    const acquired = await this.redis.setIfAbsent(key, '__IN_FLIGHT__', 60);
    if (!acquired) throw new ConflictException('IDEMPOTENCY.REQUEST_IN_PROGRESS');
    try {
      const result = await operation();
      await this.redis.setWithTtl(key, JSON.stringify(result), 24 * 60 * 60);
      return result;
    } catch (error) {
      await this.redis.delete(key);
      throw error;
    }
  }

  /** @description Builds a tenant-isolated Redis idempotency key. @param idempotencyKey Client key. @returns Namespaced key. */
  private key(idempotencyKey: string): string {
    return `idem:${this.context.get().tenantId}:${idempotencyKey}`;
  }
}
