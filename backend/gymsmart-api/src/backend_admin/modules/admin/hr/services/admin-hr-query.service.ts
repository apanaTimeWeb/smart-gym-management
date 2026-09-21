// RESPONSIBILITY: Owns read-side use cases for Admin hr; no write persistence occurs here.
// FLOW: AdminHrQueryController â†’ AdminHrQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminHrRepository } from '@/backend_admin/modules/admin/hr/repositories/admin-hr-repository';
import { AdminHrMapper } from '@/backend_admin/modules/admin/hr/mappers/admin-hr.mapper';
import { AdminHrQueryDto } from '@/backend_admin/modules/admin/hr/dtos/admin-hr-query.dto';
import { 
  AdminHrStaffListResponseDto,
  AdminHrStaffDto,
  AdminHrPayrollListResponseDto,
  AdminHrSummaryDto,
  AdminHrLedgerEntryDto,
  AdminHrStaffPerformanceRecordDto
} from '@/backend_admin/modules/admin/hr/dtos/admin-hr-response.dto';

@Injectable()
export class AdminHrQueryService {
  constructor(
    private readonly repository: AdminHrRepository,
    private readonly mapper: AdminHrMapper,
  ) {}


  /** @description Executes fetchStaff for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchStaff(query: AdminHrQueryDto): Promise<AdminHrStaffListResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? { staff: snapshot.payload.staff ?? [], total: Array.isArray(snapshot.payload.staff) ? snapshot.payload.staff.length : 0 } as unknown as AdminHrStaffListResponseDto : { staff: [], total: 0 } as unknown as AdminHrStaffListResponseDto;
  }

  /** @description Executes fetchStaffById for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchStaffById(id: string): Promise<AdminHrStaffDto> {
    const entity = await this.repository.findByIdOrThrow(id);
    return this.mapper.toResponse(this.mapper.toDomain(entity)) as unknown as AdminHrStaffDto;
  }

  /** @description Executes fetchPayrolls for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPayrolls(query: AdminHrQueryDto): Promise<AdminHrPayrollListResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? { payrolls: snapshot.payload.payrolls ?? [], total: Array.isArray(snapshot.payload.payrolls) ? snapshot.payload.payrolls.length : 0 } as unknown as AdminHrPayrollListResponseDto : { payrolls: [], total: 0 } as unknown as AdminHrPayrollListResponseDto;
  }

  /** @description Executes fetchSummary for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchSummary(query: AdminHrQueryDto): Promise<AdminHrSummaryDto> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload.summary as unknown as AdminHrSummaryDto ?? {} as unknown as AdminHrSummaryDto) : {} as unknown as AdminHrSummaryDto;
  }

  /** @description Executes fetchLedger for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchLedger(query: AdminHrQueryDto): Promise<AdminHrLedgerEntryDto[]> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload.ledger as unknown as AdminHrLedgerEntryDto[] ?? [] : [];
  }

  /** @description Executes fetchPerformance for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPerformance(query: AdminHrQueryDto): Promise<AdminHrStaffPerformanceRecordDto[]> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload.performance as unknown as AdminHrStaffPerformanceRecordDto[] ?? [] : [];
  }
}
