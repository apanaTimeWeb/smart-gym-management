// RESPONSIBILITY: Performs status transitions for infrastructure records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.repository';
import { InfrastructureMapper } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.mapper';
import type { InfrastructureDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/types/infrastructure.interfaces';
@Injectable()
export class InfrastructureStatusService {
  constructor(private readonly repository: InfrastructureRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeInfrastructureStatus(id: string, status: string): Promise<InfrastructureDomainModel> { return InfrastructureMapper.toDomain(await this.repository.updateInfrastructureById(id, { status })); }
}
