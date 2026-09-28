// RESPONSIBILITY: Defines dashboard domain and widget response shapes without ORM coupling.
// FLOW: Tenant persistence row -> domain snapshot -> widget-specific query service -> explicit response DTO.
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerDashboardDomainData { id: string; payload: ManagerCoreJsonObject; currency: string; }
export interface ManagerDashboardListResult { data: ManagerDashboardDomainData[]; meta: PaginationMeta; }

export interface ManagerDashboardKpiData {
  totalMembers: number; activeMembers: number; newMembersThisMonth: number;
  totalRevenue: number; monthlyRevenue: number; pendingPayments: number;
  totalStaff: number; activeStaff: number; totalProducts: number; lowStockCount: number;
  totalInquiries: number; newInquiries: number; todayAttendance: number;
  trainerAttendance: { present: number; total: number };
  churnRate: number; revenueGrowthPercent: number; todayCollection: number;
  frozenMembershipsCount: number; totalPTRevenue: number; currency: string;
}

export interface ManagerDashboardChartsData {
  memberGrowth: Array<{ month: string; count: number }>;
  revenueChart: Array<{ month: string; revenue: number }>;
  membersByPlan: Array<{ plan: string; count: number }>;
  membersByStatus: { active: number; pending: number; expired: number };
  currency: string;
}

export interface ManagerDashboardRecentMemberData { id: string; name: string; plan: string | { name: string }; status: string; joinDate: string; paidAmount: number; currency: string; }
export interface ManagerDashboardRecentPaymentData { id: string; invoiceNumber: string; amount: number; method: string; paidAt: string; member: { name: string }; currency: string; }
export interface ManagerDashboardPendingPaymentData { id: string; name: string; pendingAmount: number; expiryDate: string; currency: string; }
export interface ManagerDashboardRecentMembersData { recentMembers: any[]; totalRecentMembers: number; }
export interface ManagerDashboardRecentPaymentsData { recentPayments: any[]; }
export interface ManagerDashboardPendingPaymentsData { pendingPaymentsList: any[]; total: number; }
export interface ManagerDashboardExpiringMembershipsData { expiringMemberships: any[]; total: number; }
