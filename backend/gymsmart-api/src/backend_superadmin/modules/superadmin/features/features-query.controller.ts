// RESPONSIBILITY: Owns HTTP transport for the features-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { FeaturesQueryDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-query.dto';
import { FeaturesListService } from '@/backend_superadmin/modules/superadmin/features/services/features-list.service';
import { FeaturesFindService } from '@/backend_superadmin/modules/superadmin/features/services/features-find.service';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/superadmin/features/responses/features-response.dto';
import { FeaturesHistoryEntryDto } from '@/backend_superadmin/modules/superadmin/features/features-history-entry.dto';

@ApiTags('features')
@Controller('/superadmin/features')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesQueryController {
  constructor(private readonly listService: FeaturesListService, private readonly findService: FeaturesFindService, private readonly repository: FeaturesRepository) {}
  /** Returns the audit history for one feature flag. */
  // SLA: FAST
  @Get('flags/:id/history')
  @ApiResponse({ type: [FeaturesHistoryEntryDto] })
  async history(@Param('id') id: string): Promise<FeaturesHistoryEntryDto[]> { const flag = await this.repository.findByIdOrThrow(id); return (Array.isArray(flag.history) ? flag.history : []) as unknown as FeaturesHistoryEntryDto[]; }

  /** Returns one features record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: FeaturesResponseDto })
  async findOne(@Param('id') id: string): Promise<FeaturesResponseDto> { return await this.findService.findFeaturesById(id); }
}