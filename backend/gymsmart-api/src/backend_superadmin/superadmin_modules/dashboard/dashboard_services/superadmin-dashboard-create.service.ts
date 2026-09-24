// RESPONSIBILITY: Executes creation business flow for the dashboard feature.
// FLOW: CommandController -> SuperadminDashboardCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import { SuperadminDashboardMapper } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.mapper';
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-response.dto';
import type { SuperadminDashboardCreateInput } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_types/superadmin-dashboard.interfaces';
/**
 * Primary Intent: Defines SuperadminDashboardCreateService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminDashboardCreateService {
  constructor(private readonly repository: SuperadminDashboardRepository) {}
/**
 * Primary Intent: Executes the createDashboard use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the createDashboard use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createDashboard(input: SuperadminDashboardCreateInput): Promise<SuperadminDashboardResponseDto> { return SuperadminDashboardMapper.toResponse(SuperadminDashboardMapper.toDomain(await this.repository.createDashboard(input))); }
}
