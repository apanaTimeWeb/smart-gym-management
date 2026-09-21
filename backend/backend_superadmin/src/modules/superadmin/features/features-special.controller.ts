// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the features feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { FeaturesRolloutInsightsResponseDto } from '@/modules/superadmin/features/features-rollout-insights-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { FeaturesRolloutInsightsService } from '@/modules/superadmin/features/services/features-rollout-insights.service';
import { FeaturesMainService } from '@/modules/superadmin/features/services/features-main.service';
import { FeaturesReleaseNoteService } from '@/modules/superadmin/features/services/features-release-note.service';
import { FeaturesReleaseNoteCreateDto } from '@/modules/superadmin/features/dtos/features-release-note-create.dto';
import { FeaturesReleaseNoteUpdateDto } from '@/modules/superadmin/features/dtos/features-release-note-update.dto';
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';

@ApiTags('features-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesSpecialController {
  constructor(private readonly rolloutInsightsService: FeaturesRolloutInsightsService, private readonly mainService: FeaturesMainService, private readonly releaseNoteService: FeaturesReleaseNoteService) {}

  /** Executes GET /superadmin/features/rollout-insights. */
  @ApiOperation({ summary: 'GET /superadmin/features/rollout-insights' })
  @Get('superadmin/features/rollout-insights')
  async findFeaturesRolloutInsights(): Promise<FeaturesRolloutInsightsResponseDto> { return await this.rolloutInsightsService.findFeaturesRolloutInsights(); }

  /** Creates a release note. */
  @RequireIdempotencyKey()
  @Post('superadmin/features/notes')
  async createReleaseNote(@Body() body: FeaturesReleaseNoteCreateDto): Promise<unknown> { return this.releaseNoteService.create(body); }

  /** Updates a release note. */
  @RequireIdempotencyKey()
  @Patch('superadmin/features/notes/:id')
  async updateReleaseNote(@Param('id') id: string, @Body() body: FeaturesReleaseNoteUpdateDto): Promise<unknown> { return this.releaseNoteService.update(id, body); }

  /** Deletes a release note using soft-delete. */
  @RequireIdempotencyKey()
  @Delete('superadmin/features/notes/:id')
  async deleteReleaseNote(@Param('id') id: string): Promise<null> { return this.releaseNoteService.remove(id); }

  /** Executes GET /superadmin/features. */
  @ApiOperation({ summary: 'GET /superadmin/features' })
  @Get('superadmin/features')
  async findFeaturesData(): Promise<unknown> { return await this.mainService.findFeaturesData(); }
}
