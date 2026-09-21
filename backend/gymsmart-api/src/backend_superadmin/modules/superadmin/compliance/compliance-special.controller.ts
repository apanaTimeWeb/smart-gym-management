// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the compliance feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ComplianceResponseDataDto } from '@/backend_superadmin/modules/superadmin/compliance/compliance-response-data.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ComplianceMainService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-main.service';

@ApiTags('compliance-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ComplianceSpecialController {
  constructor(private readonly mainService: ComplianceMainService) {}

  /** Executes GET /superadmin/compliance. */
  @ApiOperation({ summary: 'GET /superadmin/compliance' })
  @Get('superadmin/compliance')
  @ApiResponse({ type: ComplianceResponseDataDto })
  async main(@Query() query: Record<string, string>): Promise<ComplianceResponseDataDto> { return await this.mainService.findComplianceData(); }

}
