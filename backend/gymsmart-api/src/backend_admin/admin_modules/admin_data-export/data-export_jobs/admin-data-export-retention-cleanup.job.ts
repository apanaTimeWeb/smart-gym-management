// RESPONSIBILITY: Removes expired generated tenant export artifacts after their retention window.
// FLOW: Scheduled registry -> tenant context -> retention repository -> object storage delete -> status transition.
import { Injectable } from '@nestjs/common';

import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager.js';
import { AdminCoreObjectStorageService } from '@/backend_admin/admin_core/admin_core_storage/admin-core-object-storage.service.js';

import { AdminDataExportRetentionRepository } from '@/backend_admin/admin_modules/admin_data-export/data-export_repositories/admin-data-export-retention.repository.js';

@Injectable()
/**
 * @description Defines the AdminDataExportRetentionCleanupJob boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportRetentionCleanupJob {
  constructor(
    private readonly retentionRepository: AdminDataExportRetentionRepository,
    private readonly tenantManager: AdminCoreTenantDataSourceManager,
    private readonly storage: AdminCoreObjectStorageService,
  ) {}

  /**
   * @description Removes up to 250 expired export artifacts for the trusted current tenant.
   * @returns Number of expired export jobs processed.
   * @throws Error when tenant storage or repository access fails.
   */
  async run(): Promise<number> {
    try {
      const rows = await this.retentionRepository.findExpiredCompletedJobs(250);
      let cleaned = 0;
      for (const row of rows) {
        if (row.objectKey) await this.storage.delete(row.objectKey);
        await this.retentionRepository.markExpired(row.id);
        cleaned += 1;
      }
      return cleaned;
    } finally {
      this.tenantManager.releaseCurrent();
    }
  }
}
