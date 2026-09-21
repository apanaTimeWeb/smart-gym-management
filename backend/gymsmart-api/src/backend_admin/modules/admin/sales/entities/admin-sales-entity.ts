// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin sales feature and its frontend-backed payload.
// FLOW: Sales Repository â†’ AdminSalesEntity â†’ PostgreSQL sales_snapshots table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/backend_admin/core/database/core-base.entity';

@Entity('sales_snapshots')
@Index('IDX_sales_snapshots_created_at', ['createdAt'])
export class AdminSalesEntity extends CoreBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;


  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
