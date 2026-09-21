// RESPONSIBILITY: Owns GET endpoints for the jobs feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { JobsQueryDto } from '@/modules/superadmin/system-ops/jobs/dtos/jobs-query.dto';
import { JobsListService } from '@/modules/superadmin/system-ops/jobs/services/jobs-list.service';
import { JobsFindService } from '@/modules/superadmin/system-ops/jobs/services/jobs-find.service';

@ApiTags('jobs')
@Controller('/superadmin/system-ops/jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class JobsQueryController {
  constructor(private readonly listService: JobsListService, private readonly findService: JobsFindService) {}
  /** Returns a paginated jobs list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: JobsQueryDto): Promise<unknown> { return await this.listService.findJobsPage(query); }
  /** Returns one jobs record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findJobsById(id); }
}
