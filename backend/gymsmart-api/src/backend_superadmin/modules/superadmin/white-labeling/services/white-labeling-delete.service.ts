// RESPONSIBILITY: Executes the soft-delete flow for the white-labeling feature.
// FLOW: CommandController -> WhiteLabelingDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { WhiteLabelingRepository } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.repository';
@Injectable()
export class WhiteLabelingDeleteService {
  constructor(private readonly repository: WhiteLabelingRepository) {}
  /** Soft-deletes one white-labeling record. */
  async deleteWhiteLabeling(id: string): Promise<null> { await this.repository.deleteWhiteLabelingById(id); return null; }
}
