// RESPONSIBILITY: Registers Redis as shared framework infrastructure only; no business behavior lives here.
// FLOW: AppModule â†’ RedisInfrastructureModule â†’ RedisService.
import { Global, Module } from '@nestjs/common';

import { RedisService } from '@/backend_landing/landing_core/landing_redis/redis.service';


@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisInfrastructureModule {}
