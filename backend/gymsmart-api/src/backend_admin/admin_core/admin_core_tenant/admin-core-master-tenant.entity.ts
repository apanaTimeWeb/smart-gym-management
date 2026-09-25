// RESPONSIBILITY: Maps master-database tenant records used for tenant authorization and routing.
// FLOW: Master DB â†’ AdminCoreMasterTenantEntity â†’ AdminCoreMasterTenantLookupService â†’ Tenant DataSource.
import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('tenants')
@Index('UQ_tenants_slug', ['slug'], { unique: true })
/**
 * @description Defines the AdminCoreMasterTenantEntity boundary for the admin_core_tenant backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterTenantEntity {
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
