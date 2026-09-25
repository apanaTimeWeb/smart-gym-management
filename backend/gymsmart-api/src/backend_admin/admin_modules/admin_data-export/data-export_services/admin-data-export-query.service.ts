// RESPONSIBILITY: Owns read-side use cases for Admin data-export and secure artifact retrieval.
// FLOW: AdminDataExportQueryController -> query service -> repository/storage -> API contract.
import type { ReadStream } from 'node:fs';

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AdminCoreObjectStorageService } from '@/backend_admin/admin_core/admin_core_storage/admin-core-object-storage.service'

import { AdminDataExportQueryDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-query.dto'
import { AdminExportJobDto, AdminDataExportKPIDataDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-response.dto'
import { AdminDataExportResponsePresenter } from '@/backend_admin/admin_modules/admin_data-export/data-export_mappers/admin-data-export.response.presenter'
import { AdminDataExportRepository } from '@/backend_admin/admin_modules/admin_data-export/data-export_repositories/admin-data-export-repository'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@Injectable()
/**
 * @description Defines the AdminDataExportQueryService boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportQueryService {
  constructor(private readonly repository: AdminDataExportRepository, private readonly presenter: AdminDataExportResponsePresenter, private readonly storage: AdminCoreObjectStorageService) {}

  /** @description Executes fetchJobs with canonical pagination metadata and secure download metadata. @param query Validated query. @returns Paginated export jobs. */
  async findAllJobs(query: AdminDataExportQueryDto): Promise<AdminCorePaginatedResult<AdminExportJobDto>> {
    const result = await this.repository.findAll(query);
    const items = result.items.map((entity) => {
      const response = this.presenter.toResponse(entity as any);
      const domain = entity as any;
      const reference = typeof domain.data?.downloadReference === 'string' ? domain.data.downloadReference : null;
      return reference && entity.status === ('completed' as any) ? { ...response, downloadUrl: `/api/v1/admin/data-export/download?reference=${encodeURIComponent(reference)}`, downloadExpiresAt: typeof domain.data?.downloadExpiresAt === 'string' ? domain.data.downloadExpiresAt : undefined } : response;
    });
    return { items: items as any, meta: result.meta };
  }

  /** @description Returns tenant-scoped export KPIs. @param query Validated query. @returns KPI contract. */
  async findDataExportKpis(query: AdminDataExportQueryDto): Promise<AdminDataExportKPIDataDto> {
    const snapshot = await this.repository.findLatestSnapshotEntity(query);
    if (!snapshot) return { totalExports: 0, totalRowsExported: 0, lastExportDate: '', pendingJobs: 0 };
    const domain = snapshot as any;
    return {
      totalExports: Number(domain.payload?.kpis?.totalExports ?? domain.payload?.totalExports ?? 0),
      totalRowsExported: Number(domain.payload?.kpis?.totalRowsExported ?? domain.payload?.totalRowsExported ?? 0),
      lastExportDate: typeof domain.payload?.kpis?.lastExportDate === 'string' ? domain.payload.kpis.lastExportDate : (typeof domain.payload?.lastExportDate === 'string' ? domain.payload.lastExportDate : ''),
      pendingJobs: Number(domain.payload?.kpis?.pendingJobs ?? domain.payload?.pendingJobs ?? 0),
    };
  }

  /** @description Streams a completed export after verifying its signed reference. @param reference Signed object-storage reference. @returns File bytes and metadata. @throws ForbiddenException for invalid or expired references. */
  async findExportDownload(reference: string): Promise<{ content: ReadStream; fileName: string }> {
    try {
      const verified = this.storage.verifySignedReference(reference);
      const [objectKey] = reference.split('?');
      const job = await this.repository.findByObjectKey(objectKey);
      if (!job) throw new NotFoundException({ message: 'EXPORT.RESULT_NOT_FOUND', errorCode: 'ADMIN.EXPORT.NOT_FOUND' });
      return { content: this.storage.createReadStream(verified.objectKey), fileName: typeof job.data.fileName === 'string' ? job.data.fileName : `tenant-export-${job.id}.zip` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new ForbiddenException({ message: 'EXPORT.REFERENCE_INVALID', errorCode: 'ADMIN.EXPORT.FORBIDDEN' });
    }
  }
}
