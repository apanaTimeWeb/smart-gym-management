// RESPONSIBILITY: Seeds deterministic development data for Admin members; never used in production runtime.
// FLOW: AdminCoreTenantSeeder -> AdminMembersSeeder -> TypeORM -> usage_snapshots.
import { DataSource } from 'typeorm';

import { AdminMembersEntity } from '@/backend_admin/admin_modules/admin_members/members_entities/admin-members-entity'

/**
 * @description Defines the AdminMembersSeeder boundary for the admin_members backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminMembersSeeder {
  /** @description Inserts deterministic, idempotent seed records when the feature table is empty. @param dataSource Tenant database source. @returns Completion promise. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(AdminMembersEntity);
    const count = await repository.count();
    if (count > 0) return;
    await repository.save([
      repository.create({ payload: {
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "phone": "9000000001",
  "branchId": "00000000-0000-0000-0000-000000000101",
  "branchName": "Buildronix Central",
  "planName": "Growth",
  "status": "active",
  "joinDate": "2026-02-01T00:00:00Z",
  "expiryDate": "2027-01-31T00:00:00Z",
  "pendingAmount": 0,
  "gender": "Male",
  "referralSource": "Instagram",
  "lastCheckIn": "2026-09-21T06:10:00Z",
  "totalVisits": 88
}, name: "Rahul Kumar", status: "ACTIVE", branchId: "00000000-0000-0000-0000-000000000101" } as any),
      repository.create({ payload: {
  "name": "Neha Singh",
  "email": "neha@example.com",
  "phone": "9000000002",
  "branchId": "00000000-0000-0000-0000-000000000101",
  "branchName": "Buildronix Central",
  "planName": "Starter",
  "status": "pending",
  "joinDate": "2026-09-05T00:00:00Z",
  "expiryDate": "2026-10-04T00:00:00Z",
  "pendingAmount": 150000,
  "gender": "Female",
  "referralSource": "Referral",
  "lastCheckIn": "2026-09-20T06:45:00Z",
  "totalVisits": 7
}, name: "Neha Singh", status: "PENDING", branchId: "00000000-0000-0000-0000-000000000101" } as any),
      repository.create({ payload: {
  "name": "Aman Verma",
  "email": "aman@example.com",
  "phone": "9000000003",
  "branchId": "00000000-0000-0000-0000-000000000102",
  "branchName": "Buildronix North",
  "planName": "Pro",
  "status": "expired",
  "joinDate": "2025-09-10T00:00:00Z",
  "expiryDate": "2026-09-10T00:00:00Z",
  "pendingAmount": 250000,
  "gender": "Male",
  "referralSource": "Website"
}, name: "Aman Verma", status: "EXPIRED", branchId: "00000000-0000-0000-0000-000000000102" } as any)
    ] as any);
  }
}
