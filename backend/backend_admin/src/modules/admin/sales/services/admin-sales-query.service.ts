// RESPONSIBILITY: Owns read-side use cases for Admin sales; no write persistence occurs here.
// FLOW: AdminSalesQueryController → AdminSalesQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminSalesRepository } from '@/modules/admin/sales/repositories/admin-sales-repository';
import { AdminSalesMapper } from '@/modules/admin/sales/mappers/admin-sales.mapper';
import { AdminSalesQueryDto } from '@/modules/admin/sales/dtos/admin-sales-query.dto';

@Injectable()
export class AdminSalesQueryService {
  constructor(
    private readonly repository: AdminSalesRepository,
    private readonly mapper: AdminSalesMapper,
  ) {}


  /** @description Executes fetchOverview for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchOverview(query: AdminSalesQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['monthlyRevenue'] ?? [] : [];
  }

  /** @description Executes fetchReferralSources for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchReferralSources(query: AdminSalesQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['referralData'] ?? [] : [];
  }

  /** @description Executes fetchMembershipReport for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchMembershipReport(query: AdminSalesQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['report'] ?? [] : [];
  }

  /** @description Executes fetchPendingPayments for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPendingPayments(query: AdminSalesQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['members'] ?? [] : [];
  }

  /** @description Executes fetchAllMemberships for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchAllMemberships(query: AdminSalesQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['allMemberships'] ?? [] : [];
  }

  /** @description Executes fetchStoreOrders for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchStoreOrders(query: AdminSalesQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['orders'] ?? [] : [];
  }

  /** @description Executes fetchStoreSummary for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchStoreSummary(query: AdminSalesQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['storeSummary'] ?? [] : [];
  }
}
