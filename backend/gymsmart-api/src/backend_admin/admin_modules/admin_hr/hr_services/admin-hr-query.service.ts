// RESPONSIBILITY: Owns read-side use cases for Admin hr; no write persistence occurs here.
// FLOW: AdminHrQueryController â†’ AdminHrQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminHrQueryDto } from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-query.dto'
import { AdminHrStaffListResponseDto,
  AdminHrStaffDto,
  AdminHrPayrollListResponseDto,
  AdminHrSummaryDto,
  AdminHrLedgerEntryDto,
  AdminHrStaffPerformanceRecordDto
} from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-response.dto'
import { AdminHrResponsePresenter } from '@/backend_admin/admin_modules/admin_hr/hr_mappers/admin-hr.response.presenter'
import { AdminHrRepository } from '@/backend_admin/admin_modules/admin_hr/hr_repositories/admin-hr-repository'

@Injectable()
/**
 * @description Defines the AdminHrQueryService boundary for the admin_hr backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminHrQueryService {
  constructor(
    private readonly repository: AdminHrRepository,
    private readonly presenter: AdminHrResponsePresenter,
  ) {}

  /** @description Executes fetchStaff for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllStaff(query: AdminHrQueryDto): Promise<AdminHrStaffListResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('HR.READ_MODEL.NOT_FOUND');
    return this.presenter.toStaffListResponse(snapshot);
  }

  /** @description Executes fetchStaffById for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findStaffById(id: string): Promise<AdminHrStaffDto> {
    const entity = await this.repository.findByIdOrThrow(id);
    return this.presenter.toResponse(entity) as any;
  }

  /** @description Executes fetchPayrolls for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllPayrolls(query: AdminHrQueryDto): Promise<AdminHrPayrollListResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('HR.READ_MODEL.NOT_FOUND');
    return this.presenter.toPayrollListResponse(snapshot);
  }

  /** @description Executes fetchSummary for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findHrSummary(query: AdminHrQueryDto): Promise<AdminHrSummaryDto> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('HR.READ_MODEL.NOT_FOUND');
    return this.presenter.toSummaryResponse(snapshot);
  }

  /** @description Executes fetchLedger for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findLedger(query: AdminHrQueryDto): Promise<AdminHrLedgerEntryDto[]> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('HR.READ_MODEL.NOT_FOUND');
    return this.presenter.toLedgerResponse(snapshot);
  }

  /** @description Executes fetchPerformance for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findPerformance(query: AdminHrQueryDto): Promise<AdminHrStaffPerformanceRecordDto[]> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('HR.READ_MODEL.NOT_FOUND');
    return this.presenter.toPerformanceResponse(snapshot);
  }
}
