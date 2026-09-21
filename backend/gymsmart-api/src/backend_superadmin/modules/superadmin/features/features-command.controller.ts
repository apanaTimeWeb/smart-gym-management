// RESPONSIBILITY: Owns feature flag create, update, toggle, and delete HTTP mutations.
// FLOW: HTTP mutation -> DTO -> feature service/repository -> canonical response interceptor.
import { randomUUID } from 'node:crypto';

import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/superadmin/features/responses/features-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('features')
@Controller('/superadmin/features')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesCommandController {
  constructor(
    private readonly createService: FeaturesCreateService,
    private readonly updateService: FeaturesUpdateService,
    private readonly deleteService: FeaturesDeleteService,
    private readonly repository: FeaturesRepository,
  ) {}

  /** Creates a feature flag. */
  @ApiOperation({ summary: 'Create feature flag' })
  @Post('flags')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
  @RequireIdempotencyKey()
  @ApiResponse({ type: FeaturesResponseDto })
  async createFlag(@Body() body: FeaturesCreateDto): Promise<FeaturesResponseDto> {
    return this.createService.createFeatures(body);
  }

  /** Updates a feature flag. */
  @ApiOperation({ summary: 'Update feature flag' })
  @Patch('flags/:id')
  @UseGuards(RateLimitGuard)
  @RequireIdempotencyKey()
  @ApiResponse({ type: FeaturesResponseDto })
  async updateFlag(@Param('id') id: string, @Body() body: FeaturesUpdateDto): Promise<FeaturesResponseDto> {
    return this.updateService.updateFeatures(id, body);
  }

  /** Toggles a feature flag and appends history. */
  @ApiOperation({ summary: 'Toggle feature flag' })
  @Post('flags/:id/toggle')
  @UseGuards(RateLimitGuard)
  @RequireIdempotencyKey()
  @ApiResponse({ type: FeaturesResponseDto })
  async toggleFlag(@Param('id') id: string): Promise<FeaturesResponseDto> {
    const current = await this.repository.findByIdOrThrow(id);
    const next = !current.isGlobalEnabled;
    const history = Array.isArray(current.history) ? current.history : [];
    await this.repository.updateFeaturesById(id, {
      isGlobalEnabled: next,
      history: [...history, { id: randomUUID(), action: next ? 'ENABLED' : 'DISABLED', user: 'SUPERADMIN', timestamp: new Date().toISOString() }],
    });
    const entity = await this.repository.findByIdOrThrow(id);
    const dto = new FeaturesResponseDto();
    Object.assign(dto, entity);
    return dto;
  }

  /** Soft-deletes a feature flag. */
  @ApiOperation({ summary: 'Delete feature flag' })
  @Delete('flags/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RateLimitGuard)
  @RequireIdempotencyKey()
  async deleteFlag(@Param('id') id: string): Promise<void> {
    await this.deleteService.deleteFeatures(id);
  }
}
