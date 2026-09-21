// RESPONSIBILITY: Maps the master auth_users table to TypeORM; it contains no business behavior.
// FLOW: AuthUserRepository -> AuthUserEntity -> PostgreSQL auth_users.

import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base-entity';
import { AuthRole } from '@/modules/auth/auth.roles.constants';
import { AuthUserStatus } from '@/modules/auth/auth.status.constants';
@Entity('auth_users')
@Unique('UQ_auth_users_email', ['email'])
@Index('IDX_auth_users_role', ['role'])
@Index('IDX_auth_users_status', ['status'])
export class AuthUserEntity extends CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_auth_users' })
  id!: string;

  @Column({ name: 'name', type: 'varchar', length: 160 }) name!: string;
  @Column({ name: 'email', type: 'citext' }) email!: string;
  @Column({ name: 'password_hash', type: 'varchar', length: 255 }) passwordHash!: string;
  @Column({ name: 'role', type: 'enum', enum: AuthRole }) role!: AuthRole;
  @Column({ name: 'tenant_id', type: 'uuid', nullable: true }) tenantId!: string | null;
  @Column({ name: 'status', type: 'enum', enum: AuthUserStatus }) status!: AuthUserStatus;
}
