// RESPONSIBILITY: TypeORM persistence entity for backups feature data stored in `backup_records`.
// FLOW: backups repository -> BackupRecord entity -> PostgreSQL `backup_records`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum BackupRecordStatus {
  FAILED = 'FAILED',
  INPROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
}

@Entity('backup_records')
@Index('IDX_backup_records_updated_at', ['updatedAt'])
export class BackupRecordEntity extends BaseEntity {
  @Column({ name: 'tenant_name', type: 'varchar', length: 500 })
  tenantName!: string;
  @Column({ name: 'database_name', type: 'varchar', length: 500 })
  databaseName!: string;
  @Column({ name: 'size_m_b', type: 'integer', default: 0 })
  sizeMB!: number;
  @Column({ name: 'status', type: 'enum', enum: BackupRecordStatus })
  status!: BackupRecordStatus;
  @Column({ name: 'timestamp', type: 'timestamptz' })
  timestamp!: Date;
}
