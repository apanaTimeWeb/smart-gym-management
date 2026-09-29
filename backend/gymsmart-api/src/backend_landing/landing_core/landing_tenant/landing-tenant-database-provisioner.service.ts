// RESPONSIBILITY: Provisions deterministic application tenants and disposable isolated test tenants using validated master configuration.
// FLOW: Provision request -> master tenant repository -> CREATE DATABASE -> tenant migrations -> tenant runtime.
import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DataSource } from 'typeorm';

import { getLandingDatabasePoolConfig } from '@/backend_landing/landing_core/landing_config/landing-database.config';
import { buildMasterDataSourceOptions } from '@/backend_landing/landing_core/landing_database/landing-master-data-source-options';
import { buildTenantDataSourceOptions } from '@/backend_landing/landing_core/landing_database/landing-tenant-data-source-options';
import { LandingMasterTenantEntity, LandingMasterTenantStatus } from '@/backend_landing/landing_core/landing_tenant/landing-master-tenant.entity';
import { LandingMasterTenantRepository } from '@/backend_landing/landing_core/landing_tenant/landing-master-tenant.repository';

/**
 * Intent: Provision and retire logical PostgreSQL tenant databases without allowing business services to construct database connections themselves.
 * Edge Cases: Partial provisioning rolls back registry/database state as far as the available infrastructure permits.
 * Side Effects: Creates or drops PostgreSQL databases and executes tenant migrations.
 * AI Notes: Database names always come from server-generated or trusted configuration values; never from client input.
 */
@Injectable()
export class LandingTenantDatabaseProvisionerService {
  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-database-provisioner.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly config: ConfigService,
    private readonly tenantRepository: LandingMasterTenantRepository,
  ) {}

  /**
   * Intent: Ensure the configured public tenant exists and its schema is current.
   * Edge Cases: Re-running this operation is safe because an existing active tenant is migrated instead of duplicated.
   * Side Effects: May create the tenant database and execute pending TypeORM migrations.
   * AI Notes: The tenant identifier is read only from validated configuration.
   */
  async provisionConfiguredTenant(): Promise<void> {
    const tenantId = this.config.getOrThrow<string>('landing.publicTenantId');
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
   * Intent: Create a uniquely named disposable tenant for isolated API E2E execution.
   * Edge Cases: Database creation or migration failure triggers best-effort cleanup of both database and registry row.
   * Side Effects: Creates a master registry row, PostgreSQL database, and tenant schema.
   * AI Notes: Test tenants must never reuse development or production databases.
   */
  async provisionTestTenant(): Promise<LandingMasterTenantEntity> {
    const tenantId = randomUUID();
    const tenant = await this.tenantRepository.createTenant({
      id: tenantId,
      slug: `e2e-${tenantId}`,
      displayName: `E2E Test ${tenantId}`,
      databaseName: `tenant_test_${tenantId.replaceAll('-', '')}`,
      status: LandingMasterTenantStatus.ACTIVE,
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
   * Intent: Retire and destroy a disposable test tenant after all active tenant connections are released.
   * Edge Cases: Unknown tenants are treated as already cleaned up.
   * Side Effects: Soft-deletes master registry state and drops the isolated test database.
   * AI Notes: Never expose this operation in a non-test environment.
   */
  async destroyTestTenant(tenantId: string): Promise<void> {
    const tenant = await this.tenantRepository.findById(tenantId);
    if (!tenant) return;
    this.assertDisposableTenant(tenant);
    await this.tenantRepository.softDeleteTenant(tenantId);
    await this.destroyTenantDatabase(tenant.databaseName);
  }

  /**
   * @description Rejects attempts to use the test cleanup path against non-disposable tenant registry rows.
   * @param tenant - Master tenant candidate selected for cleanup.
   * @returns Nothing.
   * @throws Error when the registry row is not a server-generated E2E tenant.
   * @remarks Both slug and database-name prefixes are checked so a test-only token cannot be used to drop an arbitrary tenant database.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-database-provisioner.service.assertDisposableTenant at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private assertDisposableTenant(tenant: LandingMasterTenantEntity): void {
    const disposable = tenant.slug.startsWith('e2e-') && tenant.databaseName.startsWith('tenant_test_');
    if (!disposable) throw new Error('TEST_TENANT_CLEANUP_SCOPE_VIOLATION');
  }

  /**
   * Intent: Create a trusted master registry row for the configured public tenant.
   * Edge Cases: The same tenant ID must not be registered twice under a different database name.
   * Side Effects: Persists one row in the master tenants table.
   * AI Notes: Slug and display name come only from validated configuration.
   */
  private async createRegistryRow(tenantId: string): Promise<LandingMasterTenantEntity> {
    return this.tenantRepository.createTenant({
      id: tenantId,
      slug: this.config.getOrThrow<string>('landing.publicTenantSlug'),
      displayName: this.config.getOrThrow<string>('landing.publicTenantName'),
      databaseName: `tenant_${tenantId.replaceAll('-', '')}`,
      status: LandingMasterTenantStatus.ACTIVE,
    });
  }

  /**
   * Intent: Create a PostgreSQL logical database using the validated master connection configuration.
   * Edge Cases: Database names are generated server-side and enclosed safely as SQL identifiers.
   * Side Effects: Creates a PostgreSQL database.
   * AI Notes: This is infrastructure-only; business services must not call DataSource constructors.
   */
  private async createTenantDatabase(databaseName: string): Promise<void> {
    const dataSource = new DataSource(this.buildMasterOptions());
    await dataSource.initialize();
    try {
      await dataSource.query(`CREATE DATABASE "${databaseName.replaceAll('"', '""')}"`);
    } finally {
      await dataSource.destroy();
    }
  }

  /**
   * Intent: Drop a disposable PostgreSQL logical database during controlled test cleanup.
   * Edge Cases: IF EXISTS makes cleanup idempotent; connection closure must happen in finally.
   * Side Effects: Permanently removes the isolated test database.
   * AI Notes: Production tenant deletion follows the Rule 110 retention workflow instead.
   */
  private async destroyTenantDatabase(databaseName: string): Promise<void> {
    const dataSource = new DataSource(this.buildMasterOptions());
    await dataSource.initialize();
    try {
      await dataSource.query(`DROP DATABASE IF EXISTS "${databaseName.replaceAll('"', '""')}"`);
    } finally {
      await dataSource.destroy();
    }
  }

  /**
   * Intent: Execute all pending tenant schema migrations against one logical tenant database.
   * Edge Cases: Migration failure prevents the tenant from being considered provisioned.
   * Side Effects: Creates/updates tenant tables and constraints.
   * AI Notes: synchronize remains false; TypeORM migrations are the only schema-change mechanism.
   */
  private async runTenantMigrations(databaseName: string): Promise<void> {
    const dataSource = new DataSource(this.buildTenantOptions(databaseName));
    await dataSource.initialize();
    try {
      await dataSource.runMigrations();
    } finally {
      await dataSource.destroy();
    }
  }

  /** @description Builds master DB options from validated ConfigService state for provisioning tasks. @returns Master DataSource options. */
  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-database-provisioner.service.buildMasterOptions at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private buildMasterOptions(): ReturnType<typeof buildMasterDataSourceOptions> {
    return buildMasterDataSourceOptions(
      this.config.getOrThrow('landing.masterDb'),
      getLandingDatabasePoolConfig(this.config),
    );
  }

  /** @description Builds tenant DB options from a trusted database name and validated master connection settings. @param databaseName - Server-trusted tenant database name. @returns Tenant DataSource options. */
  
  /**
   * Intent: Preserve the single responsibility of landing-tenant-database-provisioner.service.buildTenantOptions at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private buildTenantOptions(databaseName: string): ReturnType<typeof buildTenantDataSourceOptions> {
    return buildTenantDataSourceOptions(
      databaseName,
      this.config.getOrThrow('landing.masterDb'),
      getLandingDatabasePoolConfig(this.config),
    );
  }
}
