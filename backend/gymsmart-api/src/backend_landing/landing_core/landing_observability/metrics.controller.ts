// RESPONSIBILITY: Exposes Prometheus-formatted application metrics for monitoring systems.
// FLOW: Prometheus scrape â†’ MetricsController â†’ MetricsService.
import { Controller, Get, Header } from '@nestjs/common';

import { MetricsService } from '@/backend_landing/landing_core/landing_observability/metrics.service';

import { SkipResponseEnvelope } from '@/backend_landing/landing_core/http/skip-response-envelope.decorator';


@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  // SLA: FAST
  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  @SkipResponseEnvelope()
  async getMetrics(): Promise<string> {
    return this.metricsService.metrics();
  }
}
