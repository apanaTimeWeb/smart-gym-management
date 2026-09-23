// RESPONSIBILITY: Invalidates cache entries scoped to selected tenant IDs only.
// FLOW: Controller -> SuperadminInfrastructureFlushTenantService -> SuperadminRedisService pattern deletion.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminRedisService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-redis.service';

@Injectable()
export class SuperadminInfrastructureFlushTenantService {
  constructor(private readonly redis: SuperadminRedisService) {}

  /** Deletes bounded tenant-scoped cache keys and returns no frontend payload. */
  async flushTenantCache(tenantIds: string[]): Promise<null> {
    const ids = tenantIds.filter((id) => /^[A-Za-z0-9_-]{1,64}$/.test(id));
    if (!ids.length) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'INFRASTRUCTURE.TENANT_IDS.REQUIRED', message: { key: 'infrastructure.ERRORS.BAD_REQUEST' } });
    for (const tenantId of ids) await this.redis.deleteByPattern(`tenant:${tenantId}:*`);
    return null;
  }
}