// RESPONSIBILITY: Maps master-database tenant records used for tenant authorization and routing.
// FLOW: Master DB → CoreMasterTenantEntity → CoreMasterTenantLookupService → Tenant DataSource.

import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('tenants')
@Index('UQ_tenants_slug', ['slug'], { unique: true })
export class CoreMasterTenantEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_tenants' })
  id!: string;

  @Column({ name: 'name', type: 'varchar', length: 160 })
  name!: string;

  @Column({ name: 'slug', type: 'varchar', length: 160 })
  slug!: string;

  @Column({ name: 'database_name', type: 'varchar', length: 160, unique: false })
  databaseName!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;
}
