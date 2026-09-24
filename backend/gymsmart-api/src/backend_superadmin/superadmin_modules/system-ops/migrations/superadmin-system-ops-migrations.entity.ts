// RESPONSIBILITY: TypeORM persistence entity for migrations feature data stored in `migration_logs`.
// FLOW: migrations repository -> MigrationLog entity -> PostgreSQL `migration_logs`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { MigrationLogStatus } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.constants';

/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationsEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_migration_logs')
@Index('IDX_migration_logs_updated_at', ['updatedAt'])
export class SuperadminSystemOpsMigrationsEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property version. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'version', type: 'varchar', length: 500 })
  version!: string;
  /**
 * Primary Intent: Documents entity property description. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'description', type: 'varchar', length: 500 })
  description!: string;
  /**
 * Primary Intent: Documents entity property appliedAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'applied_at', type: 'timestamptz', nullable: true })
  appliedAt!: Date | null;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: MigrationLogStatus })
  status!: MigrationLogStatus;
  /**
 * Primary Intent: Documents entity property targetTenants. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'target_tenants', type: 'jsonb', default: () => "'{}'::jsonb" })
  targetTenants!: unknown;
  /**
 * Primary Intent: Documents entity property durationMs. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'duration_ms', type: 'integer', default: 0 })
  durationMs!: number;
  /**
 * Primary Intent: Documents entity property errorLog. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'error_log', type: 'varchar', length: 500, nullable: true })
  errorLog!: string | null;
  /**
 * Primary Intent: Documents entity property executedAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'executed_at', type: 'timestamptz', nullable: true })
  executedAt!: Date | null;
  /**
 * Primary Intent: Documents entity property executedBy. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'executed_by', type: 'varchar', length: 500 })
  executedBy!: string;
  /**
 * Primary Intent: Documents entity property errorDetails. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'error_details', type: 'varchar', length: 500, nullable: true })
  errorDetails!: string | null;
}
