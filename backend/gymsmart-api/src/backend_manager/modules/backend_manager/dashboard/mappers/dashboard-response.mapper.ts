// RESPONSIBILITY: Maps persisted Manager dashboard JSON into the frozen response contract.
// FLOW: Repository payload → dashboard response mapper → Dashboard query service → canonical response interceptor.

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

export class DashboardResponseMapper {
  /**
   * @description Converts persisted dashboard JSON into the complete frontend response shape.
   * @param payload - Persisted dashboard payload.
   * @returns Contract-complete dashboard response object with safe defaults.
   */
  static toResponse(payload: CoreJsonObject): CoreJsonObject {
    return {
      totalMembers: Number(payload.totalMembers ?? 0), activeMembers: Number(payload.activeMembers ?? 0), newMembersThisMonth: Number(payload.newMembersThisMonth ?? 0),
      totalRevenue: Number(payload.totalRevenue ?? 0), monthlyRevenue: Number(payload.monthlyRevenue ?? 0), pendingPayments: Number(payload.pendingPayments ?? 0),
      totalStaff: Number(payload.totalStaff ?? 0), activeStaff: Number(payload.activeStaff ?? 0), totalProducts: Number(payload.totalProducts ?? 0), lowStockCount: Number(payload.lowStockCount ?? 0),
      totalInquiries: Number(payload.totalInquiries ?? 0), newInquiries: Number(payload.newInquiries ?? 0), todayAttendance: Number(payload.todayAttendance ?? 0),
      trainerAttendance: (payload.trainerAttendance as CoreJsonObject) ?? { present: 0, total: 0 },
      memberGrowth: Array.isArray(payload.memberGrowth) ? payload.memberGrowth : [],
      revenueChart: Array.isArray(payload.revenueChart) ? payload.revenueChart : [],
      membersByPlan: Array.isArray(payload.membersByPlan) ? payload.membersByPlan : [],
      membersByStatus: (payload.membersByStatus as CoreJsonObject) ?? { active: 0, pending: 0, expired: 0 },
      recentMembers: Array.isArray(payload.recentMembers) ? payload.recentMembers : [],
      recentPayments: Array.isArray(payload.recentPayments) ? payload.recentPayments : [],
      pendingPaymentsList: Array.isArray(payload.pendingPaymentsList) ? payload.pendingPaymentsList : [],
      expiringMemberships: Array.isArray(payload.expiringMemberships) ? payload.expiringMemberships : [],
      churnRate: Number(payload.churnRate ?? 0), revenueGrowthPercent: Number(payload.revenueGrowthPercent ?? 0), todayCollection: Number(payload.todayCollection ?? 0),
      frozenMembershipsCount: Number(payload.frozenMembershipsCount ?? 0), totalPTRevenue: Number(payload.totalPTRevenue ?? 0),
    };
  }
}
