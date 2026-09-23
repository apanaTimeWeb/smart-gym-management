// RESPONSIBILITY: Records an explicit manual backup trigger in the backup feature state.
// FLOW: Controller -> BackupsTriggerService -> BackupsRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/backups.repository';
import { BackupsTriggerDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/dtos/backups-trigger.dto';
import { BackupsStatus } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/dtos/backups-update.dto';

@Injectable()
export class BackupsTriggerService {
  constructor(private readonly repository: BackupsRepository) {}

  /** Marks an immediate backup request as in-progress without blocking HTTP on storage work. */
  async triggerBackup(body: BackupsTriggerDto): Promise<null> {
    const tenantId = body.tenantId?.trim();
    if (tenantId) {
      const rows = await this.repository.findByTenantId(tenantId);
      const latest = rows[0];
      if (latest) await this.repository.updateBackupsById(latest.id, { status: BackupsStatus.INPROGRESS });
    }
    return null;
  }
}