// RESPONSIBILITY: Owns backend core HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, Header } from '@nestjs/common';

import { ManagerCorePublicDecorator } from '@/backend_manager/manager_core/manager_core_auth/manager-core-public.decorator';
import { ManagerCoreRawResponse } from '@/backend_manager/manager_core/manager_core_http/manager-core-raw-response.decorator';
import { ManagerCoreMetricsService } from '@/backend_manager/manager_core/manager_core_observability/manager-core-metrics.service';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('metrics')
@ManagerCorePublicDecorator()
export class ManagerCoreMetricsController {
  constructor(private readonly metrics: ManagerCoreMetricsService) {}

  // SLA: FAST
  @Get()
  @ManagerCoreRawResponse()
  @ApiOperation({ summary: 'Prometheus metrics endpoint' })
  @ApiResponse({ status: 200, description: 'Prometheus exposition format.' })
  @Header('Content-Type', 'text/plain; version=0.0.4')
  /**
   * @description Exposes Prometheus-compatible HTTP metrics for operational monitoring.
   * @returns Prometheus exposition text.
   */
  metricsEndpoint(): string { return this.metrics.renderPrometheus(); }
}
