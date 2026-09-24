// RESPONSIBILITY: Builds live backup health from persisted backup records; no demo snapshot is used.
// FLOW: Controller -> SuperadminSystemOpsBackupsHealthService -> SuperadminSystemOpsBackupsRepository -> PostgreSQL backup_records.
import { Injectable } from '@nestjs/common';
import { SuperadminSystemOpsBackupsHealthResponseDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-health-response.dto';
import { SuperadminSystemOpsBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsHealthService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupsHealthService {
  constructor(private readonly repository: SuperadminSystemOpsBackupsRepository) {}
/**
 * Primary Intent: Executes the findBackupsHealth use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findBackupsHealth use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findBackupsHealth(_input: unknown = {}): Promise<SuperadminSystemOpsBackupsHealthResponseDto> {
    const page = await this.repository.findPage({ page: 1, limit: 500, sortBy: 'updatedAt', sortOrder: 'DESC' });
    const now = Date.now();
    const healthy = page.items.filter((row) => row.status === 'SUCCESS').length;
    const failed = page.items.filter((row) => row.status === 'FAILED').length;
    const warning = Math.max(0, page.items.length - healthy - failed);
    const tenants = page.items.map((row) => ({ gym: row.tenantName, lastBackup: row.timestamp.toISOString(), size: `${row.sizeMB} MB`, ageHours: Math.floor(Math.max(0, now - row.timestamp.getTime()) / 3_600_000), status: row.status }));
    return { summary: { healthy, warning, failed, lastRestoreTest: 'NOT_RECORDED', restoreTestStatus: 'NOT_RECORDED', recoveryPointTarget: 'NOT_CONFIGURED', recoveryTimeTarget: 'NOT_CONFIGURED' }, tenants, restoreHistory: [] };
  }
}
