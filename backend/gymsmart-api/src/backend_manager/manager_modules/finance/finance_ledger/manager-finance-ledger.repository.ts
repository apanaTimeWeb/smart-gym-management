// RESPONSIBILITY: Persists immutable Manager finance ledger entries and exposes balance calculations only.
// FLOW: Transaction context -> ledger repository -> append-only rows -> aggregate balance query.
import { Injectable } from '@nestjs/common';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import { ManagerFinanceLedgerEntity } from '@/backend_manager/manager_modules/finance/finance_ledger/manager-finance-ledger.entity';

@Injectable()
export class ManagerFinanceLedgerRepository {
  /** @description Appends one ledger entry inside the active tenant transaction. No update or delete operation is exposed by this repository. @param entry - Immutable ledger entry. @param context - Active transaction context. @returns Persisted ledger row. */
  async append(entry: Omit<ManagerFinanceLedgerEntity, 'id' | 'createdAt'>, context: ManagerCoreTransactionContext): Promise<ManagerFinanceLedgerEntity> {
    const repository = context.getRepository(ManagerFinanceLedgerEntity);
    return repository.save(repository.create(entry));
  }

  /** @description Calculates an account balance from immutable credit/debit rows. @param accountId - Ledger account. @param currency - Currency code. @param context - Active transaction context. @returns Balance in smallest currency unit. */
  async calculateBalance(accountId: string, currency: string, context: ManagerCoreTransactionContext): Promise<bigint> {
    const rows = await context.getRepository(ManagerFinanceLedgerEntity).createQueryBuilder('entry').select('entry.entry_type', 'entry_type').addSelect('entry.amount_minor', 'amount_minor').where('entry.account_id = :accountId AND entry.currency = :currency', { accountId, currency }).getRawMany<{ entry_type: 'DEBIT' | 'CREDIT'; amount_minor: string }>();
    return rows.reduce((balance, row) => row.entry_type === 'CREDIT' ? balance + BigInt(row.amount_minor) : balance - BigInt(row.amount_minor), 0n);
  }
}
