// RESPONSIBILITY: TypeORM persistence entity for global-audit feature data stored in `audit_logs`.
// FLOW: global-audit repository -> AuditLog entity -> PostgreSQL `audit_logs`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';

/**
 * Primary Intent: Defines SuperadminGlobalAuditEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('audit_logs')
@Index('IDX_audit_logs_updated_at', ['updatedAt'])
export class SuperadminGlobalAuditEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property actorId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'actor_id', type: 'varchar', length: 500 })
  actorId!: string;
  /**
 * Primary Intent: Documents entity property actorRole. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'actor_role', type: 'varchar', length: 500 })
  actorRole!: string;
  /**
 * Primary Intent: Documents entity property action. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'action', type: 'varchar', length: 500 })
  action!: string;
  /**
 * Primary Intent: Documents entity property entityType. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'entity_type', type: 'varchar', length: 500 })
  entityType!: string;
  /**
 * Primary Intent: Documents entity property entityId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'entity_id', type: 'varchar', length: 500 })
  entityId!: string;
  /**
 * Primary Intent: Documents entity property oldValue. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'old_value', type: 'jsonb', default: () => "'{}'::jsonb" })
  oldValue!: unknown;
  /**
 * Primary Intent: Documents entity property newValue. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'new_value', type: 'jsonb', default: () => "'{}'::jsonb" })
  newValue!: unknown;
  /**
 * Primary Intent: Documents entity property ipAddress. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'ip_address', type: 'varchar', length: 500 })
  ipAddress!: string;
  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_id', type: 'varchar', length: 500, nullable: true })
  tenantId!: string | null;
}
