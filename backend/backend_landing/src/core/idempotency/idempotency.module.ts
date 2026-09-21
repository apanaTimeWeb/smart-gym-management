// RESPONSIBILITY: Registers the shared idempotency service.
// FLOW: AppModule → IdempotencyModule → IdempotencyService.
import { Global, Module } from '@nestjs/common';
import { IdempotencyService } from '@/core/idempotency/idempotency.service';

@Global()
@Module({
  providers: [IdempotencyService],
  exports: [IdempotencyService],
})
export class IdempotencyModule {}
