// RESPONSIBILITY: Returns live white-label domains from the owning repository.
// FLOW: Controller -> SuperadminWhiteLabelingDomainsService -> SuperadminWhiteLabelingRepository -> domain rows.
import { Injectable } from '@nestjs/common';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination.utils';
import type { SuperadminWhiteLabelingListQuery } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_types/superadmin-white-labeling.interfaces';

/**
 * Primary Intent: Defines SuperadminWhiteLabelingDomainsService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminWhiteLabelingDomainsService {
  constructor(private readonly repository: SuperadminWhiteLabelingRepository) {}
/**
 * Primary Intent: Executes the findWhiteLabelingDomains use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findWhiteLabelingDomains use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findWhiteLabelingDomains(input: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const raw = input.query as Record<string, string> | undefined;
    const query: SuperadminWhiteLabelingListQuery = { page: Number(raw?.page ?? 1), limit: Math.min(Number(raw?.limit ?? 50), 100), search: raw?.search, gymId: raw?.gymId, sortBy: (raw?.sortBy ?? 'createdAt') as never, sortOrder: raw?.sortOrder === 'ASC' ? 'ASC' : 'DESC' };
    const result = await this.repository.findPage(query);
    return { data: result.items.map((item) => ({ id: item.id, gymId: item.gymId, gymName: item.gymName, domain: item.domain, status: item.status, sslStatus: item.sslStatus, logoUrl: item.logoUrl, primaryColor: item.primaryColor, createdAt: item.createdAt.toISOString() })), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
