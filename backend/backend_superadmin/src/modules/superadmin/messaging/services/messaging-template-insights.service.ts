// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> MessagingTemplateInsightsService -> MessagingContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { MessagingTemplateInsightsResponseDto } from '@/modules/superadmin/messaging/messaging-template-insights-response.dto';
import { MessagingContractSnapshotRepository } from '@/modules/superadmin/messaging/messaging-contract-snapshot.repository';
import { MESSAGING_SNAPSHOT_KINDS } from '@/modules/superadmin/messaging/messaging.constants';

@Injectable()
export class MessagingTemplateInsightsService {
  constructor(private readonly repository: MessagingContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findMessagingTemplateInsights(input: Record<string, unknown> = {}): Promise<MessagingTemplateInsightsResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(MESSAGING_SNAPSHOT_KINDS.TEMPLATE_INSIGHTS);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as MessagingTemplateInsightsResponseDto;
  }
}
