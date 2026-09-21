// RESPONSIBILITY: Exposes mutation endpoints for Admin plans; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminPlansCommandController -> AdminPlansCommandService.

import { BadRequestException, Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { AdminPlansCommandService } from '@/backend_admin/modules/admin/plans/services/admin-plans-command.service';
import { AdminPlansMutationDto } from '@/backend_admin/modules/admin/plans/dtos/admin-plans-mutation.dto';
import { AdminPlansIdDto } from '@/backend_admin/modules/admin/plans/dtos/admin-plans-id.dto';
import { AdminPlanDto } from '@/backend_admin/modules/admin/plans/dtos/admin-plans-response.dto';

@ApiTags('Admin / plans')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/plans')
export class AdminPlansCommandController {
  constructor(private readonly service: AdminPlansCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('createPlan')
  @ApiOperation({ summary: 'Execute createPlan' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlanDto })
  async createRecord(@Body() dto: AdminPlansMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminPlanDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createRecord(dto)) as Promise<AdminPlanDto>;
  }

  // SLA: STANDARD
  @Post('updatePlan')
  @ApiOperation({ summary: 'Execute updatePlan' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlanDto })
  async updateById(@Body() dto: AdminPlansMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminPlanDto> {
    const id = dto.id;
    if (!id) throw new BadRequestException('Entity id is required.');
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.updateById(id, dto)) as Promise<AdminPlanDto>;
  }

  // SLA: STANDARD
  @Delete('deletePlan')
  @ApiOperation({ summary: 'Execute deletePlan' })
  @ApiResponse({ status: HttpStatus.OK })
  async markAsDeleted(@Body() dto: AdminPlansIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.markAsDeleted(dto.id)) as Promise<void>;
  }

}
