// RESPONSIBILITY: Owns HTTP transport for the features-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminFeaturesQueryDto } from '@/backend_superadmin/superadmin_modules/features/dtos/superadmin-features-query.dto';
import { SuperadminFeaturesListService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-list.service';
import { SuperadminFeaturesFindService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-find.service';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/responses/superadmin-features-response.dto';
import { SuperadminFeaturesHistoryEntryDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-history-entry.dto';

@ApiTags('features')
@Controller('/superadmin/features')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminFeaturesQueryController {
  constructor(private readonly listService: SuperadminFeaturesListService, private readonly findService: SuperadminFeaturesFindService, private readonly repository: SuperadminFeaturesRepository) {}
  /** Returns the audit history for one feature flag. */
  // SLA: FAST
  @Get('flags/:id/history')
  @ApiResponse({ type: [SuperadminFeaturesHistoryEntryDto] })
  async history(@Param('id') id: string): Promise<SuperadminFeaturesHistoryEntryDto[]> { const flag = await this.repository.findByIdOrThrow(id); return (Array.isArray(flag.history) ? flag.history : []) as unknown as SuperadminFeaturesHistoryEntryDto[]; }

  /** Returns one features record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminFeaturesResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminFeaturesResponseDto> { return await this.findService.findFeaturesById(id); }
}