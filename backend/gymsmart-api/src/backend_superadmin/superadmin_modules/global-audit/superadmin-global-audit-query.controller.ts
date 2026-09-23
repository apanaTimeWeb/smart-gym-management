// RESPONSIBILITY: Owns HTTP transport for the global-audit-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminGlobalAuditQueryDto } from '@/backend_superadmin/superadmin_modules/global-audit/dtos/superadmin-global-audit-query.dto';
import { SuperadminGlobalAuditListService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-list.service';
import { SuperadminGlobalAuditFindService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-find.service';
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/responses/superadmin-global-audit-response.dto';

@ApiTags('global-audit')
@Controller('/superadmin/global-audit')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGlobalAuditQueryController {
  constructor(private readonly listService: SuperadminGlobalAuditListService, private readonly findService: SuperadminGlobalAuditFindService) {}
  /** Returns a paginated global-audit list. */
  // SLA: FAST
  @Get()
  async findAll(@Query() query: SuperadminGlobalAuditQueryDto): Promise<{ data: SuperadminGlobalAuditResponseDto[]; meta: unknown }> { return (await this.listService.findGlobalAuditPage(query)) as never; }
  /** Returns one global-audit record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminGlobalAuditResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminGlobalAuditResponseDto> { return (await this.findService.findGlobalAuditById(id)) as unknown as SuperadminGlobalAuditResponseDto; }
}