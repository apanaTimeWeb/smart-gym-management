// RESPONSIBILITY: Records an explicit manual backup trigger in the backup feature state.
// FLOW: Controller -> SuperadminBackupsTriggerService -> SuperadminBackupsRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminBackupsTriggerDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/dtos/superadmin-system-ops-backups-trigger.dto';
import { BackupsStatus } from '@/backend_superadmin/superadmin_modules/system-ops/backups/dtos/superadmin-system-ops-backups-update.dto';

@Injectable()
export class SuperadminBackupsTriggerService {
  constructor(private readonly repository: SuperadminBackupsRepository) {}

  /** Marks an immediate backup request as in-progress without blocking HTTP on storage work. */
  async triggerBackup(body: SuperadminBackupsTriggerDto): Promise<null> {
    const tenantId = body.tenantId?.trim();
    if (tenantId) {
      const rows = await this.repository.findByTenantId(tenantId);
      const latest = rows[0];
      if (latest) await this.repository.updateBackupsById(latest.id, { status: BackupsStatus.INPROGRESS });
    }
    return null;
  }
}