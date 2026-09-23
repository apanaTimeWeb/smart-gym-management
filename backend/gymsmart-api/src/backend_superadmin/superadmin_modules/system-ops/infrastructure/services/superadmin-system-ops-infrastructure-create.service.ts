// RESPONSIBILITY: Executes creation business flow for the infrastructure feature.
// FLOW: CommandController -> SuperadminInfrastructureCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminInfrastructureRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.repository';
import { SuperadminInfrastructureMapper } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.mapper';
import type { SuperadminInfrastructureCreateInput, SuperadminInfrastructureDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/types/superadmin-system-ops-infrastructure.interfaces';
@Injectable()
export class SuperadminInfrastructureCreateService {
  constructor(private readonly repository: SuperadminInfrastructureRepository) {}
  /** Creates a new infrastructure record. */
  async createInfrastructure(input: SuperadminInfrastructureCreateInput): Promise<SuperadminInfrastructureDomainModel> { return SuperadminInfrastructureMapper.toDomain(await this.repository.createInfrastructure(input)); }
}