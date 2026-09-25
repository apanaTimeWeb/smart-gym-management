// RESPONSIBILITY: TypeORM persistence entity for features feature data stored in `feature_flags`.
// FLOW: features repository -> FeatureFlag entity -> PostgreSQL `feature_flags`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';

/**
 * Primary Intent: Defines SuperadminFeaturesEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_feature_flags')
@Index('IDX_feature_flags_updated_at', ['updatedAt'])
export class SuperadminFeaturesEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property name. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  /**
 * Primary Intent: Documents entity property description. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'description', type: 'varchar', length: 500 })
  description!: string;
  /**
 * Primary Intent: Documents entity property isGlobalEnabled. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'is_global_enabled', type: 'boolean', default: false })
  isGlobalEnabled!: boolean;
  /**
 * Primary Intent: Documents entity property enabledTenantIds. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'enabled_tenant_ids', type: 'jsonb', default: () => "'{}'::jsonb" })
  enabledTenantIds!: unknown;
  /**
 * Primary Intent: Documents entity property notes. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'notes', type: 'jsonb', default: () => "'{}'::jsonb" })
  notes!: unknown;
  /**
 * Primary Intent: Documents entity property history. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'history', type: 'jsonb', default: () => "'{}'::jsonb" })
  history!: unknown;
}
