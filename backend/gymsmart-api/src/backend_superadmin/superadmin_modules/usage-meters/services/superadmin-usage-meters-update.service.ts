// RESPONSIBILITY: Executes partial update business flow for the usage-meters feature.
// FLOW: CommandController -> SuperadminUsageMetersUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminUsageMetersRepository } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.repository';
import { SuperadminUsageMetersMapper } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.mapper';
import type { SuperadminUsageMetersDomainModel, SuperadminUsageMetersUpdateInput } from '@/backend_superadmin/superadmin_modules/usage-meters/types/superadmin-usage-meters.interfaces';
@Injectable()
export class SuperadminUsageMetersUpdateService {
  constructor(private readonly repository: SuperadminUsageMetersRepository) {}
  /** Updates a usage-meters record by UUID. */
  async updateUsageMeters(id: string, input: SuperadminUsageMetersUpdateInput): Promise<SuperadminUsageMetersDomainModel> { return SuperadminUsageMetersMapper.toDomain(await this.repository.updateUsageMetersById(id, input)); }
}