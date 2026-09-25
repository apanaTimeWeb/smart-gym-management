// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> SuperadminDashboardBusinessOverviewService -> SuperadminDashboardWidgetRepository -> live invoice aggregate -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminDashboardBusinessOverviewResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard-business-overview-response.dto';
import { SuperadminDashboardWidgetRepository } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_repositories/superadmin-dashboard-widget.repository';

/**
 * Primary Intent: Defines SuperadminDashboardBusinessOverviewService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminDashboardBusinessOverviewService {
  constructor(private readonly repository: SuperadminDashboardWidgetRepository, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the findDashboardBusinessOverview use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findDashboardBusinessOverview use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findDashboardBusinessOverview(input: Record<string, unknown> = {}): Promise<SuperadminDashboardBusinessOverviewResponseDto> {
    return await this.repository.getLiveBusinessOverview(this.config.get<string>('app.defaultCurrency') ?? 'INR', input) as unknown as SuperadminDashboardBusinessOverviewResponseDto;
  }
}
