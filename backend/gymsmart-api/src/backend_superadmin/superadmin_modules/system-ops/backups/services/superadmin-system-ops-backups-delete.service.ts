// RESPONSIBILITY: Executes the soft-delete flow for the backups feature.
// FLOW: CommandController -> SuperadminBackupsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
@Injectable()
export class SuperadminBackupsDeleteService {
  constructor(private readonly repository: SuperadminBackupsRepository) {}
  /** Soft-deletes one backups record. */
  async deleteBackups(id: string): Promise<null> { await this.repository.deleteBackupsById(id); return null; }
}