// RESPONSIBILITY: Performs status transitions for backups records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminBackupsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.mapper';
import type { SuperadminBackupsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/backups/types/superadmin-system-ops-backups.interfaces';
@Injectable()
export class SuperadminBackupsStatusService {
  constructor(private readonly repository: SuperadminBackupsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeBackupsStatus(id: string, status: string): Promise<SuperadminBackupsDomainModel> { return SuperadminBackupsMapper.toDomain(await this.repository.updateBackupsById(id, { status })); }
}