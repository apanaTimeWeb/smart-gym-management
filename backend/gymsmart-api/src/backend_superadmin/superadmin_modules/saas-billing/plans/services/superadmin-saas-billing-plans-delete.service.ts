// RESPONSIBILITY: Executes the soft-delete flow for the plans feature.
// FLOW: CommandController -> SuperadminPlansDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';
@Injectable()
export class SuperadminPlansDeleteService {
  constructor(private readonly repository: SuperadminPlansRepository) {}
  /** Soft-deletes one plans record. */
  async deletePlans(id: string): Promise<null> { await this.repository.deletePlansById(id); return null; }
}