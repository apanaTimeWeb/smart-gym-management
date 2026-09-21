// RESPONSIBILITY: Exposes read-only Admin sales HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminSalesQueryController -> AdminSalesQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminSalesQueryService } from '@/backend_admin/modules/admin/sales/services/admin-sales-query.service';
import { AdminSalesQueryDto } from '@/backend_admin/modules/admin/sales/dtos/admin-sales-query.dto';
import { AdminSalesOverviewResponseDto, ReferralDataPointDto, AdminSalesMembershipReportResponseDto, AdminSalesPendingPaymentsResponseDto, AdminSalesAllMembershipsResponseDto, AdminSalesStoreOrdersResponseDto, AdminSalesStoreSummaryResponseDto } from '@/backend_admin/modules/admin/sales/dtos/admin-sales-response.dto';

@ApiTags('Admin / sales')
@Controller('admin/sales')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminSalesQueryController {
  constructor(private readonly service: AdminSalesQueryService) {}

  // SLA: STANDARD
  @Get('overview')
  @ApiOperation({ summary: 'Execute fetchOverview' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesOverviewResponseDto })
  async fetchOverview(@Query() query: AdminSalesQueryDto): Promise<AdminSalesOverviewResponseDto> {
    return this.service.fetchOverview(query);
  }

  // SLA: STANDARD
  @Get('referral-sources')
  @ApiOperation({ summary: 'Execute fetchReferralSources' })
  @ApiResponse({ status: HttpStatus.OK, type: [ReferralDataPointDto] })
  async fetchReferralSources(@Query() query: AdminSalesQueryDto): Promise<ReferralDataPointDto[]> {
    return this.service.fetchReferralSources(query);
  }

  // SLA: STANDARD
  @Get('membership-report')
  @ApiOperation({ summary: 'Execute fetchMembershipReport' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesMembershipReportResponseDto })
  async fetchMembershipReport(@Query() query: AdminSalesQueryDto): Promise<AdminSalesMembershipReportResponseDto> {
    return this.service.fetchMembershipReport(query);
  }

  // SLA: STANDARD
  @Get('pending-payments')
  @ApiOperation({ summary: 'Execute fetchPendingPayments' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesPendingPaymentsResponseDto })
  async fetchPendingPayments(@Query() query: AdminSalesQueryDto): Promise<AdminSalesPendingPaymentsResponseDto> {
    return this.service.fetchPendingPayments(query);
  }

  // SLA: STANDARD
  @Get('all-memberships')
  @ApiOperation({ summary: 'Execute fetchAllMemberships' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesAllMembershipsResponseDto })
  async fetchAllMemberships(@Query() query: AdminSalesQueryDto): Promise<AdminSalesAllMembershipsResponseDto> {
    return this.service.fetchAllMemberships(query);
  }

  // SLA: STANDARD
  @Get('store-orders')
  @ApiOperation({ summary: 'Execute fetchStoreOrders' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesStoreOrdersResponseDto })
  async fetchStoreOrders(@Query() query: AdminSalesQueryDto): Promise<AdminSalesStoreOrdersResponseDto> {
    return this.service.fetchStoreOrders(query);
  }

  // SLA: STANDARD
  @Get('store-summary')
  @ApiOperation({ summary: 'Execute fetchStoreSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesStoreSummaryResponseDto })
  async fetchStoreSummary(@Query() query: AdminSalesQueryDto): Promise<AdminSalesStoreSummaryResponseDto> {
    return this.service.fetchStoreSummary(query);
  }

}
