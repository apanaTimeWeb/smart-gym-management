// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Global Audit.
// FLOW: /superadmin/audit-logs -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/global-audit.

import { Controller, Get, Param, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

import { GlobalAuditQueryDto } from '@/backend_superadmin/modules/superadmin/global-audit/dtos/global-audit-query.dto';
import { GlobalAuditListService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-list.service';
import { GlobalAuditFindService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-find.service';
import { GlobalAuditInvestigationService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-investigation.service';

@ApiTags('Global-Audit-Compatibility')
@Controller({ version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditCompatibilityController {
  constructor(
    private readonly listService: GlobalAuditListService,
    private readonly findService: GlobalAuditFindService,
    private readonly investigationService: GlobalAuditInvestigationService
  ) {}

  @Get('superadmin/audit-logs')
  @Version(VERSION_NEUTRAL)
  async findAll(@Query() query: GlobalAuditQueryDto) { return await this.listService.findGlobalAuditPage(query); }

  @Get('api/superadmin/global-audit/investigation')
  @Version(VERSION_NEUTRAL)
  async investigation(@Query() query: Record<string, string>) { return await this.investigationService.findGlobalAuditInvestigation(); }

  @Get('superadmin/audit-logs/:id')
  @Version(VERSION_NEUTRAL)
  async findOne(@Param('id') id: string) { return await this.findService.findGlobalAuditById(id); }
}
