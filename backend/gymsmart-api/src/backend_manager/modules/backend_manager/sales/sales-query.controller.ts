// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { SalesFetchAllMembershipsResponseDto } from '@/backend_manager/modules/backend_manager/sales/dtos/sales-fetch-all-memberships.response.dto';
import { SalesFetchMembershipReportResponseDto } from '@/backend_manager/modules/backend_manager/sales/dtos/sales-fetch-membership-report.response.dto';
import { SalesFetchPendingPaymentsResponseDto } from '@/backend_manager/modules/backend_manager/sales/dtos/sales-fetch-pending-payments.response.dto';
import { SalesFetchSalesOverviewResponseDto } from '@/backend_manager/modules/backend_manager/sales/dtos/sales-fetch-sales-overview.response.dto';
import { SalesQueryDto } from '@/backend_manager/modules/backend_manager/sales/dtos/sales-query.dto';
import { SalesFetchAllMembershipsService } from '@/backend_manager/modules/backend_manager/sales/services/sales-fetch-all-memberships.service';
import { SalesFetchMembershipReportService } from '@/backend_manager/modules/backend_manager/sales/services/sales-fetch-membership-report.service';
import { SalesFetchPendingPaymentsService } from '@/backend_manager/modules/backend_manager/sales/services/sales-fetch-pending-payments.service';
import { SalesFetchSalesOverviewService } from '@/backend_manager/modules/backend_manager/sales/services/sales-fetch-sales-overview.service';

@Controller('manager')
@ApiTags('Manager sales')
@Roles(CoreRole.MANAGER)
export class SalesQueryController {
  constructor(private readonly fetchSalesOverviewService: SalesFetchSalesOverviewService, private readonly fetchMembershipReportService: SalesFetchMembershipReportService, private readonly fetchPendingPaymentsService: SalesFetchPendingPaymentsService, private readonly fetchAllMembershipsService: SalesFetchAllMembershipsService) {}

  // SLA: STANDARD
  @Get("sales/all-memberships")
  @ApiOperation({ summary: 'fetchAllMemberships for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: SalesFetchAllMembershipsResponseDto })
  fetchAllMemberships(@Query() query: SalesQueryDto): ReturnType<SalesFetchAllMembershipsService['fetchAllMemberships']> { return this.fetchAllMembershipsService.fetchAllMemberships(query as any); }


  // SLA: STANDARD
  @Get("sales/membership-report")
  @ApiOperation({ summary: 'fetchMembershipReport for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: SalesFetchMembershipReportResponseDto })
  fetchMembershipReport(@Query() query: SalesQueryDto): ReturnType<SalesFetchMembershipReportService['fetchMembershipReport']> { return this.fetchMembershipReportService.fetchMembershipReport(query as any); }


  // SLA: STANDARD
  @Get("sales/overview")
  @ApiOperation({ summary: 'fetchSalesOverview for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: SalesFetchSalesOverviewResponseDto })
  fetchSalesOverview(@Query() query: SalesQueryDto): ReturnType<SalesFetchSalesOverviewService['fetchSalesOverview']> { return this.fetchSalesOverviewService.fetchSalesOverview(query as any); }


  // SLA: STANDARD
  @Get("sales/pending-payments")
  @ApiOperation({ summary: 'fetchPendingPayments for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: SalesFetchPendingPaymentsResponseDto })
  fetchPendingPayments(@Query() query: SalesQueryDto): ReturnType<SalesFetchPendingPaymentsService['fetchPendingPayments']> { return this.fetchPendingPaymentsService.fetchPendingPayments(query as any); }


}
