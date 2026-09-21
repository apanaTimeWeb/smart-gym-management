// RESPONSIBILITY: Translates the TypeORM Admin finance entity into an ORM-independent domain model and frontend response.
// FLOW: AdminFinanceEntity → AdminFinanceMapper → domain/response object.

import { AdminFinanceDomainModel } from '@/modules/admin/finance/domain/admin-finance.domain';
import { AdminFinanceEntity } from '@/modules/admin/finance/entities/admin-finance-entity';

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

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminFinanceDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
