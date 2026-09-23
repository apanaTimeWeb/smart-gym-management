// RESPONSIBILITY: Owns the audit-log query alias used by the Superadmin frontend; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminGlobalAuditListService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-list.service';
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/responses/superadmin-global-audit-response.dto';
import { SuperadminGlobalAuditQueryDto } from '@/backend_superadmin/superadmin_modules/global-audit/dtos/superadmin-global-audit-query.dto';

@ApiTags('audit-logs')
@Controller('/superadmin/audit-logs')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGlobalAuditAuditLogsQueryController {
  constructor(private readonly listService: SuperadminGlobalAuditListService) {}
  /** Returns the audit log collection through the frontend route alias. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async list(@Query() query: SuperadminGlobalAuditQueryDto): Promise<{ data: SuperadminGlobalAuditResponseDto[]; meta: unknown }> { return (this.listService.findGlobalAuditPage(query)) as never; }
}