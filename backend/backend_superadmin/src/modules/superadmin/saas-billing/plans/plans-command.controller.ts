// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the plans feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { PlansCreateService } from '@/modules/superadmin/saas-billing/plans/services/plans-create.service';
import { PlansCreateDto } from '@/modules/superadmin/saas-billing/plans/dtos/plans-create.dto';
import { PlansUpdateService } from '@/modules/superadmin/saas-billing/plans/services/plans-update.service';
import { PlansUpdateDto } from '@/modules/superadmin/saas-billing/plans/dtos/plans-update.dto';
import { PlansDeleteService } from '@/modules/superadmin/saas-billing/plans/services/plans-delete.service';
import { PlansArchiveService } from '@/modules/superadmin/saas-billing/plans/services/plans-archive.service';
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';

@ApiTags('plans')
@Controller('/superadmin/saas-billing/plans')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class PlansCommandController {
  constructor(private readonly createService: PlansCreateService, private readonly updateService: PlansUpdateService, private readonly deleteService: PlansDeleteService, private readonly archiveService: PlansArchiveService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create plans' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: PlansCreateDto): Promise<unknown> { return this.createService.createPlans(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update plans' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: PlansUpdateDto): Promise<unknown> { return this.updateService.updatePlans(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove plans' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deletePlans(id); }

  /** Archives a plan using the soft state transition required by the frontend. */
  @Patch(':id/archive')
  @RequireIdempotencyKey()
  async archive(@Param('id') id: string): Promise<unknown> { return this.archiveService.archive(id); }

}
