// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Features/Feature Flags.
// FLOW: /superadmin/features -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/features.

import { randomUUID } from 'node:crypto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Version, VERSION_NEUTRAL, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';

import { FeaturesMainService } from '@/backend_superadmin/modules/superadmin/features/services/features-main.service';
import { FeaturesFindService } from '@/backend_superadmin/modules/superadmin/features/services/features-find.service';
import { FeaturesRolloutInsightsService } from '@/backend_superadmin/modules/superadmin/features/services/features-rollout-insights.service';
import { FeaturesCreateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-create.dto';
import { FeaturesUpdateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-update.dto';
import { FeaturesCreateService } from '@/backend_superadmin/modules/superadmin/features/services/features-create.service';
import { FeaturesUpdateService } from '@/backend_superadmin/modules/superadmin/features/services/features-update.service';
import { FeaturesDeleteService } from '@/backend_superadmin/modules/superadmin/features/services/features-delete.service';
import { FeaturesReleaseNoteService } from '@/backend_superadmin/modules/superadmin/features/services/features-release-note.service';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';

@ApiTags('Features-Compatibility')
@Controller({ path: 'superadmin/features', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesCompatibilityController {
  constructor(
    private readonly mainService: FeaturesMainService,
    private readonly findService: FeaturesFindService,
    private readonly createService: FeaturesCreateService,
    private readonly updateService: FeaturesUpdateService,
    private readonly deleteService: FeaturesDeleteService,
    private readonly notesService: FeaturesReleaseNoteService,
    private readonly repository: FeaturesRepository
  ) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  async main(@Query() query: Record<string, string>) { return await this.mainService.findFeaturesData(); }

  @Get('flags/:id/history')
  @Version(VERSION_NEUTRAL)
  async history(@Param('id') id: string) { 
    const feature = await this.findService.findFeaturesById(id);
    return feature.history || [];
  }

  @Post('flags')
  @Version(VERSION_NEUTRAL)
  @HttpCode(HttpStatus.CREATED)
  @RequireIdempotencyKey()
  async createFlag(@Body() body: FeaturesCreateDto) { return this.createService.createFeatures(body); }

  @Patch('flags/:id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async updateFlag(@Param('id') id: string, @Body() body: FeaturesUpdateDto) { return this.updateService.updateFeatures(id, body); }

  @Post('flags/:id/toggle')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async toggleFlag(@Param('id') id: string) { 
    const current = await this.repository.findByIdOrThrow(id);
    const next = !current.isGlobalEnabled;
    const history = Array.isArray(current.history) ? current.history : [];
    await this.repository.updateFeaturesById(id, {
      isGlobalEnabled: next,
      history: [...history, { id: randomUUID(), action: next ? 'ENABLED' : 'DISABLED', user: 'SUPERADMIN', timestamp: new Date().toISOString() }],
    });
    return this.repository.findByIdOrThrow(id);
  }

  @Delete('flags/:id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
  async removeFlag(@Param('id') id: string) { await this.deleteService.deleteFeatures(id); }

  @Post('notes')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async createNote(@Body() body: any) { return this.notesService.create(body); }

  @Patch('notes/:id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async updateNote(@Param('id') id: string, @Body() body: any) { return this.notesService.update(id, body); }

  @Delete('notes/:id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
  async removeNote(@Param('id') id: string) { await this.notesService.remove(id); }
}

@ApiTags('Features-Insights-Compatibility')
@Controller({ path: 'api/superadmin/features', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesInsightsCompatibilityController {
  constructor(private readonly rolloutInsightsService: FeaturesRolloutInsightsService) {}

  @Get('rollout-insights')
  @Version(VERSION_NEUTRAL)
  async rolloutInsights(@Query() query: Record<string, string>) { return await this.rolloutInsightsService.findFeaturesRolloutInsights(); }
}
