// RESPONSIBILITY: Stores the module-owned frontend contract state used by specialized Superadmin read flows.
// FLOW: InvoicesContractSnapshotRepository -> InvoicesContractSnapshotEntity -> PostgreSQL `invoices_contract_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/core/database/base.entity';

@Entity('invoices_contract_snapshots')
@Index('IDX_invoices_contract_snapshots_kind', ['kind'])
export class InvoicesContractSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload!: unknown;
}
