// RESPONSIBILITY: Seeds deterministic development data for Admin permissions; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminPermissionsSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminPermissionsEntity } from '@/backend_admin/admin_modules/admin_permissions/permissions_entities/admin-permissions-entity'

/**
 * @description Defines the AdminPermissionsSeeder boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPermissionsSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminPermissionsEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "roleDefaults": [
    {
      "role": "manager",
      "permissions": {
        "dashboard.view": true,
        "members.view": true,
        "members.edit": true,
        "finance.view": true
      }
    },
    {
      "role": "trainer",
      "permissions": {
        "dashboard.view": true,
        "members.view": true,
        "attendance.edit": true
      }
    }
  ],
  "gymOverrides": []
}, name: null, status: null, branchId: null })
    ]);
  }
}
