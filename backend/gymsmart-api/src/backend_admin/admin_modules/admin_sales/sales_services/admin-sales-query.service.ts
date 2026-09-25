// RESPONSIBILITY: Owns read-side use cases for Admin sales; no write persistence occurs here.
// FLOW: AdminSalesQueryController â†’ AdminSalesQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminSalesQueryDto } from '@/backend_admin/admin_modules/admin_sales/sales_dtos/admin-sales-query.dto'
import { AdminSalesOverviewResponseDto,
  ReferralDataPointDto,
  AdminSalesMembershipReportResponseDto,
  AdminSalesPendingPaymentsResponseDto,
  AdminSalesAllMembershipsResponseDto,
  AdminSalesStoreOrdersResponseDto,
  AdminSalesStoreSummaryResponseDto
} from '@/backend_admin/admin_modules/admin_sales/sales_dtos/admin-sales-response.dto'
import { AdminSalesResponsePresenter } from '@/backend_admin/admin_modules/admin_sales/sales_mappers/admin-sales.response.presenter'
import { AdminSalesRepository } from '@/backend_admin/admin_modules/admin_sales/sales_repositories/admin-sales-repository'

@Injectable()
/**
 * @description Defines the AdminSalesQueryService boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesQueryService {
  constructor(
    private readonly repository: AdminSalesRepository,
    private readonly presenter: AdminSalesResponsePresenter,
  ) {}

  /** @description Executes fetchOverview for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findOverview(query: AdminSalesQueryDto): Promise<AdminSalesOverviewResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('SALES.READ_MODEL.NOT_FOUND');
    return this.presenter.toOverviewResponse(snapshot);
  }

  /** @description Executes fetchReferralSources for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findReferralSources(query: AdminSalesQueryDto): Promise<ReferralDataPointDto[]> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('SALES.READ_MODEL.NOT_FOUND');
    return this.presenter.toReferralResponse(snapshot);
  }

  /** @description Executes fetchMembershipReport for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findMembershipReport(query: AdminSalesQueryDto): Promise<AdminSalesMembershipReportResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('SALES.READ_MODEL.NOT_FOUND');
    return this.presenter.toMembershipReportResponse(snapshot);
  }

  /** @description Executes fetchPendingPayments for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findPendingPayments(query: AdminSalesQueryDto): Promise<AdminSalesPendingPaymentsResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('SALES.READ_MODEL.NOT_FOUND');
    return this.presenter.toPendingPaymentsResponse(snapshot);
  }

  /** @description Executes fetchAllMemberships for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllMemberships(query: AdminSalesQueryDto): Promise<AdminSalesAllMembershipsResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('SALES.READ_MODEL.NOT_FOUND');
    return this.presenter.toAllMembershipsResponse(snapshot);
  }

  /** @description Executes fetchStoreOrders for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findStoreOrders(query: AdminSalesQueryDto): Promise<AdminSalesStoreOrdersResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('SALES.READ_MODEL.NOT_FOUND');
    return this.presenter.toStoreOrdersResponse(snapshot);
  }

  /** @description Executes fetchStoreSummary for the Admin sales feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findStoreSummary(query: AdminSalesQueryDto): Promise<AdminSalesStoreSummaryResponseDto> {
    const snapshot = await this.repository.findLatestReadModel(query); 
    if (!snapshot) throw new NotFoundException('SALES.READ_MODEL.NOT_FOUND');
    return this.presenter.toStoreSummaryResponse(snapshot);
  }
}
