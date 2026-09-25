// RESPONSIBILITY: Exposes mutation endpoints for Admin plans; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminPlansCommandController -> AdminPlansCommandService.
import { BadRequestException, Body, Controller, Delete, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminPlansIdDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-id.dto'
import { AdminPlansMutationDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-mutation.dto'
import { AdminPlanDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-response.dto'
import { AdminPlansCommandService } from '@/backend_admin/admin_modules/admin_plans/plans_services/admin-plans-command.service'

@ApiTags('Admin / plans')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/plans')
/**
 * @description Defines the AdminPlansCommandController boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlansCommandController {
  constructor(private readonly service: AdminPlansCommandService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('createPlan')
  @ApiOperation({ summary: 'Execute createPlan' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlanDto })
  async createRecord(@Body() dto: AdminPlansMutationDto): Promise<Record<string, unknown>> {
    return this.service.createRecord(dto);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('updatePlan')
  @ApiOperation({ summary: 'Execute updatePlan' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminPlanDto })
  async updateById(@Body() dto: AdminPlansMutationDto): Promise<Record<string, unknown>> {
    const id = dto.id;
    if (!id) throw new BadRequestException({ message: 'Entity id is required.', errorCode: 'ADMIN.PLANS.INVALID_REQUEST' });
    return this.service.updateById(id, dto);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('deletePlan')
  @ApiOperation({ summary: 'Execute deletePlan' })
  @ApiResponse({ status: HttpStatus.OK })
  async deletePlan(@Body() dto: AdminPlansIdDto): Promise<unknown> {
    return this.service.deletePlan(dto.id ?? '');
  }

}
