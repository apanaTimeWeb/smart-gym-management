// RESPONSIBILITY: Owns HTTP transport for the plans-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { PlansQueryDto } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/dtos/plans-query.dto';
import { PlansListService } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/services/plans-list.service';
import { PlansFindService } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/services/plans-find.service';
import { PlansBusinessControlsService } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/services/plans-business-controls.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('plans')
@Controller('/superadmin/saas-billing/plans')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class PlansQueryController {
  constructor(private readonly listService: PlansListService, private readonly findService: PlansFindService, private readonly businessControlsService: PlansBusinessControlsService) {}
  /** Returns a paginated plans list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: PlansQueryDto): Promise<unknown> { return await this.listService.findPlansPage(query); }
  /** Returns plan business-control insights. */
  // SLA: FAST
  @Get('business-controls')
  @Get('api/superadmin/saas-billing/plans/business-controls')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async businessControls(@Query() query: SuperadminQueryDto): Promise<unknown> { return this.businessControlsService.findPlansBusinessControls({ query }); }

  /** Returns one plans record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findPlansById(id); }
}