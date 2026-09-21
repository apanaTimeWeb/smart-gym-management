// RESPONSIBILITY: Executes the soft-delete flow for the backups feature.
// FLOW: CommandController -> BackupsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/modules/superadmin/system-ops/backups/backups.repository';
@Injectable()
export class BackupsDeleteService {
  constructor(private readonly repository: BackupsRepository) {}
  /** Soft-deletes one backups record. */
  async deleteBackups(id: string): Promise<null> { await this.repository.deleteBackupsById(id); return null; }
}
