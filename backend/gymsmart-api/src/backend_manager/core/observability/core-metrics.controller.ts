// RESPONSIBILITY: Public Prometheus metrics scrape endpoint.
// FLOW: GET /api/metrics → CoreMetricsService.renderPrometheus().
import { Controller, Get, Header } from '@nestjs/common';

import { CoreMetricsService } from '@/core/observability/core-metrics.service';
import { CorePublicDecorator } from '@/core/auth/core-public.decorator';

@Controller('metrics')
@CorePublicDecorator()
export class CoreMetricsController {
  constructor(private readonly metrics: CoreMetricsService) {}

  // SLA: FAST
  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  /**
   * @description Exposes Prometheus-compatible HTTP metrics for operational monitoring.
   * @returns Prometheus exposition text.
   */
  metricsEndpoint(): string { return this.metrics.renderPrometheus(); }
}
