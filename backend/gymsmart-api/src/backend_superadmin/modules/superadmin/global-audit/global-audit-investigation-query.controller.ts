// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { GlobalAuditInvestigationResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-investigation-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GlobalAuditInvestigationService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-investigation.service';
import { SuperadminQueryDto } from '@/backend_superadmin/core/pagination/superadmin-query.dto';

@ApiTags('globalauditinvestigationquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditInvestigationQueryController {
  constructor(private readonly investigationService: GlobalAuditInvestigationService) {}


  /** Executes GET /superadmin/global-audit/investigation. */
  @ApiOperation({ summary: 'GET /superadmin/global-audit/investigation' })
  // SLA: FAST
  @Get('superadmin/global-audit/investigation')
  @Get('api/superadmin/global-audit/investigation')
  // SLA: FAST
  @Get('superadmin/audit-logs/investigation')
  @ApiResponse({ type: GlobalAuditInvestigationResponseDto })
  async investigation(@Query() query: SuperadminQueryDto): Promise<GlobalAuditInvestigationResponseDto> { return (await this.investigationService.findGlobalAuditInvestigation({ query })) as unknown as GlobalAuditInvestigationResponseDto; }

}