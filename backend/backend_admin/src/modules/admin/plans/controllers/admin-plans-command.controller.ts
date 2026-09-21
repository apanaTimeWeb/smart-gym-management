// RESPONSIBILITY: Exposes mutation endpoints for Admin plans; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminPlansCommandController -> AdminPlansCommandService.

import { BadRequestException, Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminPlansCommandService } from '@/modules/admin/plans/services/admin-plans-command.service';
import { AdminPlansMutationDto } from '@/modules/admin/plans/dtos/admin-plans-mutation.dto';
import { AdminPlansIdDto } from '@/modules/admin/plans/dtos/admin-plans-id.dto';

@ApiTags('Admin / plans')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/plans')
export class AdminPlansCommandController {
  constructor(private readonly service: AdminPlansCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('createPlan')
  @ApiOperation({ summary: 'Execute createPlan' })
  @ApiResponse({ status: HttpStatus.OK })
  async createRecord(@Body() dto: AdminPlansMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const operation = async (): Promise<unknown> => this.service.createRecord(dto as unknown as Record<string, unknown>);
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }

  // SLA: STANDARD
  @Post('updatePlan')
  @ApiOperation({ summary: 'Execute updatePlan' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateById(@Body() dto: AdminPlansMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const id = dto.id;
    if (!id) throw new BadRequestException('Entity id is required.');
    const operation = async (): Promise<unknown> => this.service.updateById(id, dto as unknown as Record<string, unknown>);
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }

  // SLA: STANDARD
  @Delete('deletePlan')
  @ApiOperation({ summary: 'Execute deletePlan' })
  @ApiResponse({ status: HttpStatus.OK })
  async markAsDeleted(@Body() dto: AdminPlansIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.markAsDeleted(dto.id));
  }

}
