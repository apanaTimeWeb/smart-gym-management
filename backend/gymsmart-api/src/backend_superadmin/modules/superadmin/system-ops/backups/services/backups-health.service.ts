// RESPONSIBILITY: Builds live backup health from persisted backup records; no demo snapshot is used.
// FLOW: Controller -> BackupsHealthService -> BackupsRepository -> PostgreSQL backup_records.
import { Injectable } from '@nestjs/common';
import { BackupsHealthResponseDto } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups-health-response.dto';
import { BackupsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.repository';

@Injectable()
export class BackupsHealthService {
  constructor(private readonly repository: BackupsRepository) {}

  /** Builds the backup health dashboard from persisted backup records. */
  async findBackupsHealth(_input: unknown = {}): Promise<BackupsHealthResponseDto> {
    const page = await this.repository.findPage({ page: 1, limit: 500, sortBy: 'updatedAt', sortOrder: 'DESC' });
    const now = Date.now();
    const healthy = page.items.filter((row) => row.status === 'SUCCESS').length;
    const failed = page.items.filter((row) => row.status === 'FAILED').length;
    const warning = Math.max(0, page.items.length - healthy - failed);
    const tenants = page.items.map((row) => ({ gym: row.tenantName, lastBackup: row.timestamp.toISOString(), size: `${row.sizeMB} MB`, ageHours: Math.floor(Math.max(0, now - row.timestamp.getTime()) / 3_600_000), status: row.status }));
    return { summary: { healthy, warning, failed, lastRestoreTest: 'NOT_RECORDED', restoreTestStatus: 'NOT_RECORDED', recoveryPointTarget: 'NOT_CONFIGURED', recoveryTimeTarget: 'NOT_CONFIGURED' }, tenants, restoreHistory: [] };
  }
}
