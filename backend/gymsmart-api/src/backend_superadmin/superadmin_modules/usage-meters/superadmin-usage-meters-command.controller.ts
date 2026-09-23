// RESPONSIBILITY: Owns HTTP transport for the usage-meters-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminUsageMetersCreateService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-create.service';
import { SuperadminUsageMetersCreateDto } from '@/backend_superadmin/superadmin_modules/usage-meters/dtos/superadmin-usage-meters-create.dto';
import { SuperadminUsageMetersUpdateService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-update.service';
import { SuperadminUsageMetersUpdateDto } from '@/backend_superadmin/superadmin_modules/usage-meters/dtos/superadmin-usage-meters-update.dto';
import { SuperadminUsageMetersDeleteService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-delete.service';

@ApiTags('usage-meters')
@Controller('/superadmin/usage-meters')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminUsageMetersCommandController {
  constructor(private readonly createService: SuperadminUsageMetersCreateService, private readonly updateService: SuperadminUsageMetersUpdateService, private readonly deleteService: SuperadminUsageMetersDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create usage-meters' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminUsageMetersCreateDto): Promise<unknown> { return this.createService.createUsageMeters(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update usage-meters' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminUsageMetersUpdateDto): Promise<unknown> { return this.updateService.updateUsageMeters(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove usage-meters' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteUsageMeters(id); }

}