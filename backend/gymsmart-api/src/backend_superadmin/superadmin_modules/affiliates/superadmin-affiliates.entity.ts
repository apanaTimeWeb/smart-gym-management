// RESPONSIBILITY: TypeORM persistence entity for affiliates feature data stored in `affiliates`.
// FLOW: affiliates repository -> Affiliate entity -> PostgreSQL `affiliates`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.entity';

export enum AffiliateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('superadmin_affiliates')
@Index('IDX_affiliates_updated_at', ['updatedAt'])
export class SuperadminAffiliatesEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  @Index('IDX_affiliates_email')
  @Column({ name: 'email', type: 'varchar', length: 500 })
  email!: string;
  @Column({ name: 'phone', type: 'varchar', length: 500 })
  phone!: string;
  @Index('IDX_affiliates_referral_code')
  @Column({ name: 'referral_code', type: 'varchar', length: 500 })
  referralCode!: string;
  @Column({ name: 'total_referred', type: 'integer', default: 0 })
  totalReferred!: number;
  @Column({ name: 'commission_earned', type: 'integer', default: 0 })
  commissionEarned!: number;
  @Column({ name: 'commission_rate', type: 'integer', default: 0 })
  commissionRate!: number;
  @Column({ name: 'pending_payout', type: 'integer', default: 0 })
  pendingPayout!: number;
  @Column({ name: 'bank_details', type: 'jsonb', default: () => "'{}'::jsonb" })
  bankDetails!: unknown;
  @Column({ name: 'status', type: 'enum', enum: AffiliateStatus })
  status!: AffiliateStatus;
  @Column({ name: 'joined_at', type: 'timestamptz' })
  joinedAt!: Date;
  @Column({ name: 'referral_count', type: 'integer', default: 0 })
  referralCount!: number;
  @Column({ name: 'conversion_rate', type: 'numeric', precision: 7, scale: 3, default: 0, transformer: { to: (value: number): number => value, from: (value: string): number => Number(value) } })
  conversionRate!: number;
  @Column({ name: 'payout_history', type: 'jsonb', default: () => "'[]'::jsonb" })
  payoutHistory!: unknown;
}