// RESPONSIBILITY: Seeds deterministic development data for Admin audit_logs; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminAuditLogsSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminAuditLogsEntity } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_entities/admin-audit-logs-entity.js';

/**
 * @description Defines the AdminAuditLogsSeeder boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminAuditLogsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "timestamp": "2026-09-21T08:00:00Z",
  "action": "MEMBER_UPDATED",
  "user": "admin@example.com",
  "branchId": "00000000-0000-0000-0000-000000000101",
  "details": "Member profile updated.",
  "severity": "low",
  "module": "members",
  "affectedRecordId": "00000000-0000-0000-0000-000000001001"
}, name: null, status: null, branchId: "00000000-0000-0000-0000-000000000101" })
    ]);
  }
}
