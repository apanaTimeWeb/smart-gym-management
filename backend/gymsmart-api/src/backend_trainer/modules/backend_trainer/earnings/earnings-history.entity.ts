// RESPONSIBILITY: Maps earnings persistence without leaking ORM entities into domain services.
// FLOW: earnings repository → TypeORM entity → earnings_history table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
import { EarningsHistoryType, EarningsStatus } from '@/backend_trainer/modules/backend_trainer/earnings/earnings-enums';

@Entity('trainer_earnings_history')
export class EarningsHistoryEntity extends CoreBaseEntity {

  @Column({ name: 'trainer_id', type: 'uuid' }) trainerId!: string;
  @Column({ name: 'external_reference' }) externalReference!: string;
  @Column({ name: 'event_date', type: 'date' }) eventDate!: string;
  @Column({type:'enum',enum:EarningsHistoryType,enumName:'earnings_history_type_enum'}) type!: EarningsHistoryType;
  @Column() description!: string;
  @Column({ name: 'amount_minor', type: 'bigint' }) amountMinor!: string;
  @Column({type:'enum',enum:EarningsStatus,enumName:'earnings_status_enum'}) status!: EarningsStatus;
  @Column({ name: 'session_id', type: 'uuid', nullable: true }) sessionId!: string | null;
  @Column({ name: 'tds_deducted_minor', type: 'bigint', nullable: true }) tdsDeductedMinor!: string | null;
  @Column({ name: 'net_payout_minor', type: 'bigint', nullable: true }) netPayoutMinor!: string | null;
  @Column({ name: 'invoice_number', nullable: true }) invoiceNumber!: string | null;
}
