// RESPONSIBILITY: Owns the Manager hr query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { HrFetchHrSummaryResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-fetch-hr-summary.response.dto';
import { HrFetchHrSummaryService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-hr-summary.service';
import { HrFetchLedgerResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-fetch-ledger.response.dto';
import { HrFetchLedgerService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-ledger.service';
import { HrFetchPayrollsResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-fetch-payrolls.response.dto';
import { HrFetchPayrollsService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-payrolls.service';
import { HrFetchStaffAttendanceResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-fetch-staff-attendance.response.dto';
import { HrFetchStaffAttendanceService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-staff-attendance.service';
import { HrFetchStaffByIdResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-fetch-staff-by-id.response.dto';
import { HrFetchStaffByIdService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-staff-by-id.service';
import { HrFetchStaffResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-fetch-staff.response.dto';
import { HrFetchStaffService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-staff.service';
import { HrQueryDto } from '@/backend_manager/modules/manager/hr/dtos/hr-query.dto';

@Controller('manager')
@ApiTags('Manager hr')
@Roles(CoreRole.MANAGER)
export class HrQueryController {
  constructor(private readonly fetchStaffService: HrFetchStaffService, private readonly fetchStaffByIdService: HrFetchStaffByIdService, private readonly fetchPayrollsService: HrFetchPayrollsService, private readonly fetchHrSummaryService: HrFetchHrSummaryService, private readonly fetchLedgerService: HrFetchLedgerService, private readonly fetchStaffAttendanceService: HrFetchStaffAttendanceService) {}

  // SLA: STANDARD
  @Get("hr/payrolls")
  @ApiOperation({ summary: 'fetchPayrolls for Manager hr' })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchPayrollsResponseDto })
  fetchPayrolls(@Query() query: HrQueryDto): Promise<HrFetchPayrollsResponseDto> {  return this.fetchPayrollsService.fetchPayrolls(query) as unknown as Promise<HrFetchPayrollsResponseDto>;  }


  // SLA: STANDARD
  @Get("hr/staff")
  @ApiOperation({ summary: 'fetchStaff for Manager hr' })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchStaffResponseDto })
  fetchStaff(@Query() query: HrQueryDto): Promise<HrFetchStaffResponseDto> {  return this.fetchStaffService.fetchStaff(query) as unknown as Promise<HrFetchStaffResponseDto>;  }


  // SLA: FAST
  @Get("hr/summary")
  @ApiOperation({ summary: 'fetchHrSummary for Manager hr' })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchHrSummaryResponseDto })
  fetchHrSummary(@Query() query: HrQueryDto): Promise<HrFetchHrSummaryResponseDto> {  return this.fetchHrSummaryService.fetchHrSummary(query) as unknown as Promise<HrFetchHrSummaryResponseDto>;  }


  // SLA: STANDARD
  @Get("hr/staff/:staffId/attendance")
  @ApiOperation({ summary: 'fetchStaffAttendance for Manager hr' })
  @ApiParam({ name: 'staffId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchStaffAttendanceResponseDto })
  fetchStaffAttendance(@Param('staffId') staffId: string, @Query() query: HrQueryDto): Promise<HrFetchStaffAttendanceResponseDto> {  return this.fetchStaffAttendanceService.fetchStaffAttendance(staffId, query) as unknown as Promise<HrFetchStaffAttendanceResponseDto>;  }


  // SLA: STANDARD
  @Get("hr/ledger/:staffId")
  @ApiOperation({ summary: 'fetchLedger for Manager hr' })
  @ApiParam({ name: 'staffId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchLedgerResponseDto })
  fetchLedger(@Param('staffId') staffId: string, @Query() query: HrQueryDto): Promise<HrFetchLedgerResponseDto> {  return this.fetchLedgerService.fetchLedger(staffId, query) as unknown as Promise<HrFetchLedgerResponseDto>;  }


  // SLA: STANDARD
  @Get("hr/staff/:id")
  @ApiOperation({ summary: 'fetchStaffById for Manager hr' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchStaffByIdResponseDto })
  fetchStaffById(@Param('id') id: string, @Query() query: HrQueryDto): Promise<HrFetchStaffByIdResponseDto> {  return this.fetchStaffByIdService.fetchStaffById(id, query) as unknown as Promise<HrFetchStaffByIdResponseDto>;  }


}
