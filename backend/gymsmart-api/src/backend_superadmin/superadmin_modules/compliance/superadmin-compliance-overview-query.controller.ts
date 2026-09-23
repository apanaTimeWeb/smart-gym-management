// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminComplianceResponseDataDto } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-response-data.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminComplianceMainService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-main.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('complianceoverviewquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminComplianceOverviewQueryController {
  constructor(private readonly mainService: SuperadminComplianceMainService) {}


  /** Executes GET /superadmin/compliance. */
  @ApiOperation({ summary: 'GET /superadmin/compliance' })
  // SLA: FAST
  @Get('superadmin/compliance')
  @ApiResponse({ type: SuperadminComplianceResponseDataDto })
  async main(@Query() query: SuperadminQueryDto): Promise<SuperadminComplianceResponseDataDto> { return await this.mainService.findComplianceData({ query }); }

}