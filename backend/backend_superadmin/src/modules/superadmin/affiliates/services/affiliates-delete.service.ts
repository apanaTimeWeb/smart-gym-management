// RESPONSIBILITY: Executes the soft-delete flow for the affiliates feature.
// FLOW: CommandController -> AffiliatesDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
@Injectable()
export class AffiliatesDeleteService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Soft-deletes one affiliates record. */
  async deleteAffiliates(id: string): Promise<null> { await this.repository.deleteAffiliatesById(id); return null; }
}
