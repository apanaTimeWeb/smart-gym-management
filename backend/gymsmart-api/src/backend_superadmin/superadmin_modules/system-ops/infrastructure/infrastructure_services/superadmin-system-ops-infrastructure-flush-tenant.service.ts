// RESPONSIBILITY: Invalidates cache entries scoped to selected tenant IDs only.
// FLOW: Controller -> SuperadminSystemOpsInfrastructureFlushTenantService -> SuperadminCoreRedisService pattern deletion.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';

/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureFlushTenantService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsInfrastructureFlushTenantService {
  constructor(private readonly redis: SuperadminCoreRedisService) {}
/**
 * Primary Intent: Executes the flushTenantCache use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the flushTenantCache use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async flushTenantCache(tenantIds: string[]): Promise<null> {
    const ids = tenantIds.filter((id) => /^[A-Za-z0-9_-]{1,64}$/.test(id));
    if (!ids.length) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'INFRASTRUCTURE.TENANT_IDS.REQUIRED', message: { key: 'infrastructure.ERRORS.BAD_REQUEST' } });
    for (const tenantId of ids) await this.redis.deleteByPattern(`tenant:${tenantId}:*`);
    return null;
  }
}
