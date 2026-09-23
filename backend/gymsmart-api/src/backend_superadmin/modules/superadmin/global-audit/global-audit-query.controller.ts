// RESPONSIBILITY: Owns HTTP transport for the global-audit-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { GlobalAuditQueryDto } from '@/backend_superadmin/modules/superadmin/global-audit/dtos/global-audit-query.dto';
import { GlobalAuditListService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-list.service';
import { GlobalAuditFindService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-find.service';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/responses/global-audit-response.dto';

@ApiTags('global-audit')
@Controller('/superadmin/global-audit')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditQueryController {
  constructor(private readonly listService: GlobalAuditListService, private readonly findService: GlobalAuditFindService) {}
  /** Returns a paginated global-audit list. */
  // SLA: FAST
  @Get()
  async findAll(@Query() query: GlobalAuditQueryDto): Promise<{ data: GlobalAuditResponseDto[]; meta: unknown }> { return (await this.listService.findGlobalAuditPage(query)) as never; }
  /** Returns one global-audit record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: GlobalAuditResponseDto })
  async findOne(@Param('id') id: string): Promise<GlobalAuditResponseDto> { return (await this.findService.findGlobalAuditById(id)) as unknown as GlobalAuditResponseDto; }
}