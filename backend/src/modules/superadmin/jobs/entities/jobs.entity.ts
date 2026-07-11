import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum BackgroundJobStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DELAYED = 'DELAYED',
  WAITING = 'WAITING',
}

@Entity('superadmin_background_jobs')
export class BackgroundJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** The BullMQ queue name, e.g. "email_queue" */
  @Column({ name: 'queue_name', type: 'varchar', length: 255 })
  @Index()
  queueName: string;

  /** The specific job processor name, e.g. "SendWelcomeEmail" */
  @Column({ name: 'job_name', type: 'varchar', length: 255 })
  @Index()
  jobName: string;

  @Column({ type: 'enum', enum: BackgroundJobStatus, default: BackgroundJobStatus.WAITING })
  @Index()
  status: BackgroundJobStatus;

  @Column({ type: 'int', default: 0 })
  attempts: number;

  /** Stores the error message if the job failed */
  @Column({ type: 'text', nullable: true })
  error: string | null;

  /** Arbitrary job payload stored as JSON */
  @Column({ type: 'json', nullable: true })
  payload: Record<string, unknown> | null;

  @Column({ name: 'started_at', type: 'timestamp', nullable: true })
  startedAt: Date | null;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date | null;

  // Soft delete support (Rule 29)
  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
