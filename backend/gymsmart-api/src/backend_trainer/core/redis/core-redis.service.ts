// RESPONSIBILITY: Owns the single Redis infrastructure connection used for rate limits, idempotency, and locks.
// FLOW: Config → IORedis → Redis-backed infrastructure services.


import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { CoreConfigService } from '@/backend_trainer/core/config/core-config.service';
@Injectable()
export class CoreRedisService implements OnModuleDestroy {
  readonly client: Redis;
  constructor(config: CoreConfigService) { this.client = new Redis(config.getRedis()); }
  /** Closes the Redis connection during graceful shutdown. */
  async onModuleDestroy(): Promise<void> { await this.client.quit(); }
}
