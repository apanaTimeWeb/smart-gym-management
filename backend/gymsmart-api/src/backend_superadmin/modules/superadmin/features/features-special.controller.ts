// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the features feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { FeaturesRolloutInsightsResponseDto } from '@/backend_superadmin/modules/superadmin/features/features-rollout-insights-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { FeaturesRolloutInsightsService } from '@/backend_superadmin/modules/superadmin/features/services/features-rollout-insights.service';
import { FeaturesMainService } from '@/backend_superadmin/modules/superadmin/features/services/features-main.service';
import { FeaturesReleaseNoteService } from '@/backend_superadmin/modules/superadmin/features/services/features-release-note.service';
import { FeaturesReleaseNoteCreateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-release-note-create.dto';
import { FeaturesReleaseNoteUpdateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-release-note-update.dto';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { FeaturesResponseDataDto, ReleaseNoteDto } from '@/backend_superadmin/modules/superadmin/features/features-response-data.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('features-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesSpecialController {
  constructor(private readonly rolloutInsightsService: FeaturesRolloutInsightsService, private readonly mainService: FeaturesMainService, private readonly releaseNoteService: FeaturesReleaseNoteService) {}

  /** Executes GET /superadmin/features/rollout-insights. */
  @ApiOperation({ summary: 'GET /superadmin/features/rollout-insights' })
  @Get('superadmin/features/rollout-insights')
  @ApiResponse({ type: FeaturesRolloutInsightsResponseDto })
  async findFeaturesRolloutInsights(): Promise<FeaturesRolloutInsightsResponseDto> { return await this.rolloutInsightsService.findFeaturesRolloutInsights(); }

  /** Creates a release note. */
  @RequireIdempotencyKey()
  @Post('superadmin/features/notes')
  @ApiResponse({ type: ReleaseNoteDto })
  async createReleaseNote(@Body() body: FeaturesReleaseNoteCreateDto): Promise<ReleaseNoteDto> { return this.releaseNoteService.create(body) as unknown as ReleaseNoteDto; }

  /** Updates a release note. */
  @RequireIdempotencyKey()
  @Patch('superadmin/features/notes/:id')
  @ApiResponse({ type: ReleaseNoteDto })
  async updateReleaseNote(@Param('id') id: string, @Body() body: FeaturesReleaseNoteUpdateDto): Promise<ReleaseNoteDto> { return this.releaseNoteService.update(id, body) as unknown as ReleaseNoteDto; }

  /** Deletes a release note using soft-delete. */
  @RequireIdempotencyKey()
  @Delete('superadmin/features/notes/:id')
  async deleteReleaseNote(@Param('id') id: string): Promise<null> { return this.releaseNoteService.remove(id); }

  /** Executes GET /superadmin/features. */
  @ApiOperation({ summary: 'GET /superadmin/features' })
  @Get('superadmin/features')
  @ApiResponse({ type: FeaturesResponseDataDto })
  async findFeaturesData(): Promise<FeaturesResponseDataDto> { return await this.mainService.findFeaturesData() as unknown as FeaturesResponseDataDto; }
}
