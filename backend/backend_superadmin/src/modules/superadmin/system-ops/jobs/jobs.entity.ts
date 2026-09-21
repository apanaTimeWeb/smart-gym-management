// RESPONSIBILITY: TypeORM persistence entity for jobs feature data stored in `background_jobs`.
// FLOW: jobs repository -> BackgroundJob entity -> PostgreSQL `background_jobs`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/core/database/base.entity';

export enum BackgroundJobStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

@Entity('background_jobs')
@Index('IDX_background_jobs_updated_at', ['updatedAt'])
export class BackgroundJobEntity extends BaseEntity {
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
}
