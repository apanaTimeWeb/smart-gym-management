// RESPONSIBILITY: Exposes Prometheus-compatible baseline metrics for application health and request volume.
// FLOW: GET /metrics â†’ AdminCoreMetricsController â†’ metric exposition.
import { Controller, Get, Header, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreMetricsService } from '@/backend_admin/admin_core/admin_core_metrics/admin-core-metrics.service.js';

@ApiTags('Observability')
@Controller('metrics')
/**
 * @description Defines the AdminCoreMetricsController boundary for the admin_core_metrics backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMetricsController {
  constructor(private readonly metricsService: AdminCoreMetricsService) {}

  // SLA: FAST
  /** @description Returns Prometheus exposition text for application and job counters. @returns Prometheus text. */
  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  @ApiOperation({ summary: 'Prometheus metrics endpoint' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Prometheus metrics exposition.' })
  metrics(): string {
    return this.metricsService.toPrometheus();
  }
}
