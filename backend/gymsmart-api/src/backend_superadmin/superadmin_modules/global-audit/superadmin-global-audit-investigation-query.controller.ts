// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminGlobalAuditInvestigationResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit-investigation-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminGlobalAuditInvestigationService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-investigation.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-query.dto';

@ApiTags('globalauditinvestigationquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGlobalAuditInvestigationQueryController {
  constructor(private readonly investigationService: SuperadminGlobalAuditInvestigationService) {}


  /** Executes GET /superadmin/global-audit/investigation. */
  @ApiOperation({ summary: 'GET /superadmin/global-audit/investigation' })
  // SLA: FAST
  @Get('superadmin/global-audit/investigation')
  @Get('api/superadmin/global-audit/investigation')
  // SLA: FAST
  @Get('superadmin/audit-logs/investigation')
  @ApiResponse({ type: SuperadminGlobalAuditInvestigationResponseDto })
  async investigation(@Query() query: SuperadminQueryDto): Promise<SuperadminGlobalAuditInvestigationResponseDto> { return (await this.investigationService.findGlobalAuditInvestigation({ query })) as unknown as SuperadminGlobalAuditInvestigationResponseDto; }

}