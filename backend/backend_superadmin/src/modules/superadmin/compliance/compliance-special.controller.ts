// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the compliance feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { ComplianceResponseDataDto } from '@/modules/superadmin/compliance/compliance-response-data.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { ComplianceMainService } from '@/modules/superadmin/compliance/services/compliance-main.service';

@ApiTags('compliance-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ComplianceSpecialController {
  constructor(private readonly mainService: ComplianceMainService) {}

  /** Executes GET /superadmin/compliance. */
  @ApiOperation({ summary: 'GET /superadmin/compliance' })
  @Get('superadmin/compliance')
  async main(@Query() query: Record<string, string>): Promise<unknown> { return await this.mainService.findComplianceData(); }

}
