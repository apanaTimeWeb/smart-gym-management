// RESPONSIBILITY: Registers liveness, readiness, and protected deep dependency health checks.
// FLOW: HTTP health request → HealthController → health service checks.
import { Global, Module } from '@nestjs/common';

import { HealthController } from '@/backend_landing/core/health/health.controller';

import { HealthService } from '@/backend_landing/core/health/health.service';


@Global()
@Module({
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class CoreHealthModule {}
