// RESPONSIBILITY: Executes creation business flow for the usage-meters feature.
// FLOW: CommandController -> UsageMetersCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { UsageMetersRepository } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.repository';
import { UsageMetersMapper } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.mapper';
import type { UsageMetersCreateInput, UsageMetersDomainModel } from '@/backend_superadmin/modules/superadmin/usage-meters/types/usage-meters.interfaces';
@Injectable()
export class UsageMetersCreateService {
  constructor(private readonly repository: UsageMetersRepository) {}
  /** Creates a new usage-meters record. */
  async createUsageMeters(input: UsageMetersCreateInput): Promise<UsageMetersDomainModel> { return UsageMetersMapper.toDomain(await this.repository.createUsageMeters(input)); }
}