// RESPONSIBILITY: Executes partial update business flow for the backups feature.
// FLOW: CommandController -> BackupsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.repository';
import { BackupsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.mapper';
import type { BackupsDomainModel, BackupsUpdateInput } from '@/backend_superadmin/modules/superadmin/system-ops/backups/types/backups.interfaces';
@Injectable()
export class BackupsUpdateService {
  constructor(private readonly repository: BackupsRepository) {}
  /** Updates a backups record by UUID. */
  async updateBackups(id: string, input: BackupsUpdateInput): Promise<BackupsDomainModel> { return BackupsMapper.toDomain(await this.repository.updateBackupsById(id, input)); }
}