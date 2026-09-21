// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin profile feature and its frontend-backed payload.
// FLOW: Profile Repository → AdminProfileEntity → PostgreSQL admin_profiles table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/core/database/core-base.entity';

@Entity('admin_profiles')
@Index('IDX_admin_profiles_created_at', ['createdAt'])
export class AdminProfileEntity extends CoreBaseEntity {
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
