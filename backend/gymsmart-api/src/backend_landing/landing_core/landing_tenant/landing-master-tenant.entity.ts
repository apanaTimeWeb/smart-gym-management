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

  @Column({ length: 120, comment: 'Globally unique human-readable tenant slug in the master registry.' })
  slug!: string;

  @Column({ name: 'display_name', length: 200, comment: 'Human-readable tenant name shown in platform-level contexts.' })
  displayName!: string;

  @Column({ name: 'database_name', length: 120, comment: 'Trusted logical PostgreSQL database name for this tenant.' })
  databaseName!: string;

  @Column({ type: 'enum', enum: LandingMasterTenantStatus, enumName: 'master_tenant_status', comment: 'Master registry lifecycle state used to authorize tenant database selection.' })
  status!: LandingMasterTenantStatus;
}
