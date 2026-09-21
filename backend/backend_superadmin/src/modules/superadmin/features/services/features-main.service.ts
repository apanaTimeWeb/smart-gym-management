// RESPONSIBILITY: Returns the exact Feature Flags + Release Notes contract consumed by Superadmin.
// FLOW: Controller -> FeaturesMainService -> FeaturesContractSnapshotRepository -> PostgreSQL.
import { Injectable, NotFoundException } from '@nestjs/common';
import { FeaturesContractSnapshotRepository } from '@/modules/superadmin/features/features-contract-snapshot.repository';
import { FEATURES_SNAPSHOT_KINDS } from '@/modules/superadmin/features/features.constants';

@Injectable()
export class FeaturesMainService {
  constructor(private readonly repository: FeaturesContractSnapshotRepository) {}

  /** Returns the complete feature flags and release notes contract. */
  async findFeaturesData(): Promise<unknown> {
    const payload = await this.repository.findLatestByKind(FEATURES_SNAPSHOT_KINDS.MAIN);
    if (payload === null) throw new NotFoundException('Feature flags contract is not provisioned');
    return payload;
  }
}
