// RESPONSIBILITY: Executes creation business flow for the infrastructure feature.
// FLOW: CommandController -> InfrastructureCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.repository';
import { InfrastructureMapper } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.mapper';
import type { InfrastructureCreateInput, InfrastructureDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/types/infrastructure.interfaces';
@Injectable()
export class InfrastructureCreateService {
  constructor(private readonly repository: InfrastructureRepository) {}
  /** Creates a new infrastructure record. */
  async createInfrastructure(input: InfrastructureCreateInput): Promise<InfrastructureDomainModel> { return InfrastructureMapper.toDomain(await this.repository.createInfrastructure(input)); }
}
