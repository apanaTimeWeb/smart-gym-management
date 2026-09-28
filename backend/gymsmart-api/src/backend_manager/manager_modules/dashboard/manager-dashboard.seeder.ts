// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerDashboardEntity } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.entity';
import { DashboardRecordStatus } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.constants';

export class ManagerDashboardSeeder {
  /** Seeds one stable Manager dashboard record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerDashboardEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000013', payload: { seedKey: 'manager:dashboard:v1', name: 'Manager Dashboard Seed', status: 'ACTIVE', totalMembers: 1, activeMembers: 1, newMembersThisMonth: 1, totalRevenue: 100000, monthlyRevenue: 100000, pendingPayments: 0, totalStaff: 1, activeStaff: 1, totalProducts: 1, lowStockCount: 0, totalInquiries: 1, newInquiries: 1, todayAttendance: 1, trainerAttendance: { present: 1, total: 1 }, churnRate: 0, revenueGrowthPercent: 0, todayCollection: 100000, frozenMembershipsCount: 0, totalPTRevenue: 0, memberGrowth: [{ month: 'Seed', count: 1 }], revenueChart: [{ month: 'Seed', revenue: 100000, currency: 'INR' }], membersByPlan: [{ plan: 'Seed Plan', count: 1 }], membersByStatus: { active: 1, pending: 0, expired: 0 }, recentMembers: [{ id: '00000000-0000-4000-8000-000000000101', name: 'Seed Member', plan: { name: 'Seed Plan' }, status: 'active', joinDate: '2026-01-01T00:00:00.000Z', paidAmount: 100000, currency: 'INR' }], pendingPaymentsList: [], expiringMemberships: [] } , status: DashboardRecordStatus.ACTIVE, currency: 'INR' }, ['id']);
  }
}

export { ManagerDashboardSeeder as DashboardSeeder };
