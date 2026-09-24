// RESPONSIBILITY: Executes the plan archive state transition through a named repository mutation.
// FLOW: Controller -> archive service -> repository update -> active plan response.
import { Injectable } from '@nestjs/common';
import { SuperadminSaasBillingPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansArchiveService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingPlansArchiveService {
  constructor(private readonly repository: SuperadminSaasBillingPlansRepository) {}
/**
 * Primary Intent: Executes the archive use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the archive use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async archive(id: string): Promise<import("@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.entity").SuperadminSaasBillingPlansEntity> { await this.repository.findByIdOrThrow(id); return this.repository.updatePlansById(id, { isArchived: true }); }
}
