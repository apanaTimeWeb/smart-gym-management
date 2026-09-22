// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for SaaS Billing Plans.
// FLOW: /superadmin/saas-billing/plans -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/saas-billing/plans.

import { Controller, Get, Param, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

import { PlansQueryDto } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/dtos/plans-query.dto';
import { PlansListService } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/services/plans-list.service';
import { PlansFindService } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/services/plans-find.service';
import { PlansBusinessControlsService } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/services/plans-business-controls.service';

@ApiTags('Plans-Compatibility')
@Controller({ path: 'superadmin/saas-billing/plans', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class PlansCompatibilityController {
  constructor(
    private readonly listService: PlansListService,
    private readonly findService: PlansFindService,
    private readonly businessControlsService: PlansBusinessControlsService
  ) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  async findAll(@Query() query: PlansQueryDto) { return await this.listService.findPlansPage(query); }

  @Get('business-controls')
  @Version(VERSION_NEUTRAL)
  async businessControls(@Query() query: Record<string, string>) { return this.businessControlsService.findPlansBusinessControls({ query }); }

  @Get(':id')
  @Version(VERSION_NEUTRAL)
  async findOne(@Param('id') id: string) { return await this.findService.findPlansById(id); }
}
