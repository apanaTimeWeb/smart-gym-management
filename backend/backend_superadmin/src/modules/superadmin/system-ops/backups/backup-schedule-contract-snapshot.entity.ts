// RESPONSIBILITY: Stores the authoritative frontend backup-schedule contract state.
// FLOW: Backup schedule service -> repository -> PostgreSQL backup schedule snapshot.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/core/database/base.entity';

@Entity('backup_schedule_contract_snapshots')
@Index('IDX_backup_schedule_contract_snapshots_kind', ['kind'])
export class BackupScheduleContractSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 }) kind!: string;
  @Column({ name: 'payload', type: 'jsonb' }) payload!: unknown;
}
