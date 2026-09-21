// RESPONSIBILITY: Owns feature flag create, update, toggle, and delete HTTP mutations.
// FLOW: HTTP mutation -> DTO -> feature service/repository -> canonical response interceptor.
import { randomUUID } from 'node:crypto';

import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { FeaturesCreateDto } from '@/modules/superadmin/features/dtos/features-create.dto';
import { FeaturesUpdateDto } from '@/modules/superadmin/features/dtos/features-update.dto';
import { FeaturesCreateService } from '@/modules/superadmin/features/services/features-create.service';
import { FeaturesUpdateService } from '@/modules/superadmin/features/services/features-update.service';
import { FeaturesDeleteService } from '@/modules/superadmin/features/services/features-delete.service';
import { FeaturesRepository } from '@/modules/superadmin/features/features.repository';

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
  async createFlag(@Body() body: FeaturesCreateDto): Promise<unknown> {
    return this.createService.createFeatures(body);
  }

  /** Updates a feature flag. */
  @ApiOperation({ summary: 'Update feature flag' })
  @Patch('flags/:id')
  @UseGuards(RateLimitGuard)
  @RequireIdempotencyKey()
  async updateFlag(@Param('id') id: string, @Body() body: FeaturesUpdateDto): Promise<unknown> {
    return this.updateService.updateFeatures(id, body);
  }

  /** Toggles a feature flag and appends history. */
  @ApiOperation({ summary: 'Toggle feature flag' })
  @Post('flags/:id/toggle')
  @UseGuards(RateLimitGuard)
  @RequireIdempotencyKey()
  async toggleFlag(@Param('id') id: string): Promise<unknown> {
    const current = await this.repository.findByIdOrThrow(id);
    const next = !current.isGlobalEnabled;
    const history = Array.isArray(current.history) ? current.history : [];
    await this.repository.updateFeaturesById(id, {
      isGlobalEnabled: next,
      history: [...history, { id: randomUUID(), action: next ? 'ENABLED' : 'DISABLED', user: 'SUPERADMIN', timestamp: new Date().toISOString() }],
    });
    return this.repository.findByIdOrThrow(id);
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
