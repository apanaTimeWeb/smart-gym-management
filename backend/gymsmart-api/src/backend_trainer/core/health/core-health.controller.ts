// RESPONSIBILITY: Provides liveness, readiness, and protected deep dependency health probes.
// FLOW: Health request → CoreHealthController → master DB/Redis/tenant DB checks.

import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CorePublic } from '@/backend_trainer/core/security/core-public.decorator';
import { CoreRedisService } from '@/backend_trainer/core/redis/core-redis.service';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';

@Controller('health')
export class CoreHealthController {
  constructor(
    @InjectDataSource('master') private readonly master: DataSource,
    private readonly redis: CoreRedisService,
    private readonly tenants: CoreTenantDataSourceResolver,
  ) {}

  /** Returns a cheap process liveness response without touching external dependencies. */
// SLA: STANDARD
  @Get('live')
  @CorePublic()
  getLive(): { status: string; requestId: string } { return { status: 'ok', requestId: CoreRequestContext.get().requestId }; }

  /** Verifies Redis availability required by authenticated request infrastructure. */
// SLA: STANDARD
  @Get('ready')
  @CorePublic()
  async getReady(): Promise<{ status: string }> {
    try { await this.master.query('SELECT 1'); await this.redis.client.ping(); return { status: 'ok' }; }
    catch { throw new ServiceUnavailableException('CORE.READINESS.UNAVAILABLE'); }
  }

  /** Performs protected deep checks against master infrastructure and the current authorized tenant database. */
// SLA: STANDARD
  @Get('deep')
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
  async getHealth(): Promise<{ status: string }> { return this.getReady(); }
}