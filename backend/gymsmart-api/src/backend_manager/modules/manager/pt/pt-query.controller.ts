// RESPONSIBILITY: Owns the Manager pt query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { PtFetchAssignmentsResponseDto } from '@/modules/manager/pt/dtos/pt-fetch-assignments.response.dto';
import { PtFetchAssignmentsService } from '@/modules/manager/pt/services/pt-fetch-assignments.service';
import { PtFetchPackagesResponseDto } from '@/modules/manager/pt/dtos/pt-fetch-packages.response.dto';
import { PtFetchPackagesService } from '@/modules/manager/pt/services/pt-fetch-packages.service';
import { PtFetchPtDashboardKpisResponseDto } from '@/modules/manager/pt/dtos/pt-fetch-pt-dashboard-kpis.response.dto';
import { PtFetchPtDashboardKpisService } from '@/modules/manager/pt/services/pt-fetch-pt-dashboard-kpis.service';
import { PtFetchWorkloadResponseDto } from '@/modules/manager/pt/dtos/pt-fetch-workload.response.dto';
import { PtFetchWorkloadService } from '@/modules/manager/pt/services/pt-fetch-workload.service';
import { PtQueryDto } from '@/modules/manager/pt/dtos/pt-query.dto';

@Controller('manager')
@ApiTags('Manager pt')
@Roles(CoreRole.MANAGER)
export class PtQueryController {
  constructor(private readonly fetchPtDashboardKpisService: PtFetchPtDashboardKpisService, private readonly fetchWorkloadService: PtFetchWorkloadService, private readonly fetchPackagesService: PtFetchPackagesService, private readonly fetchAssignmentsService: PtFetchAssignmentsService) {}

  // SLA: STANDARD
  @Get("pt/assignments")
  @ApiOperation({ summary: 'fetchAssignments for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: PtFetchAssignmentsResponseDto })
  fetchAssignments(@Query() query: PtQueryDto): Promise<PtFetchAssignmentsResponseDto> {  return this.fetchAssignmentsService.fetchAssignments(query) as Promise<PtFetchAssignmentsResponseDto>;  }


  // SLA: FAST
  @Get("pt/kpis")
  @ApiOperation({ summary: 'fetchPtDashboardKpis for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: PtFetchPtDashboardKpisResponseDto })
  fetchPtDashboardKpis(@Query() query: PtQueryDto): Promise<PtFetchPtDashboardKpisResponseDto> {  return this.fetchPtDashboardKpisService.fetchPtDashboardKpis(query) as Promise<PtFetchPtDashboardKpisResponseDto>;  }


  // SLA: STANDARD
  @Get("pt/packages")
  @ApiOperation({ summary: 'fetchPackages for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: [PtFetchPackagesResponseDto] })
  fetchPackages(@Query() query: PtQueryDto): Promise<PtFetchPackagesResponseDto[]> {  return this.fetchPackagesService.fetchPackages(query) as Promise<PtFetchPackagesResponseDto[]>;  }


  // SLA: STANDARD
  @Get("pt/workload")
  @ApiOperation({ summary: 'fetchWorkload for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: [PtFetchWorkloadResponseDto] })
  fetchWorkload(@Query() query: PtQueryDto): Promise<PtFetchWorkloadResponseDto[]> {  return this.fetchWorkloadService.fetchWorkload(query) as Promise<PtFetchWorkloadResponseDto[]>;  }


}
