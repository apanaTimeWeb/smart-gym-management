// RESPONSIBILITY: Owns backend core HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, Header } from '@nestjs/common';

import { CorePublicDecorator } from '@/backend_manager/core/auth/core-public.decorator';
import { CoreRawResponse } from '@/backend_manager/core/http/core-raw-response.decorator';
import { CoreMetricsService } from '@/backend_manager/core/observability/core-metrics.service';

@Controller('metrics')
@CorePublicDecorator()
export class CoreMetricsController {
  constructor(private readonly metrics: CoreMetricsService) {}

  // SLA: FAST
  @Get()
  @CoreRawResponse()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  /**
   * @description Exposes Prometheus-compatible HTTP metrics for operational monitoring.
   * @returns Prometheus exposition text.
   */
  metricsEndpoint(): string { return this.metrics.renderPrometheus(); }
}
