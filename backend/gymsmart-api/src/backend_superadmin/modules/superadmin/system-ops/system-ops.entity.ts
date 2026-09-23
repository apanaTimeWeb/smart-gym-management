// RESPONSIBILITY: Persists the frontend-owned system-ops summary contract in the master database.
// FLOW: SystemOpsContractSnapshotRepository -> TypeORM -> PostgreSQL `system_ops_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('superadmin_system_ops_snapshots')
@Index('IDX_system_ops_snapshots_kind', ['kind'])
@Index('IDX_system_ops_snapshots_updated_at', ['updatedAt'])
export class SystemOpsEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 }) kind!: string;
  @Column({ name: 'payload', type: 'jsonb' }) payload!: unknown;
}