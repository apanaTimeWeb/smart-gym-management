// RESPONSIBILITY: TypeORM persistence entity for coupons feature data stored in `coupons`.
// FLOW: coupons repository -> Coupon entity -> PostgreSQL `coupons`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/core/database/base.entity';

export enum CouponDiscountType {
  PERCENTAGE = 'PERCENTAGE',
  EXACT = 'EXACT',
}

export enum CouponStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
  DEPLETED = 'DEPLETED',
}

@Entity('coupons')
@Index('IDX_coupons_updated_at', ['updatedAt'])
export class CouponEntity extends BaseEntity {
  @Index('IDX_coupons_code')
  @Column({ name: 'code', type: 'varchar', length: 500 })
  code!: string;
  @Column({ name: 'discount_type', type: 'enum', enum: CouponDiscountType })
  discountType!: CouponDiscountType;
  @Column({ name: 'discount_value', type: 'integer', default: 0 })
  discountValue!: number;
  @Column({ name: 'max_uses', type: 'integer', default: 0 })
  maxUses!: number;
  @Column({ name: 'current_uses', type: 'integer', default: 0 })
  currentUses!: number;
  @Column({ name: 'status', type: 'enum', enum: CouponStatus })
  status!: CouponStatus;
  @Column({ name: 'expiry_date', type: 'timestamptz' })
  expiryDate!: Date;
  @Column({ name: 'redemptions', type: 'jsonb', default: () => "'[]'::jsonb" })
  redemptions!: unknown;
}
