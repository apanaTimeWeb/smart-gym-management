// RESPONSIBILITY: Executes partial update business flow for the plans feature.
// FLOW: CommandController -> PlansUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '@/modules/superadmin/saas-billing/plans/plans.repository';
import { PlansMapper } from '@/modules/superadmin/saas-billing/plans/plans.mapper';
import type { PlansDomainModel, PlansUpdateInput } from '@/modules/superadmin/saas-billing/plans/types/plans.interfaces';
@Injectable()
export class PlansUpdateService {
  constructor(private readonly repository: PlansRepository) {}
  /** Updates a plans record by UUID. */
  async updatePlans(id: string, input: PlansUpdateInput): Promise<PlansDomainModel> { return PlansMapper.toDomain(await this.repository.updatePlansById(id, input)); }
}
