// RESPONSIBILITY: Exposes Prometheus metrics from core infrastructure.
// FLOW: Prometheus scrape → /metrics → registry output.


import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CoreRawResponse } from '@/backend_trainer/backend_core/core_response/core-raw-response.decorator';
import { CoreMetricsService } from '@/backend_trainer/backend_core/core_observability/core-metrics.service';
import { CorePublic } from '@/backend_trainer/backend_core/core_security/core-public.decorator';

/**
 * Intent: Defines the CoreMetricsController boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@CorePublic()
@Controller('metrics')
@ApiTags('metrics')
export class CoreMetricsController {
  constructor(private readonly metrics: CoreMetricsService) {}
  /** Returns metrics in Prometheus exposition format. */
// SLA: STANDARD
  @Get()
  @CoreRawResponse()
  @ApiOperation({ summary: 'Prometheus metrics endpoint' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Prometheus exposition format.' })
  async getMetrics(@Res() response: Response): Promise<void> { response.type('text/plain').send(await this.metrics.registry.metrics()); }
}