// RESPONSIBILITY: Owns HTTP transport for the plans-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminPlansQueryDto } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/dtos/superadmin-saas-billing-plans-query.dto';
import { SuperadminPlansListService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-list.service';
import { SuperadminPlansFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-find.service';
import { SuperadminPlansBusinessControlsService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-business-controls.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('plans')
@Controller('/superadmin/saas-billing/plans')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminPlansQueryController {
  constructor(private readonly listService: SuperadminPlansListService, private readonly findService: SuperadminPlansFindService, private readonly businessControlsService: SuperadminPlansBusinessControlsService) {}
  /** Returns a paginated plans list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminPlansQueryDto): Promise<unknown> { return await this.listService.findPlansPage(query); }
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