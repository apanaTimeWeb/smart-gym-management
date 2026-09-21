// RESPONSIBILITY: TypeORM persistence entity for plans feature data stored in `subscription_plans`.
// FLOW: plans repository -> SubscriptionPlan entity -> PostgreSQL `subscription_plans`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('subscription_plans')
@Index('IDX_subscription_plans_updated_at', ['updatedAt'])
export class SubscriptionPlanEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  @Column({ name: 'price_monthly', type: 'integer', default: 0 })
  priceMonthly!: number;
  @Column({ name: 'price_annual', type: 'integer', default: 0 })
  priceAnnual!: number;
  @Column({ name: 'max_members', type: 'integer', default: 0 })
  maxMembers!: number;
  @Column({ name: 'max_staff', type: 'integer', default: 0 })
  maxStaff!: number;
  @Column({ name: 'db_limit_gb', type: 'integer', default: 0 })
  dbLimitGb!: number;
  @Column({ name: 'binary_limit_gb', type: 'integer', default: 0 })
  binaryLimitGb!: number;
  @Column({ name: 'features', type: 'jsonb', default: () => "'{}'::jsonb" })
  features!: unknown;
  @Column({ name: 'active_tenants', type: 'integer', default: 0 })
  activeTenants!: number;
  @Column({ name: 'is_public', type: 'boolean', default: false })
  isPublic!: boolean;
  @Column({ name: 'trial_days', type: 'integer', default: 0 })
  trialDays!: number;
  @Column({ name: 'setup_fee', type: 'integer', default: 0 })
  setupFee!: number;
  @Column({ name: 'currency', type: 'varchar', length: 500 })
  currency!: string;
  @Column({ name: 'is_archived', type: 'boolean', default: false })
  isArchived!: boolean;
}
