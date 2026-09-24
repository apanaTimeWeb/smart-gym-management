// RESPONSIBILITY: Produces the report comparison contract while honoring selected period/segment filters.
// FLOW: Controller -> comparison service -> persisted snapshot -> normalized comparison response.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsComparisonResponseDto } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports-comparison-response.dto';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
import { SuperadminReportsAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/reports/reports_repositories/superadmin-reports-analytics.repository';

/**
 * Primary Intent: Defines SuperadminReportsComparisonService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminReportsComparisonService {
  constructor(private readonly repository: SuperadminReportsRepository, private readonly analyticsRepository: SuperadminReportsAnalyticsRepository) {}
/**
 * Primary Intent: Executes the findReportsComparison use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns the selected comparison set or the latest complete dataset. */
  async findReportsComparison(input: { period?: string; segment?: string } = {}): Promise<SuperadminReportsComparisonResponseDto> {
    return await this.analyticsRepository.getLiveComparison({ period: input.period, segment: input.segment }, 'INR') as unknown as SuperadminReportsComparisonResponseDto;
  }
}
