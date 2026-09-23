// RESPONSIBILITY: Builds live backup health from persisted backup records; no demo snapshot is used.
// FLOW: Controller -> SuperadminBackupsHealthService -> SuperadminBackupsRepository -> PostgreSQL backup_records.
import { Injectable } from '@nestjs/common';
import { SuperadminBackupsHealthResponseDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-health-response.dto';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';

@Injectable()
export class SuperadminBackupsHealthService {
  constructor(private readonly repository: SuperadminBackupsRepository) {}

  /** Builds the backup health dashboard from persisted backup records. */
  async findBackupsHealth(_input: unknown = {}): Promise<SuperadminBackupsHealthResponseDto> {
    const page = await this.repository.findPage({ page: 1, limit: 500, sortBy: 'updatedAt', sortOrder: 'DESC' });
    const now = Date.now();
    const healthy = page.items.filter((row) => row.status === 'SUCCESS').length;
    const failed = page.items.filter((row) => row.status === 'FAILED').length;
    const warning = Math.max(0, page.items.length - healthy - failed);
    const tenants = page.items.map((row) => ({ gym: row.tenantName, lastBackup: row.timestamp.toISOString(), size: `${row.sizeMB} MB`, ageHours: Math.floor(Math.max(0, now - row.timestamp.getTime()) / 3_600_000), status: row.status }));
    return { summary: { healthy, warning, failed, lastRestoreTest: 'NOT_RECORDED', restoreTestStatus: 'NOT_RECORDED', recoveryPointTarget: 'NOT_CONFIGURED', recoveryTimeTarget: 'NOT_CONFIGURED' }, tenants, restoreHistory: [] };
  }
}
