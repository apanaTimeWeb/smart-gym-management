// RESPONSIBILITY: Returns live Redis telemetry for the Superadmin infrastructure screen.
// FLOW: Controller -> SuperadminInfrastructureRedisService -> SuperadminRedisService -> Redis.
import { Injectable } from '@nestjs/common';
import { SuperadminRedisService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-redis.service';

@Injectable()
export class SuperadminInfrastructureRedisService {
  constructor(private readonly redis: SuperadminRedisService) {}

  /** Returns the live Redis operational telemetry contract. */
  async findInfrastructureRedisTelemetry(): Promise<Record<string, number | string>> { return this.redis.getTelemetry(); }
}