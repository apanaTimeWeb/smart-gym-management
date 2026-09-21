// RESPONSIBILITY: Stores the module-owned frontend contract state used by specialized Superadmin read flows.
// FLOW: PlansContractSnapshotRepository -> PlansContractSnapshotEntity -> PostgreSQL `plans_contract_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/core/database/base.entity';

@Entity('plans_contract_snapshots')
@Index('IDX_plans_contract_snapshots_kind', ['kind'])
export class PlansContractSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload!: unknown;
}
