// RESPONSIBILITY: Executes partial update business flow for the plans feature.
// FLOW: CommandController -> SuperadminPlansUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';
import { SuperadminPlansMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.mapper';
import type { SuperadminPlansDomainModel, SuperadminPlansUpdateInput } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/types/superadmin-saas-billing-plans.interfaces';
@Injectable()
export class SuperadminPlansUpdateService {
  constructor(private readonly repository: SuperadminPlansRepository) {}
  /** Updates a plans record by UUID. */
  async updatePlans(id: string, input: SuperadminPlansUpdateInput): Promise<SuperadminPlansDomainModel> { return SuperadminPlansMapper.toDomain(await this.repository.updatePlansById(id, input)); }
}