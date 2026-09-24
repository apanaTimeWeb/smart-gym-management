// RESPONSIBILITY: Maps Coupons ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminSaasBillingCouponsMapper -> domain model -> response DTO.
import type { SuperadminSaasBillingCouponsEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.entity';
import type { SuperadminCouponsDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_types/superadmin-saas-billing-coupons.interfaces';

/**
 * Primary Intent: Defines SuperadminSaasBillingCouponsMapper as the class-level contract for superadmin-saas-billing-coupons.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSaasBillingCouponsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminSaasBillingCouponsEntity): SuperadminCouponsDomainModel { return { ...entity } as SuperadminCouponsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminSaasBillingCouponsEntity[]): SuperadminCouponsDomainModel[] { return entities.map(SuperadminSaasBillingCouponsMapper.toDomain); }
}
