// RESPONSIBILITY: Executes the soft-delete flow for the white-labeling feature.
// FLOW: CommandController -> SuperadminWhiteLabelingDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
@Injectable()
export class SuperadminWhiteLabelingDeleteService {
  constructor(private readonly repository: SuperadminWhiteLabelingRepository) {}
  /** Soft-deletes one white-labeling record. */
  async deleteWhiteLabeling(id: string): Promise<null> { await this.repository.deleteWhiteLabelingById(id); return null; }
}