// RESPONSIBILITY: Executes paginated read logic for the dashboard feature.
// FLOW: QueryController -> SuperadminDashboardListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import { SuperadminDashboardMapper } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination.utils';
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-response.dto';
import type { SuperadminDashboardListQuery } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_types/superadmin-dashboard.interfaces';

/**
 * Primary Intent: Defines SuperadminDashboardListService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminDashboardListService {
  constructor(private readonly repository: SuperadminDashboardRepository) {}
/**
 * Primary Intent: Executes the findDashboardPage use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findDashboardPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findDashboardPage(query: SuperadminDashboardListQuery): Promise<{ data: SuperadminDashboardResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminDashboardMapper.toResponse(SuperadminDashboardMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
