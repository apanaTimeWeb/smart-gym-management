// RESPONSIBILITY: Maps the master database user identity and authentication credential record.
// FLOW: Master user repository → CoreUser entity → core_users table.


import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
import type { CoreRole } from '@/backend_trainer/core/types/core-auth.types';

@Entity('core_users')
export class CoreUserEntity extends CoreBaseEntity {
  @Column({ unique: true }) email!: string;
  @Column({ name: 'password_hash' }) passwordHash!: string;
  @Column() name!: string;
  @Column({ type: 'enum', enum: ['TRAINER','MANAGER','ADMIN','MEMBER'], enumName: 'core_role_enum' }) role!: CoreRole;
  @Column({ name: 'is_active', default: true }) isActive!: boolean;
}
