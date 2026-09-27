// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';
import { ManagerCoreExposeSensitiveFields } from '@/backend_manager/manager_core/manager_core_http/manager-core-sensitive-fields.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerHrFetchHrSummaryResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-fetch-hr-summary.response.dto';
import { ManagerHrFetchLedgerResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-fetch-ledger.response.dto';
import { ManagerHrFetchPayrollsResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-fetch-payrolls.response.dto';
import { ManagerHrFetchStaffAttendanceResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-fetch-staff-attendance.response.dto';
import { ManagerHrFetchStaffByIdResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-fetch-staff-by-id.response.dto';
import { ManagerHrFetchStaffResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-fetch-staff.response.dto';
import { ManagerHrQueryDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-query.dto';
import { ManagerHrFindHrSummaryService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-hr-summary.service';
import { ManagerHrFindLedgerService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-ledger.service';
import { ManagerHrFindPayrollsService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-payrolls.service';
import { ManagerHrFindStaffAttendanceService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-staff-attendance.service';
import { ManagerHrFindStaffByIdService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-staff-by-id.service';
import { ManagerHrFindStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-find-staff.service';

@Controller('manager')
@ApiTags('Manager hr')
@Roles(ManagerCoreRole.MANAGER)
@ManagerCoreExposeSensitiveFields('aadhaar', 'bankAccountNumber', 'ifscCode', 'panNumber', 'medicalNotes')
export class ManagerHrQueryController {
  constructor(private readonly fetchStaffService: ManagerHrFindStaffService, private readonly fetchStaffByIdService: ManagerHrFindStaffByIdService, private readonly fetchPayrollsService: ManagerHrFindPayrollsService, private readonly fetchHrSummaryService: ManagerHrFindHrSummaryService, private readonly fetchLedgerService: ManagerHrFindLedgerService, private readonly fetchStaffAttendanceService: ManagerHrFindStaffAttendanceService) {}

  // SLA: STANDARD
  @Get("hr/payrolls")
  @ApiOperation({ summary: 'findPayrolls for Manager hr' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrFetchPayrollsResponseDto })
  findPayrolls(@Query() query: ManagerHrQueryDto): ReturnType<ManagerHrFindPayrollsService['findPayrolls']> { return this.fetchPayrollsService.findPayrolls(query); }


  // SLA: STANDARD
  @Get("hr/staff")
  @ApiOperation({ summary: 'findStaff for Manager hr' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrFetchStaffResponseDto })
  findStaff(@Query() query: ManagerHrQueryDto): ReturnType<ManagerHrFindStaffService['findStaff']> { return this.fetchStaffService.findStaff(query); }


  // SLA: FAST
  @Get("hr/summary")
  @ApiOperation({ summary: 'findHrSummary for Manager hr' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrFetchHrSummaryResponseDto })
  findHrSummary(@Query() query: ManagerHrQueryDto): ReturnType<ManagerHrFindHrSummaryService['findHrSummary']> { return this.fetchHrSummaryService.findHrSummary(query); }


  // SLA: STANDARD
  @Get("hr/staff/:staffId/attendance")
  @ApiOperation({ summary: 'findStaffAttendance for Manager hr' })
  @ApiParam({ name: 'staffId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrFetchStaffAttendanceResponseDto })
  @ManagerCoreAuthorizeResourceParam('staffId')
  findStaffAttendance(@Param('staffId') staffId: string, @Query() query: ManagerHrQueryDto): ReturnType<ManagerHrFindStaffAttendanceService['findStaffAttendance']> { return this.fetchStaffAttendanceService.findStaffAttendance(staffId, query); }


  // SLA: STANDARD
  @Get("hr/ledger/:staffId")
  @ApiOperation({ summary: 'findLedger for Manager hr' })
  @ApiParam({ name: 'staffId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrFetchLedgerResponseDto })
  @ManagerCoreAuthorizeResourceParam('staffId')
  findLedger(@Param('staffId') staffId: string, @Query() query: ManagerHrQueryDto): ReturnType<ManagerHrFindLedgerService['findLedger']> { return this.fetchLedgerService.findLedger(staffId, query); }


  // SLA: STANDARD
  @Get("hr/staff/:id")
  @ApiOperation({ summary: 'findStaffById for Manager hr' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrFetchStaffByIdResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  findStaffById(@Param('id') id: string, @Query() query: ManagerHrQueryDto): ReturnType<ManagerHrFindStaffByIdService['findStaffById']> { return this.fetchStaffByIdService.findStaffById(id, query); }


}

export { ManagerHrQueryController as HrQueryController };
