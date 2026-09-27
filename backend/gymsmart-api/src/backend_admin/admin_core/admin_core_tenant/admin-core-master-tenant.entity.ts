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

  @Column({ name: 'display_name', type: 'varchar', length: 500, default: 'Demo Gym' })
  displayName!: string;

  @Column({ name: 'owner_name', type: 'varchar', length: 500, default: 'Seed Owner' })
  ownerName!: string;

  @Column({ name: 'admin_email', type: 'varchar', length: 500, default: 'admin@gymsmart.com' })
  adminEmail!: string;

  @Column({ name: 'phone', type: 'varchar', length: 500, default: '9999999999' })
  phone!: string;

  @Column({ name: 'status', type: 'varchar', length: 50, default: 'ACTIVE' })
  status!: string;

  @Column({ name: 'plan', type: 'varchar', length: 500, default: 'Enterprise' })
  plan!: string;

  @Column({ name: 'database_version', type: 'varchar', length: 500, default: 'v1.0' })
  databaseVersion!: string;

  @Column({ name: 'city', type: 'varchar', length: 500, default: 'Demo City' })
  city!: string;

  @Column({ name: 'state', type: 'varchar', length: 500, default: 'Demo State' })
  state!: string;

  @Column({ name: 'country', type: 'varchar', length: 500, default: 'India' })
  country!: string;

  @Column({ name: 'gstin', type: 'varchar', length: 500, default: '' })
  gstin!: string;
}
