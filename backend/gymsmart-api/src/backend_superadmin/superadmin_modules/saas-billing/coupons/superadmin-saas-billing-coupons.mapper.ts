// RESPONSIBILITY: Maps Coupons ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminCouponsMapper -> domain model -> response DTO.
import type { SuperadminCouponsEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.entity';
import type { SuperadminCouponsDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/types/superadmin-saas-billing-coupons.interfaces';

export class SuperadminCouponsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminCouponsEntity): SuperadminCouponsDomainModel { return { ...entity } as SuperadminCouponsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminCouponsEntity[]): SuperadminCouponsDomainModel[] { return entities.map(SuperadminCouponsMapper.toDomain); }
}
