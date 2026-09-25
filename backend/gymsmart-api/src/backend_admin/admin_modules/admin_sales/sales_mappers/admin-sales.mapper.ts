// RESPONSIBILITY: Translates the TypeORM Admin sales entity into an ORM-independent domain model and frontend response.
// FLOW: AdminSalesEntity â†’ AdminSalesMapper â†’ domain/response object.
import { AdminSalesDomainModel } from '@/backend_admin/admin_modules/admin_sales/sales_domain/admin-sales.domain'

import { AdminSalesEntity } from '@/backend_admin/admin_modules/admin_sales/sales_entities/admin-sales-entity'

import { AdminSalesOverviewResponseDto, ReferralDataPointDto, AdminSalesMembershipReportResponseDto, AdminSalesPendingPaymentsResponseDto, AdminSalesAllMembershipsResponseDto, AdminSalesStoreOrdersResponseDto, AdminSalesStoreSummaryResponseDto } from '@/backend_admin/admin_modules/admin_sales/sales_dtos/admin-sales-response.dto'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminSales.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminSalesMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminSalesEntity): AdminSalesDomainModel {
    return {
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      name: entity.name,
      status: entity.status,
      data: { ...entity.payload },
    };
  }
}
