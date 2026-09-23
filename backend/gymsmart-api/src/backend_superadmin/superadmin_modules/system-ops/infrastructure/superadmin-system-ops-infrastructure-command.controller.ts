// RESPONSIBILITY: Owns HTTP transport for the infrastructure-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { SuperadminInfrastructureStatusDto } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/dtos/superadmin-system-ops-infrastructure-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminInfrastructureCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-create.service';
import { SuperadminInfrastructureCreateDto } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/dtos/superadmin-system-ops-infrastructure-create.dto';
import { SuperadminInfrastructureUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-update.service';
import { SuperadminInfrastructureUpdateDto } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/dtos/superadmin-system-ops-infrastructure-update.dto';
import { SuperadminInfrastructureDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-delete.service';
import { SuperadminInfrastructureStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-status.service';

@ApiTags('infrastructure')
@Controller('/superadmin/system-ops/infrastructure')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminInfrastructureCommandController {
  constructor(private readonly createService: SuperadminInfrastructureCreateService, private readonly updateService: SuperadminInfrastructureUpdateService, private readonly deleteService: SuperadminInfrastructureDeleteService, private readonly statusService: SuperadminInfrastructureStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create infrastructure' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminInfrastructureCreateDto): Promise<unknown> { return this.createService.createInfrastructure(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update infrastructure' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminInfrastructureUpdateDto): Promise<unknown> { return this.updateService.updateInfrastructure(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove infrastructure' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteInfrastructure(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus infrastructure' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminInfrastructureStatusDto): Promise<unknown> { return this.statusService.changeInfrastructureStatus(id, body.status); }

}
