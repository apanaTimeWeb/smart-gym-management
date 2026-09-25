// RESPONSIBILITY: Presents ORM-independent AdminSales domain data as the frontend response contract.
// FLOW: Domain object -> AdminSalesResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminSalesDomainModel } from '@/backend_admin/admin_modules/admin_sales/sales_domain/admin-sales.domain'

import { AdminSalesOverviewResponseDto, ReferralDataPointDto, AdminSalesMembershipReportResponseDto, AdminSalesPendingPaymentsResponseDto, AdminSalesAllMembershipsResponseDto, AdminSalesStoreOrdersResponseDto, AdminSalesStoreSummaryResponseDto } from '@/backend_admin/admin_modules/admin_sales/sales_dtos/admin-sales-response.dto'


/**
 * @description Owns frontend response presentation for the AdminSales feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminSalesResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminSalesDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps sales overview read-model data into the typed frontend contract. @param domain Read-model domain object. @returns Overview response. */
  toOverviewResponse(domain: AdminSalesDomainModel): AdminSalesOverviewResponseDto {
    const monthlyRevenue = Array.isArray(domain.data.monthlyRevenue) ? domain.data.monthlyRevenue.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign({}, item)) : [];
    return Object.assign(new AdminSalesOverviewResponseDto(), { monthlyRevenue });
  }

/** @description Maps referral source points into typed DTOs. @param domain Read-model domain object. @returns Referral points. */
  toReferralResponse(domain: AdminSalesDomainModel): ReferralDataPointDto[] {
    const rows = Array.isArray(domain.data.referralData) ? domain.data.referralData : [];
    return rows.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign(new ReferralDataPointDto(), item));
  }

/** @description Maps the membership report read-model payload into its typed response. @param domain Read-model domain object. @returns Membership report response. */
  toMembershipReportResponse(domain: AdminSalesDomainModel): AdminSalesMembershipReportResponseDto {
    if (!domain.data.report || typeof domain.data.report !== 'object') throw new Error('SALES.MEMBERSHIP_REPORT.INVALID');
    return Object.assign(new AdminSalesMembershipReportResponseDto(), domain.data.report);
  }

/** @description Maps pending payments read-model data into its typed response. @param domain Read-model domain object. @returns Pending payment response. */
  toPendingPaymentsResponse(domain: AdminSalesDomainModel): AdminSalesPendingPaymentsResponseDto {
    const members = Array.isArray(domain.data.members) ? domain.data.members.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign({}, item)) : [];
    return Object.assign(new AdminSalesPendingPaymentsResponseDto(), { members, total: members.length });
  }

/** @description Maps all membership rows from the read model into the typed response. @param domain Read-model domain object. @returns Membership response. */
  toAllMembershipsResponse(domain: AdminSalesDomainModel): AdminSalesAllMembershipsResponseDto {
    const members = Array.isArray(domain.data.allMemberships) ? domain.data.allMemberships.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign({}, item)) : [];
    return Object.assign(new AdminSalesAllMembershipsResponseDto(), { members, total: members.length });
  }

/** @description Maps store order rows into the typed response. @param domain Read-model domain object. @returns Store order response. */
  toStoreOrdersResponse(domain: AdminSalesDomainModel): AdminSalesStoreOrdersResponseDto {
    const orders = Array.isArray(domain.data.orders) ? domain.data.orders.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign({}, item)) : [];
    return Object.assign(new AdminSalesStoreOrdersResponseDto(), { orders, total: orders.length });
  }

/** @description Maps store summary read-model data into the typed response. @param domain Read-model domain object. @returns Store summary response. */
  toStoreSummaryResponse(domain: AdminSalesDomainModel): AdminSalesStoreSummaryResponseDto {
    if (!domain.data.storeSummary || typeof domain.data.storeSummary !== 'object') throw new Error('SALES.STORE_SUMMARY.INVALID');
    return Object.assign(new AdminSalesStoreSummaryResponseDto(), { summary: domain.data.storeSummary });
  }
}
