// RESPONSIBILITY: Stores the module-owned frontend contract state used by specialized Superadmin read flows.
// FLOW: TicketsContractSnapshotRepository -> TicketsContractSnapshotEntity -> PostgreSQL `tickets_contract_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/core/database/base.entity';

@Entity('tickets_contract_snapshots')
@Index('IDX_tickets_contract_snapshots_kind', ['kind'])
export class TicketsContractSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload!: unknown;
}
