// RESPONSIBILITY: Builds live audience and delivery insights from persisted broadcasts.
// FLOW: Audience-insights query -> SuperadminBroadcastsAudienceInsightsService -> SuperadminBroadcastsRepository -> broadcasts.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminBroadcastsAudienceInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts-audience-insights-response.dto';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';

/**
 * Primary Intent: Defines SuperadminBroadcastsAudienceInsightsService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminBroadcastsAudienceInsightsService {
  constructor(private readonly repository: SuperadminBroadcastsRepository, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the findBroadcastsAudienceInsights use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findBroadcastsAudienceInsights use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findBroadcastsAudienceInsights(): Promise<SuperadminBroadcastsAudienceInsightsResponseDto> {
    const result = await this.repository.getAudienceInsights();
    return { currency: this.config.getOrThrow<string>('app.defaultCurrency'), ...result };
  }
}
