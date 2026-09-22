// RESPONSIBILITY: Maps master tenant metadata and logical database name.
// FLOW: Tenant provisioning repository → CoreTenant entity → core_tenants table.


import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
@Entity('core_tenants')
export class CoreTenantEntity extends CoreBaseEntity {
  @Column() name!: string;
  @Column({ name: 'database_name', unique: true }) databaseName!: string;
  @Column({ name: 'is_active', default: true }) isActive!: boolean;
}
