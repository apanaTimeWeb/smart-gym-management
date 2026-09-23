// RESPONSIBILITY: Executes partial update business flow for the backups feature.
// FLOW: CommandController -> SuperadminBackupsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminBackupsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.mapper';
import type { SuperadminBackupsDomainModel, SuperadminBackupsUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/backups/types/superadmin-system-ops-backups.interfaces';
@Injectable()
export class SuperadminBackupsUpdateService {
  constructor(private readonly repository: SuperadminBackupsRepository) {}
  /** Updates a backups record by UUID. */
  async updateBackups(id: string, input: SuperadminBackupsUpdateInput): Promise<SuperadminBackupsDomainModel> { return SuperadminBackupsMapper.toDomain(await this.repository.updateBackupsById(id, input)); }
}