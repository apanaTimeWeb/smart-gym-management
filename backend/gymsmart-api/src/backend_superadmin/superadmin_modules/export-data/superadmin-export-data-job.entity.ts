// RESPONSIBILITY: Persists export-specific job state owned only by the export-data feature.
// FLOW: SuperadminExportDataService -> SuperadminExportDataJobRepository -> SuperadminExportDataJobEntity -> PostgreSQL `superadmin_export_jobs`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { ExportDataJobStatus } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-job.constants';

/**
 * Primary Intent: Defines SuperadminExportDataJobEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_export_jobs')
@Index('IDX_export_jobs_status', ['status'])
@Index('IDX_export_jobs_tenant_id', ['tenantId'])
@Index('IDX_export_jobs_expires_at', ['expiresAt'])
export class SuperadminExportDataJobEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property queueName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'queue_name', type: 'varchar', length: 128 })
  queueName!: string;
  /**
 * Primary Intent: Documents entity property jobName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'job_name', type: 'varchar', length: 128 })
  jobName!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: ExportDataJobStatus })
  status!: ExportDataJobStatus;
  /**
 * Primary Intent: Documents entity property attempts. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'attempts', type: 'integer', default: 0 })
  attempts!: number;
  /**
 * Primary Intent: Documents entity property errorCode. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'error_code', type: 'varchar', length: 128, nullable: true })
  errorCode!: string | null;
  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_id', type: 'varchar', length: 64, nullable: true })
  tenantId!: string | null;
  /**
 * Primary Intent: Documents entity property payload. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
  /**
 * Primary Intent: Documents entity property resultPath. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'result_path', type: 'text', nullable: true })
  resultPath!: string | null;
  /**
 * Primary Intent: Documents entity property downloadTokenHash. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'download_token_hash', type: 'varchar', length: 128, nullable: true })
  downloadTokenHash!: string | null;
  /**
 * Primary Intent: Documents entity property expiresAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt!: Date | null;
  /**
 * Primary Intent: Documents entity property requestedByUserId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'requested_by_user_id', type: 'varchar', length: 64, nullable: true })
  requestedByUserId!: string | null;
}
