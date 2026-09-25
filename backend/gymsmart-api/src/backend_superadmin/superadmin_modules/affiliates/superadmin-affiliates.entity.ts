// RESPONSIBILITY: TypeORM persistence entity for affiliate business state, encrypted bank metadata, and monetary currency provenance.
// FLOW: Affiliate repository -> TypeORM entity -> PostgreSQL superadmin_affiliates.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { AffiliateStatus } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.constants';

/**
 * Primary Intent: Defines SuperadminAffiliatesEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_affiliates')
@Index('IDX_affiliates_updated_at', ['updatedAt'])
export class SuperadminAffiliatesEntity extends SuperadminCoreBaseEntity {
  /** Primary Intent: Legal/display affiliate name. Edge Cases: Must remain non-empty and bounded by DTO validation. Side-Effects: None. AI-Note: Do not use for authentication. */
  @Column({ name: 'name', type: 'varchar', length: 500 }) name!: string;
  /** Primary Intent: Contact email used for payout communication. Edge Cases: Validated as email at the boundary. Side-Effects: May be used by notification workflows. AI-Note: Never log raw email. */
  @Index('IDX_affiliates_email')
  @Column({ name: 'email', type: 'varchar', length: 500 }) email!: string;
  /** Primary Intent: Affiliate phone contact. Edge Cases: Canonical formatting belongs at the validation boundary. Side-Effects: None. AI-Note: Never log raw phone numbers. */
  @Column({ name: 'phone', type: 'varchar', length: 500 }) phone!: string;
  /** Primary Intent: Referral code used to attribute affiliate conversions. Edge Cases: Must remain unique according to module business rules. Side-Effects: Drives referral attribution. AI-Note: Do not rename without contract migration. */
  @Index('IDX_affiliates_referral_code')
  @Column({ name: 'referral_code', type: 'varchar', length: 500 }) referralCode!: string;
  /** Primary Intent: Lifetime number of referrals. Edge Cases: Non-negative integer invariant. Side-Effects: Used in reporting. AI-Note: Treat as derived business state where source events exist. */
  @Column({ name: 'total_referred', type: 'integer', default: 0 }) totalReferred!: number;
  /** Primary Intent: Lifetime commission earned in smallest currency unit. Edge Cases: Must be non-negative integer and paired with currency. Side-Effects: Feeds payout liability calculations. AI-Note: Never use floating-point arithmetic. */
  @Column({ name: 'commission_earned', type: 'integer', default: 0 }) commissionEarned!: number;
  /** Primary Intent: Commission percentage configured for this affiliate. Edge Cases: Bound the percentage in DTO/business validation. Side-Effects: Influences future commission accrual. AI-Note: Not a monetary field. */
  @Column({ name: 'commission_rate', type: 'integer', default: 0 }) commissionRate!: number;
  /** Primary Intent: Encrypted bank payout metadata. Edge Cases: Value is application-layer AES-256-GCM ciphertext, not plaintext JSON. Side-Effects: Decryption is allowed only in explicitly authorized backend flows. AI-Note: Never return raw ciphertext as if it were bank details. */
  @Column({ name: 'bank_details', type: 'text', nullable: true }) bankDetails!: string | null;
  /** Primary Intent: ISO 4217 currency governing affiliate monetary fields. Edge Cases: Exactly three uppercase alphabetic characters; migration defaults must be explicit. Side-Effects: Used by payout ledger entries and responses. AI-Note: Never infer currency from a symbol. */
  @Column({ name: 'currency', type: 'char', length: 3, default: 'INR' }) currency!: string;
  /** Primary Intent: Affiliate lifecycle status. Edge Cases: Must be one of the declared enum values. Side-Effects: Controls whether normal affiliate actions are permitted. AI-Note: Add values only through coordinated enum/migration changes. */
  @Column({ name: 'status', type: 'enum', enum: AffiliateStatus }) status!: AffiliateStatus;
  /** Primary Intent: Date affiliate relationship became active. Edge Cases: Stored in UTC. Side-Effects: Drives historical reporting. AI-Note: Never convert to local time in persistence. */
  @Column({ name: 'joined_at', type: 'timestamptz' }) joinedAt!: Date;
  /** Primary Intent: Number of tracked referral conversions. Edge Cases: Non-negative integer. Side-Effects: Reporting only. AI-Note: Do not treat as financial state. */
  @Column({ name: 'referral_count', type: 'integer', default: 0 }) referralCount!: number;
  /** Primary Intent: Conversion percentage used by affiliate analytics. Edge Cases: Numeric precision must be preserved. Side-Effects: Reporting only. AI-Note: Do not coerce to string in domain logic. */
  @Column({ name: 'conversion_rate', type: 'numeric', precision: 7, scale: 3, default: 0, transformer: { to: (value: number): number => value, from: (value: string): number => Number(value) } }) conversionRate!: number;
  /** Primary Intent: Legacy payout history projection kept for UI compatibility. Edge Cases: New financial truth comes from immutable ledger rows. Side-Effects: Read-only historical projection. AI-Note: Do not use this array as the authoritative balance source. */
  @Column({ name: 'payout_history', type: 'jsonb', default: () => "'[]'::jsonb" }) payoutHistory!: unknown;
}
