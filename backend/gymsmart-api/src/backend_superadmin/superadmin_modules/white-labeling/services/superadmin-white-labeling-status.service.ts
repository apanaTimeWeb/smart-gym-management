// RESPONSIBILITY: Applies an explicit white-label domain status transition and returns the persisted domain object.
// FLOW: SuperadminWhiteLabelingCommandController -> SuperadminWhiteLabelingStatusService -> repository -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
import { SuperadminWhiteLabelingMapper } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.mapper';
import type { SuperadminWhiteLabelingDomainModel } from '@/backend_superadmin/superadmin_modules/white-labeling/types/superadmin-white-labeling.interfaces';

@Injectable()
export class SuperadminWhiteLabelingStatusService {
  constructor(private readonly repository: SuperadminWhiteLabelingRepository) {}

  /** Changes the status of one white-label domain and returns the persisted record. */
  async changeWhiteLabelingStatus(id: string, status: string): Promise<SuperadminWhiteLabelingDomainModel> {
    return SuperadminWhiteLabelingMapper.toDomain(await this.repository.updateWhiteLabelingById(id, { status }));
  }
}