// RESPONSIBILITY: Maps actor-to-tenant authorization in the master database.
// FLOW: Tenant authorization lookup → CoreTenantMembership entity → membership table.


import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
import type { CoreRole } from '@/backend_trainer/core/types/core-auth.types';
@Entity('core_tenant_memberships')
export class CoreTenantMembershipEntity extends CoreBaseEntity {
  @Column({ name: 'user_id', type: 'uuid' }) userId!: string;
  @Column({ name: 'tenant_id', type: 'uuid' }) tenantId!: string;
  @Column({ type: 'enum', enum: ['TRAINER','MANAGER','ADMIN','MEMBER'], enumName: 'core_role_enum' }) role!: CoreRole;
}
