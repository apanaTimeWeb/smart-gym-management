// RESPONSIBILITY: Owns read-side use cases for Admin reports; no write persistence occurs here.
// FLOW: AdminReportsQueryController -> AdminReportsQueryService -> repository/storage -> mapper -> ApiResponse.
import { ConflictException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminCoreObjectStorageService } from '@/backend_admin/admin_core/admin_core_storage/admin-core-object-storage.service'

import { AdminReportsQueryDto } from '@/backend_admin/admin_modules/admin_reports/reports_dtos/admin-reports-query.dto'
import { AdminReportsDataResponseDto } from '@/backend_admin/admin_modules/admin_reports/reports_dtos/admin-reports-response.dto'
import { AdminReportsResponsePresenter } from '@/backend_admin/admin_modules/admin_reports/reports_mappers/admin-reports.response.presenter'
import { AdminReportsRepository } from '@/backend_admin/admin_modules/admin_reports/reports_repositories/admin-reports-repository'

@Injectable()
/**
 * @description Defines the AdminReportsQueryService boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsQueryService {
  constructor(
    private readonly repository: AdminReportsRepository,
    private readonly presenter: AdminReportsResponsePresenter,
    private readonly storage: AdminCoreObjectStorageService,
  ) {}

  /** @description Executes fetchReportData using the newest tenant-scoped report read model. @param query Validated query when applicable. @returns Frontend contract response. */
  async findReportData(query: AdminReportsQueryDto): Promise<AdminReportsDataResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toResponse(snapshot) as any;
  }

  /** @description Reads a completed report artifact only when the current tenant owns the job. @param id Report export job UUID. @returns Stored artifact bytes. @throws ConflictException when the job is still processing or result is absent. */
  async findReportExportDownload(id: string): Promise<{ content: Buffer; fileName: string; contentType: string }> {
    const job = await this.repository.findByIdOrThrow(id);
    if (job.status !== 'completed') throw new ConflictException({ message: 'EXPORT.NOT_READY', errorCode: 'ADMIN.REPORTS.CONFLICT' });
    const objectKey = typeof job.data.objectKey === 'string' ? job.data.objectKey : null;
    if (!objectKey) throw new ConflictException({ message: 'EXPORT.RESULT_MISSING', errorCode: 'ADMIN.REPORTS.CONFLICT' });
    const content = await this.storage.get(objectKey);
    const fileName = typeof job.data.fileName === 'string' ? job.data.fileName : `report-${id}.pdf`;
    const contentType = fileName.endsWith('.xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf';
    return { content, fileName, contentType };
  }
}
