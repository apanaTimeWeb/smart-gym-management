// RESPONSIBILITY: Permanently purges tenant databases and export artifacts after the documented 90-day grace period.
// FLOW: SuperadminScheduledJobRegistryService -> retention service -> release DataSource -> drop tenant DB -> purge export metadata/files.
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SuperadminScheduledJobRegistryService } from '@/backend_superadmin/superadmin_core/jobs/superadmin-core-scheduled-job-registry.service';
import { SuperadminTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminTenantDatasourceResolverService } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-datasource-resolver.service';
import { SuperadminTenantDatabaseProvisionerService } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-database-provisioner.service';
import { SuperadminExportDataJobRepository } from '@/backend_superadmin/superadmin_modules/export-data/repositories/superadmin-export-data-job.repository';
import { SuperadminExportDataStorageAdapter } from '@/backend_superadmin/superadmin_modules/export-data/adapters/superadmin-export-data-storage.adapter';

const RETENTION_DAYS = 90;
const MS_PER_DAY = 86_400_000;

@Injectable()
export class SuperadminExportDataRetentionService implements OnModuleInit {
  constructor(
    private readonly jobs: SuperadminExportDataJobRepository,
    private readonly storage: SuperadminExportDataStorageAdapter,
    private readonly tenants: SuperadminTenantRegistryRepository,
    private readonly resolver: SuperadminTenantDatasourceResolverService,
    private readonly provisioner: SuperadminTenantDatabaseProvisionerService,
    private readonly scheduled: SuperadminScheduledJobRegistryService,
  ) {}

  /** Registers the retention handler with the central distributed scheduler registry. */
  onModuleInit(): void {
    this.scheduled.register({ name: 'SUPERADMIN.TENANT.OFFBOARDING_PURGE', execute: () => this.purgeExpiredTenants() });
  }

  /** Purges every tenant whose soft-deletion timestamp is beyond the retention window. */
  async purgeExpiredTenants(): Promise<void> {
    const cutoff = new Date(Date.now() - RETENTION_DAYS * MS_PER_DAY);
    const tenants = await this.tenants.findTenantsReadyForPermanentRemoval(cutoff);
    for (const tenant of tenants) await this.purgeTenant(tenant.id, tenant.databaseName, cutoff);
  }

  /** Releases active connections, removes export artifacts, drops tenant DB, and purges master metadata. */
  private async purgeTenant(tenantId: string, databaseName: string, cutoff: Date): Promise<void> {
    const artifacts = await this.jobs.findExpiredArtifactsForTenant(tenantId, cutoff);
    await this.resolver.release(tenantId);
    await this.provisioner.drop(databaseName);
    for (const artifact of artifacts) if (artifact.resultPath) await this.storage.remove(artifact.resultPath);
    await this.jobs.hardDeleteTenantExportJobs(tenantId);
    await this.tenants.hardDeleteTenantMetadata(tenantId);
  }
}
