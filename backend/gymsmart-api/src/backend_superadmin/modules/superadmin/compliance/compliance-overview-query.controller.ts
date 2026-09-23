// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ComplianceResponseDataDto } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance-response-data.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ComplianceMainService } from '@/backend_superadmin/modules/backend_superadmin/compliance/services/compliance-main.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('complianceoverviewquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ComplianceOverviewQueryController {
  constructor(private readonly mainService: ComplianceMainService) {}


  /** Executes GET /superadmin/compliance. */
  @ApiOperation({ summary: 'GET /superadmin/compliance' })
  // SLA: FAST
  @Get('superadmin/compliance')
  @ApiResponse({ type: ComplianceResponseDataDto })
  async main(@Query() query: SuperadminQueryDto): Promise<ComplianceResponseDataDto> { return await this.mainService.findComplianceData({ query }); }

}