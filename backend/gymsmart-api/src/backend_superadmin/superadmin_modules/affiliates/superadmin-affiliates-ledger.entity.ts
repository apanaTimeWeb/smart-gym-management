// RESPONSIBILITY: Stores immutable double-entry affiliate financial ledger rows.
// FLOW: Payout orchestrator -> ledger repository -> superadmin_affiliate_ledger_entries.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { SuperadminAffiliatesLedgerDirection } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_types/superadmin-affiliates-ledger.enums';

/**
 * Primary Intent: Defines SuperadminAffiliatesLedgerEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_affiliate_ledger_entries')
@Index('UQ_superadmin_affiliate_ledger_transaction_direction', ['transactionId', 'direction'], { unique: true })
@Index('IDX_superadmin_affiliate_ledger_transaction', ['transactionId'])
@Index('IDX_superadmin_affiliate_ledger_affiliate', ['affiliateId', 'createdAt'])
export class SuperadminAffiliatesLedgerEntity extends SuperadminCoreBaseEntity {
  /** Primary Intent: Links the paired debit/credit rows for one financial transaction. Edge Cases: Must be unique per transaction/direction pair. Side-Effects: Enables immutable audit reconstruction. AI-Note: Never reuse a transactionId for unrelated monetary events. */
  @Column({ name: 'transaction_id', type: 'uuid' }) transactionId!: string;
  /** Primary Intent: Affiliate whose payable liability is affected. Edge Cases: Must reference an active affiliate at transaction time. Side-Effects: Used to derive payout history. AI-Note: Keep relationship tenant-safe. */
  @Column({ name: 'affiliate_id', type: 'uuid' }) affiliateId!: string;
  /** Primary Intent: Double-entry account identifier such as AFFILIATE_PAYABLE or PLATFORM_CASH. Edge Cases: Use stable enum-like account keys. Side-Effects: Enables balance derivation. AI-Note: Do not hardcode labels in service methods. */
  @Column({ name: 'account_key', type: 'varchar', length: 100 }) accountKey!: string;
  /** Primary Intent: Whether this ledger side is a debit or credit. Edge Cases: Only declared enum values are allowed. Side-Effects: Drives balance computation. AI-Note: Never encode sign by changing amount. */
  @Column({ name: 'direction', type: 'enum', enum: SuperadminAffiliatesLedgerDirection }) direction!: SuperadminAffiliatesLedgerDirection;
  /** Primary Intent: Monetary amount in smallest currency unit. Edge Cases: Must be positive for each entry. Side-Effects: Included in accounting sums. AI-Note: Never use float/decimal. */
  @Column({ name: 'amount_minor', type: 'bigint' }) amountMinor!: number;
  /** Primary Intent: ISO 4217 currency of the transaction. Edge Cases: Must match affiliate currency for this feature. Side-Effects: Prevents cross-currency accounting ambiguity. AI-Note: Never infer from account name. */
  @Column({ name: 'currency', type: 'char', length: 3 }) currency!: string;
  /** Primary Intent: Immutable business reason for the ledger transaction. Edge Cases: Must be a registered event/action key. Side-Effects: Supports audit and analytics. AI-Note: Do not overwrite historical reason text. */
  @Column({ name: 'reason', type: 'varchar', length: 200 }) reason!: string;
}
