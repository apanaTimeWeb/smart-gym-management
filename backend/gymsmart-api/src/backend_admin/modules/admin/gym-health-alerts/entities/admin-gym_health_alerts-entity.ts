// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin gym-health-alerts feature and its frontend-backed payload.
// FLOW: GymHealthAlerts Repository → AdminGymHealthAlertsEntity → PostgreSQL gym_health_alerts table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/backend_admin/core/database/core-base.entity';

@Entity('gym_health_alerts')
@Index('IDX_gym_health_alerts_created_at', ['createdAt'])
export class AdminGymHealthAlertsEntity extends CoreBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;



  @Column({ name: 'severity', type: 'varchar', length: 16, nullable: true })
  severity!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
