// RESPONSIBILITY: Owns GET endpoints for the features feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { FeaturesQueryDto } from '@/modules/superadmin/features/dtos/features-query.dto';
import { FeaturesListService } from '@/modules/superadmin/features/services/features-list.service';
import { FeaturesFindService } from '@/modules/superadmin/features/services/features-find.service';
import { FeaturesRepository } from '@/modules/superadmin/features/features.repository';

@ApiTags('features')
@Controller('/superadmin/features')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesQueryController {
  constructor(private readonly listService: FeaturesListService, private readonly findService: FeaturesFindService, private readonly repository: FeaturesRepository) {}
  /** Returns the audit history for one feature flag. */
  // SLA: FAST
  @Get('flags/:id/history')
  async history(@Param('id') id: string): Promise<unknown[]> { const flag = await this.repository.findByIdOrThrow(id); return Array.isArray(flag.history) ? flag.history : []; }

  /** Returns one features record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findFeaturesById(id); }
}
