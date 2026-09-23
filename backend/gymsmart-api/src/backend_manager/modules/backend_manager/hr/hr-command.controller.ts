// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { HrCreatePayrollRequestDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-create-payroll.request.dto';
import { HrCreatePayrollResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-create-payroll.response.dto';
import { HrCreateStaffRequestDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-create-staff.request.dto';
import { HrCreateStaffResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-create-staff.response.dto';
import { HrDeleteStaffResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-delete-staff.response.dto';
import { HrGeneratePayrollsRequestDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-generate-payrolls.request.dto';
import { HrGeneratePayrollsResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-generate-payrolls.response.dto';
import { HrGiveStaffAdvanceRequestDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-give-staff-advance.request.dto';
import { HrGiveStaffAdvanceResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-give-staff-advance.response.dto';
import { HrPayStaffDueRequestDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-pay-staff-due.request.dto';
import { HrPayStaffDueResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-pay-staff-due.response.dto';
import { HrUpdatePayrollStatusRequestDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-update-payroll-status.request.dto';
import { HrUpdatePayrollStatusResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-update-payroll-status.response.dto';
import { HrUpdatePayrollRequestDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-update-payroll.request.dto';
import { HrUpdatePayrollResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-update-payroll.response.dto';
import { HrUpdateStaffRequestDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-update-staff.request.dto';
import { HrUpdateStaffResponseDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-update-staff.response.dto';
import { HrCreatePayrollService } from '@/backend_manager/modules/backend_manager/hr/services/hr-create-payroll.service';
import { HrCreateStaffService } from '@/backend_manager/modules/backend_manager/hr/services/hr-create-staff.service';
import { HrDeleteStaffService } from '@/backend_manager/modules/backend_manager/hr/services/hr-delete-staff.service';
import { HrGeneratePayrollsService } from '@/backend_manager/modules/backend_manager/hr/services/hr-generate-payrolls.service';
import { HrGiveStaffAdvanceService } from '@/backend_manager/modules/backend_manager/hr/services/hr-give-staff-advance.service';
import { HrPayStaffDueService } from '@/backend_manager/modules/backend_manager/hr/services/hr-pay-staff-due.service';
import { HrUpdatePayrollStatusService } from '@/backend_manager/modules/backend_manager/hr/services/hr-update-payroll-status.service';
import { HrUpdatePayrollService } from '@/backend_manager/modules/backend_manager/hr/services/hr-update-payroll.service';
import { HrUpdateStaffService } from '@/backend_manager/modules/backend_manager/hr/services/hr-update-staff.service';

@Controller('manager')
@ApiTags('Manager hr')
@Roles(CoreRole.MANAGER)
export class HrCommandController {
  constructor(private readonly createStaffService: HrCreateStaffService, private readonly updateStaffService: HrUpdateStaffService, private readonly deleteStaffService: HrDeleteStaffService, private readonly generatePayrollsService: HrGeneratePayrollsService, private readonly createPayrollService: HrCreatePayrollService, private readonly updatePayrollService: HrUpdatePayrollService, private readonly updatePayrollStatusService: HrUpdatePayrollStatusService, private readonly giveStaffAdvanceService: HrGiveStaffAdvanceService, private readonly payStaffDueService: HrPayStaffDueService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("hr/ledger/advance")
  @ApiOperation({ summary: 'giveStaffAdvance for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrGiveStaffAdvanceResponseDto })
  giveStaffAdvance(@Body() dto: HrGiveStaffAdvanceRequestDto): ReturnType<HrGiveStaffAdvanceService['createStaffAdvance']> { return this.giveStaffAdvanceService.createStaffAdvance(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("hr/ledger/paydue")
  @ApiOperation({ summary: 'payStaffDue for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrPayStaffDueResponseDto })
  payStaffDue(@Body() dto: HrPayStaffDueRequestDto): ReturnType<HrPayStaffDueService['createStaffDuePayment']> { return this.payStaffDueService.createStaffDuePayment(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("hr/payrolls/generate")
  @ApiOperation({ summary: 'generatePayrolls for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrGeneratePayrollsResponseDto })
  generatePayrolls(@Body() dto: HrGeneratePayrollsRequestDto): ReturnType<HrGeneratePayrollsService['generatePayrolls']> { return this.generatePayrollsService.generatePayrolls(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("hr/payrolls")
  @ApiOperation({ summary: 'createPayroll for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrCreatePayrollResponseDto })
  createPayroll(@Body() dto: HrCreatePayrollRequestDto): ReturnType<HrCreatePayrollService['createPayroll']> { return this.createPayrollService.createPayroll(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("hr/staff")
  @ApiOperation({ summary: 'createStaff for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrCreateStaffResponseDto })
  createStaff(@Body() dto: HrCreateStaffRequestDto): ReturnType<HrCreateStaffService['createStaff']> { return this.createStaffService.createStaff(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("hr/payrolls/:id/status")
  @ApiOperation({ summary: 'updatePayrollStatus for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrUpdatePayrollStatusResponseDto })
  updatePayrollStatus(@Param('id') id: string, @Body() dto: HrUpdatePayrollStatusRequestDto): ReturnType<HrUpdatePayrollStatusService['updatePayrollStatus']> { return this.updatePayrollStatusService.updatePayrollStatus(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("hr/payrolls/:id")
  @ApiOperation({ summary: 'updatePayroll for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrUpdatePayrollResponseDto })
  updatePayroll(@Param('id') id: string, @Body() dto: HrUpdatePayrollRequestDto): ReturnType<HrUpdatePayrollService['updatePayroll']> { return this.updatePayrollService.updatePayroll(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("hr/staff/:id")
  @ApiOperation({ summary: 'updateStaff for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrUpdateStaffResponseDto })
  updateStaff(@Param('id') id: string, @Body() dto: HrUpdateStaffRequestDto): ReturnType<HrUpdateStaffService['updateStaff']> { return this.updateStaffService.updateStaff(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("hr/staff/:id")
  @ApiOperation({ summary: 'deleteStaff for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrDeleteStaffResponseDto })
  deleteStaff(@Param('id') id: string): ReturnType<HrDeleteStaffService['deleteStaff']> {  return this.deleteStaffService.deleteStaff(id); }


}
