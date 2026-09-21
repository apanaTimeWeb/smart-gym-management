// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin coupons feature and its frontend-backed payload.
// FLOW: Coupons Repository → AdminCouponsEntity → PostgreSQL coupons table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/core/database/core-base.entity';

@Entity('coupons')
@Index('IDX_coupons_created_at', ['createdAt'])
export class AdminCouponsEntity extends CoreBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;



  @Column({ name: 'code', type: 'varchar', length: 80, nullable: true })
  code!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
