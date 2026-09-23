// RESPONSIBILITY: Builds message template and campaign insights from persisted messaging records.
// FLOW: Controller -> SuperadminMessagingTemplateInsightsService -> SuperadminMessagingRepository -> PostgreSQL tenant_messages.
import { Injectable } from '@nestjs/common';
import { SuperadminMessagingTemplateInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-template-insights-response.dto';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';

@Injectable()
export class SuperadminMessagingTemplateInsightsService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}

  /** Aggregates current message history into template, campaign, and channel insights. */
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
