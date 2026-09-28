// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerSalesFetchAllMembershipsResponseDto } from '@/backend_manager/manager_modules/sales/sales_responses/manager-sales-fetch-all-memberships.response.dto';
import { ManagerSalesFetchMembershipReportResponseDto } from '@/backend_manager/manager_modules/sales/sales_responses/manager-sales-fetch-membership-report.response.dto';
import { ManagerSalesFetchPendingPaymentsResponseDto } from '@/backend_manager/manager_modules/sales/sales_responses/manager-sales-fetch-pending-payments.response.dto';
import { ManagerSalesFetchSalesOverviewResponseDto } from '@/backend_manager/manager_modules/sales/sales_responses/manager-sales-fetch-sales-overview.response.dto';
import { ManagerSalesQueryDto } from '@/backend_manager/manager_modules/sales/sales_dtos/manager-sales-query.dto';
import { ManagerSalesFindAllMembershipsService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-find-all-memberships.service';
import { ManagerSalesFindMembershipReportService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-find-membership-report.service';
import { ManagerSalesFindPendingPaymentsService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-find-pending-payments.service';
import { ManagerSalesFindSalesOverviewService } from '@/backend_manager/manager_modules/sales/sales_services/manager-sales-find-sales-overview.service';

@Controller('manager')
@ApiTags('Manager sales')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerSalesQueryController {
  constructor(private readonly fetchSalesOverviewService: ManagerSalesFindSalesOverviewService, private readonly fetchMembershipReportService: ManagerSalesFindMembershipReportService, private readonly fetchPendingPaymentsService: ManagerSalesFindPendingPaymentsService, private readonly fetchAllMembershipsService: ManagerSalesFindAllMembershipsService) {}

  // SLA: STANDARD
  @Get("sales/all-memberships")
  @ApiOperation({ summary: 'findAllMemberships for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerSalesFetchAllMembershipsResponseDto })
  findAllMemberships(@Query() query: ManagerSalesQueryDto): ReturnType<ManagerSalesFindAllMembershipsService['findAllMemberships']> { return this.fetchAllMembershipsService.findAllMemberships(query); }


  // SLA: STANDARD
  @Get("sales/membership-report")
  @ApiOperation({ summary: 'findMembershipReport for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerSalesFetchMembershipReportResponseDto })
  findMembershipReport(@Query() query: ManagerSalesQueryDto): ReturnType<ManagerSalesFindMembershipReportService['findMembershipReport']> { return this.fetchMembershipReportService.findMembershipReport(query); }


  // SLA: STANDARD
  @Get("sales/overview")
  @ApiOperation({ summary: 'findSalesOverview for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerSalesFetchSalesOverviewResponseDto })
  findSalesOverview(@Query() query: ManagerSalesQueryDto): ReturnType<ManagerSalesFindSalesOverviewService['findSalesOverview']> { return this.fetchSalesOverviewService.findSalesOverview(query); }


  // SLA: STANDARD
  @Get("sales/pending-payments")
  @ApiOperation({ summary: 'findPendingPayments for Manager sales' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerSalesFetchPendingPaymentsResponseDto })
  findPendingPayments(@Query() query: ManagerSalesQueryDto): ReturnType<ManagerSalesFindPendingPaymentsService['findPendingPayments']> { return this.fetchPendingPaymentsService.findPendingPayments(query); }


}

export { ManagerSalesQueryController as SalesQueryController };
