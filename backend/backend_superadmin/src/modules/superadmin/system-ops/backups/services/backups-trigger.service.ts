// RESPONSIBILITY: Records an explicit manual backup trigger in the backup feature state.
// FLOW: Controller -> BackupsTriggerService -> BackupsRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/modules/superadmin/system-ops/backups/backups.repository';

@Injectable()
export class BackupsTriggerService {
  constructor(private readonly repository: BackupsRepository) {}

  /** Marks an immediate backup request as pending without blocking the HTTP request on storage work. */
  async triggerBackup(body: Record<string, unknown>): Promise<null> {
    const tenantId = typeof body.tenantId === 'string' ? body.tenantId : null;
    if (tenantId) { const rows = await this.repository.findByTenantId(tenantId); if (rows[0]) await this.repository.updateBackupsById(rows[0].id, { status: 'PENDING' }); }
    return null;
  }
}
