// RESPONSIBILITY: Maps trainer payout records in smallest currency units.
// FLOW: Earnings repository → EarningsPayoutEntity → earnings_payouts.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity'; import { EarningsStatus } from '@/backend_trainer/modules/backend_trainer/earnings/earnings-enums';
@Entity('trainer_earnings_payouts') export class EarningsPayoutEntity extends CoreBaseEntity { @Column({ name:'trainer_id', type:'uuid' }) trainerId!: string; @Column() period!: string; @Column({ name:'amount_minor', type:'bigint' }) amountMinor!: string; @Column({ type:'enum', enum:EarningsStatus, enumName:'earnings_status_enum' }) status!: EarningsStatus; @Column({ name:'due_date', type:'date' }) dueDate!: string; }
