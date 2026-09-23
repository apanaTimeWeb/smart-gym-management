// RESPONSIBILITY: Stores the module-owned frontend contract state used by specialized Superadmin read flows.
// FLOW: SuperadminPlansContractSnapshotRepository -> SuperadminPlansContractSnapshotEntity -> PostgreSQL `plans_contract_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.entity';

@Entity('superadmin_plans_contract_snapshots')
@Index('IDX_plans_contract_snapshots_kind', ['kind'])
export class SuperadminPlansContractSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload!: unknown;
}