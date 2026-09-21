// RESPONSIBILITY: Exposes Prometheus-compatible baseline metrics for application health and request volume.
// FLOW: GET /metrics â†’ CoreMetricsController â†’ metric exposition.

import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Observability')
@Controller('metrics')
export class CoreMetricsController {
  private requestCount = 0;

  /** @description Returns the current application metrics in Prometheus exposition format. @returns Prometheus text. */
  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  @ApiOperation({ summary: 'Prometheus metrics endpoint' })
  metrics(): string {
    return ['# HELP app_up Application liveness indicator', '# TYPE app_up gauge', 'app_up 1', '# HELP app_requests_total HTTP request count', '# TYPE app_requests_total counter', `app_requests_total ${this.requestCount}`].join('\n');
  }
}
