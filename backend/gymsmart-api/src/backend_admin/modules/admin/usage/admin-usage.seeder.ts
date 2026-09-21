// RESPONSIBILITY: Seeds deterministic development data for Admin usage; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminUsageSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminUsageEntity } from '@/backend_admin/modules/admin/usage/entities/admin-usage-entity';

export class AdminUsageSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminUsageEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "storageUsed": 32,
  "storageLimit": 100,
  "membersUsed": 830,
  "membersLimit": 1000,
  "staffUsed": 37,
  "staffLimit": 50,
  "gymsUsed": 3,
  "gymsLimit": 3,
  "apiRequestsUsed": 68320,
  "apiRequestsLimit": 100000,
  "currentPlan": "Growth",
  "renewalDate": "2027-09-01T00:00:00Z",
  "usagePercent": 83,
  "planName": "Growth",
  "plans": [
    {
      "name": "Starter",
      "memberLimit": 300
    },
    {
      "name": "Growth",
      "memberLimit": 1000
    },
    {
      "name": "Pro",
      "memberLimit": 5000
    }
  ]
}, name: null, status: null, branchId: null })
    ]);
  }
}
