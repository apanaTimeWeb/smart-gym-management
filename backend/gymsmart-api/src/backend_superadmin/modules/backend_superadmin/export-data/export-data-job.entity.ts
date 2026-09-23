// RESPONSIBILITY: Persists export-specific job state owned only by the export-data feature.
// FLOW: ExportDataService -> ExportDataJobRepository -> ExportDataJobEntity -> PostgreSQL `superadmin_export_jobs`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum ExportDataJobStatus {
  QUEUED = 'QUEUED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity('superadmin_export_jobs')
@Index('IDX_export_jobs_status', ['status'])
@Index('IDX_export_jobs_tenant_id', ['tenantId'])
@Index('IDX_export_jobs_expires_at', ['expiresAt'])
export class ExportDataJobEntity extends BaseEntity {
  @Column({ name: 'queue_name', type: 'varchar', length: 128 })
  queueName!: string;
  @Column({ name: 'job_name', type: 'varchar', length: 128 })
  jobName!: string;
  @Column({ name: 'status', type: 'enum', enum: ExportDataJobStatus })
  status!: ExportDataJobStatus;
  @Column({ name: 'attempts', type: 'integer', default: 0 })
  attempts!: number;
  @Column({ name: 'error_code', type: 'varchar', length: 128, nullable: true })
  errorCode!: string | null;
  @Column({ name: 'tenant_id', type: 'varchar', length: 64, nullable: true })
  tenantId!: string | null;
  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
  @Column({ name: 'result_path', type: 'text', nullable: true })
  resultPath!: string | null;
  @Column({ name: 'download_token_hash', type: 'varchar', length: 128, nullable: true })
  downloadTokenHash!: string | null;
  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt!: Date | null;
  @Column({ name: 'requested_by_user_id', type: 'varchar', length: 64, nullable: true })
  requestedByUserId!: string | null;
}
