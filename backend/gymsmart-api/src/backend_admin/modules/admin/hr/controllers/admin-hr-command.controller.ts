// RESPONSIBILITY: Exposes mutation endpoints for Admin hr; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminHrCommandController -> AdminHrCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { AdminHrCommandService } from '@/backend_admin/modules/admin/hr/services/admin-hr-command.service';
import { AdminHrMutationDto } from '@/backend_admin/modules/admin/hr/dtos/admin-hr-mutation.dto';
import { AdminHrIdDto } from '@/backend_admin/modules/admin/hr/dtos/admin-hr-id.dto';
import { AdminHrStaffDto, AdminHrPayrollDto } from '@/backend_admin/modules/admin/hr/dtos/admin-hr-response.dto';

@ApiTags('Admin / hr')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/hr')
export class AdminHrCommandController {
  constructor(private readonly service: AdminHrCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('staff')
  @ApiOperation({ summary: 'Execute createStaff' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrStaffDto })
  async createStaff(@Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminHrStaffDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createStaff(dto as any)) as Promise<AdminHrStaffDto>;
  }

  // SLA: STANDARD
  @Patch('staff/:id')
  @ApiOperation({ summary: 'Execute updateStaff' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrStaffDto })
  async updateStaff(@Param('id') id: string, @Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminHrStaffDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.updateStaff(id, dto as any)) as Promise<AdminHrStaffDto>;
  }

  // SLA: STANDARD
  @Delete('staff/:id')
  @ApiOperation({ summary: 'Execute deleteStaff' })
  @ApiResponse({ status: HttpStatus.OK })
  async deleteStaff(@Param('id') id: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.deleteStaff(id)) as Promise<void>;
  }

  // SLA: STANDARD
  @Post('staff/bulk-deactivate')
  @ApiOperation({ summary: 'Execute bulkDeactivate' })
  @ApiResponse({ status: HttpStatus.OK })
  async bulkDeactivate(@Body() dto: AdminHrMutationDto): Promise<void> {
    return this.service.bulkDeactivate(dto.ids || []);
  }

  // SLA: STANDARD
  @Post('payrolls')
  @ApiOperation({ summary: 'Execute createPayroll' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrPayrollDto })
  async createPayroll(@Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminHrPayrollDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createPayroll(dto as any)) as Promise<AdminHrPayrollDto>;
  }

  // SLA: STANDARD
  @Patch('payrolls/:id')
  @ApiOperation({ summary: 'Execute updatePayroll' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrPayrollDto })
  async updatePayroll(@Param('id') id: string, @Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminHrPayrollDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.updatePayroll(id, dto as any)) as Promise<AdminHrPayrollDto>;
  }

  // SLA: STANDARD
  @Patch('payrolls/:id/status')
  @ApiOperation({ summary: 'Execute updatePayrollStatus' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrPayrollDto })
  async updatePayrollStatus(@Param('id') id: string, @Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminHrPayrollDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.updatePayrollStatus(id, dto.status ?? '')) as Promise<AdminHrPayrollDto>;
  }

  // SLA: STANDARD
  @Post('advances')
  @ApiOperation({ summary: 'Execute createAdvance' })
  @ApiResponse({ status: HttpStatus.OK })
  async createAdvance(@Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createAdvance(dto as any)) as Promise<void>;
  }

  // SLA: STANDARD
  @Post('dues/pay')
  @ApiOperation({ summary: 'Execute payDue' })
  @ApiResponse({ status: HttpStatus.OK })
  async payDue(@Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.payDue(dto as any)) as Promise<void>;
  }

}
