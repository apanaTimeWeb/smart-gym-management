// RESPONSIBILITY: Executes partial update business flow for the white-labeling feature.
// FLOW: CommandController -> WhiteLabelingUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { WhiteLabelingRepository } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/white-labeling.repository';
import { WhiteLabelingMapper } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/white-labeling.mapper';
import type { WhiteLabelingDomainModel, WhiteLabelingUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/types/white-labeling.interfaces';
@Injectable()
export class WhiteLabelingUpdateService {
  constructor(private readonly repository: WhiteLabelingRepository) {}
  /** Updates a white-labeling record by UUID. */
  async updateWhiteLabeling(id: string, input: WhiteLabelingUpdateInput): Promise<WhiteLabelingDomainModel> { return WhiteLabelingMapper.toDomain(await this.repository.updateWhiteLabelingById(id, input)); }
}