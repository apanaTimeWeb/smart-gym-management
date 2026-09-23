// RESPONSIBILITY: Owns the audit-log query alias used by the Superadmin frontend; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { GlobalAuditListService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-list.service';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/responses/global-audit-response.dto';
import { GlobalAuditQueryDto } from '@/backend_superadmin/modules/superadmin/global-audit/dtos/global-audit-query.dto';

@ApiTags('audit-logs')
@Controller('/superadmin/audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditAuditLogsQueryController {
  constructor(private readonly listService: GlobalAuditListService) {}
  /** Returns the audit log collection through the frontend route alias. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async list(@Query() query: GlobalAuditQueryDto): Promise<{ data: GlobalAuditResponseDto[]; meta: unknown }> { return (this.listService.findGlobalAuditPage(query)) as never; }
}