// RESPONSIBILITY: Translates the TypeORM Admin payouts entity into an ORM-independent domain model and frontend response.
// FLOW: AdminPayoutsEntity â†’ AdminPayoutsMapper â†’ domain/response object.

import { AdminPayoutsDomainModel } from '@/backend_admin/modules/admin/payouts/domain/admin-payouts.domain';
import { AdminPayoutsEntity } from '@/backend_admin/modules/admin/payouts/entities/admin-payouts-entity';

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

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminPayoutsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
