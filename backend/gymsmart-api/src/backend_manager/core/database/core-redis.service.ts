// RESPONSIBILITY: Owns backend core business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable, OnModuleDestroy } from '@nestjs/common';

import Redis from 'ioredis';

import { CoreConfigService } from '@/backend_manager/core/config/core-config.service';

@Injectable()
export class CoreRedisService implements OnModuleDestroy {
  private readonly client: Redis;
  constructor(private readonly config: CoreConfigService) { 
    this.client = new Redis(this.config.redisUrl);
  }
  /** @description Closes the shared Redis client during graceful shutdown. @returns Nothing after disconnect. */
  async onModuleDestroy(): Promise<void> { await this.client.quit(); }
  /** @description Returns the shared Redis client. @returns Connected Redis client. */
  getClient(): Redis { return this.client; }
  /** @description Checks Redis readiness without throwing to health probes. @returns Redis readiness state. */
  async isReady(): Promise<boolean> { return this.client.status === 'ready'; }
}
