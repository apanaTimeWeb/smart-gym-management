// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> BroadcastsAudienceInsightsService -> BroadcastsContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { BroadcastsAudienceInsightsResponseDto } from '@/modules/superadmin/broadcasts/broadcasts-audience-insights-response.dto';
import { BroadcastsContractSnapshotRepository } from '@/modules/superadmin/broadcasts/broadcasts-contract-snapshot.repository';
import { BROADCASTS_SNAPSHOT_KINDS } from '@/modules/superadmin/broadcasts/broadcasts.constants';

@Injectable()
export class BroadcastsAudienceInsightsService {
  constructor(private readonly repository: BroadcastsContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findBroadcastsAudienceInsights(input: Record<string, unknown> = {}): Promise<BroadcastsAudienceInsightsResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(BROADCASTS_SNAPSHOT_KINDS.AUDIENCE_INSIGHTS);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as BroadcastsAudienceInsightsResponseDto;
  }
}
