// RESPONSIBILITY: Owns infrastructure-level Redis access, bounded administrative cache primitives, and Redis telemetry.
// FLOW: Core service -> SuperadminRedisService -> Redis/ioredis-mock -> infrastructure state.
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import RedisMock from 'ioredis-mock';

@Injectable()
export class SuperadminRedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(config: ConfigService) {
    const url = config.getOrThrow<string>('app.redisUrl');
    this.client = (url === 'mock' || url === 'redis://mock')
      ? new RedisMock() as unknown as Redis
      : new Redis(url, { maxRetriesPerRequest: 2, enableOfflineQueue: false });
  }

  /** Atomically increments a counter and assigns a TTL to the first increment. */
  async increment(key: string, ttlSeconds: number): Promise<number> {
    const count = await this.client.incr(key);
    if (count === 1) await this.client.expire(key, ttlSeconds);
    return count;
  }

  /** Stores a string value with a TTL, optionally only when the key does not already exist. */
  async set(key: string, value: string, ttlSeconds: number, onlyIfAbsent = false): Promise<boolean> {
    const result = onlyIfAbsent ? await this.client.set(key, value, 'EX', ttlSeconds, 'NX') : await this.client.set(key, value, 'EX', ttlSeconds);
    return result === 'OK';
  }

  /** Gets a Redis value or null. */
  async get(key: string): Promise<string | null> { return this.client.get(key); }

  /** Deletes one or more Redis keys. */
  async delete(...keys: string[]): Promise<void> { if (keys.length) await this.client.del(...keys); }

  /** Deletes every key matching a bounded administrative pattern. */
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

  /** Flushes the Redis keyspace for a global administrative cache reset. */
  async flushAll(): Promise<void> { await this.client.flushdb(); }

  /** Returns compact Redis telemetry for Superadmin operational diagnostics. */
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

  /** Pings Redis for readiness checks. */
  async ping(): Promise<string> { return this.client.ping(); }

  /** Returns basic Redis server information for internal health diagnostics. */
  async info(): Promise<string> { return this.client.info(); }

  /** Closes the Redis connection during graceful application shutdown. */
  async onModuleDestroy(): Promise<void> { await this.client.quit(); }

  /** Returns the raw client only to core infrastructure consumers that explicitly require it. */
  getClient(): Redis { return this.client; }
}