// RESPONSIBILITY: Builds message template and campaign insights from persisted messaging records.
// FLOW: Controller -> SuperadminMessagingTemplateInsightsService -> SuperadminMessagingRepository -> PostgreSQL tenant_messages.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingTemplateInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-template-insights-response.dto';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';

/**
 * Primary Intent: Defines SuperadminMessagingTemplateInsightsService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminMessagingTemplateInsightsService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}
/**
 * Primary Intent: Executes the findMessagingTemplateInsights use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findMessagingTemplateInsights use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findMessagingTemplateInsights(_input: unknown = {}): Promise<SuperadminMessagingTemplateInsightsResponseDto> {
    const page = await this.repository.findPage({ page: 1, limit: 1000, sortBy: 'createdAt', sortOrder: 'DESC' });
    const templateMap = new Map<string, { channel: string; uses: number; status: string }>();
    const campaignMap = new Map<string, { sent: number; delivered: number; opened: number; responded: number }>();
    const channels = new Set<string>();
    for (const row of page.items) {
      channels.add(row.channel);
      const template = templateMap.get(row.subject) ?? { channel: row.channel, uses: 0, status: row.status };
      template.uses += 1;
      template.status = row.status;
      templateMap.set(row.subject, template);
      const campaignName = typeof row.campaignMetadata?.campaignName === 'string' ? row.campaignMetadata.campaignName : null;
      if (campaignName) {
        const campaign = campaignMap.get(campaignName) ?? { sent: 0, delivered: 0, opened: 0, responded: 0 };
        if (row.status === 'SENT') { campaign.sent += 1; campaign.delivered += 1; }
        campaignMap.set(campaignName, campaign);
      }
    }
    return { templates: [...templateMap.entries()].map(([name, value]) => ({ name, ...value })), campaigns: [...campaignMap.entries()].map(([name, value]) => ({ name, ...value })), channels: [...channels] };
  }
}
