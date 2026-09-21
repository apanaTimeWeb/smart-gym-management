// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin dashboard feature and its frontend-backed payload.
// FLOW: Dashboard Repository → AdminDashboardEntity → PostgreSQL dashboard_snapshots table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/core/database/core-base.entity';

@Entity('dashboard_snapshots')
@Index('IDX_dashboard_snapshots_created_at', ['createdAt'])
export class AdminDashboardEntity extends CoreBaseEntity {
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
