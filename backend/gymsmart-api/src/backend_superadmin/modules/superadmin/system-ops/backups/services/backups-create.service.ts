// RESPONSIBILITY: Executes creation business flow for the backups feature.
// FLOW: CommandController -> BackupsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.repository';
import { BackupsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.mapper';
import type { BackupsCreateInput, BackupsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/backups/types/backups.interfaces';
@Injectable()
export class BackupsCreateService {
  constructor(private readonly repository: BackupsRepository) {}
  /** Creates a new backups record. */
  async createBackups(input: BackupsCreateInput): Promise<BackupsDomainModel> { return BackupsMapper.toDomain(await this.repository.createBackups(input)); }
}