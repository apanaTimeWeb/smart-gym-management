// @ts-nocheck
// RESPONSIBILITY: Owns the Manager hr command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { HrCreatePayrollRequestDto } from '@/backend_manager/modules/manager/hr/dtos/hr-create-payroll.request.dto';
import { HrCreatePayrollResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-create-payroll.response.dto';
import { HrCreatePayrollService } from '@/backend_manager/modules/manager/hr/services/hr-create-payroll.service';
import { HrCreateStaffRequestDto } from '@/backend_manager/modules/manager/hr/dtos/hr-create-staff.request.dto';
import { HrCreateStaffResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-create-staff.response.dto';
import { HrCreateStaffService } from '@/backend_manager/modules/manager/hr/services/hr-create-staff.service';
import { HrDeleteStaffResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-delete-staff.response.dto';
import { HrDeleteStaffService } from '@/backend_manager/modules/manager/hr/services/hr-delete-staff.service';
import { HrGeneratePayrollsRequestDto } from '@/backend_manager/modules/manager/hr/dtos/hr-generate-payrolls.request.dto';
import { HrGeneratePayrollsResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-generate-payrolls.response.dto';
import { HrGeneratePayrollsService } from '@/backend_manager/modules/manager/hr/services/hr-generate-payrolls.service';
import { HrGiveStaffAdvanceRequestDto } from '@/backend_manager/modules/manager/hr/dtos/hr-give-staff-advance.request.dto';
import { HrGiveStaffAdvanceResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-give-staff-advance.response.dto';
import { HrGiveStaffAdvanceService } from '@/backend_manager/modules/manager/hr/services/hr-give-staff-advance.service';
import { HrPayStaffDueRequestDto } from '@/backend_manager/modules/manager/hr/dtos/hr-pay-staff-due.request.dto';
import { HrPayStaffDueResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-pay-staff-due.response.dto';
import { HrPayStaffDueService } from '@/backend_manager/modules/manager/hr/services/hr-pay-staff-due.service';
import { HrQueryDto } from '@/backend_manager/modules/manager/hr/dtos/hr-query.dto';
import { HrUpdatePayrollRequestDto } from '@/backend_manager/modules/manager/hr/dtos/hr-update-payroll.request.dto';
import { HrUpdatePayrollResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-update-payroll.response.dto';
import { HrUpdatePayrollService } from '@/backend_manager/modules/manager/hr/services/hr-update-payroll.service';
import { HrUpdatePayrollStatusRequestDto } from '@/backend_manager/modules/manager/hr/dtos/hr-update-payroll-status.request.dto';
import { HrUpdatePayrollStatusResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-update-payroll-status.response.dto';
import { HrUpdatePayrollStatusService } from '@/backend_manager/modules/manager/hr/services/hr-update-payroll-status.service';
import { HrUpdateStaffRequestDto } from '@/backend_manager/modules/manager/hr/dtos/hr-update-staff.request.dto';
import { HrUpdateStaffResponseDto } from '@/backend_manager/modules/manager/hr/dtos/hr-update-staff.response.dto';
import { HrUpdateStaffService } from '@/backend_manager/modules/manager/hr/services/hr-update-staff.service';

@Controller('manager')
@ApiTags('Manager hr')
@Roles(CoreRole.MANAGER)
export class HrCommandController {
  constructor(private readonly createStaffService: HrCreateStaffService, private readonly updateStaffService: HrUpdateStaffService, private readonly deleteStaffService: HrDeleteStaffService, private readonly generatePayrollsService: HrGeneratePayrollsService, private readonly createPayrollService: HrCreatePayrollService, private readonly updatePayrollService: HrUpdatePayrollService, private readonly updatePayrollStatusService: HrUpdatePayrollStatusService, private readonly giveStaffAdvanceService: HrGiveStaffAdvanceService, private readonly payStaffDueService: HrPayStaffDueService) {}

  // SLA: STANDARD
  @Post("hr/ledger/advance")
  @ApiOperation({ summary: 'giveStaffAdvance for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrGiveStaffAdvanceResponseDto })
  giveStaffAdvance(@Body() dto: HrGiveStaffAdvanceRequestDto): Promise<HrGiveStaffAdvanceResponseDto> {  return this.giveStaffAdvanceService.giveStaffAdvance(dto) as unknown as Promise<HrGiveStaffAdvanceResponseDto>;  }


  // SLA: STANDARD
  @Post("hr/ledger/paydue")
  @ApiOperation({ summary: 'payStaffDue for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrPayStaffDueResponseDto })
  payStaffDue(@Body() dto: HrPayStaffDueRequestDto): Promise<HrPayStaffDueResponseDto> {  return this.payStaffDueService.payStaffDue(dto) as unknown as Promise<HrPayStaffDueResponseDto>;  }


  // SLA: STANDARD
  @Post("hr/payrolls/generate")
  @ApiOperation({ summary: 'generatePayrolls for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrGeneratePayrollsResponseDto })
  generatePayrolls(@Body() dto: HrGeneratePayrollsRequestDto): Promise<HrGeneratePayrollsResponseDto> {  return this.generatePayrollsService.generatePayrolls(dto) as unknown as Promise<HrGeneratePayrollsResponseDto>;  }


  // SLA: STANDARD
  @Post("hr/payrolls")
  @ApiOperation({ summary: 'createPayroll for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrCreatePayrollResponseDto })
  createPayroll(@Body() dto: HrCreatePayrollRequestDto): Promise<HrCreatePayrollResponseDto> {  return this.createPayrollService.createPayroll(dto) as unknown as Promise<HrCreatePayrollResponseDto>;  }


  // SLA: STANDARD
  @Post("hr/staff")
  @ApiOperation({ summary: 'createStaff for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: HrCreateStaffResponseDto })
  createStaff(@Body() dto: HrCreateStaffRequestDto): Promise<HrCreateStaffResponseDto> {  return this.createStaffService.createStaff(dto) as unknown as Promise<HrCreateStaffResponseDto>;  }


  // SLA: STANDARD
  @Patch("hr/payrolls/:id/status")
  @ApiOperation({ summary: 'updatePayrollStatus for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrUpdatePayrollStatusResponseDto })
  updatePayrollStatus(@Param('id') id: string, @Body() dto: HrUpdatePayrollStatusRequestDto): Promise<HrUpdatePayrollStatusResponseDto> {  return this.updatePayrollStatusService.updatePayrollStatus(dto, id) as unknown as Promise<HrUpdatePayrollStatusResponseDto>;  }


  // SLA: STANDARD
  @Patch("hr/payrolls/:id")
  @ApiOperation({ summary: 'updatePayroll for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrUpdatePayrollResponseDto })
  updatePayroll(@Param('id') id: string, @Body() dto: HrUpdatePayrollRequestDto): Promise<HrUpdatePayrollResponseDto> {  return this.updatePayrollService.updatePayroll(dto, id) as unknown as Promise<HrUpdatePayrollResponseDto>;  }


  // SLA: STANDARD
  @Patch("hr/staff/:id")
  @ApiOperation({ summary: 'updateStaff for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrUpdateStaffResponseDto })
  updateStaff(@Param('id') id: string, @Body() dto: HrUpdateStaffRequestDto): Promise<HrUpdateStaffResponseDto> {  return this.updateStaffService.updateStaff(dto, id) as unknown as Promise<HrUpdateStaffResponseDto>;  }


  // SLA: STANDARD
  @Delete("hr/staff/:id")
  @ApiOperation({ summary: 'deleteStaff for Manager hr' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HrDeleteStaffResponseDto })
  deleteStaff(@Param('id') id: string): Promise<HrDeleteStaffResponseDto> {  return this.deleteStaffService.deleteStaff(id); }


}
