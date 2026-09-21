// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the global-audit feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { GlobalAuditInvestigationResponseDto } from '@/modules/superadmin/global-audit/global-audit-investigation-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { GlobalAuditInvestigationService } from '@/modules/superadmin/global-audit/services/global-audit-investigation.service';

@ApiTags('global-audit-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditSpecialController {
  constructor(private readonly investigationService: GlobalAuditInvestigationService) {}

  /** Executes GET /superadmin/global-audit/investigation. */
  @ApiOperation({ summary: 'GET /superadmin/global-audit/investigation' })
  @Get('superadmin/global-audit/investigation')
  async investigation(@Query() query: Record<string, string>): Promise<unknown> { return await this.investigationService.findGlobalAuditInvestigation(); }

}
