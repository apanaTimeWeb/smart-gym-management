// RESPONSIBILITY: Executes partial update business flow for the white-labeling feature.
// FLOW: CommandController -> SuperadminWhiteLabelingUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
import { SuperadminWhiteLabelingMapper } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.mapper';
import type { SuperadminWhiteLabelingDomainModel, SuperadminWhiteLabelingUpdateInput } from '@/backend_superadmin/superadmin_modules/white-labeling/types/superadmin-white-labeling.interfaces';
@Injectable()
export class SuperadminWhiteLabelingUpdateService {
  constructor(private readonly repository: SuperadminWhiteLabelingRepository) {}
  /** Updates a white-labeling record by UUID. */
  async updateWhiteLabeling(id: string, input: SuperadminWhiteLabelingUpdateInput): Promise<SuperadminWhiteLabelingDomainModel> { return SuperadminWhiteLabelingMapper.toDomain(await this.repository.updateWhiteLabelingById(id, input)); }
}