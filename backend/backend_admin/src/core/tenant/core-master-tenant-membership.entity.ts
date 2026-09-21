// RESPONSIBILITY: Maps master-database actor-to-tenant authorization records used before tenant DataSource selection.
// FLOW: Master DB → membership query → trusted tenant context → tenant DataSource.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenant_memberships')
@Index('IDX_tenant_memberships_actor', ['actorId'])
@Index('IDX_tenant_memberships_tenant', ['tenantId'])
@Index('UQ_tenant_memberships_actor_tenant', ['actorId', 'tenantId'], { unique: true })
export class CoreMasterTenantMembershipEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_tenant_memberships' })
  id!: string;

  @Column({ name: 'actor_id', type: 'uuid' })
  actorId!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId!: string;

  @Column({ name: 'role', type: 'varchar', length: 32, default: 'ADMIN' })
  role!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;
}
