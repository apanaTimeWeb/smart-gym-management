// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin permissions feature and its frontend-backed payload.
// FLOW: Permissions Repository â†’ AdminPermissionsEntity â†’ PostgreSQL admin_permission_overrides table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity.js';

import { AdminPermissionsStatus } from '@/backend_admin/admin_modules/admin_permissions/admin-permissions.constants.js';

@Entity('admin_permission_overrides')
@Index('IDX_admin_permission_overrides_created_at', ['createdAt'])
/**
 * @description Defines the AdminPermissionsEntity boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPermissionsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_permission_overrides_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminPermissionsStatus, enumName: 'admin_permissions_status', nullable: true })
  status!: AdminPermissionsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
