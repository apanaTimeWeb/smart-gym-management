// RESPONSIBILITY: Executes single-record retrieval for the backups feature.
// FLOW: QueryController -> BackupsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/modules/superadmin/system-ops/backups/backups.repository';
import { BackupsMapper } from '@/modules/superadmin/system-ops/backups/backups.mapper';
import type { BackupsDomainModel } from '@/modules/superadmin/system-ops/backups/types/backups.interfaces';
@Injectable()
export class BackupsFindService {
  constructor(private readonly repository: BackupsRepository) {}
  /** Retrieves one active backups record by UUID. */
  async findBackupsById(id: string): Promise<BackupsDomainModel> { return BackupsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
