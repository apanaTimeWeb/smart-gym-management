import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum AffiliateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('superadmin_affiliates')
export class Affiliate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  email: string;

  /** Unique referral code used to track gym sign-ups */
  @Column({ name: 'referral_code', type: 'varchar', length: 100, unique: true })
  @Index()
  referralCode: string;

  @Column({ name: 'total_referred', type: 'int', default: 0 })
  totalReferred: number;

  @Column({ name: 'commission_earned', type: 'decimal', precision: 12, scale: 2, default: 0 })
  commissionEarned: number;

  @Column({ type: 'enum', enum: AffiliateStatus, default: AffiliateStatus.ACTIVE })
  @Index()
  status: AffiliateStatus;

  @Column({ name: 'joined_at', type: 'timestamp', nullable: true })
  joinedAt: Date | null;

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
