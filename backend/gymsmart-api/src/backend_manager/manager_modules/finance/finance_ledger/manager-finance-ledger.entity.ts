// RESPONSIBILITY: Stores immutable double-entry ledger rows for every settled Manager finance transaction.
// FLOW: Finance mutation -> ledger service -> credit/debit entries -> append-only tenant table.
import { Check, Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

@Entity('manager_ledger_entries')
@Index('IDX_manager_ledger_entries_transaction_id', ['transactionId'])
@Index('IDX_manager_ledger_entries_account_id', ['accountId'])
@Index('IDX_manager_ledger_entries_created_at', ['createdAt'])
@Check('CHK_manager_ledger_entries_amount_positive', 'amount_minor > 0')
@Check('CHK_manager_ledger_entries_entry_type', "entry_type IN ('DEBIT','CREDIT')")
export class ManagerFinanceLedgerEntity extends CoreBaseEntity {

  @Column({ type: 'uuid', name: 'transaction_id' })
  transactionId!: string;

  @Column({ type: 'varchar', length: 96, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'varchar', length: 16, name: 'entry_type' })
  entryType!: 'DEBIT' | 'CREDIT';

  @Column({ type: 'bigint', name: 'amount_minor' })
  amountMinor!: string;

  @Column({ type: 'varchar', length: 3, name: 'currency' })
  currency!: string;

  @Column({ type: 'uuid', name: 'source_record_id' })
  sourceRecordId!: string;

  @Column({ type: 'jsonb', name: 'metadata', default: () => "'{}'::jsonb" })
  metadata!: Record<string, unknown>;

}
