// RESPONSIBILITY: Translates persisted report snapshot rows into the frontend report contract with request-aware filtering.
// FLOW: Controller -> SuperadminReportsMainService -> repository query -> contract payload -> response DTO.
import { Injectable } from '@nestjs/common';
import type { SuperadminReportsLivePayload } from '@/backend_superadmin/superadmin_modules/reports/reports_types/superadmin-reports.interfaces';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
import { SuperadminReportsAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/reports/reports_repositories/superadmin-reports-analytics.repository';

/**
 * Primary Intent: Defines SuperadminReportsMainService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminReportsMainService {
  constructor(private readonly repository: SuperadminReportsRepository, private readonly analyticsRepository: SuperadminReportsAnalyticsRepository) {}
/**
 * Primary Intent: Executes the findReportsData use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns the latest report payload without discarding supported query input. */
  async findReportsData(input: { from?: string; to?: string; period?: string } = {}): Promise<SuperadminReportsLivePayload> {
    return await this.analyticsRepository.getLiveReports(input);
  }

}
