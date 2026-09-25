// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin gym-health-alerts feature and its frontend-backed payload.
// FLOW: GymHealthAlerts Repository â†’ AdminGymHealthAlertsEntity â†’ PostgreSQL admin_gym_health_alerts table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminGymHealthAlertsSeverity } from '@/backend_admin/admin_modules/admin_gym-health-alerts/admin-gym-health-alerts.constants'
import { AdminGymHealthAlertsStatus } from '@/backend_admin/admin_modules/admin_gym-health-alerts/admin-gym-health-alerts.constants'

@Entity('admin_gym_health_alerts')
@Index('IDX_admin_gym_health_alerts_created_at', ['createdAt'])
/**
 * @description Defines the AdminGymHealthAlertsEntity boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymHealthAlertsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_gym_health_alerts_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminGymHealthAlertsStatus, enumName: 'admin_gym_health_alerts_status', nullable: true })
  status!: AdminGymHealthAlertsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'severity', type: 'enum', enum: AdminGymHealthAlertsSeverity, enumName: 'admin_gym_health_alerts_severity', nullable: true })
  severity!: AdminGymHealthAlertsSeverity | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
