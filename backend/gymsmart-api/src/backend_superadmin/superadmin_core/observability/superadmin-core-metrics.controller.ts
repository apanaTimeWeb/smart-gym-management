// RESPONSIBILITY: Exposes Prometheus metrics required by the platform observability contract.
// FLOW: GET /metrics -> SuperadminMetricsService.render -> Prometheus scraper.
import { Controller, Get, Header, HttpStatus } from '@nestjs/common';
import { Public } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-public.decorator';
import { SuperadminMetricsService } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-metrics.service';
import { ApiResponse } from '@nestjs/swagger';
@Controller()
export class SuperadminMetricsController {
  constructor(private readonly metrics: SuperadminMetricsService) {}
  /** Returns Prometheus-compatible metrics. */
  @Public()
  // SLA: FAST
  @Get('/metrics')
  @ApiResponse({ status: HttpStatus.OK, description: 'Prometheus metrics payload.' })
  @Header('Content-Type', 'text/plain; version=0.0.4')
  getMetrics(): string { return this.metrics.render(); }
}