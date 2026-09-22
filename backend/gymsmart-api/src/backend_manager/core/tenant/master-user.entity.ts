// RESPONSIBILITY: Master DB user entity for authentication and tenant membership lookup.
// FLOW: Master users table -> JWT actor -> tenant authorization.
import { Column, Entity, Index, Unique } from 'typeorm';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

@Entity({ name: 'users' })
@Index('IDX_users_email', ['email'])
@Unique('UQ_users_email', ['email'])
export class MasterUserEntity extends CoreBaseEntity {
  @Column({ type: 'varchar', length: 120 }) email!: string;
  @Column({ type: 'enum', enum: CoreRole, enumName: 'core_role_enum' }) role!: CoreRole;
  @Column({ name: 'is_active', type: 'boolean', default: true }) isActive!: boolean;
}
