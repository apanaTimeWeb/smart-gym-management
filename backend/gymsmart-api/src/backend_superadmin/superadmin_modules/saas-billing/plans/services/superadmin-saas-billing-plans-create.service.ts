// RESPONSIBILITY: Executes creation business flow for the plans feature.
// FLOW: CommandController -> SuperadminPlansCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';
import { SuperadminPlansMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.mapper';
import type { SuperadminPlansCreateInput, SuperadminPlansDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/types/superadmin-saas-billing-plans.interfaces';
@Injectable()
export class SuperadminPlansCreateService {
  constructor(private readonly repository: SuperadminPlansRepository) {}
  /** Creates a new plans record. */
  async createPlans(input: SuperadminPlansCreateInput): Promise<SuperadminPlansDomainModel> { return SuperadminPlansMapper.toDomain(await this.repository.createPlans(input)); }
}