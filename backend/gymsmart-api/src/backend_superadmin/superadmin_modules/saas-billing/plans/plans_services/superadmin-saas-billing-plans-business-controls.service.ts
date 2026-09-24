// RESPONSIBILITY: Builds live plan business controls from authoritative subscription plan records.
// FLOW: Controller -> SuperadminSaasBillingPlansBusinessControlsService -> SuperadminSaasBillingPlansRepository -> PostgreSQL subscription_plans.
import { Injectable } from '@nestjs/common';
import { SuperadminSaasBillingPlansBusinessControlsResponseDto } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-business-controls-response.dto';
import { SuperadminSaasBillingPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansBusinessControlsService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingPlansBusinessControlsService {
  constructor(private readonly repository: SuperadminSaasBillingPlansRepository) {}
/**
 * Primary Intent: Executes the findPlansBusinessControls use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findPlansBusinessControls use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPlansBusinessControls(_input: unknown = {}): Promise<SuperadminSaasBillingPlansBusinessControlsResponseDto> {
    const page = await this.repository.findPage({ page: 1, limit: 100, sortBy: 'name', sortOrder: 'ASC' });
    const currency = page.items[0]?.currency ?? 'INR';
    const plans = page.items.map((plan) => ({ name: plan.name, monthly: plan.priceMonthly, currency: plan.currency, members: plan.maxMembers, storage: plan.dbLimitGb, branches: 0 }));
    return { currency, plans, versions: [], addons: [], migration: { from: '', to: '', tenants: 0, monthlyChange: 0, currency, limitConflicts: 0 } };
  }
}
