// RESPONSIBILITY: Invalidates cache entries scoped to selected tenant IDs only.
// FLOW: Controller -> InfrastructureFlushTenantService -> RedisService pattern deletion.
import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';

@Injectable()
export class InfrastructureFlushTenantService {
  constructor(private readonly redis: RedisService) {}

  /** Deletes bounded tenant-scoped cache keys and returns no frontend payload. */
  async flushTenantCache(tenantIds: string[]): Promise<null> {
    const ids = tenantIds.filter((id) => /^[A-Za-z0-9_-]{1,64}$/.test(id));
    if (!ids.length) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'INFRASTRUCTURE.TENANT_IDS.REQUIRED', message: { key: 'infrastructure.ERRORS.BAD_REQUEST' } });
    for (const tenantId of ids) await this.redis.deleteByPattern(`tenant:${tenantId}:*`);
    return null;
  }
}