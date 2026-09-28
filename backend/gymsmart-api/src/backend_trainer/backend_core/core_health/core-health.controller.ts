// RESPONSIBILITY: Provides liveness, readiness, and protected deep dependency health probes.
// FLOW: Health request → CoreHealthController → master DB/Redis/tenant DB checks.

import { Controller, Get, HttpStatus, ServiceUnavailableException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CorePublic } from '@/backend_trainer/backend_core/core_security/core-public.decorator';
import { CoreRedisService } from '@/backend_trainer/backend_core/core_redis/core-redis.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';


/**
 * Intent: Defines the CoreHealthController boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('health')
@ApiTags('health')
export class CoreHealthController {
  constructor(
    @InjectDataSource('master') private readonly master: DataSource,
    private readonly redis: CoreRedisService,
    private readonly tenants: CoreTenantDatasourceResolver,
  ) {}

  /** Returns a cheap process liveness response without touching external dependencies. */
// SLA: STANDARD
  @Get('live')
  @CorePublic()
  @ApiOperation({ summary: 'Health liveness probe' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Process is alive.' })
  getLive(): { status: string; requestId: string } { return { status: 'ok', requestId: CoreRequestContext.get().requestId }; }

  /** Verifies Redis availability required by authenticated request infrastructure. */
// SLA: STANDARD
  @Get('ready')
  @CorePublic()
  @ApiOperation({ summary: 'Health readiness probe' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Required infrastructure is available.' })
  @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'Required infrastructure is unavailable.' })
  async getReady(): Promise<{ status: string }> {
    try { await this.master.query('SELECT 1'); await this.redis.client.ping(); return { status: 'ok' }; }
    catch { throw new ServiceUnavailableException('CORE.READINESS.UNAVAILABLE'); }
  }

  /** Performs protected deep checks against master infrastructure and the current authorized tenant database. */
// SLA: STANDARD
  @Get('deep')
  @ApiOperation({ summary: 'Deep health dependency probe' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Master DB, Redis, and tenant DB are available.' })
  @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'One or more dependencies are unavailable.' })
  async getDeep(): Promise<{ status: string; dependencies: Record<string, string> }> {
    try {
      await this.master.query('SELECT 1');
      await this.redis.client.ping();
      const tenant = await this.tenants.getDataSource();
      await tenant.query('SELECT 1');
      return { status: 'ok', dependencies: { masterDb: 'ok', redis: 'ok', tenantDb: 'ok' } };
    } catch { throw new ServiceUnavailableException('CORE.DEEP_HEALTH.UNAVAILABLE'); }
  }

  /** Preserves the legacy health path for existing deployment probes. */
// SLA: STANDARD
  @Get()
  @CorePublic()
  @ApiOperation({ summary: 'Legacy health probe' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Required infrastructure is available.' })
  async getHealth(): Promise<{ status: string }> { return this.getReady(); }
}