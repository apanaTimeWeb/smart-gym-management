// RESPONSIBILITY: Executes creation business flow for the white-labeling feature.
// FLOW: CommandController -> SuperadminWhiteLabelingCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
import { SuperadminWhiteLabelingMapper } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.mapper';
import type { SuperadminWhiteLabelingCreateInput, SuperadminWhiteLabelingDomainModel } from '@/backend_superadmin/superadmin_modules/white-labeling/types/superadmin-white-labeling.interfaces';
@Injectable()
export class SuperadminWhiteLabelingCreateService {
  constructor(private readonly repository: SuperadminWhiteLabelingRepository) {}
  /** Creates a new white-labeling record. */
  async createWhiteLabeling(input: SuperadminWhiteLabelingCreateInput): Promise<SuperadminWhiteLabelingDomainModel> { return SuperadminWhiteLabelingMapper.toDomain(await this.repository.createWhiteLabeling(input)); }
}