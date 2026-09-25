// RESPONSIBILITY: Exposes read-only Admin sales HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminSalesQueryController -> AdminSalesQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminSalesQueryDto } from '@/backend_admin/admin_modules/admin_sales/sales_dtos/admin-sales-query.dto.js';
import { AdminSalesOverviewResponseDto, ReferralDataPointDto, AdminSalesMembershipReportResponseDto, AdminSalesPendingPaymentsResponseDto, AdminSalesAllMembershipsResponseDto, AdminSalesStoreOrdersResponseDto, AdminSalesStoreSummaryResponseDto } from '@/backend_admin/admin_modules/admin_sales/sales_dtos/admin-sales-response.dto.js';
import { AdminSalesQueryService } from '@/backend_admin/admin_modules/admin_sales/sales_services/admin-sales-query.service.js';

@ApiTags('Admin / sales')
@Controller('admin/sales')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminSalesQueryController boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesQueryController {
  constructor(private readonly service: AdminSalesQueryService) {}

  // SLA: STANDARD
  @Get('overview')
  @ApiOperation({ summary: 'Execute fetchOverview' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesOverviewResponseDto })
  async findOverview(@Query() query: AdminSalesQueryDto): Promise<AdminSalesOverviewResponseDto> {
    return this.service.findOverview(query);
  }

  // SLA: STANDARD
  @Get('referral-sources')
  @ApiOperation({ summary: 'Execute fetchReferralSources' })
  @ApiResponse({ status: HttpStatus.OK, type: [ReferralDataPointDto] })
  async findReferralSources(@Query() query: AdminSalesQueryDto): Promise<ReferralDataPointDto[]> {
    return this.service.findReferralSources(query);
  }

  // SLA: STANDARD
  @Get('membership-report')
  @ApiOperation({ summary: 'Execute fetchMembershipReport' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesMembershipReportResponseDto })
  async findMembershipReport(@Query() query: AdminSalesQueryDto): Promise<AdminSalesMembershipReportResponseDto> {
    return this.service.findMembershipReport(query);
  }

  // SLA: STANDARD
  @Get('pending-payments')
  @ApiOperation({ summary: 'Execute fetchPendingPayments' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesPendingPaymentsResponseDto })
  async findPendingPayments(@Query() query: AdminSalesQueryDto): Promise<AdminSalesPendingPaymentsResponseDto> {
    return this.service.findPendingPayments(query);
  }

  // SLA: STANDARD
  @Get('all-memberships')
  @ApiOperation({ summary: 'Execute fetchAllMemberships' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesAllMembershipsResponseDto })
  async findAllMemberships(@Query() query: AdminSalesQueryDto): Promise<AdminSalesAllMembershipsResponseDto> {
    return this.service.findAllMemberships(query);
  }

  // SLA: STANDARD
  @Get('store-orders')
  @ApiOperation({ summary: 'Execute fetchStoreOrders' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesStoreOrdersResponseDto })
  async findStoreOrders(@Query() query: AdminSalesQueryDto): Promise<AdminSalesStoreOrdersResponseDto> {
    return this.service.findStoreOrders(query);
  }

  // SLA: STANDARD
  @Get('store-summary')
  @ApiOperation({ summary: 'Execute fetchStoreSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesStoreSummaryResponseDto })
  async findStoreSummary(@Query() query: AdminSalesQueryDto): Promise<AdminSalesStoreSummaryResponseDto> {
    return this.service.findStoreSummary(query);
  }

}
