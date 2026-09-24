// RESPONSIBILITY: Registers durable and cached idempotency infrastructure for critical mutation protection.
// FLOW: AppModule â†’ IdempotencyModule â†’ IdempotencyService + CoreIdempotencyRepository.
import { Global, Module } from '@nestjs/common';

import { CoreIdempotencyRepository } from '@/backend_landing/landing_core/landing_idempotency/idempotency.repository';
import { IdempotencyService } from '@/backend_landing/landing_core/landing_idempotency/idempotency.service';
import { RedisService } from '@/backend_landing/landing_core/landing_redis/redis.service';

@Global()
@Module({
  providers: [CoreIdempotencyRepository, IdempotencyService, RedisService],
  exports: [CoreIdempotencyRepository, IdempotencyService],
})
export class IdempotencyModule {}
