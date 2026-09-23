// RESPONSIBILITY: Permanently purges tenant databases and export artifacts after the documented 90-day grace period.
// FLOW: ScheduledJobRegistryService -> retention service -> release DataSource -> drop tenant DB -> purge export metadata/files.
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ScheduledJobRegistryService } from '@/backend_superadmin/core/jobs/scheduled-job-registry.service';
import { TenantRegistryRepository } from '@/backend_superadmin/core/tenancy/tenant-registry.repository';
import { TenantDatasourceResolverService } from '@/backend_superadmin/core/tenancy/tenant-datasource-resolver.service';
import { TenantDatabaseProvisionerService } from '@/backend_superadmin/core/tenancy/tenant-database-provisioner.service';
import { ExportDataJobRepository } from '@/backend_superadmin/modules/backend_superadmin/export-data/repositories/export-data-job.repository';
import { ExportDataStorageAdapter } from '@/backend_superadmin/modules/backend_superadmin/export-data/adapters/export-data-storage.adapter';

const RETENTION_DAYS = 90;
const MS_PER_DAY = 86_400_000;

@Injectable()
export class ExportDataRetentionService implements OnModuleInit {
  constructor(
    private readonly jobs: ExportDataJobRepository,
    private readonly storage: ExportDataStorageAdapter,
    private readonly tenants: TenantRegistryRepository,
    private readonly resolver: TenantDatasourceResolverService,
    private readonly provisioner: TenantDatabaseProvisionerService,
    private readonly scheduled: ScheduledJobRegistryService,
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
