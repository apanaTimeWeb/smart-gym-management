// RESPONSIBILITY: Presents ORM-independent AdminDashboard domain data as the frontend response contract.
// FLOW: Domain object -> AdminDashboardResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminDashboardDomainModel } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_domain/admin-dashboard.domain.js';

import { AdminDashboardResponseDto, AdminDashboardKpisResponseDto } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_dtos/admin-dashboard-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminDashboard feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminDashboardResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminDashboardDomainModel): AdminDashboardResponseDto {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    } as any;
  }

/** @description Maps dashboard KPI fields without exposing ORM/read-model implementation details. @param domain Dashboard read model. @returns KPI widget contract. */
  toKpisResponse(domain: AdminDashboardDomainModel): AdminDashboardKpisResponseDto {
    return {
      totalMembers: Number(domain.data.totalMembers ?? 0), activeMembers: Number(domain.data.activeMembers ?? 0), newMembersThisMonth: Number(domain.data.newMembersThisMonth ?? 0),
      totalRevenue: Number(domain.data.totalRevenue ?? 0), monthlyRevenue: Number(domain.data.monthlyRevenue ?? 0), netProfit: Number(domain.data.netProfit ?? 0), totalExpenses: Number(domain.data.totalExpenses ?? 0), pendingPayments: Number(domain.data.pendingPayments ?? 0),
      totalStaff: Number(domain.data.totalStaff ?? 0), activeStaff: Number(domain.data.activeStaff ?? 0), totalProducts: Number(domain.data.totalProducts ?? 0), lowStockCount: Number(domain.data.lowStockCount ?? 0), totalInquiries: Number(domain.data.totalInquiries ?? 0), newInquiries: Number(domain.data.newInquiries ?? 0),
      cancellationRate: Number(domain.data.cancellationRate ?? 0), retentionRate: Number(domain.data.retentionRate ?? 0), arpm: Number(domain.data.arpm ?? 0), currency: String(domain.data.currency ?? 'INR'),
      todayAttendance: Number(domain.data.todayAttendance ?? 0), expiringThisWeek: Number(domain.data.expiringThisWeek ?? 0), totalInquiriesOpen: Number(domain.data.totalInquiriesOpen ?? 0), avgAttendance: Number(domain.data.avgAttendance ?? 0), renewalsPending: Number(domain.data.renewalsPending ?? 0),
    };
  }

/** @description Preserves the legacy response shape from the same dashboard domain model without ORM leakage. @param domain Dashboard domain model. @returns Legacy dashboard response. */
  toLegacyResponse(domain: AdminDashboardDomainModel): AdminDashboardResponseDto {
    return this.toResponse(domain);
  }
}
