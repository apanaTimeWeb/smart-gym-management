// RESPONSIBILITY: Owns HTTP transport for the features-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.

import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { FeaturesCreateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-create.dto';
import { FeaturesUpdateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-update.dto';
import { FeaturesCreateService } from '@/backend_superadmin/modules/superadmin/features/services/features-create.service';
import { FeaturesUpdateService } from '@/backend_superadmin/modules/superadmin/features/services/features-update.service';
import { FeaturesDeleteService } from '@/backend_superadmin/modules/superadmin/features/services/features-delete.service';
import { FeaturesToggleService } from '@/backend_superadmin/modules/superadmin/features/services/features-toggle.service';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/superadmin/features/responses/features-response.dto';


@ApiTags('features')
@Controller('/superadmin/features')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesCommandController {
  constructor(
    private readonly createService: FeaturesCreateService,
    private readonly updateService: FeaturesUpdateService,
    private readonly deleteService: FeaturesDeleteService,
    private readonly toggleService: FeaturesToggleService,
  ) {}

  /** Creates a feature flag. */
  @ApiOperation({ summary: 'Create feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('flags')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: FeaturesResponseDto })
  async createFlag(@Body() body: FeaturesCreateDto): Promise<FeaturesResponseDto> {
    return this.createService.createFeatures(body);
  }

  /** Updates a feature flag. */
  @ApiOperation({ summary: 'Update feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('flags/:id')
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: FeaturesResponseDto })
  async updateFlag(@Param('id') id: string, @Body() body: FeaturesUpdateDto): Promise<FeaturesResponseDto> {
    return this.updateService.updateFeatures(id, body);
  }

  /** Toggles a feature flag and appends history. */
  @ApiOperation({ summary: 'Toggle feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('flags/:id/toggle')
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: FeaturesResponseDto })
  async toggleFlag(@Param('id') id: string): Promise<FeaturesResponseDto> {
    return this.toggleService.toggleFeatures(id);
  }

  /** Soft-deletes a feature flag. */
  @ApiOperation({ summary: 'Delete feature flag' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('flags/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RateLimitGuard)
  async deleteFlag(@Param('id') id: string): Promise<void> {
    await this.deleteService.deleteFeatures(id);
  }
}