// RESPONSIBILITY: Executes the soft-delete flow for the plans feature.
// FLOW: CommandController -> PlansDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '@/modules/superadmin/saas-billing/plans/plans.repository';
@Injectable()
export class PlansDeleteService {
  constructor(private readonly repository: PlansRepository) {}
  /** Soft-deletes one plans record. */
  async deletePlans(id: string): Promise<null> { await this.repository.deletePlansById(id); return null; }
}
