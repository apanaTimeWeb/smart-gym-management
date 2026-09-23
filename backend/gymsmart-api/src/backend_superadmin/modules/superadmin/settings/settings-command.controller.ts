// RESPONSIBILITY: Owns HTTP transport for the settings-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { SettingsCreateService } from '@/backend_superadmin/modules/backend_superadmin/settings/services/settings-create.service';
import { SettingsCreateDto } from '@/backend_superadmin/modules/backend_superadmin/settings/dtos/settings-create.dto';
import { SettingsUpdateService } from '@/backend_superadmin/modules/backend_superadmin/settings/services/settings-update.service';
import { SettingsUpdateDto } from '@/backend_superadmin/modules/backend_superadmin/settings/dtos/settings-update.dto';
import { SettingsDeleteService } from '@/backend_superadmin/modules/backend_superadmin/settings/services/settings-delete.service';

@ApiTags('settings')
@Controller('/superadmin/settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SettingsCommandController {
  constructor(private readonly createService: SettingsCreateService, private readonly updateService: SettingsUpdateService, private readonly deleteService: SettingsDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create settings' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
    async create(@Body() body: SettingsCreateDto): Promise<unknown> { return this.createService.createSettings(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update settings' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SettingsUpdateDto): Promise<unknown> { return this.updateService.updateSettings(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove settings' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteSettings(id); }

}