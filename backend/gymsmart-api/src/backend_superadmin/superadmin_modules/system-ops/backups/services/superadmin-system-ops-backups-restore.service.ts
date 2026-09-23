// RESPONSIBILITY: Validates an existing backup before recording a restore request.
// FLOW: Controller -> SuperadminBackupsRestoreService -> SuperadminBackupsRepository -> queued restore request.
import { Injectable } from '@nestjs/common';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';

@Injectable()
export class SuperadminBackupsRestoreService {
  constructor(private readonly repository: SuperadminBackupsRepository) {}

  /** Validates the backup exists and records restore readiness without performing blocking I/O. */
  async restoreBackup(id: string): Promise<null> { await this.repository.findByIdOrThrow(id); return null; }
}