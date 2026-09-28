// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerPtFetchAssignmentsResponseDto } from '@/backend_manager/manager_modules/pt/pt_responses/manager-pt-fetch-assignments.response.dto';
import { ManagerPtFetchPackagesResponseDto } from '@/backend_manager/manager_modules/pt/pt_responses/manager-pt-fetch-packages.response.dto';
import { ManagerPtFetchPtDashboardKpisResponseDto } from '@/backend_manager/manager_modules/pt/pt_responses/manager-pt-fetch-pt-dashboard-kpis.response.dto';
import { ManagerPtFetchWorkloadResponseDto } from '@/backend_manager/manager_modules/pt/pt_responses/manager-pt-fetch-workload.response.dto';
import { ManagerPtQueryDto } from '@/backend_manager/manager_modules/pt/pt_dtos/manager-pt-query.dto';
import { ManagerPtFindAssignmentsService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-find-assignments.service';
import { ManagerPtFindPackagesService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-find-packages.service';
import { ManagerPtFindPtDashboardKpisService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-find-pt-dashboard-kpis.service';
import { ManagerPtFindWorkloadService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-find-workload.service';

@Controller('manager')
@ApiTags('Manager pt')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerPtQueryController {
  constructor(private readonly fetchPtDashboardKpisService: ManagerPtFindPtDashboardKpisService, private readonly fetchWorkloadService: ManagerPtFindWorkloadService, private readonly fetchPackagesService: ManagerPtFindPackagesService, private readonly fetchAssignmentsService: ManagerPtFindAssignmentsService) {}

  // SLA: STANDARD
  @Get("pt/assignments")
  @ApiOperation({ summary: 'findAssignments for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerPtFetchAssignmentsResponseDto })
  findAssignments(@Query() query: ManagerPtQueryDto): ReturnType<ManagerPtFindAssignmentsService['findAssignments']> { return this.fetchAssignmentsService.findAssignments(query); }


  // SLA: FAST
  @Get("pt/kpis")
  @ApiOperation({ summary: 'findPtDashboardKpis for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerPtFetchPtDashboardKpisResponseDto })
  findPtDashboardKpis(@Query() query: ManagerPtQueryDto): ReturnType<ManagerPtFindPtDashboardKpisService['findPtDashboardKpis']> { return this.fetchPtDashboardKpisService.findPtDashboardKpis(query); }


  // SLA: STANDARD
  @Get("pt/packages")
  @ApiOperation({ summary: 'findPackages for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerPtFetchPackagesResponseDto] })
  findPackages(@Query() query: ManagerPtQueryDto): ReturnType<ManagerPtFindPackagesService['findPackages']> { return this.fetchPackagesService.findPackages(query); }


  // SLA: STANDARD
  @Get("pt/workload")
  @ApiOperation({ summary: 'findWorkload for Manager pt' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerPtFetchWorkloadResponseDto] })
  findWorkload(@Query() query: ManagerPtQueryDto): ReturnType<ManagerPtFindWorkloadService['findWorkload']> { return this.fetchWorkloadService.findWorkload(query); }


}

export { ManagerPtQueryController as PtQueryController };
