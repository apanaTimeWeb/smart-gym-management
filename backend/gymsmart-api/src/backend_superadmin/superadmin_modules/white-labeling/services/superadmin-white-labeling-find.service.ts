// RESPONSIBILITY: Executes single-record retrieval for the white-labeling feature.
// FLOW: QueryController -> SuperadminWhiteLabelingFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
import { SuperadminWhiteLabelingMapper } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.mapper';
import type { SuperadminWhiteLabelingDomainModel } from '@/backend_superadmin/superadmin_modules/white-labeling/types/superadmin-white-labeling.interfaces';
@Injectable()
export class SuperadminWhiteLabelingFindService {
  constructor(private readonly repository: SuperadminWhiteLabelingRepository) {}
  /** Retrieves one active white-labeling record by UUID. */
  async findWhiteLabelingById(id: string): Promise<SuperadminWhiteLabelingDomainModel> { return SuperadminWhiteLabelingMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}