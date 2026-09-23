// RESPONSIBILITY: Owns HTTP transport for the jobs-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminJobsQueryDto } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/dtos/superadmin-system-ops-jobs-query.dto';
import { SuperadminJobsListService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-list.service';
import { SuperadminJobsFindService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-find.service';

@ApiTags('jobs')
@Controller('/superadmin/system-ops/jobs')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminJobsQueryController {
  constructor(private readonly listService: SuperadminJobsListService, private readonly findService: SuperadminJobsFindService) {}
  /** Returns a paginated jobs list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminJobsQueryDto): Promise<unknown> { return await this.listService.findJobsPage(query); }
  /** Returns one jobs record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findJobsById(id); }
}