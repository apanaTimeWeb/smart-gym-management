// RESPONSIBILITY: Translates the TypeORM Admin finance entity into an ORM-independent domain model and frontend response.
// FLOW: AdminFinanceEntity â†’ AdminFinanceMapper â†’ domain/response object.
import { AdminFinanceDomainModel } from '@/backend_admin/admin_modules/admin_finance/finance_domain/admin-finance.domain'

import { AdminFinanceEntity } from '@/backend_admin/admin_modules/admin_finance/finance_entities/admin-finance-entity'

import { AdminFinanceSummaryResponseDto, AdminFinancePnlRecordDto } from '@/backend_admin/admin_modules/admin_finance/finance_dtos/admin-finance-response.dto'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminFinance.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminFinanceMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminFinanceEntity): AdminFinanceDomainModel {
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
