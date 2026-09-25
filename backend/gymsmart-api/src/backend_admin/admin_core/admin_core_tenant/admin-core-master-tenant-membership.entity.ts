// RESPONSIBILITY: Maps master-database actor-to-tenant authorization records used before tenant DataSource selection.
// FLOW: Master DB â†’ admin_membership query â†’ trusted tenant context â†’ tenant DataSource.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AdminCoreMasterMembershipRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-membership-role.enum.js';

@Entity('tenant_memberships')
@Index('IDX_tenant_memberships_actor', ['actorId'])
@Index('IDX_tenant_memberships_tenant', ['tenantId'])
@Index('UQ_tenant_memberships_actor_tenant', ['actorId', 'tenantId'], { unique: true })
/**
 * @description Defines the AdminCoreMasterTenantMembershipEntity boundary for the admin_core_tenant backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterTenantMembershipEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_tenant_memberships' })
  id!: string;

  @Column({ name: 'actor_id', type: 'uuid' })
  actorId!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId!: string;

  @Column({ name: 'role', type: 'enum', enum: AdminCoreMasterMembershipRole, enumName: 'core_master_membershiprole_enum', default: AdminCoreMasterMembershipRole.ADMIN })
  role!: AdminCoreMasterMembershipRole;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;
}
