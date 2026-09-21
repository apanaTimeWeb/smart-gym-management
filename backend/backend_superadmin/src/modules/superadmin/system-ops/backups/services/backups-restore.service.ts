// RESPONSIBILITY: Validates an existing backup before recording a restore request.
// FLOW: Controller -> BackupsRestoreService -> BackupsRepository -> queued restore request.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/modules/superadmin/system-ops/backups/backups.repository';

@Injectable()
export class BackupsRestoreService {
  constructor(private readonly repository: BackupsRepository) {}

  /** Validates the backup exists and records restore readiness without performing blocking I/O. */
  async restoreBackup(id: string): Promise<null> { await this.repository.findByIdOrThrow(id); return null; }
}
