// RESPONSIBILITY: Translates the TypeORM Admin payouts entity into an ORM-independent domain model and frontend response.
// FLOW: AdminPayoutsEntity â†’ AdminPayoutsMapper â†’ domain/response object.
import { AdminPayoutsDomainModel } from '@/backend_admin/admin_modules/admin_payouts/payouts_domain/admin-payouts.domain'

import { AdminPayoutsEntity } from '@/backend_admin/admin_modules/admin_payouts/payouts_entities/admin-payouts-entity'

import { AdminGymPayoutDto, AdminPnLEntryDto, AdminPayoutsKPIDataDto } from '@/backend_admin/admin_modules/admin_payouts/payouts_dtos/admin-payouts-response.dto'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminPayouts.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminPayoutsMapper {
/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminPayoutsEntity): AdminPayoutsDomainModel {
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
