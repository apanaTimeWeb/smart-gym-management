// RESPONSIBILITY: Executes single-record retrieval for the plans feature.
// FLOW: QueryController -> PlansFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '@/modules/superadmin/saas-billing/plans/plans.repository';
import { PlansMapper } from '@/modules/superadmin/saas-billing/plans/plans.mapper';
import type { PlansDomainModel } from '@/modules/superadmin/saas-billing/plans/types/plans.interfaces';
@Injectable()
export class PlansFindService {
  constructor(private readonly repository: PlansRepository) {}
  /** Retrieves one active plans record by UUID. */
  async findPlansById(id: string): Promise<PlansDomainModel> { return PlansMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
