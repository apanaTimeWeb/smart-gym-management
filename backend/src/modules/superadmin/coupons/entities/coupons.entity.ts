import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { CouponStatus } from '../coupons.interfaces';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  code: string;

  @Column({ type: 'varchar', default: 'PERCENTAGE' })
  discountType: 'PERCENTAGE' | 'EXACT';

  @Column({ type: 'float', default: 0 })
  discountValue: number;

  @Column({ type: 'int' })
  maxUses: number;

  @Column({ type: 'int', default: 0 })
  currentUses: number;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status: CouponStatus;

  @Column({ type: 'timestamp' })
  expiryDate: Date;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
