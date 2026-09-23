// RESPONSIBILITY: Performs status transitions for infrastructure records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminInfrastructureRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.repository';
import { SuperadminInfrastructureMapper } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.mapper';
import type { SuperadminInfrastructureDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/types/superadmin-system-ops-infrastructure.interfaces';
@Injectable()
export class SuperadminInfrastructureStatusService {
  constructor(private readonly repository: SuperadminInfrastructureRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeInfrastructureStatus(id: string, status: string): Promise<SuperadminInfrastructureDomainModel> { return SuperadminInfrastructureMapper.toDomain(await this.repository.updateInfrastructureById(id, { status })); }
}