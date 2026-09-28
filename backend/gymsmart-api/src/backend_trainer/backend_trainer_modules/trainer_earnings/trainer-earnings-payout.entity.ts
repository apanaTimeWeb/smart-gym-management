// RESPONSIBILITY: Maps trainer payout records in smallest currency units.
// FLOW: Earnings repository → TrainerEarningsPayoutEntity → earnings_payouts.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity'; import { EarningsStatus } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-enums';

/**
 * Intent: Defines the TrainerEarningsPayoutEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_earnings_payouts') export class TrainerEarningsPayoutEntity extends CoreBaseEntity { @Column({ name:'trainer_id', type:'uuid' }) trainerId!: string; @Column() period!: string; @Column({ name:'amount_minor', type:'bigint' }) amountMinor!: string; @Column({ type:'enum', enum:EarningsStatus, enumName:'earnings_status_enum' }) status!: EarningsStatus; @Column({ name:'due_date', type:'date' }) dueDate!: string; }
