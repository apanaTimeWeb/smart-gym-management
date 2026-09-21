// RESPONSIBILITY: Executes partial update business flow for the infrastructure feature.
// FLOW: CommandController -> InfrastructureUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '@/modules/superadmin/system-ops/infrastructure/infrastructure.repository';
import { InfrastructureMapper } from '@/modules/superadmin/system-ops/infrastructure/infrastructure.mapper';
import type { InfrastructureDomainModel, InfrastructureUpdateInput } from '@/modules/superadmin/system-ops/infrastructure/types/infrastructure.interfaces';
@Injectable()
export class InfrastructureUpdateService {
  constructor(private readonly repository: InfrastructureRepository) {}
  /** Updates a infrastructure record by UUID. */
  async updateInfrastructure(id: string, input: InfrastructureUpdateInput): Promise<InfrastructureDomainModel> { return InfrastructureMapper.toDomain(await this.repository.updateInfrastructureById(id, input)); }
}
