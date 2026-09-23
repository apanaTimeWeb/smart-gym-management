// RESPONSIBILITY: Executes single-record retrieval for the usage-meters feature.
// FLOW: QueryController -> SuperadminUsageMetersFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminUsageMetersRepository } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.repository';
import { SuperadminUsageMetersMapper } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.mapper';
import type { SuperadminUsageMetersDomainModel } from '@/backend_superadmin/superadmin_modules/usage-meters/types/superadmin-usage-meters.interfaces';
@Injectable()
export class SuperadminUsageMetersFindService {
  constructor(private readonly repository: SuperadminUsageMetersRepository) {}
  /** Retrieves one active usage-meters record by UUID. */
  async findUsageMetersById(id: string): Promise<SuperadminUsageMetersDomainModel> { return SuperadminUsageMetersMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}