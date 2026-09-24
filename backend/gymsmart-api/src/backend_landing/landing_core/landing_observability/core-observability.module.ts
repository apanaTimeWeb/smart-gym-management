// RESPONSIBILITY: Registers global observability services and the Prometheus metrics endpoint.
// FLOW: AppModule â†’ CoreObservabilityModule â†’ MetricsController/MetricsService.
import { Global, Module } from '@nestjs/common';

import { MetricsController } from '@/backend_landing/landing_core/landing_observability/metrics.controller';

import { MetricsService } from '@/backend_landing/landing_core/landing_observability/metrics.service';


@Global()
@Module({
  controllers: [MetricsController],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class CoreObservabilityModule {}
