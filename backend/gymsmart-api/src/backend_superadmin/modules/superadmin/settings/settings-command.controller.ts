// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the settings feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { SettingsCreateService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-create.service';
import { SettingsCreateDto } from '@/backend_superadmin/modules/superadmin/settings/dtos/settings-create.dto';
import { SettingsUpdateService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-update.service';
import { SettingsUpdateDto } from '@/backend_superadmin/modules/superadmin/settings/dtos/settings-update.dto';
import { SettingsDeleteService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-delete.service';

@ApiTags('settings')
@Controller('/superadmin/settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SettingsCommandController {
  constructor(private readonly createService: SettingsCreateService, private readonly updateService: SettingsUpdateService, private readonly deleteService: SettingsDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create settings' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: SettingsCreateDto): Promise<unknown> { return this.createService.createSettings(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update settings' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SettingsUpdateDto): Promise<unknown> { return this.updateService.updateSettings(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove settings' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteSettings(id); }

}
