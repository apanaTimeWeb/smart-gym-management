// RESPONSIBILITY: Owns master-database tenant membership queries used by the tenant authorization boundary.
// FLOW: SuperadminCoreTenantAuthorizationService -> SuperadminCoreTenantAuthorizationRepository -> master PostgreSQL -> authorized tenant result.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminCoreTenantAuthorizationRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreTenantAuthorizationRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
 * Primary Intent: Executes the hasAuthorizedSuperadminMembership use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async hasAuthorizedSuperadminMembership(actorId: string, tenantId: string): Promise<boolean> {
    const rows = await this.dataSource.query(
      `SELECT t.id
       FROM tenants t
       INNER JOIN superadmin_tenant_memberships m ON m.tenant_id = t.id
       INNER JOIN superadmin_profiles p ON p.id = m.actor_id
       WHERE t.id = $1
         AND t.deleted_at IS NULL
         AND m.actor_id = $2
         AND m.deleted_at IS NULL
         AND p.deleted_at IS NULL
         AND p.role = $3
       LIMIT 1`,
      [tenantId, actorId, SuperadminRole.SUPERADMIN],
    ) as Array<{ id: string }>;
    return rows.length > 0;
  }
}
