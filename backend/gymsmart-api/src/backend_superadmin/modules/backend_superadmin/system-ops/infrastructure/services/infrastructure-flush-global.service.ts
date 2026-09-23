// RESPONSIBILITY: Performs the explicitly requested global Redis cache flush.
// FLOW: Controller -> InfrastructureFlushGlobalService -> RedisService -> Redis FLUSHDB.
import { Injectable } from '@nestjs/common';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';

@Injectable()
export class InfrastructureFlushGlobalService {
  constructor(private readonly redis: RedisService) {}

  /** Flushes the master Redis cache and returns no payload to the frontend. */
  async flushGlobalCache(): Promise<null> { await this.redis.flushAll(); return null; }
}