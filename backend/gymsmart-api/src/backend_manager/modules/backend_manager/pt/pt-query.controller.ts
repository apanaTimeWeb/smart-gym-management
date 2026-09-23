// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { PtFetchAssignmentsResponseDto } from '@/backend_manager/modules/backend_manager/pt/dtos/pt-fetch-assignments.response.dto';
import { PtFetchPackagesResponseDto } from '@/backend_manager/modules/backend_manager/pt/dtos/pt-fetch-packages.response.dto';
import { PtFetchPtDashboardKpisResponseDto } from '@/backend_manager/modules/backend_manager/pt/dtos/pt-fetch-pt-dashboard-kpis.response.dto';
import { PtFetchWorkloadResponseDto } from '@/backend_manager/modules/backend_manager/pt/dtos/pt-fetch-workload.response.dto';
import { PtQueryDto } from '@/backend_manager/modules/backend_manager/pt/dtos/pt-query.dto';
import { PtFetchAssignmentsService } from '@/backend_manager/modules/backend_manager/pt/services/pt-fetch-assignments.service';
import { PtFetchPackagesService } from '@/backend_manager/modules/backend_manager/pt/services/pt-fetch-packages.service';
import { PtFetchPtDashboardKpisService } from '@/backend_manager/modules/backend_manager/pt/services/pt-fetch-pt-dashboard-kpis.service';
import { PtFetchWorkloadService } from '@/backend_manager/modules/backend_manager/pt/services/pt-fetch-workload.service';

@Controller('manager')
@ApiTags('Manager pt')
@Roles(CoreRole.MANAGER)
export class PtQueryController {
  constructor(private readonly fetchPtDashboardKpisService: PtFetchPtDashboardKpisService, private readonly fetchWorkloadService: PtFetchWorkloadService, private readonly fetchPackagesService: PtFetchPackagesService, private readonly fetchAssignmentsService: PtFetchAssignmentsService) {}

  // SLA: STANDARD
  @Get("pt/assignments")
  @ApiOperation({ summary: 'fetchAssignments for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: PtFetchAssignmentsResponseDto })
  fetchAssignments(@Query() query: PtQueryDto): ReturnType<PtFetchAssignmentsService['fetchAssignments']> { return this.fetchAssignmentsService.fetchAssignments(query as any); }


  // SLA: FAST
  @Get("pt/kpis")
  @ApiOperation({ summary: 'fetchPtDashboardKpis for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: PtFetchPtDashboardKpisResponseDto })
  fetchPtDashboardKpis(@Query() query: PtQueryDto): ReturnType<PtFetchPtDashboardKpisService['fetchPtDashboardKpis']> { return this.fetchPtDashboardKpisService.fetchPtDashboardKpis(query as any); }


  // SLA: STANDARD
  @Get("pt/packages")
  @ApiOperation({ summary: 'fetchPackages for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: [PtFetchPackagesResponseDto] })
  fetchPackages(@Query() query: PtQueryDto): ReturnType<PtFetchPackagesService['fetchPackages']> { return this.fetchPackagesService.fetchPackages(query as any); }


  // SLA: STANDARD
  @Get("pt/workload")
  @ApiOperation({ summary: 'fetchWorkload for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: [PtFetchWorkloadResponseDto] })
  fetchWorkload(@Query() query: PtQueryDto): ReturnType<PtFetchWorkloadService['fetchWorkload']> { return this.fetchWorkloadService.fetchWorkload(query as any); }


}
