import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum MigrationStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity('superadmin_schema_migrations')
export class SchemaMigration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Migration file name, e.g. "1689000000001-CreateUsersTable" */
  @Column({ type: 'varchar', length: 500, unique: true })
  @Index()
  name: string;

  /** Null = not yet applied */
  @Column({ name: 'applied_at', type: 'timestamp', nullable: true })
  appliedAt: Date | null;

  @Column({ type: 'enum', enum: MigrationStatus, default: MigrationStatus.PENDING })
  @Index()
  status: MigrationStatus;

  /** Which tenant database this migration targets (null = global/all) */
  @Column({ name: 'target_tenant_id', type: 'varchar', length: 255, nullable: true })
  targetTenantId: string | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @Column({ name: 'batch_number', type: 'int', nullable: true })
  batchNumber: number | null;

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
