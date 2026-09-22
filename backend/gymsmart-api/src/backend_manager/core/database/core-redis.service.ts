// @ts-nocheck
// RESPONSIBILITY: Thin Redis infrastructure client for rate limits and idempotency.
// FLOW: Core infrastructure -> Redis connection -> rate-limit/idempotency callers.
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, type RedisClientType } from 'redis';

import { CoreConfigService } from '@/backend_manager/core/config/core-config.service';

@Injectable()
export class CoreRedisService implements OnModuleInit, OnModuleDestroy {
  private readonly client: RedisClientType;
  constructor(private readonly config: CoreConfigService) { this.client = createClient({ url: this.config.redisUrl }); }
  /** @description Connects the shared Redis client once during application bootstrap. @returns Nothing after connection. */
  async onModuleInit(): Promise<void> { await this.client.connect(); }
  /** @description Closes the shared Redis client during graceful shutdown. @returns Nothing after disconnect. */
  async onModuleDestroy(): Promise<void> { if (this.client.isOpen) await this.client.quit(); }
  /** @description Returns the shared Redis client. @returns Connected Redis client. */
  getClient(): RedisClientType { return this.client; }
  /** @description Checks Redis readiness without throwing to health probes. @returns Redis readiness state. */
  async isReady(): Promise<boolean> { return this.client.isReady; }
}
