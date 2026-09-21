// RESPONSIBILITY: Executes partial update business flow for the usage-meters feature.
// FLOW: CommandController -> UsageMetersUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { UsageMetersRepository } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.repository';
import { UsageMetersMapper } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.mapper';
import type { UsageMetersDomainModel, UsageMetersUpdateInput } from '@/backend_superadmin/modules/superadmin/usage-meters/types/usage-meters.interfaces';
@Injectable()
export class UsageMetersUpdateService {
  constructor(private readonly repository: UsageMetersRepository) {}
  /** Updates a usage-meters record by UUID. */
  async updateUsageMeters(id: string, input: UsageMetersUpdateInput): Promise<UsageMetersDomainModel> { return UsageMetersMapper.toDomain(await this.repository.updateUsageMetersById(id, input)); }
}
