// RESPONSIBILITY: Maps the master tenants registry used for trusted tenant lookup and provisioning.
// FLOW: Master tenant registry â†’ TenantDatabaseProvisioner / TenantResolution â†’ tenant DB.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { LandingBaseEntity } from '@/backend_landing/landing_core/landing_database/landing-base.entity';


export enum LandingMasterTenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TRIAL = 'TRIAL',
  CANCELLED = 'CANCELLED',
}

/**
 * Intent: Defines the LandingMasterTenantEntity class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Entity('tenants')
@Index('UQ_tenants_slug', ['slug'], { unique: true })
@Index('UQ_tenants_database_name', ['databaseName'], { unique: true })
@Index('IDX_tenants_status', ['status'])
/**
 * Intent: Defines the landing master tenant entity boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingMasterTenantEntity extends LandingBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_tenants', comment: 'Globally unique UUID identity for one tenant registry row.' })
  declare id: string;

  @Column({ name: 'name', length: 160, comment: 'Internal tenant identifier name.' })
  name!: string;

  @Column({ length: 120, comment: 'Globally unique human-readable tenant slug in the master registry.' })
  slug!: string;

  @Column({ name: 'owner_name', length: 500, default: 'Seed Owner' })
  ownerName!: string;

  @Column({ name: 'admin_email', length: 500, default: 'admin@gymsmart.com' })
  adminEmail!: string;

  @Column({ name: 'phone', length: 500, default: '9999999999' })
  phone!: string;

  @Column({ name: 'plan', length: 500, default: 'Enterprise' })
  plan!: string;

  @Column({ name: 'database_version', length: 500, default: 'v1.0' })
  databaseVersion!: string;

  @Column({ name: 'city', length: 500, default: 'Demo City' })
  city!: string;

  @Column({ name: 'state', length: 500, default: 'Demo State' })
  state!: string;

  @Column({ name: 'country', length: 500, default: 'India' })
  country!: string;

  @Column({ name: 'gstin', length: 500, default: '' })
  gstin!: string;

  @Column({ name: 'display_name', length: 200, comment: 'Human-readable tenant name shown in platform-level contexts.' })
  displayName!: string;

  @Column({ name: 'database_name', length: 120, comment: 'Trusted logical PostgreSQL database name for this tenant.' })
  databaseName!: string;

  @Column({ type: 'enum', enum: LandingMasterTenantStatus, enumName: 'master_tenant_status', comment: 'Master registry lifecycle state used to authorize tenant database selection.' })
  status!: LandingMasterTenantStatus;
}
