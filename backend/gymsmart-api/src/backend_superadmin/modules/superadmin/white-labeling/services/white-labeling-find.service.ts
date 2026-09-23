// RESPONSIBILITY: Executes single-record retrieval for the white-labeling feature.
// FLOW: QueryController -> WhiteLabelingFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { WhiteLabelingRepository } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/white-labeling.repository';
import { WhiteLabelingMapper } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/white-labeling.mapper';
import type { WhiteLabelingDomainModel } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/types/white-labeling.interfaces';
@Injectable()
export class WhiteLabelingFindService {
  constructor(private readonly repository: WhiteLabelingRepository) {}
  /** Retrieves one active white-labeling record by UUID. */
  async findWhiteLabelingById(id: string): Promise<WhiteLabelingDomainModel> { return WhiteLabelingMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}