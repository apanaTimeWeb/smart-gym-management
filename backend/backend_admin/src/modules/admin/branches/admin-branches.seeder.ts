// RESPONSIBILITY: Seeds deterministic development data for Admin branches; never used in production runtime.
// FLOW: CoreTenantSeeder -> AdminBranchesSeeder -> TypeORM -> usage_snapshots.

import { DataSource } from 'typeorm';
import { AdminBranchesEntity } from '@/modules/admin/branches/entities/admin-branches-entity';

export class AdminBranchesSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminBranchesEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "name": "Buildronix Central",
  "branchCode": "BR-001",
  "status": "active",
  "address": "Darbhanga, Bihar",
  "maxCapacity": 300,
  "currentOccupancy": 96,
  "equipmentCount": 48,
  "revenue": 3250000,
  "expenses": 1120000,
  "studentsCount": 412,
  "staffCount": 18
}, name: "Buildronix Central", status: "active", branchId: null }),
      repository.create({ payload: {
  "name": "Buildronix North",
  "branchCode": "BR-002",
  "status": "active",
  "address": "North Campus, Bihar",
  "maxCapacity": 220,
  "currentOccupancy": 71,
  "equipmentCount": 32,
  "revenue": 2180000,
  "expenses": 890000,
  "studentsCount": 280,
  "staffCount": 12
}, name: "Buildronix North", status: "active", branchId: null }),
      repository.create({ payload: {
  "name": "Buildronix Express",
  "branchCode": "BR-003",
  "status": "maintenance",
  "address": "Express Market, Bihar",
  "maxCapacity": 180,
  "currentOccupancy": 34,
  "equipmentCount": 20,
  "revenue": 980000,
  "expenses": 510000,
  "studentsCount": 138,
  "staffCount": 7
}, name: "Buildronix Express", status: "maintenance", branchId: null })
    ]);
  }
}
