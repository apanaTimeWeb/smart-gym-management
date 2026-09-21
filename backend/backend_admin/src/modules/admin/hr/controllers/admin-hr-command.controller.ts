// RESPONSIBILITY: Exposes mutation endpoints for Admin hr; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminHrCommandController -> AdminHrCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminHrCommandService } from '@/modules/admin/hr/services/admin-hr-command.service';
import { AdminHrMutationDto } from '@/modules/admin/hr/dtos/admin-hr-mutation.dto';
import { AdminHrIdDto } from '@/modules/admin/hr/dtos/admin-hr-id.dto';

@ApiTags('Admin / hr')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/hr')
export class AdminHrCommandController {
  constructor(private readonly service: AdminHrCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('staff')
  @ApiOperation({ summary: 'Execute createStaff' })
  @ApiResponse({ status: HttpStatus.OK })
  async createStaff(@Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createStaff(dto as unknown as Record<string, unknown>));
  }

  // SLA: STANDARD
  @Patch('staff/:id')
  @ApiOperation({ summary: 'Execute updateStaff' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateStaff(@Param('id') id: string, @Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const operation = async (): Promise<unknown> => this.service.updateStaff(id, dto as unknown as Record<string, unknown>);
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }

  // SLA: STANDARD
  @Delete('staff/:id')
  @ApiOperation({ summary: 'Execute deleteStaff' })
  @ApiResponse({ status: HttpStatus.OK })
  async deleteStaff(@Param('id') id: string, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.deleteStaff(id));
  }

  // SLA: STANDARD
  @Post('staff/bulk-deactivate')
  @ApiOperation({ summary: 'Execute bulkDeactivate' })
  @ApiResponse({ status: HttpStatus.OK })
  async bulkDeactivate(@Body() dto: AdminHrMutationDto): Promise<unknown> {
    return this.service.bulkDeactivate(Array.isArray((dto as unknown as Record<string, unknown>).ids) ? ((dto as unknown as Record<string, unknown>).ids as string[]) : []);
  }

  // SLA: STANDARD
  @Post('payrolls')
  @ApiOperation({ summary: 'Execute createPayroll' })
  @ApiResponse({ status: HttpStatus.OK })
  async createPayroll(@Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const operation = async (): Promise<unknown> => this.service.createPayroll(dto as unknown as Record<string, unknown>);
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }

  // SLA: STANDARD
  @Patch('payrolls/:id')
  @ApiOperation({ summary: 'Execute updatePayroll' })
  @ApiResponse({ status: HttpStatus.OK })
  async updatePayroll(@Param('id') id: string, @Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const operation = async (): Promise<unknown> => this.service.updatePayroll(id, dto as unknown as Record<string, unknown>);
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }

  // SLA: STANDARD
  @Patch('payrolls/:id/status')
  @ApiOperation({ summary: 'Execute updatePayrollStatus' })
  @ApiResponse({ status: HttpStatus.OK })
  async updatePayrollStatus(@Param('id') id: string, @Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const operation = async (): Promise<unknown> => this.service.updatePayrollStatus(id, String((dto as unknown as Record<string, unknown>).status ?? ''));
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }

  // SLA: STANDARD
  @Post('advances')
  @ApiOperation({ summary: 'Execute createAdvance' })
  @ApiResponse({ status: HttpStatus.OK })
  async createAdvance(@Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const operation = async (): Promise<unknown> => this.service.createAdvance(dto as unknown as Record<string, unknown>);
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }

  // SLA: STANDARD
  @Post('dues/pay')
  @ApiOperation({ summary: 'Execute payDue' })
  @ApiResponse({ status: HttpStatus.OK })
  async payDue(@Body() dto: AdminHrMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const operation = async (): Promise<unknown> => this.service.payDue(dto as unknown as Record<string, unknown>);
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }

}
