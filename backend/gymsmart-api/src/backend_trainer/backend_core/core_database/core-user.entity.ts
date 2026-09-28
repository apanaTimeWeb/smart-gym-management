// RESPONSIBILITY: Maps the master database user identity and authentication credential record.
// FLOW: Master user repository → CoreUser entity → core_users table.


import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';
import type { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';


/**
 * Intent: Defines the CoreUserEntity boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('core_users')
export class CoreUserEntity extends CoreBaseEntity {
  @Column({ unique: true }) email!: string;
  @Column({ name: 'password_hash' }) passwordHash!: string;
  @Column() name!: string;
  @Column({ name: 'role', type: 'varchar', length: 32 }) role!: CoreRole;
  @Column({ name: 'is_active', default: true }) isActive!: boolean;
}
