// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin settings feature and its frontend-backed payload.
// FLOW: Settings Repository â†’ AdminSettingsEntity â†’ PostgreSQL admin_settings table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminSettingsStatus } from '@/backend_admin/admin_modules/admin_settings/admin-settings.constants'

@Entity('admin_settings')
@Index('IDX_admin_settings_created_at', ['createdAt'])
/**
 * @description Defines the AdminSettingsEntity boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_settings_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminSettingsStatus, enumName: 'admin_settings_status', nullable: true })
  status!: AdminSettingsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
