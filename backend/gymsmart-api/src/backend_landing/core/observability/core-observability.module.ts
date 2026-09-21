// RESPONSIBILITY: Registers global observability services and the Prometheus metrics endpoint.
// FLOW: AppModule → CoreObservabilityModule → MetricsController/MetricsService.
import { Global, Module } from '@nestjs/common';

import { MetricsController } from '@/backend_landing/core/observability/metrics.controller';

import { MetricsService } from '@/backend_landing/core/observability/metrics.service';


@Global()
@Module({
  controllers: [MetricsController],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class CoreObservabilityModule {}
