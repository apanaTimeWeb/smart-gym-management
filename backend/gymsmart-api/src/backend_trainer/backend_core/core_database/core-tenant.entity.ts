// RESPONSIBILITY: Maps master tenant metadata and logical database name.
// FLOW: Tenant provisioning repository → CoreTenant entity → core_tenants table.


import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';

/**
 * Intent: Defines the CoreTenantEntity boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('core_tenants')
export class CoreTenantEntity extends CoreBaseEntity {
  @Column() name!: string;
  @Column({ name: 'database_name', unique: true }) databaseName!: string;
  @Column({ name: 'is_active', default: true }) isActive!: boolean;
}
