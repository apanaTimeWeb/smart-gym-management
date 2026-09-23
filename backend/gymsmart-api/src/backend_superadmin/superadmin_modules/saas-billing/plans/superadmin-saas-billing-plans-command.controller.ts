// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the plans feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminPlansCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-create.service';
import { SuperadminPlansCreateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/dtos/superadmin-saas-billing-plans-create.dto';
import { SuperadminPlansUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-update.service';
import { SuperadminPlansUpdateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/dtos/superadmin-saas-billing-plans-update.dto';
import { SuperadminPlansDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-delete.service';
import { SuperadminPlansArchiveService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-archive.service';


@ApiTags('plans')
@Controller('/superadmin/saas-billing/plans')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminPlansCommandController {
  constructor(private readonly createService: SuperadminPlansCreateService, private readonly updateService: SuperadminPlansUpdateService, private readonly deleteService: SuperadminPlansDeleteService, private readonly archiveService: SuperadminPlansArchiveService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create plans' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminPlansCreateDto): Promise<unknown> { return this.createService.createPlans(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update plans' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminPlansUpdateDto): Promise<unknown> { return this.updateService.updatePlans(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove plans' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deletePlans(id); }

  /** Archives a plan using the soft state transition required by the frontend. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/archive')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async archive(@Param('id') id: string): Promise<unknown> { return this.archiveService.archive(id); }

}