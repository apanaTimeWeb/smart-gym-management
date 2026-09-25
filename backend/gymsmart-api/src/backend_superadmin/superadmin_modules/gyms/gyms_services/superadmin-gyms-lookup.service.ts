// RESPONSIBILITY: Provides the shared Superadmin gym lookup used by frontend tenant selectors.
// FLOW: Query controller -> SuperadminGymsLookupService -> SuperadminGymsRepository -> PostgreSQL tenants.
import { Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
/**
 * Primary Intent: Defines SuperadminGymsLookupItem as the interface-level contract for superadmin-gyms-lookup.service.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminGymsLookupItem { id: string; name: string; }
/**
 * Primary Intent: Defines SuperadminGymsLookupService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsLookupService {
  constructor(private readonly repository: SuperadminGymsRepository) {}
/**
 * Primary Intent: Executes the findGymsLookup use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findGymsLookup use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findGymsLookup(): Promise<SuperadminGymsLookupItem[]> {
    const result = await this.repository.findPage({ page: 1, limit: 100, search: undefined, status: undefined, sortBy: 'name' as never, sortOrder: 'ASC' });
    return result.items.map((item) => ({ id: item.id, name: item.name }));
  }
}
