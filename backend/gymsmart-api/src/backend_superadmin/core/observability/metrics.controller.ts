// RESPONSIBILITY: Exposes Prometheus metrics required by the platform observability contract.
// FLOW: GET /metrics -> MetricsService.render -> Prometheus scraper.
import { Controller, Get, Header, HttpStatus } from '@nestjs/common';
import { Public } from '@/backend_superadmin/core/auth/public.decorator';
import { MetricsService } from '@/backend_superadmin/core/observability/metrics.service';
import { ApiResponse } from '@nestjs/swagger';
@Controller()
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}
  /** Returns Prometheus-compatible metrics. */
  @Public()
  // SLA: FAST
  @Get('/metrics')
  @ApiResponse({ status: HttpStatus.OK, description: 'Prometheus metrics payload.' })
  @Header('Content-Type', 'text/plain; version=0.0.4')
  getMetrics(): string { return this.metrics.render(); }
}