// RESPONSIBILITY: Stores master-database admin authentication records.
// FLOW: Master DB â†’ AdminCoreMasterAdminEntity â†’ AdminCoreAuthService â†’ access/refresh tokens.
import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

import { AdminCoreMasterAdminRole } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin-role.enum.js';

@Entity('admins')
@Index('UQ_admins_email', ['email'], { unique: true })
/**
 * @description Defines the AdminCoreMasterAdminEntity boundary for the admin_core_auth backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterAdminEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_admins' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId!: string;

  @Column({ name: 'email', type: 'varchar', length: 320 })
  email!: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash!: string;

  @Column({ name: 'name', type: 'varchar', length: 160 })
  name!: string;

  @Column({ name: 'phone', type: 'varchar', length: 32, nullable: true })
  phone!: string | null;

  @Column({ name: 'role', type: 'enum', enum: AdminCoreMasterAdminRole, enumName: 'core_master_adminrole_enum', default: AdminCoreMasterAdminRole.ADMIN })
  role!: AdminCoreMasterAdminRole;

  @Column({ name: 'failed_login_count', type: 'int', default: 0 })
  failedLoginCount!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;
}
