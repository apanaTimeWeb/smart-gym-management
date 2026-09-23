// RESPONSIBILITY: Owns backend core database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Column, Entity, Index, Unique } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';

@Entity({ name: 'tenants' })
@Index('IDX_tenants_database_name', ['databaseName'])
@Unique('UQ_tenants_slug', ['slug'])
@Unique('UQ_tenants_database_name', ['databaseName'])
export class MasterTenantEntity extends CoreBaseEntity {
  @Column({ type: 'varchar', length: 64 }) slug!: string;
  @Column({ name: 'database_name', type: 'varchar', length: 120 }) databaseName!: string;
  @Column({ name: 'is_active', type: 'boolean', default: true }) isActive!: boolean;
}
