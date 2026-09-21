// RESPONSIBILITY: Stores the module-owned frontend contract state used by specialized Superadmin read flows.
// FLOW: BroadcastsContractSnapshotRepository -> BroadcastsContractSnapshotEntity -> PostgreSQL `broadcasts_contract_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('broadcasts_contract_snapshots')
@Index('IDX_broadcasts_contract_snapshots_kind', ['kind'])
export class BroadcastsContractSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload!: unknown;
}
