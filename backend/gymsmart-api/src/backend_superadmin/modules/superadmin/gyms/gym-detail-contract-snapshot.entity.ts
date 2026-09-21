// RESPONSIBILITY: Stores the module-owned frontend contract state used by specialized Superadmin read flows.
// FLOW: GymDetailContractSnapshotRepository -> GymDetailContractSnapshotEntity -> PostgreSQL `gym_detail_contract_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('gym_detail_contract_snapshots')
@Index('IDX_gym_detail_contract_snapshots_kind', ['kind'])
export class GymDetailContractSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload!: unknown;
}
