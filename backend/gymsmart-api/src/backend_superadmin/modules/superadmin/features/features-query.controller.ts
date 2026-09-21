// RESPONSIBILITY: Owns GET endpoints for the features feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { FeaturesQueryDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-query.dto';
import { FeaturesListService } from '@/backend_superadmin/modules/superadmin/features/services/features-list.service';
import { FeaturesFindService } from '@/backend_superadmin/modules/superadmin/features/services/features-find.service';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/superadmin/features/responses/features-response.dto';
import { SuperadminFeatureHistoryEntryDto } from '@/backend_superadmin/modules/superadmin/features/features-response-data.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('features')
@Controller('/superadmin/features')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesQueryController {
  constructor(private readonly listService: FeaturesListService, private readonly findService: FeaturesFindService, private readonly repository: FeaturesRepository) {}
  /** Returns the audit history for one feature flag. */
  // SLA: FAST
  @Get('flags/:id/history')
  @ApiResponse({ type: [SuperadminFeatureHistoryEntryDto] })
  async history(@Param('id') id: string): Promise<SuperadminFeatureHistoryEntryDto[]> { const flag = await this.repository.findByIdOrThrow(id); return (Array.isArray(flag.history) ? flag.history : []) as unknown as SuperadminFeatureHistoryEntryDto[]; }

  /** Returns one features record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: FeaturesResponseDto })
  async findOne(@Param('id') id: string): Promise<FeaturesResponseDto> { return await this.findService.findFeaturesById(id); }
}
