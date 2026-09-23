// RESPONSIBILITY: Performs the explicitly requested global Redis cache flush.
// FLOW: Controller -> SuperadminInfrastructureFlushGlobalService -> SuperadminRedisService -> Redis FLUSHDB.
import { Injectable } from '@nestjs/common';
import { SuperadminRedisService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-redis.service';

@Injectable()
export class SuperadminInfrastructureFlushGlobalService {
  constructor(private readonly redis: SuperadminRedisService) {}

  /** Flushes the master Redis cache and returns no payload to the frontend. */
  async flushGlobalCache(): Promise<null> { await this.redis.flushAll(); return null; }
}