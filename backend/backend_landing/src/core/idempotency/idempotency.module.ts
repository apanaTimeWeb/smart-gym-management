// RESPONSIBILITY: Registers durable and cached idempotency infrastructure for critical mutation protection.
// FLOW: AppModule → IdempotencyModule → IdempotencyService + CoreIdempotencyRepository.
import { Global, Module } from '@nestjs/common';

import { CoreIdempotencyRepository } from '@/core/idempotency/idempotency.repository';

import { IdempotencyService } from '@/core/idempotency/idempotency.service';


@Global()
@Module({
  providers: [CoreIdempotencyRepository, IdempotencyService],
  exports: [CoreIdempotencyRepository, IdempotencyService],
})
export class IdempotencyModule {}
