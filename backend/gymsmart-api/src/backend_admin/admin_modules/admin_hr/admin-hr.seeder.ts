// RESPONSIBILITY: Seeds deterministic development data for Admin hr; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminHrSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminHrEntity } from '@/backend_admin/admin_modules/admin_hr/hr_entities/admin-hr-entity.js';

/**
 * @description Defines the AdminHrSeeder boundary for the admin_hr backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminHrSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminHrEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "employeeId": "EMP-001",
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "9000000101",
  "role": "TRAINER",
  "salary": 4500000,
  "branch": "Buildronix Central",
  "joinDate": "2025-06-01T00:00:00Z",
  "isActive": true,
  "salaryType": "MONTHLY",
  "paymentCycle": "MONTHLY",
  "currentDue": 0,
  "assignedBranches": [
    "Buildronix Central"
  ],
  "primaryBranchId": "00000000-0000-0000-0000-000000000101",
  "department": "TRAINING",
  "certifications": [
    "ACE"
  ],
  "contractType": "FULL_TIME"
}, name: "Priya Sharma", status: null, branchId: null }),
      repository.create({ payload: {
  "employeeId": "EMP-002",
  "name": "Amit Kumar",
  "email": "amit@example.com",
  "phone": "9000000102",
  "role": "MANAGER",
  "salary": 5200000,
  "branch": "Buildronix North",
  "joinDate": "2024-04-01T00:00:00Z",
  "isActive": true,
  "salaryType": "MONTHLY",
  "paymentCycle": "MONTHLY",
  "currentDue": 650000,
  "assignedBranches": [
    "Buildronix North"
  ],
  "primaryBranchId": "00000000-0000-0000-0000-000000000102",
  "department": "OPERATIONS",
  "contractType": "FULL_TIME"
}, name: "Amit Kumar", status: null, branchId: null })
    ]);
  }
}
