// RESPONSIBILITY: Owns repository-only retention queries for Admin tenant export jobs.
// FLOW: Retention job -> AdminDataExportRetentionRepository -> TypeORM -> admin_data_export_jobs.
import { Injectable } from '@nestjs/common';

import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { AdminCoreTenantRepositoryBase } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-repository.base'

import { AdminDataExportEntity } from '@/backend_admin/admin_modules/admin_data-export/data-export_entities/admin-data-export-entity'
import { AdminDataExportMapper } from '@/backend_admin/admin_modules/admin_data-export/data-export_mappers/admin-data-export.mapper'
import type { AdminDataExportDomainModel } from '@/backend_admin/admin_modules/admin_data-export/data-export_domain/admin-data-export.domain'

interface AdminDataExportRetentionRow {
  id: string;
  objectKey: string | null;
}

@Injectable()
/**
 * @description Defines the AdminDataExportRetentionRepository boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportRetentionRepository extends AdminCoreTenantRepositoryBase<AdminDataExportEntity> {
  constructor(tenantManager: AdminCoreTenantDataSourceManager, private readonly mapper: AdminDataExportMapper) {
    super(tenantManager);
  }

  /**
   * @description Finds completed export jobs whose signed download reference has expired.
   * @param limit Maximum number of rows to inspect in this bounded maintenance pass.
   * @returns Typed tenant-scoped retention candidates.
   */
  async findExpiredCompletedJobs(limit: number): Promise<AdminDataExportRetentionRow[]> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
    return repository
      .createQueryBuilder('entity')
      .select(['entity.id AS id', "entity.payload ->> 'objectKey' AS objectKey"])
      .where('entity.deleted_at IS NULL')
      .andWhere("entity.status = :status", { status: 'completed' })
      .andWhere("(entity.payload ->> 'downloadExpiresAt')::timestamptz <= NOW()")
      .limit(Math.max(1, Math.min(limit, 250)))
      .getRawMany<AdminDataExportRetentionRow>();
  }

  /**
   * @description Marks one completed export job as expired after its artifact has been removed.
   * @param id Tenant-scoped export job UUID.
   * @returns Promise completion.
   */
  async markExpired(id: string): Promise<void> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
    const entity = await repository.findOne({ where: { id } });
    if (!entity) return;
    this.captureMutationBefore(entity);
    entity.status = 'expired' as any;
    entity.payload = { ...entity.payload, retentionCleanedAt: new Date().toISOString() };
    await repository.save(entity);
  }
}
