// RESPONSIBILITY: TypeORM persistence entity for settings feature data stored in `platform_settings`.
// FLOW: settings repository -> PlatformSetting entity -> PostgreSQL `platform_settings`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';

/**
 * Primary Intent: Defines SuperadminSettingsEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_platform_settings')
@Index('IDX_platform_settings_updated_at', ['updatedAt'])
export class SuperadminSettingsEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property key. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Index('IDX_platform_settings_key')
  @Column({ name: 'key', type: 'varchar', length: 500 })
  key!: string;
  /**
 * Primary Intent: Documents entity property value. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'value', type: 'varchar', length: 500 })
  value!: string;
  /**
 * Primary Intent: Documents entity property description. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'description', type: 'varchar', length: 500 })
  description!: string;
  /**
 * Primary Intent: Documents entity property category. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'category', type: 'varchar', length: 500 })
  category!: string;
  /**
 * Primary Intent: Documents entity property dataType. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'data_type', type: 'varchar', length: 500 })
  dataType!: string;
}
