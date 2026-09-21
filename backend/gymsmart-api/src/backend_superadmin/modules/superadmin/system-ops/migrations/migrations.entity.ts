// RESPONSIBILITY: TypeORM persistence entity for migrations feature data stored in `migration_logs`.
// FLOW: migrations repository -> MigrationLog entity -> PostgreSQL `migration_logs`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum MigrationLogStatus {
  PENDING = 'PENDING',
  INPROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ROLLEDBACK = 'ROLLED_BACK',
  SUCCESS = 'SUCCESS',
  ROLLBACK = 'ROLLBACK',
}

@Entity('superadmin_migration_logs')
@Index('IDX_migration_logs_updated_at', ['updatedAt'])
export class MigrationLogEntity extends BaseEntity {
  @Column({ name: 'version', type: 'varchar', length: 500 })
  version!: string;
  @Column({ name: 'description', type: 'varchar', length: 500 })
  description!: string;
  @Column({ name: 'applied_at', type: 'timestamptz', nullable: true })
  appliedAt!: Date | null;
  @Column({ name: 'status', type: 'enum', enum: MigrationLogStatus })
  status!: MigrationLogStatus;
  @Column({ name: 'target_tenants', type: 'jsonb', default: () => "'{}'::jsonb" })
  targetTenants!: unknown;
  @Column({ name: 'duration_ms', type: 'integer', default: 0 })
  durationMs!: number;
  @Column({ name: 'error_log', type: 'varchar', length: 500, nullable: true })
  errorLog!: string | null;
  @Column({ name: 'executed_at', type: 'timestamptz', nullable: true })
  executedAt!: Date | null;
  @Column({ name: 'executed_by', type: 'varchar', length: 500 })
  executedBy!: string;
  @Column({ name: 'error_details', type: 'varchar', length: 500, nullable: true })
  errorDetails!: string | null;
}
