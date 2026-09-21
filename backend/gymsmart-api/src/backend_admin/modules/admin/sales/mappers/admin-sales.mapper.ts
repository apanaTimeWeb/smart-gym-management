// RESPONSIBILITY: Translates the TypeORM Admin sales entity into an ORM-independent domain model and frontend response.
// FLOW: AdminSalesEntity â†’ AdminSalesMapper â†’ domain/response object.

import { AdminSalesDomainModel } from '@/backend_admin/modules/admin/sales/domain/admin-sales.domain';
import { AdminSalesEntity } from '@/backend_admin/modules/admin/sales/entities/admin-sales-entity';

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

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminSalesDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
