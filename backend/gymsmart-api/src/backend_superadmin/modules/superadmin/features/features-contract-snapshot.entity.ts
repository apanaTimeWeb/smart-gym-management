// RESPONSIBILITY: Stores the module-owned frontend contract state used by specialized Superadmin read flows.
// FLOW: FeaturesContractSnapshotRepository -> FeaturesContractSnapshotEntity -> PostgreSQL `features_contract_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('features_contract_snapshots')
@Index('IDX_features_contract_snapshots_kind', ['kind'])
export class FeaturesContractSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload!: unknown;
}
