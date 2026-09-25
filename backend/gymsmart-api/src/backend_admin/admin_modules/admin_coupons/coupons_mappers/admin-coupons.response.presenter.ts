// RESPONSIBILITY: Presents ORM-independent AdminCoupons domain data as the frontend response contract.
// FLOW: Domain object -> AdminCouponsResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminCouponsDomainModel } from '@/backend_admin/admin_modules/admin_coupons/coupons_domain/admin-coupons.domain.js';

import { AdminCouponsKPIDataDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminCoupons feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminCouponsResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminCouponsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps coupon KPI read-model data to its typed frontend DTO. @param domain Read-model domain object. @returns Typed KPI response. */
  toKpiResponse(domain: AdminCouponsDomainModel): AdminCouponsKPIDataDto {
    if (!domain.data || typeof domain.data !== 'object') throw new Error('COUPONS.RESPONSE.INVALID');
    return Object.assign(new AdminCouponsKPIDataDto(), domain.data);
  }
}
