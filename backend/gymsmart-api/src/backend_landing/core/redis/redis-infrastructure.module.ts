// RESPONSIBILITY: Registers Redis as shared framework infrastructure only; no business behavior lives here.
// FLOW: AppModule → RedisInfrastructureModule → RedisService.
import { Global, Module } from '@nestjs/common';

import { RedisService } from '@/backend_landing/core/redis/redis.service';


@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisInfrastructureModule {}
