// RESPONSIBILITY: Executes single-record retrieval for the infrastructure feature.
// FLOW: QueryController -> SuperadminInfrastructureFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminInfrastructureRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.repository';
import { SuperadminInfrastructureMapper } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.mapper';
import type { SuperadminInfrastructureDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/types/superadmin-system-ops-infrastructure.interfaces';
@Injectable()
export class SuperadminInfrastructureFindService {
  constructor(private readonly repository: SuperadminInfrastructureRepository) {}
  /** Retrieves one active infrastructure record by UUID. */
  async findInfrastructureById(id: string): Promise<SuperadminInfrastructureDomainModel> { return SuperadminInfrastructureMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}