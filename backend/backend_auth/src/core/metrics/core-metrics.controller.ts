// RESPONSIBILITY: Exposes the real Prometheus metrics registry as plain text without an API JSON envelope.
// FLOW: Prometheus scraper -> CoreMetricsController -> CoreMetricsService -> registry text.

import { Controller, Get, Header, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreSla, CoreSlaCategory } from '@/core/http/core-sla.decorator';
import { CoreMetricsService } from '@/core/metrics/core-metrics.service';
import { CorePublic } from '@/core/security/core-public.decorator';

import type { Response } from 'express';
@ApiTags('Observability')
@Controller('metrics')
export class CoreMetricsController {
  constructor(private readonly metricsService: CoreMetricsService) {}

  @Get()
  @ApiOperation({ summary: 'Expose Prometheus metrics.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Prometheus metrics exposition text.' })
  @CorePublic()
  @Header('Cache-Control', 'no-store')
  @CoreSla(CoreSlaCategory.FAST)
  // SLA: FAST
  async getMetrics(@Res() response: Response): Promise<void> {
    response.type('text/plain').send(await this.metricsService.metrics());
  }
}
