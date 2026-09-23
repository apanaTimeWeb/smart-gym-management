// RESPONSIBILITY: Executes creation business flow for the plans feature.
// FLOW: CommandController -> PlansCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans.repository';
import { PlansMapper } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans.mapper';
import type { PlansCreateInput, PlansDomainModel } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/types/plans.interfaces';
@Injectable()
export class PlansCreateService {
  constructor(private readonly repository: PlansRepository) {}
  /** Creates a new plans record. */
  async createPlans(input: PlansCreateInput): Promise<PlansDomainModel> { return PlansMapper.toDomain(await this.repository.createPlans(input)); }
}