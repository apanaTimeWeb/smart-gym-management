// RESPONSIBILITY: Presents ORM-independent AdminFinance domain data as the frontend response contract.
// FLOW: Domain object -> AdminFinanceResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminFinanceDomainModel } from '@/backend_admin/admin_modules/admin_finance/finance_domain/admin-finance.domain.js';

import { AdminFinanceSummaryResponseDto, AdminFinancePnlRecordDto } from '@/backend_admin/admin_modules/admin_finance/finance_dtos/admin-finance-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminFinance feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminFinanceResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminFinanceDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps finance summary read-model data to its typed response. @param domain Read-model domain object. @returns Typed summary response. */
  toSummaryResponse(domain: AdminFinanceDomainModel): AdminFinanceSummaryResponseDto {
    if (!domain.data.summary || typeof domain.data.summary !== 'object') throw new Error('FINANCE.SUMMARY.INVALID');
    return Object.assign(new AdminFinanceSummaryResponseDto(), domain.data.summary);
  }

/** @description Maps finance P&L rows from the read model into typed response DTOs. @param domain Read-model domain object. @returns P&L rows. */
  toPnlResponse(domain: AdminFinanceDomainModel): AdminFinancePnlRecordDto[] {
    if (!Array.isArray(domain.data.pnl)) return [];
    return domain.data.pnl.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign(new AdminFinancePnlRecordDto(), item));
  }
}
