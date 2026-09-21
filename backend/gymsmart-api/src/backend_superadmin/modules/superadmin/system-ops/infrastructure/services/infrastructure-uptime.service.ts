// RESPONSIBILITY: Returns the persisted uptime history contract for infrastructure diagnostics.
// FLOW: Controller -> InfrastructureUptimeService -> InfrastructureContractSnapshotRepository -> PostgreSQL.
import { Injectable, NotFoundException } from '@nestjs/common';
import { InfrastructureContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.repository';
import { INFRASTRUCTURE_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.constants';

@Injectable()
export class InfrastructureUptimeService {
  constructor(private readonly repository: InfrastructureContractSnapshotRepository) {}

  /** Returns hourly uptime points required by the Superadmin chart. */
  async findInfrastructureUptime(): Promise<unknown> {
    const payload = await this.repository.findLatestByKind(INFRASTRUCTURE_SNAPSHOT_KINDS.UPTIME);
    if (payload === null) throw new NotFoundException('Infrastructure uptime contract is not provisioned');
    return payload;
  }
}
