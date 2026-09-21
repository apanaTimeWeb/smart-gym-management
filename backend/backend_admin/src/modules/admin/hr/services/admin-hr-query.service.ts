// RESPONSIBILITY: Owns read-side use cases for Admin hr; no write persistence occurs here.
// FLOW: AdminHrQueryController → AdminHrQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminHrRepository } from '@/modules/admin/hr/repositories/admin-hr-repository';
import { AdminHrMapper } from '@/modules/admin/hr/mappers/admin-hr.mapper';
import { AdminHrQueryDto } from '@/modules/admin/hr/dtos/admin-hr-query.dto';

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
  async fetchStaff(query: AdminHrQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? { staff: snapshot.payload.staff ?? [], total: Array.isArray(snapshot.payload.staff) ? snapshot.payload.staff.length : 0 } : { staff: [], total: 0 };
  }

  /** @description Executes fetchStaffById for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchStaffById(id: string): Promise<Record<string, unknown>> {
    const entity = await this.repository.findByIdOrThrow(id);
    return this.mapper.toResponse(this.mapper.toDomain(entity));
  }

  /** @description Executes fetchPayrolls for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPayrolls(query: AdminHrQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? { payrolls: snapshot.payload.payrolls ?? [], total: Array.isArray(snapshot.payload.payrolls) ? snapshot.payload.payrolls.length : 0 } : { payrolls: [], total: 0 };
  }

  /** @description Executes fetchSummary for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchSummary(query: AdminHrQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload.summary as Record<string, unknown> ?? {}) : {};
  }

  /** @description Executes fetchLedger for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchLedger(query: AdminHrQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload.ledger ?? [] : [];
  }

  /** @description Executes fetchPerformance for the Admin hr feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPerformance(query: AdminHrQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload.performance ?? [] : [];
  }
}
