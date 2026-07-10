import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum BackupStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
}

@Entity('superadmin_backups')
export class Backup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_name', type: 'varchar', length: 255 })
  @Index()
  tenantName: string;

  @Column({ name: 'tenant_id', type: 'varchar', length: 255, nullable: true })
  @Index()
  tenantId: string | null;

  @Column({ name: 'database_name', type: 'varchar', length: 255 })
  databaseName: string;

  /** Size of the backup file in megabytes */
  @Column({ name: 'size_mb', type: 'decimal', precision: 12, scale: 2, default: 0 })
  sizeMB: number;

  @Column({ type: 'enum', enum: BackupStatus, default: BackupStatus.IN_PROGRESS })
  @Index()
  status: BackupStatus;

  /** When this backup was taken */
  @Column({ type: 'timestamp' })
  @Index()
  timestamp: Date;

  /** Cloud storage path or local file path */
  @Column({ name: 'storage_path', type: 'varchar', length: 1000, nullable: true })
  storagePath: string | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

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
