// RESPONSIBILITY: TypeORM persistence entity for coupons feature data stored in `coupons`.
// FLOW: coupons repository -> Coupon entity -> PostgreSQL `coupons`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { CouponDiscountType, CouponStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.constants';

/**
 * Primary Intent: Defines SuperadminSaasBillingCouponsEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_coupons')
@Index('IDX_coupons_updated_at', ['updatedAt'])
export class SuperadminSaasBillingCouponsEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property code. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Index('IDX_coupons_code')
  @Column({ name: 'code', type: 'varchar', length: 500 })
  code!: string;
  /**
 * Primary Intent: Documents entity property discountType. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'discount_type', type: 'enum', enum: CouponDiscountType })
  discountType!: CouponDiscountType;
  /**
 * Primary Intent: Documents entity property discountValue. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'discount_value', type: 'integer', default: 0 })
  discountValue!: number;
  /**
 * Primary Intent: Documents entity property maxUses. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'max_uses', type: 'integer', default: 0 })
  maxUses!: number;
  /**
 * Primary Intent: Documents entity property currentUses. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'current_uses', type: 'integer', default: 0 })
  currentUses!: number;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: CouponStatus })
  status!: CouponStatus;
  /**
 * Primary Intent: Documents entity property expiryDate. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'expiry_date', type: 'timestamptz' })
  expiryDate!: Date;
  /**
 * Primary Intent: Documents entity property redemptions. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'redemptions', type: 'jsonb', default: () => "'[]'::jsonb" })
  redemptions!: unknown;
}
