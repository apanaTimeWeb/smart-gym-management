// RESPONSIBILITY: Performs status transitions for backups records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.repository';
import { BackupsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.mapper';
import type { BackupsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/backups/types/backups.interfaces';
@Injectable()
export class BackupsStatusService {
  constructor(private readonly repository: BackupsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeBackupsStatus(id: string, status: string): Promise<BackupsDomainModel> { return BackupsMapper.toDomain(await this.repository.updateBackupsById(id, { status })); }
}
