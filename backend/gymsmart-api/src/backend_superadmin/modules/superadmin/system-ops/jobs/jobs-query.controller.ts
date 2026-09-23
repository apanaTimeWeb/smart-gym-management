// RESPONSIBILITY: Owns HTTP transport for the jobs-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { JobsQueryDto } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/dtos/jobs-query.dto';
import { JobsListService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-list.service';
import { JobsFindService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-find.service';

@ApiTags('jobs')
@Controller('/superadmin/system-ops/jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class JobsQueryController {
  constructor(private readonly listService: JobsListService, private readonly findService: JobsFindService) {}
  /** Returns a paginated jobs list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: JobsQueryDto): Promise<unknown> { return await this.listService.findJobsPage(query); }
  /** Returns one jobs record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findJobsById(id); }
}