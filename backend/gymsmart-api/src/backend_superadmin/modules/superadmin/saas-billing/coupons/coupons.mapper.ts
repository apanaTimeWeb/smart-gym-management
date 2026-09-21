// RESPONSIBILITY: Maps Coupons ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> CouponsMapper -> domain model -> response DTO.
import type { CouponEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/coupons.entity';
import type { CouponsDomainModel } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/types/coupons.interfaces';

export class CouponsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: CouponEntity): CouponsDomainModel { return { ...entity } as CouponsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: CouponEntity[]): CouponsDomainModel[] { return entities.map(CouponsMapper.toDomain); }
}
