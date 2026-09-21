// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> FeaturesRolloutInsightsService -> FeaturesContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { FeaturesRolloutInsightsResponseDto } from '@/modules/superadmin/features/features-rollout-insights-response.dto';
import { FeaturesContractSnapshotRepository } from '@/modules/superadmin/features/features-contract-snapshot.repository';
import { FEATURES_SNAPSHOT_KINDS } from '@/modules/superadmin/features/features.constants';

@Injectable()
export class FeaturesRolloutInsightsService {
  constructor(private readonly repository: FeaturesContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findFeaturesRolloutInsights(input: Record<string, unknown> = {}): Promise<FeaturesRolloutInsightsResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(FEATURES_SNAPSHOT_KINDS.ROLLOUT_INSIGHTS);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as FeaturesRolloutInsightsResponseDto;
  }
}
