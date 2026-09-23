// RESPONSIBILITY: Owns HTTP transport for the settings-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminSettingsCreateService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-create.service';
import { SuperadminSettingsCreateDto } from '@/backend_superadmin/superadmin_modules/settings/dtos/superadmin-settings-create.dto';
import { SuperadminSettingsUpdateService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-update.service';
import { SuperadminSettingsUpdateDto } from '@/backend_superadmin/superadmin_modules/settings/dtos/superadmin-settings-update.dto';
import { SuperadminSettingsDeleteService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-delete.service';

@ApiTags('settings')
@Controller('/superadmin/settings')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSettingsCommandController {
  constructor(private readonly createService: SuperadminSettingsCreateService, private readonly updateService: SuperadminSettingsUpdateService, private readonly deleteService: SuperadminSettingsDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create settings' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminSettingsCreateDto): Promise<unknown> { return this.createService.createSettings(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update settings' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminSettingsUpdateDto): Promise<unknown> { return this.updateService.updateSettings(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove settings' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteSettings(id); }

}