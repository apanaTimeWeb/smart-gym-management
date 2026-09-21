// RESPONSIBILITY: Applies an explicit white-label domain status transition and returns the persisted domain object.
// FLOW: WhiteLabelingCommandController -> WhiteLabelingStatusService -> repository -> mapper.
import { Injectable } from '@nestjs/common';
import { WhiteLabelingRepository } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.repository';
import { WhiteLabelingMapper } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.mapper';
import type { WhiteLabelingDomainModel } from '@/backend_superadmin/modules/superadmin/white-labeling/types/white-labeling.interfaces';

@Injectable()
export class WhiteLabelingStatusService {
  constructor(private readonly repository: WhiteLabelingRepository) {}

  /** Changes the status of one white-label domain and returns the persisted record. */
  async changeWhiteLabelingStatus(id: string, status: string): Promise<WhiteLabelingDomainModel> {
    return WhiteLabelingMapper.toDomain(await this.repository.updateWhiteLabelingById(id, { status }));
  }
}
