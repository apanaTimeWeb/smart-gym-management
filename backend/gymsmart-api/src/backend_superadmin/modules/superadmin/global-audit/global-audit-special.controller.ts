// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the global-audit feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import type { GlobalAuditInvestigationResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-investigation-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { GlobalAuditInvestigationService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-investigation.service';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('global-audit-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditSpecialController {
  constructor(private readonly investigationService: GlobalAuditInvestigationService) {}

  /** Executes GET /superadmin/global-audit/investigation. */
  @ApiOperation({ summary: 'GET /superadmin/global-audit/investigation' })
  @Get('superadmin/global-audit/investigation')
  @Get('superadmin/audit-logs/investigation')
  @ApiResponse({ type: GlobalAuditInvestigationResponseDto })
  async investigation(@Query() query: Record<string, string>): Promise<GlobalAuditInvestigationResponseDto> { return (await this.investigationService.findGlobalAuditInvestigation()) as unknown as GlobalAuditInvestigationResponseDto; }

}
