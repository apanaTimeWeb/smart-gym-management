// RESPONSIBILITY: Executes the soft-delete flow for the affiliates feature.
// FLOW: CommandController -> SuperadminAffiliatesDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
@Injectable()
export class SuperadminAffiliatesDeleteService {
  constructor(private readonly repository: SuperadminAffiliatesRepository) {}
  /** Soft-deletes one affiliates record. */
  async deleteAffiliates(id: string): Promise<null> { await this.repository.deleteAffiliatesById(id); return null; }
}