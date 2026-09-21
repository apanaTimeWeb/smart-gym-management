// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> BackupsHealthService -> BackupsContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { BackupsHealthResponseDto } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-health-response.dto';
import { BackupsContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-contract-snapshot.repository';
import { BACKUPS_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.constants';

@Injectable()
export class BackupsHealthService {
  constructor(private readonly repository: BackupsContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findBackupsHealth(input: Record<string, unknown> = {}): Promise<BackupsHealthResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(BACKUPS_SNAPSHOT_KINDS.HEALTH);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as BackupsHealthResponseDto;
  }
}
