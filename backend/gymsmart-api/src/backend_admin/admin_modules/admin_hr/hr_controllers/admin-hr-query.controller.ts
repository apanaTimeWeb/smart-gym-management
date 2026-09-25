// RESPONSIBILITY: Exposes read-only Admin hr HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminHrQueryController -> AdminHrQueryService -> repository.
import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminHrQueryDto } from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-query.dto.js';
import { 
  AdminHrStaffListResponseDto, 
  AdminHrStaffDto, 
  AdminHrPayrollListResponseDto, 
  AdminHrSummaryDto, 
  AdminHrLedgerEntryDto, 
  AdminHrStaffPerformanceRecordDto 
} from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-response.dto.js';
import { AdminHrQueryService } from '@/backend_admin/admin_modules/admin_hr/hr_services/admin-hr-query.service.js';

@ApiTags('Admin / hr')
@Controller('admin/hr')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminHrQueryController boundary for the admin_hr backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminHrQueryController {
  constructor(private readonly service: AdminHrQueryService) {}

  // SLA: STANDARD
  @Get('staff')
  @ApiOperation({ summary: 'Execute fetchStaff' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrStaffListResponseDto })
  async findAllStaff(@Query() query: AdminHrQueryDto): Promise<AdminHrStaffListResponseDto> {
    return this.service.findAllStaff(query);
  }

  // SLA: STANDARD
  @Get('staff/:id')
  @ApiOperation({ summary: 'Execute fetchStaffById' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrStaffDto })
  async findStaffById(@Param('id') id: string): Promise<AdminHrStaffDto> {
    return this.service.findStaffById(id);
  }

  // SLA: STANDARD
  @Get('payrolls')
  @ApiOperation({ summary: 'Execute fetchPayrolls' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrPayrollListResponseDto })
  async findAllPayrolls(@Query() query: AdminHrQueryDto): Promise<AdminHrPayrollListResponseDto> {
    return this.service.findAllPayrolls(query);
  }

  // SLA: STANDARD
  @Get('summary')
  @ApiOperation({ summary: 'Execute fetchSummary' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminHrSummaryDto })
  async findHrSummary(@Query() query: AdminHrQueryDto): Promise<AdminHrSummaryDto> {
    return this.service.findHrSummary(query);
  }

  // SLA: STANDARD
  @Get('staff/:id/ledger')
  @ApiOperation({ summary: 'Execute fetchLedger' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminHrLedgerEntryDto] })
  async findLedger(@Query() query: AdminHrQueryDto): Promise<AdminHrLedgerEntryDto[]> {
    return this.service.findLedger(query);
  }

  // SLA: STANDARD
  @Get('performance')
  @ApiOperation({ summary: 'Execute fetchPerformance' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminHrStaffPerformanceRecordDto] })
  async findPerformance(@Query() query: AdminHrQueryDto): Promise<AdminHrStaffPerformanceRecordDto[]> {
    return this.service.findPerformance(query);
  }

}
