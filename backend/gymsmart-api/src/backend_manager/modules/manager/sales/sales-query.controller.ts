// RESPONSIBILITY: Owns the Manager sales query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { SalesFetchAllMembershipsResponseDto } from '@/modules/manager/sales/dtos/sales-fetch-all-memberships.response.dto';
import { SalesFetchAllMembershipsService } from '@/modules/manager/sales/services/sales-fetch-all-memberships.service';
import { SalesFetchMembershipReportResponseDto } from '@/modules/manager/sales/dtos/sales-fetch-membership-report.response.dto';
import { SalesFetchMembershipReportService } from '@/modules/manager/sales/services/sales-fetch-membership-report.service';
import { SalesFetchPendingPaymentsResponseDto } from '@/modules/manager/sales/dtos/sales-fetch-pending-payments.response.dto';
import { SalesFetchPendingPaymentsService } from '@/modules/manager/sales/services/sales-fetch-pending-payments.service';
import { SalesFetchSalesOverviewResponseDto } from '@/modules/manager/sales/dtos/sales-fetch-sales-overview.response.dto';
import { SalesFetchSalesOverviewService } from '@/modules/manager/sales/services/sales-fetch-sales-overview.service';
import { SalesQueryDto } from '@/modules/manager/sales/dtos/sales-query.dto';

@Controller('manager')
@ApiTags('Manager sales')
@Roles(CoreRole.MANAGER)
export class SalesQueryController {
  constructor(private readonly fetchSalesOverviewService: SalesFetchSalesOverviewService, private readonly fetchMembershipReportService: SalesFetchMembershipReportService, private readonly fetchPendingPaymentsService: SalesFetchPendingPaymentsService, private readonly fetchAllMembershipsService: SalesFetchAllMembershipsService) {}

  // SLA: STANDARD
  @Get("sales/all-memberships")
  @ApiOperation({ summary: 'fetchAllMemberships for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: SalesFetchAllMembershipsResponseDto })
  fetchAllMemberships(@Query() query: SalesQueryDto): Promise<SalesFetchAllMembershipsResponseDto> {  return this.fetchAllMembershipsService.fetchAllMemberships(query) as Promise<SalesFetchAllMembershipsResponseDto>;  }


  // SLA: STANDARD
  @Get("sales/membership-report")
  @ApiOperation({ summary: 'fetchMembershipReport for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: SalesFetchMembershipReportResponseDto })
  fetchMembershipReport(@Query() query: SalesQueryDto): Promise<SalesFetchMembershipReportResponseDto> {  return this.fetchMembershipReportService.fetchMembershipReport(query) as Promise<SalesFetchMembershipReportResponseDto>;  }


  // SLA: STANDARD
  @Get("sales/overview")
  @ApiOperation({ summary: 'fetchSalesOverview for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: SalesFetchSalesOverviewResponseDto })
  fetchSalesOverview(@Query() query: SalesQueryDto): Promise<SalesFetchSalesOverviewResponseDto> {  return this.fetchSalesOverviewService.fetchSalesOverview(query) as Promise<SalesFetchSalesOverviewResponseDto>;  }


  // SLA: STANDARD
  @Get("sales/pending-payments")
  @ApiOperation({ summary: 'fetchPendingPayments for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: SalesFetchPendingPaymentsResponseDto })
  fetchPendingPayments(@Query() query: SalesQueryDto): Promise<SalesFetchPendingPaymentsResponseDto> {  return this.fetchPendingPaymentsService.fetchPendingPayments(query) as Promise<SalesFetchPendingPaymentsResponseDto>;  }


}
