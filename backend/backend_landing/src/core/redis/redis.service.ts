// RESPONSIBILITY: Owns the single Redis client used by rate limiting and idempotency infrastructure.
// FLOW: AppModule → RedisInfrastructureModule → RedisService → Redis server.
import { Injectable, OnModuleDestroy } from '@nestjs/common';

import Redis from 'ioredis';


@Injectable()
export class RedisService implements OnModuleDestroy {
  readonly client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
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
