// RESPONSIBILITY: Exposes Prometheus-formatted application metrics for monitoring systems.
// FLOW: Prometheus scrape → MetricsController → MetricsService.
import { Controller, Get, Header } from '@nestjs/common';
import { MetricsService } from '@/core/observability/metrics.service';
import { SkipResponseEnvelope } from '@/core/http/skip-response-envelope.decorator';

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
