// RESPONSIBILITY: Executes creation business flow for the backups feature.
// FLOW: CommandController -> SuperadminBackupsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminBackupsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.mapper';
import type { SuperadminBackupsCreateInput, SuperadminBackupsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/backups/types/superadmin-system-ops-backups.interfaces';
@Injectable()
export class SuperadminBackupsCreateService {
  constructor(private readonly repository: SuperadminBackupsRepository) {}
  /** Creates a new backups record. */
  async createBackups(input: SuperadminBackupsCreateInput): Promise<SuperadminBackupsDomainModel> { return SuperadminBackupsMapper.toDomain(await this.repository.createBackups(input)); }
}