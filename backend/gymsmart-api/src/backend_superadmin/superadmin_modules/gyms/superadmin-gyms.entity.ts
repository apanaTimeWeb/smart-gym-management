// RESPONSIBILITY: TypeORM persistence entity for gyms feature data stored in `tenants`.
// FLOW: gyms repository -> Tenant entity -> PostgreSQL `tenants`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { TenantStatus } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.constants';
/**
 * Primary Intent: Defines SuperadminGymsEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('tenants')
@Index('IDX_tenants_updated_at', ['updatedAt'])
export class SuperadminGymsEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property name. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  /**
 * Primary Intent: Documents entity property ownerName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'owner_name', type: 'varchar', length: 500 })
  ownerName!: string;
  /**
 * Primary Intent: Documents entity property adminEmail. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'admin_email', type: 'varchar', length: 500 })
  adminEmail!: string;
  /**
 * Primary Intent: Documents entity property phone. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'phone', type: 'varchar', length: 500 })
  phone!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: TenantStatus })
  status!: TenantStatus;
  /**
 * Primary Intent: Documents entity property plan. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'plan', type: 'varchar', length: 500 })
  plan!: string;
  /**
 * Primary Intent: Documents entity property memberCount. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'member_count', type: 'integer', default: 0 })
  memberCount!: number;
  /**
 * Primary Intent: Documents entity property monthlyRevenue. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'monthly_revenue', type: 'integer', default: 0 })
  monthlyRevenue!: number;
  /** Primary Intent: ISO 4217 code paired with monthly revenue. Edge Cases: Exactly three uppercase letters and defaults to INR. Side-Effects: Governs monetary interpretation in responses. AI-Note: Never infer currency from a symbol. */
  @Column({ name: 'currency', type: 'char', length: 3, default: 'INR' })
  currency!: string;
  /**
 * Primary Intent: Documents entity property databaseVersion. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'database_version', type: 'varchar', length: 500 })
  databaseVersion!: string;
  /**
 * Primary Intent: Documents entity property city. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'city', type: 'varchar', length: 500 })
  city!: string;
  /**
 * Primary Intent: Documents entity property state. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'state', type: 'varchar', length: 500 })
  state!: string;
  /**
 * Primary Intent: Documents entity property country. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'country', type: 'varchar', length: 500 })
  country!: string;
  /**
 * Primary Intent: Documents entity property gstin. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'gstin', type: 'varchar', length: 500 })
  gstin!: string;
  /**
 * Primary Intent: Documents entity property trialEndsAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'trial_ends_at', type: 'timestamptz', nullable: true })
  trialEndsAt!: Date | null;
  /**
 * Primary Intent: Documents entity property lastLoginAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt!: Date | null;
  /**
 * Primary Intent: Documents entity property lastActiveAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'last_active_at', type: 'timestamptz', nullable: true })
  lastActiveAt!: Date | null;
  /**
 * Primary Intent: Documents entity property staffCount. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'staff_count', type: 'integer', default: 0 })
  staffCount!: number;
  /**
 * Primary Intent: Documents entity property databaseName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'database_name', type: 'varchar', length: 500 })
  databaseName!: string;
  /**
 * Primary Intent: Documents entity property aadharNumberEncrypted. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'aadhar_number_encrypted', type: 'varchar', length: 500, nullable: true })
  aadharNumberEncrypted!: string | null;
  /**
 * Primary Intent: Documents entity property subscriptionHistory. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'subscription_history', type: 'jsonb', default: () => "'{}'::jsonb" })
  subscriptionHistory!: unknown;
  /**
 * Primary Intent: Documents entity property usageStats. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'usage_stats', type: 'jsonb', default: () => "'{}'::jsonb" })
  usageStats!: unknown;
  /**
 * Primary Intent: Documents entity property acquisitionSource. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'acquisition_source', type: 'varchar', length: 128, default: 'UNKNOWN' })
  acquisitionSource!: string;
  /**
 * Primary Intent: Documents entity property acquisitionCostMinor. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'acquisition_cost_minor', type: 'bigint', default: 0 })
  acquisitionCostMinor!: number;
  /**
 * Primary Intent: Documents entity property taxRateBasisPoints. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tax_rate_basis_points', type: 'integer', default: 0 })
  taxRateBasisPoints!: number;
}
