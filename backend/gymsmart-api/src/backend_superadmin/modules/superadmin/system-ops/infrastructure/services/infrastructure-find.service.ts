// RESPONSIBILITY: Executes single-record retrieval for the infrastructure feature.
// FLOW: QueryController -> InfrastructureFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.repository';
import { InfrastructureMapper } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.mapper';
import type { InfrastructureDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/types/infrastructure.interfaces';
@Injectable()
export class InfrastructureFindService {
  constructor(private readonly repository: InfrastructureRepository) {}
  /** Retrieves one active infrastructure record by UUID. */
  async findInfrastructureById(id: string): Promise<InfrastructureDomainModel> { return InfrastructureMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
