// RESPONSIBILITY: Exposes the real Prometheus metrics registry as plain text without an API JSON envelope.
// FLOW: Prometheus scraper -> CoreMetricsController -> CoreMetricsService -> registry text.

import { Controller, Get, Header, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreSla, CoreSlaCategory } from '@/backend_auth/auth_core/http/core-sla.decorator';
import { CoreMetricsService } from '@/backend_auth/auth_core/metrics/core-metrics.service';
import { CoreRateLimit } from '@/backend_auth/auth_core/auth_rate_limit/core-rate-limit.decorator';
import { CoreRateLimitTier } from '@/backend_auth/auth_core/auth_rate_limit/core-rate-limit.constants';
import { CorePublic } from '@/backend_auth/auth_core/auth_security/core-public.decorator';

import type { Response } from 'express';
@ApiTags('Observability')
@Controller('metrics')
export class CoreMetricsController {
  constructor(private readonly metricsService: CoreMetricsService) {}

  @Get()
  @ApiOperation({ summary: 'Expose Prometheus metrics.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Prometheus metrics exposition text.' })
  @CorePublic()
  @CoreRateLimit(CoreRateLimitTier.METRICS)
  @Header('Cache-Control', 'no-store')
  @CoreSla(CoreSlaCategory.FAST)
  // SLA: FAST
  async getMetrics(@Res() response: Response): Promise<void> {
    response.type('text/plain').send(await this.metricsService.metrics());
  }
}
