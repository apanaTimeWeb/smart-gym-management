// RESPONSIBILITY: Provides the complete Manager Redis command boundary without leaking a provider-specific client into business modules.
// FLOW: Feature core service -> provider-neutral Redis port -> Redis command -> typed primitive result.
import { Inject, Injectable, Optional } from '@nestjs/common';

import { MANAGER_CORE_REDIS_PORT, ManagerCoreRedisPort } from '@/backend_manager/manager_core/manager_core_infrastructure/manager-core-redis.port';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';

@Injectable()
export class ManagerCoreRedisService {
  constructor(@Optional() @Inject(MANAGER_CORE_REDIS_PORT) private readonly redis?: ManagerCoreRedisPort) {}

  /** Returns the provider-neutral Redis command surface available to Manager infrastructure. */
  getClient(): ManagerCoreRedisPort {
    if (!this.redis) throw new ManagerCoreContextException('Global Redis adapter is not registered.', 'CORE.REDIS.MISSING');
    return this.redis;
  }

  /** Performs a health check against Redis. */
  async isReady(): Promise<boolean> {
    try { if (!this.redis) return false; await this.redis.get('__manager_healthcheck__'); return true; }
    catch { return false; }
  }
}
