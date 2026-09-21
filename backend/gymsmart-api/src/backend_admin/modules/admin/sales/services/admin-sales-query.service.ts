// RESPONSIBILITY: Owns read-side use cases for Admin sales; no write persistence occurs here.
// FLOW: AdminSalesQueryController â†’ AdminSalesQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminSalesRepository } from '@/backend_admin/modules/admin/sales/repositories/admin-sales-repository';
import { AdminSalesMapper } from '@/backend_admin/modules/admin/sales/mappers/admin-sales.mapper';
import { AdminSalesQueryDto } from '@/backend_admin/modules/admin/sales/dtos/admin-sales-query.dto';
import { 
  AdminSalesOverviewResponseDto,
  ReferralDataPointDto,
  AdminSalesMembershipReportResponseDto,
  AdminSalesPendingPaymentsResponseDto,
  AdminSalesAllMembershipsResponseDto,
  AdminSalesStoreOrdersResponseDto,
  AdminSalesStoreSummaryResponseDto
} from '@/backend_admin/modules/admin/sales/dtos/admin-sales-response.dto';

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
  async fetchOverview(query: AdminSalesQueryDto): Promise<AdminSalesOverviewResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return { monthlyRevenue: snapshot ? (snapshot.payload['monthlyRevenue'] as any) ?? [] : [] } as unknown as AdminSalesOverviewResponseDto;
  }

  /** @description Executes fetchReferralSources for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchReferralSources(query: AdminSalesQueryDto): Promise<ReferralDataPointDto[]> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload['referralData'] as any) ?? [] : [];
  }

  /** @description Executes fetchMembershipReport for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchMembershipReport(query: AdminSalesQueryDto): Promise<AdminSalesMembershipReportResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload['report'] ?? { report: [], totals: {} } : { report: [], totals: {} }) as unknown as AdminSalesMembershipReportResponseDto;
  }

  /** @description Executes fetchPendingPayments for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPendingPayments(query: AdminSalesQueryDto): Promise<AdminSalesPendingPaymentsResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload['members'] ?? { members: [], total: 0 } : { members: [], total: 0 }) as unknown as AdminSalesPendingPaymentsResponseDto;
  }

  /** @description Executes fetchAllMemberships for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchAllMemberships(query: AdminSalesQueryDto): Promise<AdminSalesAllMembershipsResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload['allMemberships'] ?? { members: [], total: 0 } : { members: [], total: 0 }) as unknown as AdminSalesAllMembershipsResponseDto;
  }

  /** @description Executes fetchStoreOrders for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchStoreOrders(query: AdminSalesQueryDto): Promise<AdminSalesStoreOrdersResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload['orders'] ?? { orders: [], total: 0 } : { orders: [], total: 0 }) as unknown as AdminSalesStoreOrdersResponseDto;
  }

  /** @description Executes fetchStoreSummary for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchStoreSummary(query: AdminSalesQueryDto): Promise<AdminSalesStoreSummaryResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? snapshot.payload['storeSummary'] ?? { summary: null } : { summary: null }) as unknown as AdminSalesStoreSummaryResponseDto;
  }
}
