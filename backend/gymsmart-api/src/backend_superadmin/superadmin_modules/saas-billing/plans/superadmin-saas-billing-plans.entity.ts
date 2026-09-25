// RESPONSIBILITY: TypeORM persistence entity for plans feature data stored in `subscription_plans`.
// FLOW: plans repository -> SubscriptionPlan entity -> PostgreSQL `subscription_plans`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_subscription_plans')
@Index('IDX_subscription_plans_updated_at', ['updatedAt'])
export class SuperadminSaasBillingPlansEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property name. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  /**
 * Primary Intent: Documents entity property priceMonthly. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'price_monthly', type: 'integer', default: 0 })
  priceMonthly!: number;
  /**
 * Primary Intent: Documents entity property priceAnnual. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'price_annual', type: 'integer', default: 0 })
  priceAnnual!: number;
  /**
 * Primary Intent: Documents entity property maxMembers. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'max_members', type: 'integer', default: 0 })
  maxMembers!: number;
  /**
 * Primary Intent: Documents entity property maxStaff. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'max_staff', type: 'integer', default: 0 })
  maxStaff!: number;
  /**
 * Primary Intent: Documents entity property dbLimitGb. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'db_limit_gb', type: 'integer', default: 0 })
  dbLimitGb!: number;
  /**
 * Primary Intent: Documents entity property binaryLimitGb. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'binary_limit_gb', type: 'integer', default: 0 })
  binaryLimitGb!: number;
  /**
 * Primary Intent: Documents entity property features. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'features', type: 'jsonb', default: () => "'{}'::jsonb" })
  features!: unknown;
  /**
 * Primary Intent: Documents entity property activeTenants. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'active_tenants', type: 'integer', default: 0 })
  activeTenants!: number;
  /**
 * Primary Intent: Documents entity property isPublic. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'is_public', type: 'boolean', default: false })
  isPublic!: boolean;
  /**
 * Primary Intent: Documents entity property trialDays. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'trial_days', type: 'integer', default: 0 })
  trialDays!: number;
  /**
 * Primary Intent: Documents entity property setupFee. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'setup_fee', type: 'integer', default: 0 })
  setupFee!: number;
  /**
 * Primary Intent: Documents entity property currency. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'currency', type: 'char', length: 3 })
  currency!: string;
  /**
 * Primary Intent: Documents entity property isArchived. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'is_archived', type: 'boolean', default: false })
  isArchived!: boolean;
}
