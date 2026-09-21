// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> PlansBusinessControlsService -> PlansContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { PlansBusinessControlsResponseDto } from '@/modules/superadmin/saas-billing/plans/plans-business-controls-response.dto';
import { PlansContractSnapshotRepository } from '@/modules/superadmin/saas-billing/plans/plans-contract-snapshot.repository';
import { PLANS_SNAPSHOT_KINDS } from '@/modules/superadmin/saas-billing/plans/plans.constants';

@Injectable()
export class PlansBusinessControlsService {
  constructor(private readonly repository: PlansContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findPlansBusinessControls(input: Record<string, unknown> = {}): Promise<PlansBusinessControlsResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(PLANS_SNAPSHOT_KINDS.BUSINESS_CONTROLS);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as PlansBusinessControlsResponseDto;
  }
}
