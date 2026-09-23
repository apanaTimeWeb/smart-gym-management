// RESPONSIBILITY: Executes creation business flow for the white-labeling feature.
// FLOW: CommandController -> WhiteLabelingCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { WhiteLabelingRepository } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.repository';
import { WhiteLabelingMapper } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.mapper';
import type { WhiteLabelingCreateInput, WhiteLabelingDomainModel } from '@/backend_superadmin/modules/superadmin/white-labeling/types/white-labeling.interfaces';
@Injectable()
export class WhiteLabelingCreateService {
  constructor(private readonly repository: WhiteLabelingRepository) {}
  /** Creates a new white-labeling record. */
  async createWhiteLabeling(input: WhiteLabelingCreateInput): Promise<WhiteLabelingDomainModel> { return WhiteLabelingMapper.toDomain(await this.repository.createWhiteLabeling(input)); }
}