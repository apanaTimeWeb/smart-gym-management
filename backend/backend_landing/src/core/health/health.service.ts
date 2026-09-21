// RESPONSIBILITY: Checks process, master PostgreSQL, Redis, and configured tenant dependency health.
// FLOW: HealthController → HealthService → master DB/Redis/tenant DataSource.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RedisService } from '@/core/redis/redis.service';
import { TenantContextService } from '@/core/tenant/tenant-context.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly masterDataSource: DataSource,
    private readonly redis: RedisService,
    private readonly tenantContext: TenantContextService,
  ) {}

  /** @description Reports process liveness without touching dependencies. @returns Liveness status. */
  checkLive(): { status: 'ok' } {
    return { status: 'ok' };
  }

  /** @description Verifies master PostgreSQL and Redis readiness. @returns Readiness status. */
  async checkReady(): Promise<{ status: 'ok'; postgres: 'up'; redis: 'up' }> {
    await this.masterDataSource.query('SELECT 1');
    await this.redis.ping();
    return { status: 'ok', postgres: 'up', redis: 'up' };
  }

  /** @description Verifies master dependencies and the configured tenant database. @returns Deep dependency status. */
  async checkDeep(): Promise<{ status: 'ok'; postgres: 'up'; redis: 'up'; tenantDatabase: 'up' }> {
    await this.checkReady();
    const tenantDataSource = await this.tenantContext.resolveTenantDataSource();
    await tenantDataSource.query('SELECT 1');
    return { status: 'ok', postgres: 'up', redis: 'up', tenantDatabase: 'up' };
  }
}
