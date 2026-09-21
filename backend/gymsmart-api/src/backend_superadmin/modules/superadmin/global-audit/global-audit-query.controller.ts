// RESPONSIBILITY: Owns GET endpoints for the global-audit feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { GlobalAuditQueryDto } from '@/backend_superadmin/modules/superadmin/global-audit/dtos/global-audit-query.dto';
import { GlobalAuditListService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-list.service';
import { GlobalAuditFindService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-find.service';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/responses/global-audit-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('global-audit')
@Controller('/superadmin/global-audit')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditQueryController {
  constructor(private readonly listService: GlobalAuditListService, private readonly findService: GlobalAuditFindService) {}
  /** Returns a paginated global-audit list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: GlobalAuditQueryDto): Promise<{ data: GlobalAuditResponseDto[]; meta: any }> { return (await this.listService.findGlobalAuditPage(query)) as any; }
  /** Returns one global-audit record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: GlobalAuditResponseDto })
  async findOne(@Param('id') id: string): Promise<GlobalAuditResponseDto> { return (await this.findService.findGlobalAuditById(id)) as unknown as GlobalAuditResponseDto; }
}
