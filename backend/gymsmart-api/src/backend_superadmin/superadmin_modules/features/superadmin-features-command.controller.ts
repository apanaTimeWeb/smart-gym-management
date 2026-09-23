// RESPONSIBILITY: Owns HTTP transport for the features-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.

import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminFeaturesCreateDto } from '@/backend_superadmin/superadmin_modules/features/dtos/superadmin-features-create.dto';
import { SuperadminFeaturesUpdateDto } from '@/backend_superadmin/superadmin_modules/features/dtos/superadmin-features-update.dto';
import { SuperadminFeaturesCreateService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-create.service';
import { SuperadminFeaturesUpdateService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-update.service';
import { SuperadminFeaturesDeleteService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-delete.service';
import { SuperadminFeaturesToggleService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-toggle.service';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/responses/superadmin-features-response.dto';


@ApiTags('features')
@Controller('/superadmin/features')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminFeaturesCommandController {
  constructor(
    private readonly createService: SuperadminFeaturesCreateService,
    private readonly updateService: SuperadminFeaturesUpdateService,
    private readonly deleteService: SuperadminFeaturesDeleteService,
    private readonly toggleService: SuperadminFeaturesToggleService,
  ) {}

  /** Creates a feature flag. */
  @ApiOperation({ summary: 'Create feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('flags')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminFeaturesResponseDto })
  async createFlag(@Body() body: SuperadminFeaturesCreateDto): Promise<SuperadminFeaturesResponseDto> {
    return this.createService.createFeatures(body);
  }

  /** Updates a feature flag. */
  @ApiOperation({ summary: 'Update feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('flags/:id')
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminFeaturesResponseDto })
  async updateFlag(@Param('id') id: string, @Body() body: SuperadminFeaturesUpdateDto): Promise<SuperadminFeaturesResponseDto> {
    return this.updateService.updateFeatures(id, body);
  }

  /** Toggles a feature flag and appends history. */
  @ApiOperation({ summary: 'Toggle feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('flags/:id/toggle')
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminFeaturesResponseDto })
  async toggleFlag(@Param('id') id: string): Promise<SuperadminFeaturesResponseDto> {
    return this.toggleService.toggleFeatures(id);
  }

  /** Soft-deletes a feature flag. */
  @ApiOperation({ summary: 'Delete feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('flags/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SuperadminRateLimitGuard)
  async deleteFlag(@Param('id') id: string): Promise<void> {
    await this.deleteService.deleteFeatures(id);
  }
}