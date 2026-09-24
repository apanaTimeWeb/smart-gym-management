// RESPONSIBILITY: Provisions deterministic application tenants and disposable isolated test tenants with explicit cleanup.
// FLOW: Provision request/CLI â†’ MasterTenantRepository â†’ CREATE DATABASE â†’ tenant migrations â†’ tenant runtime.
import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { buildMasterDataSourceOptions } from '@/backend_landing/landing_core/database/master-data-source-options';

import { buildTenantDataSourceOptions } from '@/backend_landing/landing_core/database/tenant-data-source-options';

import { MasterTenantEntity, MasterTenantStatus } from '@/backend_landing/landing_core/landing_tenant/master-tenant.entity';

import { MasterTenantRepository } from '@/backend_landing/landing_core/landing_tenant/master-tenant.repository';


@Injectable()
export class TenantDatabaseProvisionerService {
  constructor(private readonly tenantRepository: MasterTenantRepository) {}

  /** @description Creates or migrates the configured local public tenant. @returns Resolves after master registration and tenant migrations complete. */
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

  /**
   * @description Creates a disposable test tenant through the same master registry and database provisioning path used by the application.
   * @returns The isolated test tenant registry row.
   */
  async provisionTestTenant(): Promise<MasterTenantEntity> {
    const tenantId = randomUUID();
    const tenant = await this.tenantRepository.createTenant({
      id: tenantId,
      slug: `e2e-${tenantId}`,
      displayName: `E2E Test ${tenantId}`,
      databaseName: `tenant_test_${tenantId.replaceAll('-', '')}`,
      status: MasterTenantStatus.ACTIVE,
    });
    try {
      await this.createTenantDatabase(tenant.databaseName);
      await this.runTenantMigrations(tenant.databaseName);
      return tenant;
    } catch (error: unknown) {
      await this.destroyTenantDatabase(tenant.databaseName).catch(() => undefined);
      await this.tenantRepository.softDeleteTenant(tenant.id).catch(() => undefined);
      throw error;
    }
  }

  /**
   * @description Soft-deletes the master registry row and drops the disposable test database after its connections are released.
   * @param tenantId - Test tenant UUID returned from provisioning.
   * @returns Resolves after cleanup completes.
   */
  async destroyTestTenant(tenantId: string): Promise<void> {
    const tenant = await this.tenantRepository.findById(tenantId);
    if (!tenant) return;
    await this.tenantRepository.softDeleteTenant(tenantId);
    await this.destroyTenantDatabase(tenant.databaseName);
  }

  private async createRegistryRow(tenantId: string): Promise<MasterTenantEntity> {
    return this.tenantRepository.createTenant({
      id: tenantId,
      slug: process.env.PUBLIC_TENANT_SLUG ?? 'demo-gym',
      displayName: process.env.PUBLIC_TENANT_NAME ?? 'GymSmart Demo Gym',
      databaseName: `tenant_${tenantId.replaceAll('-', '')}`,
      status: MasterTenantStatus.ACTIVE,
    });
  }

  private async createTenantDatabase(databaseName: string): Promise<void> {
    const dataSource = new DataSource(buildMasterDataSourceOptions());
    await dataSource.initialize();
    try {
      await dataSource.query(`CREATE DATABASE "${databaseName}"`);
    } finally {
      await dataSource.destroy();
    }
  }

  private async destroyTenantDatabase(databaseName: string): Promise<void> {
    const dataSource = new DataSource(buildMasterDataSourceOptions());
    await dataSource.initialize();
    try {
      await dataSource.query(`DROP DATABASE IF EXISTS "${databaseName}"`);
    } finally {
      await dataSource.destroy();
    }
  }

  private async runTenantMigrations(databaseName: string): Promise<void> {
    const dataSource = new DataSource(buildTenantDataSourceOptions(databaseName));
    await dataSource.initialize();
    try {
      await dataSource.runMigrations();
    } finally {
      await dataSource.destroy();
    }
  }
}
