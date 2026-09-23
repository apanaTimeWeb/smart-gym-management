// RESPONSIBILITY: TypeORM persistence entity for jobs feature data stored in `background_jobs`.
// FLOW: jobs repository -> BackgroundJob entity -> PostgreSQL `background_jobs`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum BackgroundJobStatus {
  QUEUED = 'QUEUED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

@Entity('superadmin_background_jobs')
@Index('IDX_background_jobs_updated_at', ['updatedAt'])
export class JobsEntity extends BaseEntity {
  @Column({ name: 'queue_name', type: 'varchar', length: 500 })
  queueName!: string;
  @Column({ name: 'job_name', type: 'varchar', length: 500 })
  jobName!: string;
  @Column({ name: 'status', type: 'enum', enum: BackgroundJobStatus })
  status!: BackgroundJobStatus;
  @Column({ name: 'attempts', type: 'integer', default: 0 })
  attempts!: number;
  @Column({ name: 'error', type: 'varchar', length: 500, nullable: true })
  error!: string | null;
  @Column({ name: 'tenant_id', type: 'varchar', length: 500, nullable: true })
  tenantId!: string | null;
  @Column({ name: 'payload', type: 'jsonb', default: '{}' })
  payload!: Record<string, unknown>;
  @Column({ name: 'result_path', type: 'text', nullable: true })
  resultPath!: string | null;
  @Column({ name: 'download_token_hash', type: 'varchar', length: 128, nullable: true })
  downloadTokenHash!: string | null;
  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt!: Date | null;
  @Column({ name: 'requested_by_user_id', type: 'varchar', length: 500, nullable: true })
  requestedByUserId!: string | null;
}