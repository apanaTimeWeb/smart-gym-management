// RESPONSIBILITY: Enforces tenant authorization before a tenant DataSource can be selected.
// FLOW: JWT actor + requested tenant -> SuperadminCoreTenantAuthorizationRepository -> trusted tenant decision.
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SuperadminCoreTenantAuthorizationRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-authorization.repository';

/**
 * Primary Intent: Defines SuperadminCoreTenantAuthorizationService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreTenantAuthorizationService {
  constructor(private readonly repository: SuperadminCoreTenantAuthorizationRepository) {}
/**
 * Primary Intent: Executes the authorize use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the authorize use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async authorize(actorId: string, tenantId: string): Promise<void> {
    const authorized = await this.repository.hasAuthorizedSuperadminMembership(actorId, tenantId);
    if (!authorized) throw new ForbiddenException({ error: 'FORBIDDEN', errorCode: 'TENANT.ACCESS.FORBIDDEN', message: { key: 'core.ERRORS.FORBIDDEN' } });
  }
}
