// RESPONSIBILITY: Exposes Prometheus metrics from core infrastructure.
// FLOW: Prometheus scrape → /metrics → registry output.


import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CoreRawResponse } from '@/backend_trainer/core/response/core-raw-response.decorator';
import { CoreMetricsService } from '@/backend_trainer/core/observability/core-metrics.service';
import { CorePublic } from '@/backend_trainer/core/security/core-public.decorator';
@CorePublic()
@Controller('metrics')
export class CoreMetricsController {
  constructor(private readonly metrics: CoreMetricsService) {}
  /** Returns metrics in Prometheus exposition format. */
// SLA: STANDARD
  @Get()
  @CoreRawResponse()
  async getMetrics(@Res() response: Response): Promise<void> { response.type('text/plain').send(await this.metrics.registry.metrics()); }
}