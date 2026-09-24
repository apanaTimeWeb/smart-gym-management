// RESPONSIBILITY: Owns the single Redis client used by rate limiting and idempotency infrastructure.
// FLOW: AppModule â†’ RedisInfrastructureModule â†’ RedisService â†’ Redis server.
import { Injectable, OnModuleDestroy } from '@nestjs/common';

import Redis from 'ioredis';
import RedisMock from 'ioredis-mock';

@Injectable()
export class RedisService implements OnModuleDestroy {
  readonly client: Redis;

  constructor() {
    const url = process.env.REDIS_URL ?? 'redis://localhost:6379';
    this.client = url === 'redis://mock' ? new RedisMock() as any as Redis : new Redis(url, {
      connectTimeout: Number(process.env.REDIS_CONNECT_TIMEOUT_MS ?? 10000),
      maxRetriesPerRequest: 2,
    });
  }

  /** @description Checks Redis reachability. @returns Redis PONG response. */
  async ping(): Promise<string> {
    return this.client.ping();
  }

  /** @description Closes Redis gracefully during application shutdown. @returns Resolves after the client closes. */
  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }
}
