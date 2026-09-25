// RESPONSIBILITY: Executes single-record retrieval for the plans feature.
// FLOW: QueryController -> SuperadminSaasBillingPlansFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminSaasBillingPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';
import { SuperadminSaasBillingPlansMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.mapper';
import type { SuperadminPlansDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_types/superadmin-saas-billing-plans.interfaces';
/**
 * Primary Intent: Defines SuperadminSaasBillingPlansFindService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingPlansFindService {
  constructor(private readonly repository: SuperadminSaasBillingPlansRepository) {}
/**
 * Primary Intent: Executes the findPlansById use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findPlansById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPlansById(id: string): Promise<SuperadminPlansDomainModel> { return SuperadminSaasBillingPlansMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
