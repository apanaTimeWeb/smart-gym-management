// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin plans feature and its frontend-backed payload.
// FLOW: Plans Repository → AdminPlansEntity → PostgreSQL plans table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/backend_admin/core/database/core-base.entity';

@Entity('plans')
@Index('IDX_plans_created_at', ['createdAt'])
export class AdminPlansEntity extends CoreBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;



  @Column({ name: 'tier', type: 'varchar', length: 32, nullable: true })
  tier!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
