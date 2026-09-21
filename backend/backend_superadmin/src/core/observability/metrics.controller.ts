// RESPONSIBILITY: Exposes Prometheus metrics required by the platform observability contract.
// FLOW: GET /metrics -> MetricsService.render -> Prometheus scraper.
import { Controller, Get, Header } from '@nestjs/common';
import { Public } from '@/core/auth/public.decorator';
import { MetricsService } from '@/core/observability/metrics.service';
@Controller()
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}
  /** Returns Prometheus-compatible metrics. */
  @Public()
  @Get('/metrics')
  @Header('Content-Type', 'text/plain; version=0.0.4')
  getMetrics(): string { return this.metrics.render(); }
}
