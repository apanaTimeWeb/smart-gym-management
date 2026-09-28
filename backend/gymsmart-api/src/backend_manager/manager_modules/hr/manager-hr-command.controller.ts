// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';
import { ManagerCoreAuthorizeResourceBody } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerHrCreatePayrollRequestDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-create-payroll.request.dto';
import { ManagerHrCreatePayrollResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-create-payroll.response.dto';
import { ManagerHrCreateStaffRequestDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-create-staff.request.dto';
import { ManagerHrCreateStaffResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-create-staff.response.dto';
import { ManagerHrDeleteStaffResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-delete-staff.response.dto';
import { ManagerHrGeneratePayrollsRequestDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-generate-payrolls.request.dto';
import { ManagerHrGeneratePayrollsResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-generate-payrolls.response.dto';
import { ManagerHrGiveStaffAdvanceRequestDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-give-staff-advance.request.dto';
import { ManagerHrGiveStaffAdvanceResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-give-staff-advance.response.dto';
import { ManagerHrPayStaffDueRequestDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-pay-staff-due.request.dto';
import { ManagerHrPayStaffDueResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-pay-staff-due.response.dto';
import { ManagerHrUpdatePayrollStatusRequestDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-update-payroll-status.request.dto';
import { ManagerHrUpdatePayrollStatusResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-update-payroll-status.response.dto';
import { ManagerHrUpdatePayrollRequestDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-update-payroll.request.dto';
import { ManagerHrUpdatePayrollResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-update-payroll.response.dto';
import { ManagerHrUpdateStaffRequestDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-update-staff.request.dto';
import { ManagerHrUpdateStaffResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-update-staff.response.dto';
import { ManagerHrCreatePayrollService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-create-payroll.service';
import { ManagerHrCreateStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-create-staff.service';
import { ManagerHrDeleteStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-delete-staff.service';
import { ManagerHrGeneratePayrollsService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-generate-payrolls.service';
import { ManagerHrGiveStaffAdvanceService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-give-staff-advance.service';
import { ManagerHrPayStaffDueService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-pay-staff-due.service';
import { ManagerHrUpdatePayrollStatusService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-update-payroll-status.service';
import { ManagerHrUpdatePayrollService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-update-payroll.service';
import { ManagerHrUpdateStaffService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-update-staff.service';

@Controller('manager')
@ApiTags('Manager hr')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerHrCommandController {
  constructor(private readonly createStaffService: ManagerHrCreateStaffService, private readonly updateStaffService: ManagerHrUpdateStaffService, private readonly deleteStaffService: ManagerHrDeleteStaffService, private readonly generatePayrollsService: ManagerHrGeneratePayrollsService, private readonly createPayrollService: ManagerHrCreatePayrollService, private readonly updatePayrollService: ManagerHrUpdatePayrollService, private readonly updatePayrollStatusService: ManagerHrUpdatePayrollStatusService, private readonly giveStaffAdvanceService: ManagerHrGiveStaffAdvanceService, private readonly payStaffDueService: ManagerHrPayStaffDueService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("hr/ledger/advance")
  @ApiOperation({ summary: 'giveStaffAdvance for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerHrGiveStaffAdvanceResponseDto })
  @ManagerCoreAuthorizeResourceBody('staffId')
  giveStaffAdvance(@Body() dto: ManagerHrGiveStaffAdvanceRequestDto): ReturnType<ManagerHrGiveStaffAdvanceService['giveStaffAdvance']> { return this.giveStaffAdvanceService.giveStaffAdvance(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("hr/ledger/paydue")
  @ApiOperation({ summary: 'payStaffDue for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerHrPayStaffDueResponseDto })
  @ManagerCoreAuthorizeResourceBody('staffId')
  payStaffDue(@Body() dto: ManagerHrPayStaffDueRequestDto): ReturnType<ManagerHrPayStaffDueService['payStaffDue']> { return this.payStaffDueService.payStaffDue(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("hr/payrolls/generate")
  @ApiOperation({ summary: 'generatePayrolls for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerHrGeneratePayrollsResponseDto })
  generatePayrolls(@Body() dto: ManagerHrGeneratePayrollsRequestDto): ReturnType<ManagerHrGeneratePayrollsService['generatePayrolls']> { return this.generatePayrollsService.generatePayrolls(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("hr/payrolls")
  @ApiOperation({ summary: 'createPayroll for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerHrCreatePayrollResponseDto })
  createPayroll(@Body() dto: ManagerHrCreatePayrollRequestDto): ReturnType<ManagerHrCreatePayrollService['createPayroll']> { return this.createPayrollService.createPayroll(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("hr/staff")
  @ApiOperation({ summary: 'createStaff for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerHrCreateStaffResponseDto })
  createStaff(@Body() dto: ManagerHrCreateStaffRequestDto): ReturnType<ManagerHrCreateStaffService['createStaff']> { return this.createStaffService.createStaff(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("hr/payrolls/:id/status")
  @ApiOperation({ summary: 'updatePayrollStatus for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrUpdatePayrollStatusResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updatePayrollStatus(@Param('id') id: string, @Body() dto: ManagerHrUpdatePayrollStatusRequestDto): ReturnType<ManagerHrUpdatePayrollStatusService['updatePayrollStatus']> { return this.updatePayrollStatusService.updatePayrollStatus(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("hr/payrolls/:id")
  @ApiOperation({ summary: 'updatePayroll for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrUpdatePayrollResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updatePayroll(@Param('id') id: string, @Body() dto: ManagerHrUpdatePayrollRequestDto): ReturnType<ManagerHrUpdatePayrollService['updatePayroll']> { return this.updatePayrollService.updatePayroll(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("hr/staff/:id")
  @ApiOperation({ summary: 'updateStaff for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrUpdateStaffResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateStaff(@Param('id') id: string, @Body() dto: ManagerHrUpdateStaffRequestDto): ReturnType<ManagerHrUpdateStaffService['updateStaff']> { return this.updateStaffService.updateStaff(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("hr/staff/:id")
  @ApiOperation({ summary: 'deleteStaff for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerHrDeleteStaffResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteStaff(@Param('id') id: string): ReturnType<ManagerHrDeleteStaffService['deleteStaff']> {  return this.deleteStaffService.deleteStaff(id); }


}

export { ManagerHrCommandController as HrCommandController };
