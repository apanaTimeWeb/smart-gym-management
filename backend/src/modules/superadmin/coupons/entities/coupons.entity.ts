import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum CouponStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  DEPLETED = 'DEPLETED',
}

@Entity('superadmin_coupons')
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Unique promo code, e.g. "LAUNCH50" */
  @Column({ type: 'varchar', length: 100, unique: true })
  @Index()
  code: string;

  @Column({ name: 'discount_percentage', type: 'decimal', precision: 5, scale: 2 })
  discountPercentage: number;

  @Column({ name: 'max_uses', type: 'int' })
  maxUses: number;

  @Column({ name: 'current_uses', type: 'int', default: 0 })
  currentUses: number;

  @Column({ type: 'enum', enum: CouponStatus, default: CouponStatus.ACTIVE })
  @Index()
  status: CouponStatus;

  @Column({ name: 'expiry_date', type: 'timestamp' })
  @Index()
  expiryDate: Date;

  // Soft delete support (Rule 29)
  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
