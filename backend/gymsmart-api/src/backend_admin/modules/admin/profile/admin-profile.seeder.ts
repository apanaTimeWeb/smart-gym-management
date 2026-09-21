// RESPONSIBILITY: Seeds deterministic development data for Admin profile; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminProfileSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminProfileEntity } from '@/backend_admin/modules/admin/profile/entities/admin-profile-entity';

export class AdminProfileSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminProfileEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "name": "Buildronix Admin",
  "email": "admin@example.com",
  "phone": "9999999999",
  "role": "ADMIN",
  "branchName": "All Branches",
  "joinedAt": "2025-01-01T00:00:00Z",
  "avatarInitial": "B"
}, name: "Buildronix Admin", status: null, branchId: null })
    ]);
  }
}
