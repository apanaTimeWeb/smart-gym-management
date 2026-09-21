// RESPONSIBILITY: Translates the TypeORM Admin coupons entity into an ORM-independent domain model and frontend response.
// FLOW: AdminCouponsEntity â†’ AdminCouponsMapper â†’ domain/response object.

import { AdminCouponsDomainModel } from '@/backend_admin/modules/admin/coupons/domain/admin-coupons.domain';
import { AdminCouponsEntity } from '@/backend_admin/modules/admin/coupons/entities/admin-coupons-entity';

export class AdminCouponsMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminCouponsEntity): AdminCouponsDomainModel {
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
  toResponse(domain: AdminCouponsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
