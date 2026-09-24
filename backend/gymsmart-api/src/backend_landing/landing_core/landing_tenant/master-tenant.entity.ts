// RESPONSIBILITY: Maps the master tenants registry used for trusted tenant lookup and provisioning.
// FLOW: Master tenant registry â†’ TenantDatabaseProvisioner / TenantResolution â†’ tenant DB.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CoreBaseEntity } from '@/backend_landing/landing_core/database/base.entity';


export enum MasterTenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

@Entity('tenants')
@Index('UQ_tenants_slug', ['slug'], { unique: true })
@Index('UQ_tenants_database_name', ['databaseName'], { unique: true })
@Index('IDX_tenants_status', ['status'])
export class MasterTenantEntity extends CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_tenants' })
  declare id: string;

  @Column({ length: 120 })
  slug!: string;

  @Column({ name: 'display_name', length: 200 })
  displayName!: string;

  @Column({ name: 'database_name', length: 120 })
  databaseName!: string;

  @Column({ type: 'enum', enum: MasterTenantStatus, enumName: 'master_tenant_status' })
  status!: MasterTenantStatus;
}
