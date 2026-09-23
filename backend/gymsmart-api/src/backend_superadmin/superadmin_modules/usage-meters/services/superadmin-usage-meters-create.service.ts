// RESPONSIBILITY: Executes creation business flow for the usage-meters feature.
// FLOW: CommandController -> SuperadminUsageMetersCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminUsageMetersRepository } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.repository';
import { SuperadminUsageMetersMapper } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.mapper';
import type { SuperadminUsageMetersCreateInput, SuperadminUsageMetersDomainModel } from '@/backend_superadmin/superadmin_modules/usage-meters/types/superadmin-usage-meters.interfaces';
@Injectable()
export class SuperadminUsageMetersCreateService {
  constructor(private readonly repository: SuperadminUsageMetersRepository) {}
  /** Creates a new usage-meters record. */
  async createUsageMeters(input: SuperadminUsageMetersCreateInput): Promise<SuperadminUsageMetersDomainModel> { return SuperadminUsageMetersMapper.toDomain(await this.repository.createUsageMeters(input)); }
}