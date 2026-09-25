// RESPONSIBILITY: Exposes mutation endpoints for Admin hr; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminHrCommandController -> AdminHrCommandService.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminHrIdDto } from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-id.dto.js';
import { AdminHrMutationDto } from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-mutation.dto.js';
import { AdminHrStaffDto, AdminHrPayrollDto } from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-response.dto.js';
import { AdminHrCommandService } from '@/backend_admin/admin_modules/admin_hr/hr_services/admin-hr-command.service.js';

@ApiTags('Admin / hr')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/hr')
/**
 * @description Defines the AdminHrCommandController boundary for the admin_hr backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminHrCommandController {
  constructor(private readonly service: AdminHrCommandService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('staff')
  @ApiOperation({ summary: 'Execute createStaff' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrStaffDto })
  async createStaff(@Body() dto: AdminHrMutationDto): Promise<AdminHrStaffDto> {
    return this.service.createStaff({ ...dto }) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('staff/:id')
  @ApiOperation({ summary: 'Execute updateStaff' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrStaffDto })
  async updateStaff(@Param('id') id: string, @Body() dto: AdminHrMutationDto): Promise<AdminHrStaffDto> {
    return this.service.updateStaff(id, { ...dto }) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('staff/:id')
  @ApiOperation({ summary: 'Execute deleteStaff' })
  @ApiResponse({ status: HttpStatus.OK })
  async deleteStaff(@Param('id') id: string): Promise<void> {
    return this.service.deleteStaff(id) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('staff/bulk-deactivate')
  @ApiOperation({ summary: 'Execute bulkDeactivate' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateBulkDeactivate(@Body() dto: AdminHrMutationDto): Promise<Record<string, number>> {
    return this.service.updateBulkDeactivate(dto.ids || []) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('payrolls')
  @ApiOperation({ summary: 'Execute createPayroll' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrPayrollDto })
  async createPayroll(@Body() dto: AdminHrMutationDto): Promise<AdminHrPayrollDto> {
    return this.service.createPayroll({ ...dto }) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('payrolls/:id')
  @ApiOperation({ summary: 'Execute updatePayroll' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrPayrollDto })
  async updatePayroll(@Param('id') id: string, @Body() dto: AdminHrMutationDto): Promise<AdminHrPayrollDto> {
    return this.service.updatePayroll(id, { ...dto }) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('payrolls/:id/status')
  @ApiOperation({ summary: 'Execute updatePayrollStatus' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrPayrollDto })
  async updatePayrollStatus(@Param('id') id: string, @Body() dto: AdminHrMutationDto): Promise<AdminHrPayrollDto> {
    return this.service.updatePayrollStatus(id, dto.status ?? '') as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('advances')
  @ApiOperation({ summary: 'Execute createAdvance' })
  @ApiResponse({ status: HttpStatus.OK })
  async createAdvance(@Body() dto: AdminHrMutationDto): Promise<void> {
    return this.service.createAdvance({ ...dto }) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('dues/pay')
  @ApiOperation({ summary: 'Execute payDue' })
  @ApiResponse({ status: HttpStatus.OK })
  async updatePayDue(@Body() dto: AdminHrMutationDto): Promise<void> {
    return this.service.updatePayDue({ ...dto }) as any;
  }

}
