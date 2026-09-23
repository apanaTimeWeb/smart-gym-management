// RESPONSIBILITY: Maps Coupons ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> CouponsMapper -> domain model -> response DTO.
import type { CouponsEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons.entity';
import type { CouponsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/types/coupons.interfaces';

export class CouponsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: CouponsEntity): CouponsDomainModel { return { ...entity } as CouponsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: CouponsEntity[]): CouponsDomainModel[] { return entities.map(CouponsMapper.toDomain); }
}
