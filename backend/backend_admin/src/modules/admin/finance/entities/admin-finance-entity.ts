// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin finance feature and its frontend-backed payload.
// FLOW: Finance Repository → AdminFinanceEntity → PostgreSQL payment_transactions table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/core/database/core-base.entity';

@Entity('payment_transactions')
@Index('IDX_payment_transactions_created_at', ['createdAt'])
export class AdminFinanceEntity extends CoreBaseEntity {

  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: number | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
