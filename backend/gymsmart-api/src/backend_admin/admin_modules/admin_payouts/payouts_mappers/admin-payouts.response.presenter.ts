// RESPONSIBILITY: Presents ORM-independent AdminPayouts domain data as the frontend response contract.
// FLOW: Domain object -> AdminPayoutsResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminPayoutsDomainModel } from '@/backend_admin/admin_modules/admin_payouts/payouts_domain/admin-payouts.domain'

import { AdminGymPayoutDto, AdminPnLEntryDto, AdminPayoutsKPIDataDto } from '@/backend_admin/admin_modules/admin_payouts/payouts_dtos/admin-payouts-response.dto'


/**
 * @description Owns frontend response presentation for the AdminPayouts feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminPayoutsResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminPayoutsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps payout rows from the read model into typed frontend DTOs. @param domain Read-model domain object. @returns Payout rows. */
  toPayoutsResponse(domain: AdminPayoutsDomainModel): AdminGymPayoutDto[] {
    if (!Array.isArray(domain.data.payouts)) return [];
    return domain.data.payouts.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign(new AdminGymPayoutDto(), item));
  }

/** @description Maps P&L rows from the read model into typed frontend DTOs. @param domain Read-model domain object. @returns P&L rows. */
  toPnlResponse(domain: AdminPayoutsDomainModel): AdminPnLEntryDto[] {
    if (!Array.isArray(domain.data.pnl)) return [];
    return domain.data.pnl.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign(new AdminPnLEntryDto(), item));
  }

/** @description Maps payout KPI read-model data to its typed frontend DTO. @param domain Read-model domain object. @returns KPI response. */
  toKpiResponse(domain: AdminPayoutsDomainModel): AdminPayoutsKPIDataDto {
    if (!domain.data || typeof domain.data !== 'object') throw new Error('PAYOUTS.KPI.INVALID');
    return Object.assign(new AdminPayoutsKPIDataDto(), domain.data);
  }
}
