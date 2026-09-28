// RESPONSIBILITY: Maps actor-to-tenant authorization in the master database.
// FLOW: Tenant authorization lookup → CoreTenantMembership entity → membership table.


import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';
import type { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';

/**
 * Intent: Defines the CoreTenantMembershipEntity boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('core_tenant_memberships')
export class CoreTenantMembershipEntity extends CoreBaseEntity {
  @Column({ name: 'user_id', type: 'uuid' }) userId!: string;
  @Column({ name: 'tenant_id', type: 'uuid' }) tenantId!: string;
  @Column({ name: 'role', type: 'varchar', length: 32 }) role!: CoreRole;
}
