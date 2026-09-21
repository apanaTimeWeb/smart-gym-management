// RESPONSIBILITY: Owns GET endpoints for the plans feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { PlansQueryDto } from '@/modules/superadmin/saas-billing/plans/dtos/plans-query.dto';
import { PlansListService } from '@/modules/superadmin/saas-billing/plans/services/plans-list.service';
import { PlansFindService } from '@/modules/superadmin/saas-billing/plans/services/plans-find.service';
import { PlansBusinessControlsService } from '@/modules/superadmin/saas-billing/plans/services/plans-business-controls.service';

@ApiTags('plans')
@Controller('/superadmin/saas-billing/plans')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class PlansQueryController {
  constructor(private readonly listService: PlansListService, private readonly findService: PlansFindService, private readonly businessControlsService: PlansBusinessControlsService) {}
  /** Returns a paginated plans list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: PlansQueryDto): Promise<unknown> { return await this.listService.findPlansPage(query); }
  /** Returns plan business-control insights. */
  @Get('business-controls')
  async businessControls(@Query() query: Record<string, string>): Promise<unknown> { return this.businessControlsService.findPlansBusinessControls({ query }); }

  /** Returns one plans record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findPlansById(id); }
}
