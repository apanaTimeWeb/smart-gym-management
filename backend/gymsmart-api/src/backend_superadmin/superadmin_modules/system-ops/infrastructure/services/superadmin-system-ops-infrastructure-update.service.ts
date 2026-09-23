// RESPONSIBILITY: Executes partial update business flow for the infrastructure feature.
// FLOW: CommandController -> SuperadminInfrastructureUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminInfrastructureRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.repository';
import { SuperadminInfrastructureMapper } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.mapper';
import type { SuperadminInfrastructureDomainModel, SuperadminInfrastructureUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/types/superadmin-system-ops-infrastructure.interfaces';
@Injectable()
export class SuperadminInfrastructureUpdateService {
  constructor(private readonly repository: SuperadminInfrastructureRepository) {}
  /** Updates a infrastructure record by UUID. */
  async updateInfrastructure(id: string, input: SuperadminInfrastructureUpdateInput): Promise<SuperadminInfrastructureDomainModel> { return SuperadminInfrastructureMapper.toDomain(await this.repository.updateInfrastructureById(id, input)); }
}