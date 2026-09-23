// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { HrFetchHrSummaryResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-fetch-hr-summary.response.dto';
import { HrFetchLedgerResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-fetch-ledger.response.dto';
import { HrFetchPayrollsResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-fetch-payrolls.response.dto';
import { HrFetchStaffAttendanceResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-fetch-staff-attendance.response.dto';
import { HrFetchStaffByIdResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-fetch-staff-by-id.response.dto';
import { HrFetchStaffResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-fetch-staff.response.dto';
import { HrQueryDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-query.dto';
import { HrFetchHrSummaryService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-hr-summary.service';
import { HrFetchLedgerService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-ledger.service';
import { HrFetchPayrollsService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-payrolls.service';
import { HrFetchStaffAttendanceService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-staff-attendance.service';
import { HrFetchStaffByIdService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-staff-by-id.service';
import { HrFetchStaffService } from '@/backend_manager/modules/backend_manager/hr/services/hr-fetch-staff.service';

@Controller('manager')
@ApiTags('Manager hr')
@Roles(CoreRole.MANAGER)
export class HrQueryController {
  constructor(private readonly fetchStaffService: HrFetchStaffService, private readonly fetchStaffByIdService: HrFetchStaffByIdService, private readonly fetchPayrollsService: HrFetchPayrollsService, private readonly fetchHrSummaryService: HrFetchHrSummaryService, private readonly fetchLedgerService: HrFetchLedgerService, private readonly fetchStaffAttendanceService: HrFetchStaffAttendanceService) {}

  // SLA: STANDARD
  @Get("hr/payrolls")
  @ApiOperation({ summary: 'fetchPayrolls for Manager hr' })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchPayrollsResponseDto })
  fetchPayrolls(@Query() query: HrQueryDto): ReturnType<HrFetchPayrollsService['fetchPayrolls']> { return this.fetchPayrollsService.fetchPayrolls(query as any); }


  // SLA: STANDARD
  @Get("hr/staff")
  @ApiOperation({ summary: 'fetchStaff for Manager hr' })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchStaffResponseDto })
  fetchStaff(@Query() query: HrQueryDto): ReturnType<HrFetchStaffService['fetchStaff']> { return this.fetchStaffService.fetchStaff(query as any); }


  // SLA: FAST
  @Get("hr/summary")
  @ApiOperation({ summary: 'fetchHrSummary for Manager hr' })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchHrSummaryResponseDto })
  fetchHrSummary(@Query() query: HrQueryDto): ReturnType<HrFetchHrSummaryService['fetchHrSummary']> { return this.fetchHrSummaryService.fetchHrSummary(query as any); }


  // SLA: STANDARD
  @Get("hr/staff/:staffId/attendance")
  @ApiOperation({ summary: 'fetchStaffAttendance for Manager hr' })
  @ApiParam({ name: 'staffId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchStaffAttendanceResponseDto })
  fetchStaffAttendance(@Param('staffId') staffId: string, @Query() query: HrQueryDto): ReturnType<HrFetchStaffAttendanceService['fetchStaffAttendance']> { return this.fetchStaffAttendanceService.fetchStaffAttendance(staffId, query as any); }


  // SLA: STANDARD
  @Get("hr/ledger/:staffId")
  @ApiOperation({ summary: 'fetchLedger for Manager hr' })
  @ApiParam({ name: 'staffId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchLedgerResponseDto })
  fetchLedger(@Param('staffId') staffId: string, @Query() query: HrQueryDto): ReturnType<HrFetchLedgerService['fetchLedger']> { return this.fetchLedgerService.fetchLedger(staffId, query as any); }


  // SLA: STANDARD
  @Get("hr/staff/:id")
  @ApiOperation({ summary: 'fetchStaffById for Manager hr' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrFetchStaffByIdResponseDto })
  fetchStaffById(@Param('id') id: string, @Query() query: HrQueryDto): ReturnType<HrFetchStaffByIdService['fetchStaffById']> { return this.fetchStaffByIdService.fetchStaffById(id, query as any); }


}
