// RESPONSIBILITY: Executes single-record retrieval for the backups feature.
// FLOW: QueryController -> SuperadminBackupsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminBackupsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.mapper';
import type { SuperadminBackupsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/backups/types/superadmin-system-ops-backups.interfaces';
@Injectable()
export class SuperadminBackupsFindService {
  constructor(private readonly repository: SuperadminBackupsRepository) {}
  /** Retrieves one active backups record by UUID. */
  async findBackupsById(id: string): Promise<SuperadminBackupsDomainModel> { return SuperadminBackupsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}