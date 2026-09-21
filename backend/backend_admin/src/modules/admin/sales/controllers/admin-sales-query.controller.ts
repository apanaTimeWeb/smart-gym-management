// RESPONSIBILITY: Exposes read-only Admin sales HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminSalesQueryController -> AdminSalesQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminSalesQueryService } from '@/modules/admin/sales/services/admin-sales-query.service';
import { AdminSalesQueryDto } from '@/modules/admin/sales/dtos/admin-sales-query.dto';
import { AdminSalesResponseDto } from '@/modules/admin/sales/dtos/admin-sales-response.dto';

@ApiTags('Admin / sales')
@Controller('admin/sales')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminSalesQueryController {
  constructor(private readonly service: AdminSalesQueryService) {}

  // SLA: STANDARD
  @Get('overview')
  @ApiOperation({ summary: 'Execute fetchOverview' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesResponseDto })
  async fetchOverview(@Query() query: AdminSalesQueryDto): Promise<unknown> {
    return this.service.fetchOverview(query);
  }

  // SLA: STANDARD
  @Get('referral-sources')
  @ApiOperation({ summary: 'Execute fetchReferralSources' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesResponseDto })
  async fetchReferralSources(@Query() query: AdminSalesQueryDto): Promise<unknown> {
    return this.service.fetchReferralSources(query);
  }

  // SLA: STANDARD
  @Get('membership-report')
  @ApiOperation({ summary: 'Execute fetchMembershipReport' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesResponseDto })
  async fetchMembershipReport(@Query() query: AdminSalesQueryDto): Promise<unknown> {
    return this.service.fetchMembershipReport(query);
  }

  // SLA: STANDARD
  @Get('pending-payments')
  @ApiOperation({ summary: 'Execute fetchPendingPayments' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesResponseDto })
  async fetchPendingPayments(@Query() query: AdminSalesQueryDto): Promise<unknown> {
    return this.service.fetchPendingPayments(query);
  }

  // SLA: STANDARD
  @Get('all-memberships')
  @ApiOperation({ summary: 'Execute fetchAllMemberships' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesResponseDto })
  async fetchAllMemberships(@Query() query: AdminSalesQueryDto): Promise<unknown> {
    return this.service.fetchAllMemberships(query);
  }

  // SLA: STANDARD
  @Get('store-orders')
  @ApiOperation({ summary: 'Execute fetchStoreOrders' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesResponseDto })
  async fetchStoreOrders(@Query() query: AdminSalesQueryDto): Promise<unknown> {
    return this.service.fetchStoreOrders(query);
  }

  // SLA: STANDARD
  @Get('store-summary')
  @ApiOperation({ summary: 'Execute fetchStoreSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminSalesResponseDto })
  async fetchStoreSummary(@Query() query: AdminSalesQueryDto): Promise<unknown> {
    return this.service.fetchStoreSummary(query);
  }

}
