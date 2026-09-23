// RESPONSIBILITY: Returns live Redis telemetry for the Superadmin infrastructure screen.
// FLOW: Controller -> InfrastructureRedisService -> RedisService -> Redis.
import { Injectable } from '@nestjs/common';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';

@Injectable()
export class InfrastructureRedisService {
  constructor(private readonly redis: RedisService) {}

  /** Returns the live Redis operational telemetry contract. */
  async findInfrastructureRedisTelemetry(): Promise<Record<string, number | string>> { return this.redis.getTelemetry(); }
}