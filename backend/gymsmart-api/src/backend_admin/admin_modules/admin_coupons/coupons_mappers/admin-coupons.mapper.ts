// RESPONSIBILITY: Translates the TypeORM Admin coupons entity into an ORM-independent domain model and frontend response.
// FLOW: AdminCouponsEntity â†’ AdminCouponsMapper â†’ domain/response object.
import { AdminCouponsDomainModel } from '@/backend_admin/admin_modules/admin_coupons/coupons_domain/admin-coupons.domain.js';

import { AdminCouponsEntity } from '@/backend_admin/admin_modules/admin_coupons/coupons_entities/admin-coupons-entity.js';

import { AdminCouponsKPIDataDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-response.dto.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminCoupons.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
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
}
