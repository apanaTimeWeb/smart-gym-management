// RESPONSIBILITY: Executes single-record retrieval for the plans feature.
// FLOW: QueryController -> SuperadminPlansFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';
import { SuperadminPlansMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.mapper';
import type { SuperadminPlansDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/types/superadmin-saas-billing-plans.interfaces';
@Injectable()
export class SuperadminPlansFindService {
  constructor(private readonly repository: SuperadminPlansRepository) {}
  /** Retrieves one active plans record by UUID. */
  async findPlansById(id: string): Promise<SuperadminPlansDomainModel> { return SuperadminPlansMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}