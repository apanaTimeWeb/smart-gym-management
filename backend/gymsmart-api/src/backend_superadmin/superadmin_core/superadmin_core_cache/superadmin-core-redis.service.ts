// RESPONSIBILITY: Owns infrastructure-level Redis access, bounded administrative cache primitives, and Redis telemetry.
// FLOW: Core service -> SuperadminCoreRedisService -> Redis/ioredis-mock -> infrastructure state.
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import RedisMock from 'ioredis-mock';

/**
 * Primary Intent: Defines SuperadminCoreRedisService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreRedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(config: ConfigService) {
    const url = config.getOrThrow<string>('app.redisUrl');
    console.log(`[${Date.now()}] SuperadminCoreRedisService INIT url: ${url}`);
    this.client = (url === 'mock' || url === 'redis://mock')
      ? new RedisMock() as unknown as Redis
      : new Redis(url, { maxRetriesPerRequest: 2, enableOfflineQueue: false });
    this.client.on('connect', () => console.log(`[${Date.now()}] SuperadminCoreRedisService CONNECTED`));
    this.client.on('ready', () => console.log(`[${Date.now()}] SuperadminCoreRedisService READY`));
    this.client.on('error', (err) => console.log(`[${Date.now()}] SuperadminCoreRedisService ERROR:`, err));
  }

  /**
 * Primary Intent: Executes the `increment` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the increment use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async increment(key: string, ttlSeconds: number): Promise<number> {
    console.log(`[${Date.now()}] REDIS INCR START key=${key}`);
    const t0 = Date.now();
    const count = await this.client.incr(key);
    console.log(`[${Date.now()}] REDIS INCR DONE count=${count} (took ${Date.now() - t0}ms)`);
    if (count === 1) await this.client.expire(key, ttlSeconds);
    return count;
  }

  /**
 * Primary Intent: Executes the `set` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the set use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async set(key: string, value: string, ttlSeconds: number, onlyIfAbsent = false): Promise<boolean> {
    const result = onlyIfAbsent ? await this.client.set(key, value, 'EX', ttlSeconds, 'NX') : await this.client.set(key, value, 'EX', ttlSeconds);
    return result === 'OK';
  }

  /**
 * Primary Intent: Executes the `get` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the get use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async get(key: string): Promise<string | null> { return this.client.get(key); }

  /**
 * Primary Intent: Executes the `delete` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the delete use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async delete(...keys: string[]): Promise<void> { if (keys.length) await this.client.del(...keys); }

  /**
 * Primary Intent: Executes the `deleteByPattern` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the deleteByPattern use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteByPattern(pattern: string): Promise<number> {
    let cursor = '0';
    let deleted = 0;
    do {
      const [next, keys] = await this.client.scan(cursor, 'MATCH', pattern, 'COUNT', 250);
      cursor = next;
      if (keys.length) deleted += await this.client.del(...keys);
    } while (cursor !== '0');
    return deleted;
  }

  /**
 * Primary Intent: Executes the `flushAll` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the flushAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async flushAll(): Promise<void> { await this.client.flushdb(); }

  /**
 * Primary Intent: Executes the `getTelemetry` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the getTelemetry use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async getTelemetry(): Promise<Record<string, number | string>> {
    const info = await this.client.info();
    const readInfo = (name: string): number => Number(info.match(new RegExp(`^${name}:(\\d+)$`, 'm'))?.[1] ?? 0);
    const usedMemory = readInfo('used_memory');
    const maxMemory = readInfo('maxmemory');
    const hits = readInfo('keyspace_hits');
    const misses = readInfo('keyspace_misses');
    const totalKeys = Number(await this.client.dbsize());
    const uptimeSeconds = readInfo('uptime_in_seconds');
    const memoryUsagePercent = maxMemory > 0 ? Number(((usedMemory / maxMemory) * 100).toFixed(2)) : 0;
    const hitRatioPercent = hits + misses > 0 ? Number(((hits / (hits + misses)) * 100).toFixed(2)) : 0;
    return { memoryUsagePercent, hitRatioPercent, totalKeysCached: totalKeys, uptimeHours: Number((uptimeSeconds / 3600).toFixed(2)), status: 'CONNECTED' };
  }

  /**
 * Primary Intent: Executes the `ping` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the ping use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async ping(): Promise<string> { return this.client.ping(); }

  /**
 * Primary Intent: Executes the `info` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the info use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async info(): Promise<string> { return this.client.info(); }

  /**
 * Primary Intent: Executes the `onModuleDestroy` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the onModuleDestroy use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async onModuleDestroy(): Promise<void> { await this.client.quit(); }

  /**
 * Primary Intent: Executes the `getClient` responsibility owned by this superadmin-core-redis.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the getClient use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  getClient(): Redis { return this.client; }
}
