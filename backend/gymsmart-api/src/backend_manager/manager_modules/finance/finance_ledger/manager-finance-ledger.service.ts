// RESPONSIBILITY: Enforces Manager finance double-entry invariants for settled payment mutations.
// FLOW: Finance payment -> validate amount/currency -> append debit + credit -> caller transaction continues.
import { randomUUID } from 'node:crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerFinanceLedgerRepository } from '@/backend_manager/manager_modules/finance/finance_ledger/manager-finance-ledger.repository';

@Injectable()
export class ManagerFinanceLedgerService {
  constructor(private readonly repository: ManagerFinanceLedgerRepository) {}

  /** @description Writes exactly two immutable entries for a settled payment: member wallet debit and gym revenue credit. @param sourceRecordId - Finance payment UUID. @param data - Payment payload. @param context - Active transaction context. @returns Nothing. @throws BadRequestException when amount or currency is invalid. */
  async recordSettledPayment(sourceRecordId: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<void> {
    const amount = this.readPositiveMinor(data.amount);
    if (amount === 0n) return;
    const currency = this.readCurrency(data.currency);
    const memberId = this.readRequiredId(data.memberId, 'memberId');
    await this.repository.append({ transactionId: sourceRecordId, accountId: `member-wallet:${memberId}`, entryType: 'DEBIT', amountMinor: amount.toString(), currency, sourceRecordId, metadata: { event: 'MANAGER.FINANCE.PAYMENT_SETTLED' }, updatedAt: new Date(), deletedAt: null, isDeleted: false }, context);
    await this.repository.append({ transactionId: sourceRecordId, accountId: 'gym-revenue', entryType: 'CREDIT', amountMinor: amount.toString(), currency, sourceRecordId, metadata: { event: 'MANAGER.FINANCE.PAYMENT_SETTLED' }, updatedAt: new Date(), deletedAt: null, isDeleted: false }, context);
  }

  /** @description Reverses a previously settled payment in the immutable ledger and optionally posts its replacement amount. @param sourceRecordId - Finance payment UUID. @param previous - Previous payment payload. @param next - Replacement payment payload or null for deletion. @param context - Active transaction context. @returns Nothing. */
  async recordSettlementAdjustment(sourceRecordId: string, previous: ManagerCoreJsonObject, next: ManagerCoreJsonObject | null, context: ManagerCoreTransactionContext): Promise<void> {
    const previousAmount = this.readPositiveMinor(previous.amount);
    const previousCurrency = this.readCurrency(previous.currency);
    const transactionId = randomUUID();
    if (previousAmount > 0n) {
      const memberId = this.readRequiredId(previous.memberId, 'memberId');
      await this.repository.append({ transactionId, accountId: `member-wallet:${memberId}`, entryType: 'CREDIT', amountMinor: previousAmount.toString(), currency: previousCurrency, sourceRecordId, metadata: { event: 'MANAGER.FINANCE.SETTLEMENT_REVERSED' }, updatedAt: new Date(), deletedAt: null, isDeleted: false }, context);
      await this.repository.append({ transactionId, accountId: 'gym-revenue', entryType: 'DEBIT', amountMinor: previousAmount.toString(), currency: previousCurrency, sourceRecordId, metadata: { event: 'MANAGER.FINANCE.SETTLEMENT_REVERSED' }, updatedAt: new Date(), deletedAt: null, isDeleted: false }, context);
    }
    if (next && (next.status === 'PAID' || next.status === 'PARTIAL')) await this.recordSettledPayment(sourceRecordId, next, context);
  }

  /** @description Validates an integer minor-unit monetary amount. @param value - Candidate amount. @returns Positive bigint amount or zero. @throws BadRequestException for invalid values. */
  private readPositiveMinor(value: unknown): bigint {
    const amount = Number(value ?? 0);
    if (!Number.isSafeInteger(amount) || amount < 0) throw new BadRequestException({ errorCode: 'CORE.MONEY.INVALID', message: 'Amount must be a non-negative integer in minor units.' });
    return BigInt(amount);
  }

  /** @description Validates ISO 4217 currency shape. @param value - Candidate code. @returns Uppercase currency code. @throws BadRequestException for invalid values. */
  private readCurrency(value: unknown): string {
    const currency = typeof value === 'string' ? value.toUpperCase() : 'INR';
    if (!/^[A-Z]{3}$/.test(currency)) throw new BadRequestException({ errorCode: 'CORE.MONEY.CURRENCY_INVALID', message: 'Currency must be a 3-letter ISO code.' });
    return currency;
  }

  /** @description Requires a non-empty resource identifier for ledger account mapping. @param value - Candidate identifier. @param name - Field name. @returns String identifier. @throws BadRequestException when missing. */
  private readRequiredId(value: unknown, name: string): string {
    if (typeof value !== 'string' || value.length < 1) throw new BadRequestException({ errorCode: 'VALIDATION.FIELD.REQUIRED', message: `${name} is required for settled finance entries.` });
    return value;
  }
}
