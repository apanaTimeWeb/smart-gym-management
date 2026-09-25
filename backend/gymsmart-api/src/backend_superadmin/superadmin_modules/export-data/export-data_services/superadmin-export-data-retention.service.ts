// RESPONSIBILITY: Permanently purges tenant databases and export artifacts after the documented 90-day grace period.
// FLOW: SuperadminCoreScheduledJobRegistryService -> retention service -> release DataSource -> drop tenant DB -> purge export metadata/files.
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SuperadminCoreScheduledJobRegistryService } from '@/backend_superadmin/superadmin_core/superadmin_core_jobs/superadmin-core-scheduled-job-registry.service';
import { SuperadminCoreTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminCoreTenantDatasourceResolverService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-datasource-resolver.service';
import { SuperadminCoreTenantDatabaseProvisionerService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-database-provisioner.service';
import { SuperadminExportDataJobRepository } from '@/backend_superadmin/superadmin_modules/export-data/export-data_repositories/superadmin-export-data-job.repository';
import { SuperadminExportDataStorageAdapter } from '@/backend_superadmin/superadmin_modules/export-data/export-data_adapters/superadmin-export-data-storage.adapter';

const RETENTION_DAYS = 90;
const MS_PER_DAY = 86_400_000;

/**
 * Primary Intent: Defines SuperadminExportDataRetentionService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataRetentionService implements OnModuleInit {
  constructor(
    private readonly jobs: SuperadminExportDataJobRepository,
    private readonly storage: SuperadminExportDataStorageAdapter,
    private readonly tenants: SuperadminCoreTenantRegistryRepository,
    private readonly resolver: SuperadminCoreTenantDatasourceResolverService,
    private readonly provisioner: SuperadminCoreTenantDatabaseProvisionerService,
    private readonly scheduled: SuperadminCoreScheduledJobRegistryService,
  ) {}

  /**
 * Primary Intent: Executes the `onModuleInit` responsibility owned by this superadmin-export-data-retention.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the onModuleInit use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  onModuleInit(): void {
    this.scheduled.register({ name: 'SUPERADMIN.TENANT.OFFBOARDING_PURGE', execute: () => this.purgeExpiredTenants() });
  }

  /**
 * Primary Intent: Executes the `purgeExpiredTenants` responsibility owned by this superadmin-export-data-retention.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the purgeExpiredTenants use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async purgeExpiredTenants(): Promise<void> {
    const cutoff = new Date(Date.now() - RETENTION_DAYS * MS_PER_DAY);
    const tenants = await this.tenants.findTenantsReadyForPermanentRemoval(cutoff);
    for (const tenant of tenants) await this.purgeTenant(tenant.id, tenant.databaseName, cutoff);
  }

  /**
 * Primary Intent: Executes the `purgeTenant` responsibility owned by this superadmin-export-data-retention.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the purgeTenant use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async purgeTenant(tenantId: string, databaseName: string, cutoff: Date): Promise<void> {
    const artifacts = await this.jobs.findExpiredArtifactsForTenant(tenantId, cutoff);
    await this.resolver.release(tenantId);
    await this.provisioner.drop(databaseName);
    for (const artifact of artifacts) if (artifact.resultPath) await this.storage.remove(artifact.resultPath);
    await this.jobs.softDeleteExpiredTenantExportJobs(tenantId);
    await this.tenants.hardDeleteTenantMetadata(tenantId);
  }
}
