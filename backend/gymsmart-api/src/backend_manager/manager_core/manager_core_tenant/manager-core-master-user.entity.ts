// RESPONSIBILITY: Owns backend core database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Column, Entity, Index, Unique } from 'typeorm';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

@Entity({ name: 'users' })
@Index('IDX_users_email', ['email'])
@Unique('UQ_users_email', ['email'])
export class MasterUserEntity extends CoreBaseEntity {
  @Column({ type: 'varchar', length: 120 }) email!: string;
  @Column({ type: 'enum', enum: ManagerCoreRole, enumName: 'core_role_enum' }) role!: ManagerCoreRole;
  @Column({ name: 'is_active', type: 'boolean', default: true }) isActive!: boolean;
}
