// RESPONSIBILITY: Registers Redis as shared framework infrastructure only; no business behavior lives here.
// FLOW: AppModule → RedisInfrastructureModule → RedisService.
import { Global, Module } from '@nestjs/common';

import { RedisService } from '@/core/redis/redis.service';


@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisInfrastructureModule {}
