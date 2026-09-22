// RESPONSIBILITY: Master DB membership entity proving actor authorization for a tenant.
// FLOW: Actor + tenant -> membership -> trusted tenant database name.
import { Column, Entity, Index, Unique } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';

@Entity({ name: 'user_tenants' })
@Unique('UQ_user_tenants_user_id_tenant_id', ['userId', 'tenantId'])
@Index('IDX_user_tenants_user_id', ['userId'])
@Index('IDX_user_tenants_tenant_id', ['tenantId'])
export class MasterUserTenantEntity extends CoreBaseEntity {
  @Column({ name: 'user_id', type: 'uuid' }) userId!: string;
  @Column({ name: 'tenant_id', type: 'uuid' }) tenantId!: string;
  @Column({ name: 'database_name', type: 'varchar', length: 120 }) databaseName!: string;
  @Column({ name: 'is_active', type: 'boolean', default: true }) isActive!: boolean;
}
