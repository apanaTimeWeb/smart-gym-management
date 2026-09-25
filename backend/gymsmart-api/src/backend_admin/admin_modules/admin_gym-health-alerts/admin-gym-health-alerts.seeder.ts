// RESPONSIBILITY: Seeds deterministic development data for Admin gym-health-alerts; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminGymHealthAlertsSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminGymHealthAlertsEntity } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_entities/admin-gym-health-alerts-entity'

/**
 * @description Defines the AdminGymHealthAlertsSeeder boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymHealthAlertsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminGymHealthAlertsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "gymId": "00000000-0000-0000-0000-000000000102",
  "gymName": "Buildronix North",
  "alertType": "LOW_STOCK",
  "severity": "critical",
  "title": "Protein stock low",
  "description": "Protein stock has fallen below the configured threshold.",
  "metric": 6,
  "threshold": 10,
  "detectedAt": "2026-09-21T07:15:00Z",
  "isResolved": false,
  "alertAge": 1
}, name: null, status: null, branchId: null })
    ]);
  }
}
