// RESPONSIBILITY: Translates the TypeORM Admin subscriptions entity into an ORM-independent domain model and frontend response.
// FLOW: AdminSubscriptionsEntity â†’ AdminSubscriptionsMapper â†’ domain/response object.

import { AdminSubscriptionsDomainModel } from '@/backend_admin/modules/admin/subscriptions/domain/admin-subscriptions.domain';
import { AdminSubscriptionsEntity } from '@/backend_admin/modules/admin/subscriptions/entities/admin-subscriptions-entity';

export class AdminSubscriptionsMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminSubscriptionsEntity): AdminSubscriptionsDomainModel {
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
  toResponse(domain: AdminSubscriptionsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
