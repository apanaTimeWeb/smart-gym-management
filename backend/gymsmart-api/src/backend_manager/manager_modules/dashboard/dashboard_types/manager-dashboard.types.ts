// RESPONSIBILITY: Defines dashboard domain and widget response shapes without ORM coupling.
// FLOW: Tenant persistence row -> domain snapshot -> widget-specific query service -> explicit response DTO.
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface DashboardDomainData { id: string; payload: ManagerCoreJsonObject; currency: string; }
export interface DashboardListResult { data: DashboardDomainData[]; meta: PaginationMeta; }

export interface DashboardKpiData {
  totalMembers: number; activeMembers: number; newMembersThisMonth: number;
  totalRevenue: number; monthlyRevenue: number; pendingPayments: number;
  totalStaff: number; activeStaff: number; totalProducts: number; lowStockCount: number;
  totalInquiries: number; newInquiries: number; todayAttendance: number;
  trainerAttendance: { present: number; total: number };
  churnRate: number; revenueGrowthPercent: number; todayCollection: number;
  frozenMembershipsCount: number; totalPTRevenue: number; currency: string;
}

export interface DashboardChartsData {
  memberGrowth: Array<{ month: string; count: number }>;
  revenueChart: Array<{ month: string; revenue: number }>;
  membersByPlan: Array<{ plan: string; count: number }>;
  membersByStatus: { active: number; pending: number; expired: number };
  currency: string;
}

export interface DashboardRecentMemberData { id: string; name: string; plan: string | { name: string }; status: string; joinDate: string; paidAmount: number; currency: string; }
export interface DashboardRecentPaymentData { id: string; invoiceNumber: string; amount: number; method: string; paidAt: string; member: { name: string }; currency: string; }
export interface DashboardPendingPaymentData { id: string; name: string; pendingAmount: number; expiryDate: string; currency: string; }
export interface DashboardRecentMembersData { recentMembers: DashboardRecentMemberData[]; totalRecentMembers: number; }
export interface DashboardRecentPaymentsData { recentPayments: DashboardRecentPaymentData[]; }
export interface DashboardPendingPaymentsData { pendingPaymentsList: DashboardPendingPaymentData[]; total: number; }
export interface DashboardExpiringMembershipsData { expiringMemberships: DashboardPendingPaymentData[]; total: number; }
