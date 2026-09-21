// RESPONSIBILITY: Stores master-database admin authentication records.
// FLOW: Master DB → CoreMasterAdminEntity → CoreAuthService → access/refresh tokens.

import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('admins')
@Index('UQ_admins_email', ['email'], { unique: true })
export class CoreMasterAdminEntity {
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

  @Column({ name: 'role', type: 'varchar', length: 32, default: 'ADMIN' })
  role!: string;

  @Column({ name: 'failed_login_count', type: 'int', default: 0 })
  failedLoginCount!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;
}
