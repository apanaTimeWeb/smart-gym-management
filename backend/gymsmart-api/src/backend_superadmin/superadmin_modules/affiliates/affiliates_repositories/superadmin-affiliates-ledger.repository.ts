// RESPONSIBILITY: Persists immutable affiliate accounting entries and derives payable balances from them.
// FLOW: Affiliate payout -> ledger repository -> TypeORM insert/aggregate -> immutable ledger state.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityTarget, Repository } from 'typeorm';
import { SuperadminAffiliatesLedgerEntity } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates-ledger.entity';
import { SuperadminAffiliatesLedgerDirection } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_types/superadmin-affiliates-ledger.enums';
import { SUPERADMIN_AFFILIATE_LEDGER_ACCOUNT } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.constants';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';

/**
 * Primary Intent: Encapsulates immutable double-entry accounting for affiliate liabilities and payouts.
 * Edge Cases: Each transaction writes exactly one debit and one credit; invalid amounts or currency codes are rejected.
 * Side-Effects: Inserts accounting rows only; balances are derived from ledger entries rather than mutable balance columns.
 * AI-Note: Never add update/delete methods and never read a mutable affiliate balance for payout decisions.
 */
@Injectable()
/**
 * Primary Intent: Defines SuperadminAffiliatesLedgerRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated, use the configured absolute import alias, and preserve frozen contracts.
 */
export class SuperadminAffiliatesLedgerRepository {
  constructor(
    @InjectRepository(SuperadminAffiliatesLedgerEntity)
    private readonly repository: Repository<SuperadminAffiliatesLedgerEntity>,
    private readonly transactionContext: SuperadminCoreTransactionContext,
  ) {}

  /** Returns the transaction-bound ledger repository when a UnitOfWork is active. */
  private get activeRepository(): Repository<SuperadminAffiliatesLedgerEntity> {
    const manager = this.transactionContext.getManager();
    return manager
      ? manager.getRepository<SuperadminAffiliatesLedgerEntity>(this.repository.metadata.target as EntityTarget<SuperadminAffiliatesLedgerEntity>)
      : this.repository;
  }

  /**
   * Primary Intent: Calculates the current affiliate payable liability from immutable ledger rows.
   * Edge Cases: No rows yield zero; only non-deleted entries for the requested currency and payable account are included.
   * Side-Effects: None.
   * AI-Note: This query is authoritative for pending payout and must execute while the caller holds the affiliate row lock.
   */
  /**
   * Primary Intent: Executes the findPayableBalance use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPayableBalance(affiliateId: string, currency: string): Promise<number> {
    const row = await this.activeRepository
      .createQueryBuilder('entry')
      .select(
        `COALESCE(SUM(CASE WHEN entry.direction = :credit THEN entry.amount_minor ELSE -entry.amount_minor END), 0)`,
        'balance',
      )
      .where('entry.affiliate_id = :affiliateId', { affiliateId })
      .andWhere('entry.account_key = :accountKey', { accountKey: SUPERADMIN_AFFILIATE_LEDGER_ACCOUNT.AFFILIATE_PAYABLE })
      .andWhere('entry.currency = :currency', { currency })
      .andWhere('entry.deleted_at IS NULL')
      .setParameter('credit', SuperadminAffiliatesLedgerDirection.CREDIT)
      .getRawOne<{ balance: string | number }>();
    return Number(row?.balance ?? 0);
  }

  /**
   * Primary Intent: Calculates payable balances for one page of affiliates with one grouped query.
   * Edge Cases: Empty input returns an empty map; affiliates without ledger rows are interpreted as zero by the caller.
   * Side-Effects: None.
   * AI-Note: Batch this projection to avoid N+1 database calls in paginated affiliate lists.
   */
  async findPayableBalances(
    affiliateIds: string[],
    currencyByAffiliate: Map<string, string>,
  ): Promise<Map<string, number>> {
    if (!affiliateIds.length) return new Map<string, number>();
    const builder = this.activeRepository
      .createQueryBuilder('entry')
      .select('entry.affiliate_id', 'affiliateId')
      .addSelect('entry.currency', 'currency')
      .addSelect(
        `COALESCE(SUM(CASE WHEN entry.direction = :credit THEN entry.amount_minor ELSE -entry.amount_minor END), 0)`,
        'balance',
      )
      .where('entry.affiliate_id IN (:...affiliateIds)', { affiliateIds })
      .andWhere('entry.account_key = :accountKey', { accountKey: SUPERADMIN_AFFILIATE_LEDGER_ACCOUNT.AFFILIATE_PAYABLE })
      .andWhere('entry.deleted_at IS NULL')
      .groupBy('entry.affiliate_id')
      .addGroupBy('entry.currency')
      .setParameter('credit', SuperadminAffiliatesLedgerDirection.CREDIT);
    const currencyEntries = [...currencyByAffiliate.entries()];
    if (currencyEntries.length) {
      const predicates = currencyEntries.map(([affiliateId, currency], index) => `(entry.affiliate_id = :affiliate_${index} AND entry.currency = :currency_${index})`);
      for (const [index, [affiliateId, currency]] of currencyEntries.entries()) builder.setParameter(`affiliate_${index}`, affiliateId).setParameter(`currency_${index}`, currency);
      builder.andWhere(`(${predicates.join(' OR ')})`);
    }
    const rows = await builder.getRawMany<{ affiliateId: string; currency: string; balance: string | number }>();

    const result = new Map<string, number>();
    for (const row of rows) result.set(row.affiliateId, Number(row.balance ?? 0));
    return result;
  }

  /**
   * Primary Intent: Writes one balanced debit/credit pair for an affiliate payout.
   * Edge Cases: Positive safe-integer amount and three-letter ISO currency are mandatory.
   * Side-Effects: Appends two immutable ledger entries sharing one transaction identifier.
   * AI-Note: Debit the affiliate payable liability and credit platform cash; never update a balance column.
   */
  async createPayoutPair(
    transactionId: string,
    affiliateId: string,
    amountMinor: number,
    currency: string,
    reason: string,
  ): Promise<void> {
    if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0) {
      throw new Error('AFFILIATES.LEDGER.AMOUNT_INVALID');
    }
    if (!/^[A-Z]{3}$/.test(currency)) throw new Error('AFFILIATES.LEDGER.CURRENCY_INVALID');

    await this.activeRepository.insert([
      {
        transactionId,
        affiliateId,
        accountKey: SUPERADMIN_AFFILIATE_LEDGER_ACCOUNT.AFFILIATE_PAYABLE,
        direction: SuperadminAffiliatesLedgerDirection.DEBIT,
        amountMinor,
        currency,
        reason,
      },
      {
        transactionId,
        affiliateId,
        accountKey: SUPERADMIN_AFFILIATE_LEDGER_ACCOUNT.PLATFORM_CASH,
        direction: SuperadminAffiliatesLedgerDirection.CREDIT,
        amountMinor,
        currency,
        reason,
      },
    ]);
  }
}
