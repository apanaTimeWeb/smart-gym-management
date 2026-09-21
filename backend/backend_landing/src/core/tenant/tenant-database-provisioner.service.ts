// RESPONSIBILITY: Provisions a tenant PostgreSQL database and applies tenant migrations deterministically.
// FLOW: Local seed/provision command → master registry → CREATE DATABASE → tenant migrations.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MasterTenantRepository } from '@/core/tenant/master-tenant.repository';
import { MasterTenantEntity, MasterTenantStatus } from '@/core/tenant/master-tenant.entity';
import { buildMasterDataSourceOptions } from '@/core/database/master-data-source-options';
import { buildTenantDataSourceOptions } from '@/core/database/tenant-data-source-options';

@Injectable()
export class TenantDatabaseProvisionerService {
  constructor(private readonly tenantRepository: MasterTenantRepository) {}

  /** @description Creates or migrates the configured local demo tenant. @returns Resolves after master registration and tenant migrations complete. */
  async provisionConfiguredTenant(): Promise<void> {
    const tenantId = process.env.PUBLIC_TENANT_ID;
    if (!tenantId) throw new Error('PUBLIC_TENANT_ID must be configured.');
    const existing = await this.tenantRepository.findActiveById(tenantId);
    if (existing) {
      await this.runTenantMigrations(existing.databaseName);
      return;
    }
    const tenant = await this.createRegistryRow(tenantId);
    await this.createTenantDatabase(tenant.databaseName);
    await this.runTenantMigrations(tenant.databaseName);
  }

  /** @description Creates the deterministic master tenant registry row. @param tenantId - Configured tenant UUID. @returns Persisted tenant registry row. */
  private async createRegistryRow(tenantId: string): Promise<MasterTenantEntity> {
    return this.tenantRepository.createTenant({
      id: tenantId,
      slug: process.env.PUBLIC_TENANT_SLUG ?? 'demo-gym',
      displayName: process.env.PUBLIC_TENANT_NAME ?? 'GymSmart Demo Gym',
      databaseName: `tenant_${tenantId.replaceAll('-', '')}`,
      status: MasterTenantStatus.ACTIVE,
    });
  }

  /** @description Creates a PostgreSQL database for the tenant. @param databaseName - Safe deterministic database identifier. @returns Resolves after database creation. */
  private async createTenantDatabase(databaseName: string): Promise<void> {
    const dataSource = new DataSource(buildMasterDataSourceOptions());
    await dataSource.initialize();
    await dataSource.query(`CREATE DATABASE "${databaseName}"`);
    await dataSource.destroy();
  }

  /** @description Applies all tenant migrations to the newly provisioned database. @param databaseName - Tenant database identifier. @returns Resolves after migration completion. */
  private async runTenantMigrations(databaseName: string): Promise<void> {
    const dataSource = new DataSource(buildTenantDataSourceOptions(databaseName));
    await dataSource.initialize();
    await dataSource.runMigrations();
    await dataSource.destroy();
  }
}
