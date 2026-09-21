// RESPONSIBILITY: Executes single-record retrieval for the usage-meters feature.
// FLOW: QueryController -> UsageMetersFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { UsageMetersRepository } from '@/modules/superadmin/usage-meters/usage-meters.repository';
import { UsageMetersMapper } from '@/modules/superadmin/usage-meters/usage-meters.mapper';
import type { UsageMetersDomainModel } from '@/modules/superadmin/usage-meters/types/usage-meters.interfaces';
@Injectable()
export class UsageMetersFindService {
  constructor(private readonly repository: UsageMetersRepository) {}
  /** Retrieves one active usage-meters record by UUID. */
  async findUsageMetersById(id: string): Promise<UsageMetersDomainModel> { return UsageMetersMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
